import emailjs from "@emailjs/browser";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const SetNotification = ({
    showModal,
    setShowModal,
    selectedRecords,
    setReload,
}) => {
    const [selected, setSelected] = useState({});
    const [unit, setUnit] = useState({});
    const [ID, setID] = useState(localStorage.getItem("ID"));

    useEffect(() => {
        setSelected(selectedRecords);

        const getUnit = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/unit/${selected.unit_id}`
                );
                const jsonData = await response.json();
                setUnit(jsonData);
            } catch (err) {
                console.error(err.message);
            }
        };

        getUnit();

        console.log(unit);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let message = "";
        if (selected.record_status === "For Approval") {
            message =
                `Your record with the following details has been submitted for approval` +
                "\n" +
                `Record ID: ${selected.record_data_id}` +
                "\n";
        } else if (selected.record_status === "Approved") {
            message =
                `Your record with the following details has been approved` +
                "\n" +
                `Record ID: ${selected.record_data_id}` +
                "\n";
        } else {
            message =
                `Your record with the following details needs revision` +
                "\n" +
                `Record ID: ${selected.record_data_id}` +
                "\n";
        }
        const form = document.createElement("form");
        form.style.display = "none";

        // Append values from state or other sources
        form.innerHTML = `
        <input type="hidden" name="from_name" value="SDO Officer" />
        <input type="hidden" name="to_name" value="${unit.unit_name}" />
        <input type="hidden" name="message" value="${message}" />
        <input type="hidden" name="reply_to" value=" " />
    `;

        document.body.appendChild(form);

        // Submit the form
        emailjs
            .sendForm(
                "service_hix8y8a",
                "template_c09ldk2",
                form,
                "in2XLLIpESyiV1yMG"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );

        // Clean up: remove the form from the DOM
        document.body.removeChild(form);

        const data = {
            record_status: selected.record_status,
        };

        try {
            const response = await fetch(
                `http://localhost:5000/record_data/${selected.record_data_id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Record updated successfully!",
                });
                setReload(true);
                setShowModal(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            id="default-modal"
            tabindex="-1"
            aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <form onSubmit={handleSubmit}>
                <div class="relative w-full max-w-2xl max-h-full">
                    <div class="relative bg-white rounded-lg shadow">
                        <div class="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 class="text-xl font-semibold text-gray-900">
                                Update Record Status
                            </h3>
                            <button
                                type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                                data-modal-hide="default-modal"
                                aria-label="Close modal"
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                <svg
                                    class="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-6 space-y-6">
                            <select
                                class="block w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                                onChange={(e) => {
                                    setSelected({
                                        ...selected,
                                        record_status: e.target.value,
                                    });
                                    console.log(selected);
                                }}
                            >
                                <option value="For Approval">
                                    For Approval
                                </option>
                                <option value="Approved">Approved</option>
                                <option value="Need Revision">
                                    Need Revision
                                </option>
                            </select>
                        </div>
                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <button
                                data-modal-hide="default-modal"
                                type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                I accept
                            </button>
                            <button
                                data-modal-hide="default-modal"
                                type="button"
                                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SetNotification;

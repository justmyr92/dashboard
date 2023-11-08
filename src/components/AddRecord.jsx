import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddRecord = ({ showModal, setShowModal, setReload }) => {
    const [ID, setID] = useState(localStorage.getItem("ID"));
    const [sdg, setSdg] = useState([]);
    const [records, setRecords] = useState([]);
    const [sdgID, setSdgID] = useState("");
    const [recordData, setRecordData] = useState(0);
    const [recordID, setRecordID] = useState("");
    const [recordFile, setRecordFile] = useState("");

    const [recordValues, setRecordValues] = useState({});
    const [year, setYear] = useState("");
    const [consumptions, setConsumptions] = useState([
        {
            month: "January",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
        {
            month: "February",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
        {
            month: "March",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
        {
            month: "April",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
        {
            month: "May",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
        {
            month: "June",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
        {
            month: "July",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
        {
            month: "August",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
        {
            month: "September",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
        {
            month: "October",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
        {
            month: "November",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
        {
            month: "December",
            deepWell: 0,
            mains: 0,
            drinkingWater: 0,
        },
    ]);

    const handleInputChange = (record_id, value) => {
        setRecordValues((prevValues) => ({
            ...prevValues,
            [record_id]: value,
        }));
        console.log(recordValues);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/sdg");
            const data = await response.json();
            setSdg(data);
            setSdgID(data[0].sdg_id);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `http://localhost:5000/records/${sdgID}`
            );
            const data = await response.json();
            setRecords(data);
            setRecordID(data[0].record_id);
        };
        fetchData();
    }, [sdgID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "record_data_id",
            "RD" + Math.floor(Math.random() * 100000)
        );
        formData.append("record_date", new Date().toISOString().slice(0, 10));
        formData.append("record_file", recordFile);
        formData.append("record_status", "For Approval");
        formData.append("record_id", recordID);
        formData.append("unit_id", ID);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, submit it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(
                    "http://localhost:5000/record_data",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await response.json();
                if (data.record_data_id) {
                    const recordDataID = data.record_data_id;
                    console.log(recordDataID);
                    for (const key in recordValues) {
                        const value = recordValues[key];
                        //print the key and value of each array element
                        const values = {
                            record_data_id: recordDataID,
                            record_data_value: value,
                        };

                        console.log(values);

                        const response = await fetch(
                            "http://localhost:5000/record_value",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(values),
                            }
                        );
                        const data = await response.json();
                        console.log(data);
                    }
                }
            }
        });
        setReload(true);
        setShowModal(false);
    };

    return (
        <div
            id="default-modal"
            tabindex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Add Record
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
                            onClick={() => setShowModal(false)}
                        >
                            <svg
                                className="w-3 h-3"
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
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="p-6 space-y-6">
                            {
                                <div className="flex flex-col">
                                    <label
                                        for="sdg"
                                        className="text-sm font-semibold text-gray-600"
                                    >
                                        SDG
                                    </label>
                                    <select
                                        id="sdg"
                                        name="sdg"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        onChange={(e) =>
                                            setSdgID(e.target.value)
                                        }
                                    >
                                        <option value="" disabled>
                                            Select SDG
                                        </option>
                                        {sdg.map((sdg) => (
                                            <option
                                                value={sdg.sdg_id}
                                                key={sdg.sdg_id}
                                            >
                                                SDG {sdg.sdg_no}: {sdg.sdg_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            }
                            {
                                <div>
                                    {records.map((record, index) => (
                                        <div
                                            key={record.record_id}
                                            className="mb-4"
                                        >
                                            <label
                                                htmlFor={`record-${record.record_id}`}
                                                className="text-sm font-semibold text-gray-600"
                                            >
                                                {record.record_name}
                                            </label>
                                            <input
                                                type="number"
                                                id={`record-${record.record_id}`}
                                                name={`record-${record.record_id}`}
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                                min="0"
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        record.record_id,
                                                        parseInt(
                                                            e.target.value,
                                                            10
                                                        )
                                                    )
                                                }
                                                value={
                                                    recordValues[
                                                        record.record_id
                                                    ] || ""
                                                }
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                            }
                            <div className="flex flex-col">
                                <label
                                    for="file"
                                    className="text-sm font-semibold text-gray-600"
                                >
                                    Proof
                                </label>
                                <input
                                    id="file"
                                    type="file"
                                    name="file"
                                    placeholder="File"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    accept=".pdf,.docx,.doc"
                                    onChange={(e) =>
                                        setRecordFile(e.target.files[0])
                                    } // e.target.files[0] is the file
                                />
                            </div>
                            {sdgID === "SDG6" && (
                                <h1>Yearly Water Consumption</h1>
                                // consumptions.map((consumption, index) => {
                                //     <div className="flex flex-col" key={index}>
                                //         <label
                                //             for={consumption.month}
                                //             className="text-sm font-semibold text-gray-600"
                                //         ></label>
                                //         <input
                                //             id={consumption.month}
                                //             type="year"
                                //             name="year"
                                //             placeholder="Year"
                                //             value={con}
                                //             className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                //             onChange={(e) =>
                                //                 setYear(e.target.value);
                                //                 console.log()
                                //             } // e.target.files[0] is the file
                                //         />
                                //     </div>;
                                // )}
                            )}
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <button
                                data-modal-hide="default-modal"
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                I accept
                            </button>
                            <button
                                data-modal-hide="default-modal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                onClick={() => setShowModal(false)}
                            >
                                Decline
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRecord;

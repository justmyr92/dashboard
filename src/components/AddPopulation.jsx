import React, { useState } from "react";

const AddPopulation = ({ setShowModal, showModal, setReload }) => {
    const [ID, setID] = useState(localStorage.getItem("ID"));
    const [formData, setFormData] = useState({
        enrolled_school_year: "",
        enrolled_year_level: "",
        enrolled_male: "",
        enrolled_female: "",
        enrollment_male_number: 0,
        enrollment_female_number: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // app.get("/campus_id/:id", async (req, res) => {
        //     try {
        //         const { id } = req.params;
        //         const campusID = await pool.query(
        //             "SELECT campus_id FROM sdo_officer_table WHERE sdo_officer_id = $1",
        //             [id]
        //         );
        //         res.json(campusID.rows[0]);
        //     } catch (err) {
        //         console.error(err.message);
        //     }
        // });
        try {
            const id = await fetch(`/campus_id/${ID}`);
            const campusID = await id.json();
            const campus_id = campusID.campus_id;
            const data = {
                enrolled_id: Math.random(10000000, 99999999),
                enrolled_school_year: formData.enrolled_school_year,
                enrolled_year_level: formData.enrolled_year_level,
                enrolled_gender: formData.enrolled_male,
                enrollment_number: formData.enrollment_male_number,
                campus_id: campus_id,
            };

            const data2 = {
                enrolled_id: Math.random(10000000, 99999999),
                enrolled_school_year: formData.enrolled_school_year,
                enrolled_year_level: formData.enrolled_year_level,
                enrolled_gender: formData.enrolled_female,
                enrollment_number: formData.enrollment_female_number,
                campus_id: campus_id,
            };

            const response = await fetch("/add_enrollment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        } catch (err) {
            console.error(err.message);
        }

        // Clear form after submission
        setFormData({
            enrolled_school_year: "",
            enrolled_year_level: "",
            enrolled_male: "",
            enrolled_female: "",
            enrollment_male_number: 0,
            enrollment_female_number: 0,
        });

        setReload(true);
        setShowModal(false);
    };

    return (
        <div
            id="default-modal"
            tabindex="-1"
            aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div class="relative w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow">
                    <div class="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 class="text-xl font-semibold text-gray-900">
                            Add Population
                        </h3>
                        <button
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
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
                        <div class="flex flex-col">
                            <label
                                for="schoolYear"
                                class="text-sm font-medium text-gray-700"
                            >
                                School Year
                            </label>
                            <input
                                type="text"
                                id="schoolYear"
                                name="enrolled_school_year"
                                value={formData.enrolled_school_year}
                                onChange={handleChange}
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                            />
                        </div>

                        <div class="flex flex-col">
                            <label
                                for="yearLevel"
                                class="text-sm font-medium text-gray-700"
                            >
                                Year Level
                            </label>
                            <input
                                type="text"
                                id="yearLevel"
                                name="enrolled_year_level"
                                value={formData.enrolled_year_level}
                                onChange={handleChange}
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div class="flex flex-col">
                                <label
                                    for="gender"
                                    class="text-sm font-medium text-gray-700"
                                >
                                    Female
                                </label>
                                <input
                                    type="text"
                                    id="gender"
                                    name="enrolled_gender"
                                    value={formData.enrolled_female}
                                    onChange={handleChange}
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                                />
                            </div>
                            <div class="flex flex-col">
                                <label
                                    for="enrollmentNumber"
                                    class="text-sm font-medium text-gray-700"
                                >
                                    Enrollment Number
                                </label>
                                <input
                                    type="text"
                                    id="enrollmentNumber"
                                    name="enrollment_number"
                                    value={formData.enrollment_number}
                                    onChange={handleChange}
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div class="flex flex-col">
                                <label
                                    for="gender"
                                    class="text-sm font-medium text-gray-700"
                                >
                                    Male
                                </label>
                                <input
                                    type="text"
                                    id="gender"
                                    name="enrolled_gender"
                                    value={formData.enrolled_male}
                                    onChange={handleChange}
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                                />
                            </div>
                            <div class="flex flex-col">
                                <label
                                    for="enrollmentNumber"
                                    class="text-sm font-medium text-gray-700"
                                >
                                    Enrollment Number
                                </label>
                                <input
                                    type="text"
                                    id="enrollmentNumber"
                                    name="enrollment_number"
                                    value={formData.enrollment_male_number}
                                    onChange={handleChange}
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                        <button
                            onClick={handleSubmit}
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Add Population
                        </button>
                        <button
                            data-modal-hide="default-modal"
                            type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPopulation;

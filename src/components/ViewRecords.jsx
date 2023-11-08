import React, { useEffect, useState } from "react";

const ViewRecords = ({ setShowModal, record_data_id }) => {
    const [record, setRecord] = useState([]);
    const [recordValue, setRecordValue] = useState([]);
    useEffect(() => {
        console.log(record_data_id);
        const getRecord = async () => {
            const response = await fetch(
                //SELECT * FROM record_value_table WHERE record_data_id
                `http://localhost:5000/record_value/${record_data_id}`
            );
            const data = await response.json();
            setRecord(data);
        };
        getRecord();
    }, [record_data_id]);

    useEffect(() => {
        const getValues = async () => {
            const response = await fetch(
                `http://localhost:5000/record_value/record_data/${record_data_id}`
            );
            const data = await response.json();
            setRecordValue(data);
        };

        getValues();

        console.log(recordValue);
    }, [record]);

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
                            View Record
                        </h3>
                        <button
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
                            aria-label="Close modal"
                            onClick={() => setShowModal(false)}
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
                    <div class="p-6 space-y-6"></div>
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                        <button
                            data-modal-hide="default-modal"
                            type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRecords;

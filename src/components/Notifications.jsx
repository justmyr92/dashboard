import React, { useState } from "react";

const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNotifications = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="notifications">
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={toggleNotifications}
            >
                Notifications
                <svg
                    className={`w-2.5 h-2.5 ml-2.5 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    id="dropdown"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-96 absolute right-8 mt-2"
                >
                    <ul
                        className="py-2 text-sm text-gray-700"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        <li className="px-4 py-2 border-b border-gray-100">
                            <h3 className="px-4 py-2 font-bold">
                                SD Officer 1
                            </h3>
                            <p className="px-4 py-2">
                                Good morning, the records are good. Thank you.
                            </p>
                        </li>
                        <li className="px-4 py-2 border-b border-gray-100">
                            <h3 className="px-4 py-2 font-bold">
                                SD Officer 1
                            </h3>
                            <p className="px-4 py-2">
                                Good morning, there are discrepancies in the
                                records. Please check.
                            </p>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notifications;

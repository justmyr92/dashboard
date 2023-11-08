import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import AddPopulation from "../components/AddPopulation";
const Population = () => {
    const [ID, setID] = useState(localStorage.getItem("ID"));
    const [ROLE, setROLE] = useState(localStorage.getItem("ROLE"));

    useEffect(() => {
        if (!ID) {
            window.location.href = "/login";
        }
    }, [ID]);

    const [enrolled, setEnrolled] = useState([
        {
            enrolled_id: 1,
            enrolled_school_year: "2022",
            enrolled_year_level: "1st Year",
            enrolled_gender: "Male",
            enrollment_number: 100,
            campus_id: 1,
        },
    ]);

    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "School Year",
            selector: (row) => row.enrolled_school_year,
            sortable: true,
        },
        {
            name: "Year Level",
            selector: (row) => row.enrolled_year_level,
            sortable: true,
        },
        {
            name: "Gender",
            selector: (row) => row.enrolled_gender,
            sortable: true,
        },
        {
            name: "Enrolled",
            selector: (row) => row.enrollment_number,
            sortable: true,
        },
        {},
    ];

    const [showAddPopulation, setShowAddPopulation] = useState(false);
    const [reload, setReload] = useState(false);
    return (
        <section className="population">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-500 border-dashed rounded-lg min-h-[calc(100vh-2rem)]">
                    <div className="header flex justify-between items-center">
                        <h3 className="text-3xl font-bold text-gray-700 title">
                            Population
                        </h3>
                    </div>
                    <hr className="my-5 border-gray-800 border-1" />
                    <DataTable
                        columns={columns}
                        data={enrolled}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                    />
                </div>
            </div>
            {showAddPopulation && (
                <AddPopulation
                    setShowModal={setShowAddPopulation}
                    showModal={showAddPopulation}
                    setReload={setReload}
                />
            )}
        </section>
    );
};

export default Population;

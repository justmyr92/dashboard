import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AddUnit from "../components/AddUnit";
import UpdateUnit from "../components/UpdateUnit";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBuildingUser,
    faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

const Units = () => {
    const [ID, setID] = useState(localStorage.getItem("ID"));
    const [ROLE, setROLE] = useState(localStorage.getItem("ROLE"));
    const [showAddUnit, setShowAddUnit] = useState(false);
    const [showUpdateUnit, setShowUpdateUnit] = useState(false);
    const [unit, setUnit] = useState(null);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (!ID) {
            window.location.href = "/login";
        }
    }, [ID]);

    const [units, setUnits] = useState([]);

    useEffect(() => {
        const getUnits = async () => {
            const response = await fetch(
                `http://localhost:5000/unit/sdo/${ID}`
            );
            const data = await response.json();
            setUnits(data);
        };
        getUnits();
        console.log(units);
    }, [reload]);

    const columns = [
        {
            name: "#",
            selector: "customId",
            sortable: true,
        },
        {
            name: "Name",
            selector: "unit_name",
            sortable: true,
        },
        {
            name: "Address",
            selector: "unit_address",
            sortable: true,
        },
        {
            name: "Contact",
            selector: "unit_phone",
            sortable: true,
        },
        {
            name: "Email",
            selector: "unit_email",
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <button
                    data-modal-target="default-modal"
                    data-modal-toggle="default-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                    type="button"
                    onClick={() => {
                        setUnit(row);
                        setShowUpdateUnit(true);
                    }}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            ),
        },
    ];

    const unitsWithCustomId = units.map((unit, index) => ({
        ...unit,
        customId: index + 1,
    }));

    return (
        <section className="dashboard">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                    <div className="header flex justify-between items-center mb-5">
                        <h3 className="text-3xl title text-gray-700">
                            <FontAwesomeIcon icon={faBuildingUser} /> Units
                        </h3>
                        <button
                            data-modal-target="default-modal"
                            data-modal-toggle="default-modal"
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            type="button"
                            onClick={() => setShowAddUnit(true)}
                        >
                            <FontAwesomeIcon icon={faSquarePlus} /> Add Unit
                        </button>
                        {showAddUnit && (
                            <AddUnit
                                showModal={showAddUnit}
                                setShowModal={setShowAddUnit}
                                setReload={setReload}
                            />
                        )}
                    </div>
                    <hr />
                    <DataTable
                        columns={columns}
                        data={unitsWithCustomId}
                        pagination
                        striped
                        highlightOnHover
                        responsive
                        className="text-black"
                    />
                </div>
            </div>
            {showUpdateUnit && unit && (
                <UpdateUnit
                    showModal={showUpdateUnit}
                    setShowModal={setShowUpdateUnit}
                    setReload={setReload}
                    unitData={unit}
                />
            )}
        </section>
    );
};

export default Units;

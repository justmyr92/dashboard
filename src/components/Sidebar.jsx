import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDashboard,
    faUser,
    faBuilding,
    faFileAlt,
    faCheck,
    faUsers,
    faChartBar,
    faBook,
    faSignOut,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    const location = useLocation();

    const [role, setRole] = useState(localStorage.getItem("ROLE"));
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if (role === "csd") {
            setLinks([
                {
                    url: "/csd/dashboard",
                    text: "Dashboard",
                    icon: faDashboard,
                },
                {
                    url: "/csd/sd-officers",
                    text: "SD Officers",
                    icon: faUser,
                },
                {
                    url: "/csd/units",
                    text: "Units",
                    icon: faBuilding,
                },
                {
                    url: "/csd/annual-reports",
                    text: "Annual Reports",
                    icon: faBook,
                },
            ]);
        } else if (role === "sdo") {
            setLinks([
                {
                    url: "/csd/dashboard",
                    text: "Dashboard",
                    icon: faDashboard,
                },
                {
                    url: "/csd/units",
                    text: "Units",
                    icon: faBuilding,
                },
                {
                    url: "/csd/records",
                    text: "Records",
                    icon: faFileAlt,
                },
                {
                    url: "/csd/annual-reports",
                    text: "Annual Reports",
                    icon: faBook,
                },
                {
                    url: "/csd/accreditation",
                    text: "Accreditations",
                    icon: faCheck,
                },
                {
                    url: "/csd/population",
                    text: "Populations",
                    icon: faChartBar,
                },
            ]);
        } else if (role === "unit") {
            setLinks([
                {
                    url: "/csd/dashboard",
                    text: "Dashboard",
                    icon: faDashboard,
                },
                {
                    url: "/csd/records",
                    text: "Records",
                    icon: faFileAlt,
                },
                {
                    url: "/csd/annual-reports",
                    text: "Annual Reports",
                    icon: faBook,
                },
            ]);
        }
    }, [role]);

    return (
        <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-900">
                <img src="../src/assets/" alt="" />
                <ul className="space-y-2 font-medium">
                    {links.map((link, index) => (
                        <li key={index}>
                            <a
                                href={link.url}
                                className={`flex items-center p-2 rounded-lg text-gray-100 ${
                                    location.pathname === link.url
                                        ? "bg-red-500 text-white"
                                        : "hover:bg-gray-800 hover:text-white "
                                }`}
                            >
                                <FontAwesomeIcon
                                    icon={link.icon}
                                    className="mr-2"
                                />
                                {link.text}
                            </a>
                        </li>
                    ))}
                    {/* Add logout item here */}
                    <li>
                        <button
                            className={`flex items-center p-2 rounded-lg text-gray-100 hover:bg-gray-800 hover:text-white`}
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = "/";
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faSignOut}
                                className="mr-2"
                            />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;

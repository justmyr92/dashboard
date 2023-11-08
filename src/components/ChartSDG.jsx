import React, { useState } from "react";
import Card from "./Card";
import WaterConsumption from "./WaterConsumption";
import Electrical from "./Electrical";
import Expenditure from "./Expenditure";
import WasteManagement from "./WasteManagement";
import Ppa from "./Ppa";

const ChartSDG = () => {
    const [sdg, setSdg] = useState("SDG1");
    const [sdgName, setSdgName] = useState("No Poverty");
    const [sdgs, setSdgs] = useState([
        { no: "01", id: "SDG1", name: "No Poverty" },
        { no: "02", id: "SDG2", name: "Zero Hunger" },
        { no: "03", id: "SDG3", name: "Good Health and Well-being" },
        { no: "04", id: "SDG4", name: "Quality Education" },
        { no: "05", id: "SDG5", name: "Gender Equality" },
        { no: "06", id: "SDG6", name: "Clean Water and Sanitation" },
        { no: "07", id: "SDG7", name: "Affordable and Clean Energy" },
        { no: "08", id: "SDG8", name: "Decent Work and Economic Growth" },
        {
            no: "09",
            id: "SDG9",
            name: "Industry, Innovation, and Infrastructure",
        },
        { no: "10", id: "SDG10", name: "Reduced Inequality" },
        { no: "11", id: "SDG11", name: "Sustainable Cities and Communities" },
        {
            no: "12",
            id: "SDG12",
            name: "Responsible Consumption and Production",
        },
        { no: "13", id: "SDG13", name: "Climate Action" },
        { no: "14", id: "SDG14", name: "Life Below Water" },
        { no: "15", id: "SDG15", name: "Life on Land" },
        {
            no: "16",
            id: "SDG16",
            name: "Peace, Justice, and Strong Institutions",
        },
        { no: "17", id: "SDG17", name: "Partnerships for the Goals" },
    ]);

    return (
        <>
            {/* <div className="form-group">
                <label htmlFor="sdg">SDG</label>
                <select
                    name="sdg"
                    id="sdg"
                    className="w-full border-2 border-gray-200 border-dashed rounded-lg"
                    onChange={(e) => setSdg(e.target.value)}
                >
                    <option value="SDG1">SDG 1 : No Poverty</option>
                    <option value="SDG2">SDG 2 : Zero Hunger</option>
                    <option value="SDG3">
                        SDG 3 : Good Health and Well-being
                    </option>
                    <option value="SDG4">SDG 4 : Quality Education</option>
                    <option value="SDG5">SDG 5 : Gender Equality</option>
                    <option value="SDG6">
                        SDG 6 : Clean Water and Sanitation
                    </option>
                    <option value="SDG7">
                        SDG 7 : Affordable and Clean Energy
                    </option>
                    <option value="SDG8">
                        SDG 8 : Decent Work and Economic Growth
                    </option>
                    <option value="SDG9">
                        SDG 9 : Industry, Innovation, and Infrastructure
                    </option>
                    <option value="SDG10">SDG 10 : Reduced Inequality</option>
                    <option value="SDG11">
                        SDG 11 : Sustainable Cities and Communities
                    </option>
                    <option value="SDG12">
                        SDG 12 : Responsible Consumption and Production
                    </option>
                    <option value="SDG13">SDG 13 : Climate Action</option>
                    <option value="SDG14">SDG 14 : Life Below Water</option>
                    <option value="SDG15">SDG 15 : Life on Land</option>
                    <option value="SDG16">
                        SDG 16 : Peace, Justice, and Strong Institutions
                    </option>
                    <option value="SDG17">
                        SDG 17 : Partnerships for the Goals
                    </option>
                </select>
            </div> */}
            <div className="form-group">
                <div className="grid grid-cols-17 gap-1">
                    {sdgs.map((sdg) => (
                        <img
                            src={`../src/assets/res/E-WEB-Goal-${sdg.no}.png`}
                            style={{
                                cursor: "pointer",
                            }}
                            alt={`SDG ${sdg}`}
                            key={sdg.id}
                            onClick={() =>
                                setSdg(sdg.id) & setSdgName(sdg.name)
                            }
                        />
                    ))}
                </div>
                <div className="my-5">
                    <h1 className="text-xl font-bold text-gray-700 title text-red-500">
                        {sdgName}
                    </h1>
                </div>
                <hr className="my-5 border-gray-800 border-1" />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-5">
                {sdg && <Card sdg={sdg} />}
            </div>
            {sdg === "SDG6" && (
                <div className="grid grid-cols-6 mt-5 gap-4">
                    <WaterConsumption />
                </div>
            )}
            {/* <div className="grid grid-cols-6 mt-5 gap-4">
                <Electrical />
            </div> */}
            {/* <div className="grid grid-cols-6 mt-5 gap-4">
                <Expenditure />
            </div>
            <div className="grid grid-cols-6 mt-5 gap-4">
                <WasteManagement />
            </div> */}
            {/* <div className="grid grid-cols-6 mt-5 gap-4">
                <Ppa />
            </div> */}
        </>
    );
};

export default ChartSDG;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
const AnnualReports = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const handleAccordionClick = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };
    const [annualReports, setAnnualReports] = useState([
        {
            annual_report_id: 1,
            annual_report_year: "2022",
            annual_report_file:
                "../src/assets/reports/SDO Alangilan_Sustainability Report 2022.pdf",
            campus_id: 1,
        },
        {
            annual_report_id: 2,
            annual_report_year: "2021",
            annual_report_file:
                "../src/assets/reports/SDO Alangilan_Sustainability Report 2022.pdf",
            campus_id: 1,
        },
        {
            annual_report_id: 3,
            annual_report_year: "2020",
            annual_report_file:
                "../src/assets/reports/SDO Alangilan_Sustainability Report 2022.pdf",
            campus_id: 1,
        },
    ]);
    return (
        <section className="annual-reports">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-500 border-dashed rounded-lg min-h-[calc(100vh-2rem)]">
                    <div className="header flex justify-between items-center">
                        <h3 className="text-3xl font-bold text-gray-700 title">
                            Annual Reports
                        </h3>
                    </div>
                    <hr className="my-5 border-gray-800 border-1" />

                    <div id="accordion-collapse" data-accordion="collapse">
                        {annualReports.map((annualReport, index) => (
                            <div key={annualReport.annual_report_id}>
                                <h2 id={`accordion-collapse-heading-${index}`}>
                                    <button
                                        type="button"
                                        className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200"
                                        data-accordion-target={`#accordion-collapse-body-${index}`}
                                        aria-expanded={
                                            activeAccordion === index
                                        }
                                        aria-controls={`accordion-collapse-body-${index}`}
                                        onClick={() =>
                                            handleAccordionClick(index)
                                        }
                                    >
                                        <span>
                                            Annual Report Year :{" "}
                                            {annualReport.annual_report_year}
                                        </span>
                                        <svg
                                            data-accordion-icon
                                            className={`w-3 h-3 rotate-${
                                                activeAccordion === index
                                                    ? "0"
                                                    : "180"
                                            } shrink-0`}
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
                                                d="M9 5 5 1 1 5"
                                            />
                                        </svg>
                                    </button>
                                </h2>
                                <div
                                    id={`accordion-collapse-body-${index}`}
                                    className={`p-5 border border-b-0 border-gray-200 ${
                                        activeAccordion === index
                                            ? "block"
                                            : "hidden"
                                    }`}
                                    aria-labelledby={`accordion-collapse-heading-${index}`}
                                >
                                    <div className="p-5 border border-b-0 border-gray-200">
                                        {/* Embed pdf */}
                                        <iframe
                                            src={
                                                annualReport.annual_report_file
                                            }
                                            width="100%"
                                            height="600px"
                                            title={`Annual Report ${annualReport.annual_report_year}`}
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnnualReports;

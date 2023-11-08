import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Records from "./pages/Records";
import Units from "./pages/Units";
import Accreditation from "./pages/Accreditation";
import Population from "./pages/Population";
import AnnualReports from "./pages/AnnualReports";
import SDOfficer from "./pages/SDOfficer";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/csd/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/csd/records" element={<Records />} />
                <Route path="/csd/units" element={<Units />} />
                <Route path="/csd/accreditation" element={<Accreditation />} />
                <Route path="/csd/population" element={<Population />} />
                <Route path="/csd/annual-reports" element={<AnnualReports />} />
                <Route path="/csd/sd-officers" element={<SDOfficer />} />
                <Route path="*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

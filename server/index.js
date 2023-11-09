const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/sdg.dashboard");
const bcrypt = require("bcrypt");

const multer = require("multer");

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../src/assets/records"); // Define the destination folder
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, Date.now() + "-" + file.fieldname + "." + ext); // Define the file name
    },
});

const upload = multer({ storage: storage });

//add a new sdo_officer
app.post("/sdo_officer", async (req, res) => {
    try {
        const {
            sdo_officer_id,
            sdo_officer_name,
            sdo_officer_email,
            sdo_officer_phone,
            sdo_officer_password,
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(sdo_officer_password, salt);
        const newSdoOfficer = await pool.query(
            "INSERT INTO sdo_officer_table (sdo_officer_id, sdo_officer_name, sdo_officer_email, sdo_officer_phone, sdo_officer_password) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [
                sdo_officer_id,
                sdo_officer_name,
                sdo_officer_email,
                sdo_officer_phone,
                encryptedPassword,
            ]
        );
        res.json(newSdoOfficer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all sdo_officer
app.get("/sdo_officer", async (req, res) => {
    try {
        const allSdoOfficer = await pool.query(
            "SELECT * FROM sdo_officer_table"
        );
        res.json(allSdoOfficer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//add a new campus
app.post("/campus", async (req, res) => {
    try {
        const {
            campus_id,
            campus_name,
            campus_address,
            campus_phone,
            campus_email,
        } = req.body;
        const newCampus = await pool.query(
            "INSERT INTO campus_table (campus_id, campus_name, campus_address, campus_phone, campus_email) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [campus_id, campus_name, campus_address, campus_phone, campus_email]
        );
        res.json(newCampus.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all campus
app.get("/campus", async (req, res) => {
    try {
        const allCampus = await pool.query("SELECT * FROM campus_table");
        res.json(allCampus.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//add a new csd_officer
app.post("/csd_officer", async (req, res) => {
    try {
        const {
            csd_officer_id,
            csd_officer_name,
            csd_officer_email,
            csd_officer_phone,
            csd_officer_password,
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(csd_officer_password, salt);
        const newCsdOfficer = await pool.query(
            "INSERT INTO csd_officer_table (csd_officer_id, csd_officer_name, csd_officer_email, csd_officer_phone, csd_officer_password) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [
                csd_officer_id,
                csd_officer_name,
                csd_officer_email,
                csd_officer_phone,
                encryptedPassword,
            ]
        );
        res.json(newCsdOfficer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all csd_officer
app.get("/csd_officer", async (req, res) => {
    try {
        const allCsdOfficer = await pool.query(
            "SELECT * FROM csd_officer_table"
        );
        res.json(allCsdOfficer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//add unit officer
app.post("/unit", async (req, res) => {
    try {
        const {
            unit_id,
            unit_name,
            unit_address,
            unit_phone,
            unit_email,
            unit_password,
            sdo_officer_id,
            campus_id,
        } = req.body;
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(unit_password, salt);
        const newUnit = await pool.query(
            "INSERT INTO unit_table (unit_id, unit_name, unit_address, unit_phone, unit_email, unit_password, sdo_officer_id, campus_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [
                unit_id,
                unit_name,
                unit_address,
                unit_phone,
                unit_email,
                encryptedPassword,
                sdo_officer_id,
                campus_id,
            ]
        );
        res.json(newUnit.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all unit
app.get("/unit", async (req, res) => {
    try {
        const allUnit = await pool.query("SELECT * FROM unit_table");
        res.json(allUnit.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all unit by unit_id
app.get("/unit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allUnit = await pool.query(
            "SELECT * FROM unit_table WHERE unit_id = $1",
            [id]
        );
        res.json(allUnit.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all unit by sdo_officer_id
app.get("/unit/sdo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allUnit = await pool.query(
            "SELECT * FROM unit_table WHERE sdo_officer_id = $1",
            [id]
        );
        res.json(allUnit.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//add record
app.post("/record", async (req, res) => {
    try {
        const { record_id, record_name, sdg_id } = req.body;
        const newRecord = await pool.query(
            "INSERT INTO record_table (record_id, record_name, sdg_id) VALUES($1, $2, $3) RETURNING *",
            [record_id, record_name, sdg_id]
        );
        res.json(newRecord.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record
app.get("/record", async (req, res) => {
    try {
        const allRecord = await pool.query("SELECT * FROM record_table");
        res.json(allRecord.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//login via 3 tables (sdo_officer, csd_officer, unit)
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const sdoOfficer = await pool.query(
            "SELECT * FROM sdo_officer_table WHERE sdo_officer_email = $1",
            [username]
        );
        const csdOfficer = await pool.query(
            "SELECT * FROM csd_officer_table WHERE csd_officer_email = $1",
            [username]
        );
        const unit = await pool.query(
            "SELECT * FROM unit_table WHERE unit_email = $1",
            [username]
        );
        if (sdoOfficer.rows.length > 0) {
            const validPassword = await bcrypt.compare(
                password,
                sdoOfficer.rows[0].sdo_officer_password
            );
            if (validPassword) {
                res.json(sdoOfficer.rows[0]);
            } else {
                res.json({ message: "Invalid Password" });
            }
        } else if (csdOfficer.rows.length > 0) {
            const validPassword = await bcrypt.compare(
                password,
                csdOfficer.rows[0].csd_officer_password
            );
            if (validPassword) {
                res.json(csdOfficer.rows[0]);
            } else {
                res.json({ message: "Invalid Password" });
            }
        } else if (unit.rows.length > 0) {
            const validPassword = await bcrypt.compare(
                password,
                unit.rows[0].unit_password
            );
            if (validPassword) {
                res.json(unit.rows[0]);
            } else {
                res.json({ message: "Invalid Password" });
            }
        } else {
            res.json({ message: "User does not exist" });
        }
    } catch (err) {
        console.error(err.message);
    }
});

//get all sdg
app.get("/sdg", async (req, res) => {
    try {
        const allSdg = await pool.query("SELECT * FROM sdg_table");
        res.json(allSdg.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// useEffect(() => {
//     const fetchData = async () => {
//         const response = await fetch(
//             `http://localhost:5000/records/${sdgID}`
//         );
//         const data = await response.json();
//         setRecords(data);
//     };
// }, [sdgID]);

app.get("/records/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const records = await pool.query(
            "SELECT * FROM record_table WHERE sdg_id = $1",
            [id]
        );
        res.json(records.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record_data
app.get("/record/unit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordData = await pool.query(
            "SELECT * from record_data_table WHERE unit_id = $1"
        );
        res.json(recordData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all unit id by sdo_officer_id
app.get("/unit_id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const unitID = await pool.query(
            "SELECT unit_id FROM unit_table WHERE sdo_officer_id = $1",
            [id]
        );

        res.json(unitID.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record_data by unit_id
app.get("/record_data/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordData = await pool.query(
            "SELECT * FROM record_data_table WHERE record_id = $1",
            [id]
        );
        res.json(recordData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.patch("/record_data/:id", async (req, res) => {
    try {
        //only the status will be updated
        const { id } = req.params;
        const { record_status } = req.body;
        const updateRecordData = await pool.query(
            "UPDATE record_data_table SET record_status = $1 WHERE record_data_id = $2",
            [record_status, id]
        );
        res.json("Record Data was updated");
    } catch (err) {
        console.error(err.message);
    }
});

//add record_data
app.post("/record_data", upload.single("record_file"), async (req, res) => {
    try {
        const {
            record_data_id,
            record_date,
            record_status,
            record_id,
            unit_id,
        } = req.body;
        console.log(req.body);

        const record_file = "../src/assets/records/" + req.file.filename;

        console.log(record_file);

        const newRecordData = await pool.query(
            "INSERT INTO record_data_table (record_data_id, record_date, record_file, record_status, record_id, unit_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                record_data_id,
                record_date,
                record_file,
                record_status,
                record_id,
                unit_id,
            ]
        );

        res.json(newRecordData.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/record_value", async (req, res) => {
    try {
        //record_value_id | record_data_id | value
        const record_value_id = "RV" + Math.floor(Math.random() * 100000);
        const { record_data_id, record_data_value } = req.body;
        console.log(req.body);
        const newRecordValue = await pool.query(
            "INSERT INTO record_value_table (record_value_id, record_data_id, value) VALUES($1, $2, $3) RETURNING *",
            [record_value_id, record_data_id, record_data_value]
        );
        res.json(newRecordValue.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record_value  by record_data_id
app.get("/record_value/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordValue = await pool.query(
            "SELECT * FROM record_value_table WHERE record_data_id = $1",
            [id]
        );
        res.json(recordValue.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all record_value inner join record_data by record_data_id

app.get("/record_value/record_data/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordValue = await pool.query(
            "SELECT record_value_table.*, record_data_table.* FROM record_value_table INNER JOIN record_data_table ON record_value_table.record_data_id = record_data_table.record_data_id WHERE record_value_table.record_data_id = $1",
            [id]
        );
        res.json(recordValue.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get campus by sdo_officer_id
app.get("/campus/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const campus = await pool.query(
            "SELECT campus_id FROM sdo_officer_table WHERE sdo_officer_id = $1",
            [id]
        );
        res.json(campus.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all accreditation
app.get("/accreditation/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allAccreditation = await pool.query(
            "SELECT * FROM accreditation_table WHERE campus_id = $1",
            [id]
        );
        res.json(allAccreditation.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/record/sdg/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const record = await pool.query(
            "SELECT * FROM record_table WHERE sdg_id = $1",
            [id]
        );
        res.json(record.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//get all record_data
app.get("/record/unit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordData = await pool.query(
            "SELECT record_table.*, record_data_table.* FROM record_table LEFT JOIN record_data_table ON record_table.record_id = record_data_table.record_id WHERE record_data_table.unit_id = $1",
            [id]
        );
        res.json(recordData.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/record/all/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recordData = await pool.query(
            //left join
            //"SELECT record_table.*, record_data_table.* FROM record_table LEFT JOIN record_data_table ON record_table.record_id = record_data_table.record_id WHERE record_data_table.unit_id = $1",
            "SELECT * from record_data_table WHERE unit_id = $1",
            [id]
        );
        res.json(recordData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//add accreditation
app.post("/accreditation", async (req, res) => {
    try {
        const {
            accreditation_id,
            accreditation_program,
            accreditation_program_type,
            accreditation_level,
            accreditation_year,
            campus_id,
        } = req.body;
        const newAccreditation = await pool.query(
            "INSERT INTO accreditation_table (accreditation_id, accreditation_program, accreditation_program_type, accreditation_level, accreditation_year, campus_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                accreditation_id,
                accreditation_program,
                accreditation_program_type,
                accreditation_level,
                accreditation_year,
                campus_id,
            ]
        );
        res.json(newAccreditation.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//SELECT *
// FROM sdo_officer_table
// INNER JOIN campus_table ON sdo_officer_table.campus_id = campus_table.campus_id;

//get all sdo_officer inner join campus
app.get("/sdo-officers", async (req, res) => {
    try {
        const allSdoOfficer = await pool.query(
            "SELECT * FROM sdo_officer_table INNER JOIN campus_table ON sdo_officer_table.campus_id = campus_table.campus_id"
        );
        res.json(allSdoOfficer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.patch("/unit/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            unit_name,
            unit_address,
            unit_phone,
            unit_email,
            sdo_officer_id,
            campus_id,
        } = req.body;
        const updateUnit = await pool.query(
            "UPDATE unit_table SET unit_name = $1, unit_address = $2, unit_phone = $3, unit_email = $4, sdo_officer_id = $5, campus_id = $6 WHERE unit_id = $7 returning *",
            [
                unit_name,
                unit_address,
                unit_phone,
                unit_email,
                sdo_officer_id,
                campus_id,
                id,
            ]
        );
        res.json(updateUnit.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// Routes
app.get("/water_consumption", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM water_consumption");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/water_consumption", async (req, res) => {
    const { month, deepWell, mains, drinkingWater } = req.body;
    try {
        const query = `
        INSERT INTO water_consumption (month, deep_well, mains, drinking_water)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
        const values = [month, deepWell, mains, drinkingWater];
        const { rows } = await pool.query(query, values);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//get the campus_id of the sdo_officer by sdo_officer_id
app.get("/campus_id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const campusID = await pool.query(
            "SELECT campus_id FROM sdo_officer_table WHERE sdo_officer_id = $1",
            [id]
        );
        res.json(campusID.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/add_enrollment", async (req, res) => {
    try {
        // Destructure the data from the request body
        const {
            enrolled_id,
            enrolled_school_year,
            enrolled_year_level,
            enrolled_gender,
            enrollment_number,
            campus_id,
        } = req.body;

        // Use the data to insert a new enrollment into the database
        const newEnrollment = await pool.query(
            "INSERT INTO enrollment_table (enrollment_id, enrollment_school_year, enrollment_year_level, enrollment_gender, enrollment_number, campus_id) " +
                "VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                enrolled_id,
                enrolled_school_year,
                enrolled_year_level,
                enrolled_gender,
                enrollment_number,
                campus_id,
            ]
        );

        // Send the newly inserted enrollment data back as the response
        res.json(newEnrollment.rows[0]); // Assuming you expect a single enrollment back
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.get("/enrollment", async (req, res) => {
    try {
        const allEnrollment = await pool.query(
            "SELECT * FROM enrollment_table"
        );
        res.json(allEnrollment.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

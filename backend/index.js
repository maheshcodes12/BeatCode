const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const onlineCompilerRoute = require("./routes/onlineCompilerRoute");
const practiceProblemsRoute = require("./routes/practiceProblemsRoute");
const authRoute = require("./routes/authRoute");
dotenv.config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {})
        .then(() => {
                console.log("MongoDB connected");
                app.listen(port, () => {
                        console.log(`Server is running on http://localhost:${port}`);
                });
        })
        .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/onlinecompiler", onlineCompilerRoute);
app.use("/practiceproblems", practiceProblemsRoute);
app.use("/register", authRoute);

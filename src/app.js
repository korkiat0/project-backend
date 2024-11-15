require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth-route");
const unitsRoute = require("./routes/units-route");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const repairRoute = require("./routes/repair-route");
const adminRoute = require("./routes/admin-route");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", adminRoute);
app.use("/auth", authRouter);
app.use("/units", unitsRoute);
app.use("/request-repair", repairRoute);
app.use("/dashboard-repair", repairRoute);

app.use(errorMiddleware);

let port = process.PORT || 8500;

app.listen(port, () => console.log("Server on Port:", port));

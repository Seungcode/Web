import { s3Router } from "./src/routers/s3router.js";
import express from "express";
import { sqlrouter } from "./src/util/sql.js";
import cors from 'cors';

const app = express();
const port = 3000;

app.use("/api/upload", s3Router);
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(sqlrouter);

app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
});


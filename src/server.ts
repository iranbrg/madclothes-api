import "reflect-metadata";
import "express-async-errors";
import express from "express";
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";
import "./database";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

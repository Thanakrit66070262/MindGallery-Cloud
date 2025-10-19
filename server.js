import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ====== Fix __dirname for ESM ======
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// ====== View engine ======
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// ====== Middlewares ======
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

// ====== Routes ======
import viewRoutes from "./routes/view.routes.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/upload.routes.js";

app.use("/", viewRoutes);
app.use("/", authRoutes);
app.use("/upload", postRoutes);

// ====== 404 ======
app.use((req, res) => res.status(404).send("Not found"));

// ====== Start server ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}/`));

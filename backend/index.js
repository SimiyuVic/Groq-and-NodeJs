import express from "express";
import dotenv from "dotenv";
import groqRoutes from "./routes/groq.route.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true
}));

//groq route
app.use("/api/groq", groqRoutes);

const PORT = process.env.PORT;

const startServer = async()=>{
    app.listen(PORT, ()=>{
        console.log(`Listening to request via PORT ${PORT}`);
    });
}

startServer();
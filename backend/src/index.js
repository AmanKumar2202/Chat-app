import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import smartReplyRoutes from "./routes/smartReply.route.js"
import translateRoutes from "./routes/translate.route.js"
import transcribeRoutes from "./routes/transcribe.route.js"
import { app, server } from "./lib/socket.js"

dotenv.config()


const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,  //Allows cookies
}))
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/smart-replies",smartReplyRoutes)
app.use("/api/translate",translateRoutes)
app.use("/api/transcribe",transcribeRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
    connectDB()
})
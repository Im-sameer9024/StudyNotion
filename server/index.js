import express from "express";
import 'dotenv/config.js'

import userRoutes from "./routes/userRoute.js";
import courseRoutes from "./routes/courseRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";
import profileRoutes from "./routes/profileRoute.js";

import dbConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import Cors from 'cors'
import cloudinaryConnect from "./config/cloudinary.js";

import fileUpload from "express-fileupload"

const port = process.env.PORT || 4000;
const app = express();

//database connection -------------
dbConnection();

//middlewares ----------------
app.use(express.json());
app.use(cookieParser());
app.use(Cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp'
    })
)


//cloudinary ----------------
cloudinaryConnect();

//routes ----------------
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/profile", profileRoutes);

app.get("/",(req,res) =>{
    return res.json({
        success:true,
        message:"server is running........"
    })
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
import Express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js"

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }

const app = Express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors())

app.use("/posts", postRoutes)
app.use("/user", userRoutes)

app.get('/', (req,res) => {
    res.send("welcome to minisosial media")
})

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL,)
.then(() => app.listen(PORT                                                                                 , () => console.log(`Server running on Port: http://localhost:${PORT                                                                                }`)))
.catch((error) => console.log(`${error} did not connect`));

 
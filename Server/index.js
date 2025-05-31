const express = require("express")
const cors = require("cors")
const connection = require("./config/db")
const userRouter = require("./Routes/user.routes")
require("dotenv").config()




const app = express()
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"],
  credentials: true
}))


//Routes
app.use("/api/user",userRouter)



app.listen(process.env.PORT || 3000 ,async() => {
    try {
      await connection
      console.log("server is running");   
    } catch (error) {
      console.log(error);      
    }
})
const express = require("express")
const cors = require("cors")
const connection = require("./config/db")
var cookieParser = require("cookie-parser");
const userRouter = require("./Routes/user.routes")
const productRouter = require("./Routes/product.routes")
const path = require("path"); 
require("dotenv").config()




const app = express()
app.use(express.json())
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"],
  credentials: true
}))


//Routes
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)

app.use("/user", express.static(path.join(__dirname, "uploads/user")));
app.use("/product", express.static(path.join(__dirname, "uploads/product")));



app.listen(process.env.PORT || 3000 ,async() => {
    try {
      await connection
      console.log("server is running");   
    } catch (error) {
      console.log(error);      
    }
})
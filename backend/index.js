const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT
app.get("/", (req, res)=> {
return res.json({
msg: "Hello from server" })})

app.listen(port, ()=> console.log(`Server is runnng on port ${port}`))
 

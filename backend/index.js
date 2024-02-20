const express = require("express");
const database = require("./config/database");
const rootRouter = require("./routes/index");
const cors = require("cors");

database.connect();

const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/v1',rootRouter);

app.listen(3000,() =>{
    console.log("App is running on 3000");
})
// Packages and Libraries

var cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
 const Router = require("./routers/users")
 const Router1 = require("./routers/clubs")
const Router2 = require("./routers/events")




const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
 

mongoose.connect('mongodb+srv://anis2022:<password>@cluster0.mdtfjex.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
        console.log("DB connected")
    })

 app.use("/users",Router);
 app.use("/clubs",Router1);
app.use("/events",Router2);



app.listen(4000, () => {
    console.log("Server is running at port 4000");
});



//Routers
const clubsRouter = require ('./routers/clubs');
const usersRouter = require ('./routers/users');
const eventsRouter = require ('./routers/events');


app.use( `/clubs`, clubsRouter);
app.use( `/users`, usersRouter);
app.use( `/events`, eventsRouter);


module.exports = app;

//Starting to listen to requests




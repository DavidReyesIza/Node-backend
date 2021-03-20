

const express = require("express");

const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded())

const db = require("./app/models");
db.sequelize.sync();

db.sequelize.sync({ force: true}).then(() =>{
    console.log("Drop and re-sync db.")
})

app.get("/",(req,res)=>{
    res.json({message: "Bienvenido a la aplicacion"})
});


require("./app/routes/tutorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`El server esta corriendo en el puerto ${PORT}`)
});


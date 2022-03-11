const express = require("express")
const{ DataTypes } =require("sequelize");
const app = express ()
const sequelize = require("./models/index").sequelize;
const User = require("./models/user");

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.get("/get_route", (req,res) => {
//     res.status(300).json({message: "hai dari server"})
// }) 

// app.post("/create_route",(req,res) => {
//     res.status(300).json({message: "hai dari server"})
// })

app.post("/createUser", async (req,res) =>{
    const data = await User(sequelize,DataTypes).create({
        username: req.body.username,
        password: req.body.password,
        nomor_hp: req.body.nomor_hp,
    });
     res.status(201).json({ message: "success created user",data: data })
});

app.get("/get_user", async (req,res) =>{
    const data = await User (sequelize,DataTypes).findAll({});
    res.status(201).json({ message: "success get all user", data: data})
});

app.put("/update_user/:id", async (req,res) =>{
    const data = await User(sequelize,DataTypes).update({
        username: req.body.username,
        password: req.body.password,
        nomor_hp: req.body.nomor_hp,
    }, 
        {
        where: {id: req.params.id}
        }
);
  res.status(201).json({ message: "data berhasil di update"})
});

app.delete("/delete_user/:id", async (req,res) =>{
    await User(sequelize,DataTypes).destroyer({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json({message: "user berhasil di hapus"})
})

app.listen(3022,console.log("listening at" +3022))
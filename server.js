const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profilePics");
  },
  filename: function (req, file, cb) {
    cb(null, ` ${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/profilePic", express.static("profilePic"));
app.use(express.static(path.join(__dirname, "./client/build")));

app.get('*', (req,res)=>{
  res.sendFile("./client/build/index.html");
})

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  try {
    let signUpData = new schemaClass({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
      profilePic: req.file.path,
    });
    await signUpData.save();
    res.json({ status: "Success", msg: "created account" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Fail", msg: "Not created" });
  }
});

app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);
  let userData = schemaClass.find().and({ email: req.body.email });

  if (userData.length > 0) {
    if (userData[0].password == req.body.password) {
      let userDetailsToSend = {
        firstName: userData[0].firstName,
        lastName: userData[0].lastName,
        age: userData[0].age,
        email: userData[0].email,
        mobile: userData[0].mobile,
        profilePic: userData[0].profilePic,
      };
      res.json({
        status: "success",
        data: userDetailsToSend,
        msg: "email password are correct.",
      });
    } else {
      res.json({ status: "Failure", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "failure", msg: "user doesnot exit..." });
  }
});

app.listen(1001, () => {
  console.log("1001 port is connected");
});

let schemaObject = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: String,
  email: String,
  password: String,
  mobile: String,
  profilePic: String,
});

let schemaClass = new mongoose.model("user", schemaObject, "postData");



let dataBaseConnection = () => {
  try {
    mongoose.connect(
      "mongodb+srv://pavankumar3cu:pavan2501@cluster0.rcf7gdv.mongodb.net/PostBase?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("DataBase is connected");
  } catch (error) {
    console.log("DataBase is not connected", error);
  }
};

dataBaseConnection();

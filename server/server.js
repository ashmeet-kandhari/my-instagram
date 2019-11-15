import "@babel/polyfill";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const app = express();
const router = express.Router();

const config = { jwtSecret: "this is a test", tokenExpireTime: 86400 };

app.use(express.static(path.join(__dirname, "../build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

router.post("/users/login", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (username === "user" && password === "user") {
    const payload = {
      data: {
        username: username,
        time: new Date()
      }
    };

    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.tokenExpireTime
    });
    res.send({
      token: token,
      success: "login sucessfull"
    });
  } else {
    res.status(401).send({
      error: "Email and password does not match"
    });
  }
});

app.use("/api", router);
app.listen(9000);

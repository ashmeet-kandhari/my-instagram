import "@babel/polyfill";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import proxy from "http-proxy-middleware";
import queryString from "query-string";

const app = express();
const router = express.Router();
const imagesProxyURL = "https://pixabay.com/api/";
const key = "";

const config = { jwtSecret: "this is a test", tokenExpireTime: 86400 };

app.use("/", express.static(path.join(__dirname, "../build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

router.post("/users/login", (req, res) => {
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

const onError = (err, req, res) => {
  res.writeHead(500, {
    "Content-Type": "text/plain"
  });
  res.end("Something went wrong. And we are reporting a custom error message.");
};

const pathRewrite = (path, req) => {
  req.query.key = key;
  req.query.safesearch = true;

  const newReqQueryParams = queryString.stringify(req.query);
  const newPath = "";

  return `${newPath}?${newReqQueryParams}`;
};

const options = {
  target: imagesProxyURL,
  onError,
  pathRewrite,
  secure: false,
  changeOrigin: true
};

// images
router.get("/images", proxy(options));

app.use("/api", router);
app.listen(9000);

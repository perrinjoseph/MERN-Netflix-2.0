const express = require("express");
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const moviesRouter = require("./routes/moviesRoutes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

//config: MongoDB, GridFS, Upload
require("./config/config.js");

const app = express();

//middleware
//this is needed to get api calls from a different server and credentials is needed because we want to send cookies back to the server which is the credentials.
//origin means that we can send api requests from anything with this origin.
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(cookieParser());
app.use(express.json());
app.use(methodOverride("_method"));

// NOTE: Express uses some weird path reg ex matching pattern which means that
// api/auth/update/112 and api/users/update/123 are the same thing.
app.use("/api/movies", moviesRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 8080, () =>
  console.log("🟢 Server is running on port 8080")
);

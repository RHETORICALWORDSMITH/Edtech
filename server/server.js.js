const express = require("express");
const dotenv = require("dotenv");
const mongooseConnect = require("./config/dbConnect");
dotenv.config();

const passport = require("./config/passport");
const path = require("path");

// Import custom middlewares
const corsMiddleware = require("./middlewares/corsMiddleware");
const cookieParserMiddleware = require("./middlewares/cookieParserMiddleware");
const jsonParserMiddleware = require("./middlewares/jsonParserMiddleware");
const urlEncodedMiddleware = require("./middlewares/urlEncodedMiddleware");
const morganMiddleware = require("./middlewares/morganMiddleware");
const expSession = require("./middlewares/expressSessionMiddleware");

// Import routes
const authRouter = require("./routes/auth.route");
const googleAuthRouter = require("./routes/googleAuth.route");

const app = express();
app.use(express.json());

mongooseConnect();

// Middleware order is important
app.use(corsMiddleware);
app.use(cookieParserMiddleware);
app.use(expSession);
app.use(passport.initialize());
app.use(passport.session());

// Then add your other middleware
app.use(jsonParserMiddleware);
app.use(urlEncodedMiddleware);
app.use(morganMiddleware);
app.use("/videos", express.static(path.join(__dirname, "uploads/videos")));

// Routes
app.use("/auth", authRouter);
app.use("/googleAuth", googleAuthRouter);

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

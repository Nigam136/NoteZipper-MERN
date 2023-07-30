const express = require("express");
const notes = require("./data/notes");
const env = require("dotenv");
const connectDB = require("./config/DB");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
//object for express
const app = express();
env.config();
connectDB();
app.use(express.json());

//api for users and notes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

//------------------deployement----------------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  // general api
  app.get("/", (req, res) => {
    res.send("API is running.......");
  });
}

//------------------deployement----------------

app.use(errorHandler);
app.use(notFound);
//server and port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on PORT ${PORT}`));

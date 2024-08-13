const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const orderRoute = require("./routes/order.route");

const app = express();

/*MIDDLEWARE*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*  */
app.get("/", (req, res) => {
  res.send("Hello from node API. This is home page");
});

/*ROUTES*/
app.use("/api/products", productRoute);

app.use("/api/users", userRoute);

app.use("/api/orders", orderRoute);

mongoose
  .connect(
    "mongodb+srv://aksharvadher001:Z2s1jTZg4LIgFPpI@djcdb.nllua.mongodb.net/?retryWrites=true&w=majority&appName=djcdb"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log("Database connection failed"));

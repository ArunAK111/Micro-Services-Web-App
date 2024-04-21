const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
const schema = mongoose.Schema;
const productschema = new schema({
  name: {
    type: String,
    required: true,
  },
  imgsrc: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const productmodel = mongoose.model("products", productschema);

app.get("/", (req, res) => {
  res.json({ message: "hello from uc2" });
});
app.post("/product", async (req, res) => {
  const { name, imgsrc, desc, price } = req.body;
  try {
    const product = await productmodel.create({ name, imgsrc, desc, price });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get("/product/:id", async (req, res) => {
  const name = req.params.id;
  console.log(name);
  const presult = await productmodel.find({ name: new RegExp(name, "i") });
  if (!presult) res.status(400).json({ error: "product doesnt exist" });
  else res.status(200).json(presult);
});
app.get("/getproduct/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const presult = await productmodel.findOne({ _id: id });
  if (!presult) res.status(400).json({ error: "product doesnt exist" });
  else res.status(200).json(presult);
});
app.get("/product", async (req, res) => {
  const plist = await productmodel.find({}).limit(52);
  console.log(plist.length);
  res.status(200).json(plist);
  console.log("got products");
});
mongoose
  .connect(
    "mongodb+srv://arunkurali9:jzSQBwQVXqJPw5lg@cluster0.f8envjp.mongodb.net/"
  ) //connect to database , then create middleware server
  .then(() => {
    app.listen(5002, () => console.log("uc2 running"));
  })
  .catch((error) => {
    console.log(error);
  });

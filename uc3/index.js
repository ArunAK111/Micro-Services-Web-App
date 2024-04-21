const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
const schema = mongoose.Schema;
const prodschema = new schema({
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});
const cartschema = new schema(
  {
    products: [prodschema],
    total: Number,
  },
  { timestamps: true }
);
const historyschema = new schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  curr_cart: {
    type: [prodschema],
  },
  cart_history: {
    type: [cartschema],
    default: [],
  },
});
const singleprod = mongoose.model("singleprod", prodschema);
const userhistory = mongoose.model("userhistory", historyschema);
const listofprods = mongoose.model("listofprods", cartschema);

app.get("/", (req, res) => {
  res.json({ message: "Hello from uc3" });
});
app.post("/addcart", async (req, res) => {
  const { user, id, quan } = req.body;
  const temp = new singleprod();
  temp.product = id;
  temp.quantity = quan;
  const uresult = await userhistory.findOneAndUpdate(
    { user: user },
    { $push: { curr_cart: temp } }
  );
  console.log(uresult);
  if (uresult) res.status(200).json(id);
  if (!uresult) {
    try {
      const cresult = await userhistory.create({
        user: user,
        curr_cart: [temp],
      });
      res.status(200).json(id);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  console.log("added product to cart");
});
app.post("/delcart", async (req, res) => {
  const { user, id } = req.body;
  const uresult = await userhistory.findOneAndUpdate(
    { user: user },
    { $pull: { curr_cart: { product: id } } }
  );
  res.status(200).json(uresult);
});
app.post("/buy", async (req, res) => {
  const { user, ctotal } = req.body;
  const uresult = await userhistory.find({ user: user });
  var temp = new listofprods();
  temp.products = [...uresult[0].curr_cart];
  temp.total = ctotal;
  console.log(temp);
  const nresult = await userhistory.findOneAndUpdate(
    { user: user },
    { curr_cart: [], $push: { cart_history: temp } }
  );
  res.status(200).json(nresult);
  console.log("shifted items from current cart to cart history");
});
app.get("/getcart/:user", async (req, res) => {
  const user = req.params.user;
  const uresult = await userhistory.findOne({ user: user });
  res.status(200).json(uresult.curr_cart);
});
app.get("/history/:user", async (req, res) => {
  const user = req.params.user;
  const uresult = await userhistory.findOne({ user: user });
  res.status(200).json(uresult.cart_history);
});
mongoose
  .connect(
    "mongodb+srv://arunkurali9:jzSQBwQVXqJPw5lg@cluster0.f8envjp.mongodb.net/"
  ) //connect to database , then create middleware server
  .then(() => {
    app.listen(5003, () => console.log("uc3 running"));
  })
  .catch((error) => {
    console.log(error);
  });

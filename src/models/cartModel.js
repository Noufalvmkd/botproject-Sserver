const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, default: 0 }
});

const CartModel = mongoose.model("Cart", cartSchema);



module.exports = CartModel;


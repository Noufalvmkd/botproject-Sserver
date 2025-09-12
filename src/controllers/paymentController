const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPayment = async (req, res ) => {
  try {
    const { products } = req.body;

    console.log("REQ BODY ===>", req.body);


    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided for checkout" });
    }

    const lineItems = products.map((item) => {
  const product = item.productId || item; // if productId exists, use it, else use item directly
  return {
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: Math.round(product.price * 100), // convert to paise
    },
    quantity: item.quantity || 1,
  };
});


  const clientUrl = process.env.NODE_ENV === "production" 
  ? process.env.CLIENT_URL_PROD 
  : process.env.CLIENT_URL_DEV;
console.log("Using clientUrl:", clientUrl);

const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items: lineItems,
  mode: "payment",
  success_url: `${clientUrl}/user/payment/success`,
  cancel_url: `${clientUrl}/user/payment/cancel`,
});

console.log("Line Items ===>", lineItems);


    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = createPayment;

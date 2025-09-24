
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // secret key sk_test

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body.items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: item.price * 100, 
        },
        quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: 'http://localhost:5173/success',
    cancel_url: 'http://localhost:5173/checkout',
  });
  res.json({ url: session.url });
});

app.listen(4242, () => console.log('Server running on port 4242'));

//to run server: node server.js
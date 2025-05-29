import Stripe from 'stripe';
import { config } from '../config/config.js';

const stripe = new Stripe(config.stripeSecretKey);

export const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: 'CLP',
          product_data: { name: item.name },
          unit_amount: item.price ,
        },
        quantity: item.quantity,
      })),
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

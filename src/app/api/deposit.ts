import Stripe from 'stripe';

const stripe = new Stripe('https://api.stripe.com');

export async function createCharge(amount: number, source: string) {
  const charge = await stripe.charges.create({
    amount, // amount in cents
    currency: 'usd',
    source, // Stripe's test card number for Visa
    description: 'Test deposit',
  });

  return charge;
}
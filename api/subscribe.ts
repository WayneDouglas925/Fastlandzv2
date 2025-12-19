import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  // Mailchimp API credentials from environment variables
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX; // e.g., "us21"

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER_PREFIX) {
    console.error('Mailchimp credentials not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Mailchimp API endpoint
    const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed', // or 'pending' for double opt-in
        tags: ['FASTLANDZ'], // Optional: tag subscribers
        merge_fields: {
          SOURCE: 'Landing Page',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Check if user already subscribed
      if (data.title === 'Member Exists') {
        return res.status(200).json({ message: 'Already subscribed!' });
      }

      console.error('Mailchimp error:', data);
      return res.status(400).json({ error: data.detail || 'Subscription failed' });
    }

    return res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

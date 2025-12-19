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

  // MailerLite API credentials from environment variables
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    console.error('MailerLite credentials not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // MailerLite API endpoint
    const url = 'https://connect.mailerlite.com/api/subscribers';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        groups: [MAILERLITE_GROUP_ID],
        fields: {
          source: 'Landing Page',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Check if user already subscribed
      if (response.status === 422 || data.message?.includes('already exists')) {
        return res.status(200).json({ message: 'Already subscribed!' });
      }

      console.error('MailerLite error:', data);
      return res.status(400).json({ error: data.message || 'Subscription failed' });
    }

    return res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

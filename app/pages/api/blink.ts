import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, price, image } = req.body;

    // Validate the request body
    if (!title || !description || !price || !image) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      // Simulate saving to a database
      // await saveBlinkToDatabase({ title, description, price, image });

      res.status(201).json({
        message: 'Blink created successfully',
        blink: { title, description, price, image }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

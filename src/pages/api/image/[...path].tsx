// pages/api/image/[...path].js
export default async function handler(req, res) {
    const { path } = req.query;
    
    // Construct the full path to your GCS image
    const imagePath = Array.isArray(path) ? path.join('/') : path;
    const imageUrl = `https://storage.googleapis.com/testing_developer_02/${imagePath}`;
    
    try {
      // Fetch the image from Google Cloud Storage
      const imageResponse = await fetch(imageUrl);
      
      if (!imageResponse.ok) {
        return res.status(imageResponse.status).end();
      }
      
      // Get the image data as an array buffer
      const imageBuffer = await imageResponse.arrayBuffer();
      
      // Set appropriate headers
      res.setHeader('Content-Type', imageResponse.headers.get('content-type') || 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      
      // Send the image data
      res.status(200).send(Buffer.from(imageBuffer));
    } catch (error) {
      console.error('Image proxy error:', error);
      res.status(500).end();
    }
  }
//importing Express
import express from 'express';
import path from 'path';
import * as fs from 'node:fs/promises';
import mime from 'mime-types';
import { getCachedThumb, getThumbFilename, resizeThumb } from './file';


//Starting up an instance of app and setting a port
const app = express();
const port = 3000;


//Starting the server on the port
app.listen(port, () => {
  console.log(`server running on http://localhost:${port} `);
});


app.get('/image/:name', async (req: express.Request, res: express.Response): Promise<void> => {
  const { name } = req.params
  const width = parseInt(req.query.width as string)
  const height = parseInt(req.query.height as string)
  const thumbFilename = getThumbFilename(name, width, height);
  const cachedThumb = await getCachedThumb(thumbFilename)
  const imageMime = mime.lookup(thumbFilename)

  try {
    
    
    if (imageMime) {
      res.set("Content-Disposition", "inline;");
      res.set('Content-Type', imageMime);
    }

    if (cachedThumb === null) {
      
      const buffer = await resizeThumb(name, width, height)
      const toCachePathname = path.resolve(__dirname, '../assets/thumb', thumbFilename);
      res.send(buffer)
      console.log('caching')
      fs.writeFile(toCachePathname, buffer)

    } else {

      console.log('cached')
      res.send(cachedThumb)
    }
  } catch(err) {
    res.status(500).send(err)
    console.error(err)
  }
});

export default app;


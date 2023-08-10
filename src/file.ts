import path from 'path';
import * as fs from 'node:fs/promises';
import sharp from 'sharp'

const getThumbFilename = (filename: string, width: number , height: number ): string => {
  const extname = path.extname(filename);
  const basename = path.basename(filename, extname)
  return `${basename}-${width}-${height}${extname}`;
};


const resizeThumb = async (name: string, width: number, height: number): Promise<Buffer> => {
  const pathname = path.resolve(__dirname, '../assets/full', name);
  return sharp(pathname).resize(width, height).toBuffer()
}


const getCachedThumb = async (filename: string): Promise<Buffer | null> => {
  const pathname = path.resolve(__dirname, '../assets/thumb', filename);
  return fs.access(pathname, fs.constants.F_OK)
    .then(() => fs.readFile(path.resolve(__dirname, '../assets/thumb', filename)))
    .catch(() => null);
}


export  {getThumbFilename, resizeThumb, getCachedThumb};
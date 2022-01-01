import { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from 'fs';
import path from 'path';

export default function PetList(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    const jsonPath = path.join(process.cwd(), 'public/1.json');
    const parseList = readFileSync(jsonPath, { encoding: 'utf8' })
    console.log(parseList)
    res.status(200).json({ list: parseList })
  }
}
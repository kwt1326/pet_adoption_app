import { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from 'fs';
import path from 'path';

export default function PetList(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const category = req.query.category as string;
    const page = Number(req.query.page || 1);

    const jsonPath = path.join(process.cwd(), 'public/1.json');
    const json = readFileSync(jsonPath, { encoding: 'utf8' });
    const parseList: { [x: string]: any[] } = JSON.parse(json);
    
    const categoryList = parseList[category || 'all'];
    const list = categoryList.filter((item) => item.id === page)[0]

    res.status(200).json({ list: list?.data || [] })
  }
}
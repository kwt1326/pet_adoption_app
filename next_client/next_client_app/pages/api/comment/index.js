import { writeFileSync, readFileSync } from "fs";
import path from "path";
export default function handler(req, res) {
  const jsonPath = path.join(process.cwd(), "public/2.json");
  if (req.method == "POST") {
    writeFileSync(jsonPath, JSON.stringify(req.body), (err) => {
      if (err) console.log("Error writing file:", err);
      res.status(405).send({ message: "FAIL" });
      return;
    });
    res.status(200).send({ message: "Success" });
  } else if (req.method == "GET") {
    const json = readFileSync(jsonPath, { encoding: "utf8" });
    res.status(200).json(JSON.parse(json));
  }
}

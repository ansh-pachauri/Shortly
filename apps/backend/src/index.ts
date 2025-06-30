import express, {Request, Response} from "express";
import crypto from "crypto";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

//short the url
//@ts-ignore
app.post("/", (req: Request, res: Response) => {
  const url = req.body.url || "";
  if (!req.body.url) {
    return res.status(400).json({error: "URL is required"});
  }

   const hash = crypto.createHash("sha256").update(url).digest("base64");
  const shortUrl = hash.slice(0, 8);

  return res.status(200).json({
    shortUrl: `http://localhost:3001/${shortUrl}`,
    originalUrl: url,
    createdAt: new Date().toLocaleString(),
  })
}); 

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
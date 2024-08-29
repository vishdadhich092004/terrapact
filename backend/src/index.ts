import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

router.get("/test", (req: Request, res: Response) => {
  res.send("Hiiiii");
});

app.listen(2000, () => {
  console.log("Port Activated");
});

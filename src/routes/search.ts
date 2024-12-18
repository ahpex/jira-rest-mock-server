import express from "express";
import fs from "fs";
import path from "path";
import { MyFaker } from "../faker/faker";

const router = express.Router();
const faker = new MyFaker();

router.get("/", (req: express.Request, res: express.Response) => {
    const delay = req.body.delay || 0;
    const total: number = req.body.total;

    setTimeout(() => {
        const filePath = path.join(__dirname, "../responses/search.json");
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Failed to read file" });
            }
            res.json(faker.jira.search({ total }));
        });
    }, delay);
});

export default router;

import express from "express";
import fs from "fs";
import path from "path";
import { MyFaker } from "../faker/faker";

const router = express.Router();
const faker = new MyFaker();

router.get("/issue", (req: express.Request, res: express.Response) => {
    const delay = req.body.delay || 0;

    setTimeout(() => {
        const filePath = path.join(__dirname, "../responses/issue.json");
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Failed to read file" });
            }
            res.json(JSON.parse(data));
        });
    }, delay);
});

router.get("/random", (req: express.Request, res: express.Response) => {
    res.json(faker.jira.issue());
});

// New route to return a fake issue for any issue number
router.get("/:key", (req: express.Request, res: express.Response) => {
    const key = req.params.key;
    const fakeIssue = faker.jira.issue({ key });
    res.json(fakeIssue);
});

export default router;

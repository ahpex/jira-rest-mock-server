import express from "express";
import { faker } from "../faker";

const router = express.Router();

router.get("/:key", (req: express.Request, res: express.Response) => {
    const key = req.params.key;
    const fakeIssue = faker.jira.issue({ key });
    res.json(fakeIssue);
});

export default router;

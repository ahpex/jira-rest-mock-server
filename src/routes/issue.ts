import express from "express";
import { MyFaker } from "../faker/faker";

const router = express.Router();
const faker = new MyFaker();

router.get("/:key", (req: express.Request, res: express.Response) => {
    const key = req.params.key;
    const fakeIssue = faker.jira.issue({ key });
    res.json(fakeIssue);
});

export default router;

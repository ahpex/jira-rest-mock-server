import express from "express";
import { faker } from "../../faker";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    res.json(faker.jira.search());
});

export default router;

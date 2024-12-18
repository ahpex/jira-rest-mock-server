import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    res.json({ message: "This is the info route", availableRoutes: ["/search"] });
});

export default router;

import express from "express";

const router = express.Router();

router.get("/:key", (req: express.Request, res: express.Response) => {
    const key = req.params.key;
    res.send(`<h1>${key}</h1>`);
});

export default router;

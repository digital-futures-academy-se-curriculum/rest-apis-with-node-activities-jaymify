import express from 'express';
export const router = express.Router();

router.route(`/`)
    .post((req, res) => {
        res.send(`Adding Todo`);
    });

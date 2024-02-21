import express from 'express';
export const router = express.Router();

router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        res.send(`Obtaining todo with id: ${id}`);
    })
    .post((req, res) => {
        const id = req.params.id;
        res.send(`Updating todo with id: ${id}`);
    });

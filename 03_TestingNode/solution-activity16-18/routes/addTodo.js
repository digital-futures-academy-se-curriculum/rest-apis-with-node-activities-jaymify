import express from 'express';
import Todo from '../todo.model.js';

export const router = express.Router();

router.route(`/`)
    .post((req, res) => {
        // res.send(`Adding Todo`);
        const todo = new Todo(req.body);
        todo.save()
            .then(todo => {
                res.status(200).json({ 'todo': `todo added successfully` });
            })
            .catch(err => res.status(400).send(`Adding new todo failed`));
    });

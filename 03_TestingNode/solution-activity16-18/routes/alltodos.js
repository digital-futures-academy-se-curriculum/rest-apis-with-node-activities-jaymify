import express from 'express';
import Todo from '../todo.model.js';

export const router = express.Router();

router.route(`/`)
    .get((req, res) => {
        // res.send(`Getting all todos`);
        Todo.find((error, todos) => {
            error ? res.status(404).send(`Not found`) : res.json(todos);
        });
    });

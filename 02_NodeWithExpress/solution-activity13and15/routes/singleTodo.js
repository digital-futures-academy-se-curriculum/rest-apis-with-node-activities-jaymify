import express from 'express';
export const router = express.Router();

import Todo from '../todo.model.js';

router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        // res.send(`Obtaining todo with id: ${id}`);
        Todo.findById(id, (error, todo) => {
            if (!todo) {
                res.status(404).send(`That todo cannot be found`);
            } else {
                res.json(todo);
            }
        });
    })
    .put((req, res) => {
        const id = req.params.id;
        // res.send(`Updating todo with id: ${id}`);
        Todo.findById(id, (error, todo) => {
            if (!todo) {
                res.status(404).send(`That todo cannot be found`);
            } else {
                todo.todoDescription = req.body.todoDescription;
                todo.todoDateCreated = req.body.todoDateCreated;
                todo.todoCompleted = req.body.todoCompleted;

                todo.save().then(todo => {
                    res.json(`Todo updated!`);
                })
                    .catch(err => res.status(400).send(`Update not possible.`));
            }
        });
    });
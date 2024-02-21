import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';

import './css/AddEditTodo.css';
// import generateTodoId from './utils/generateId';
import TodoForm from './TodoForm';
import TodoModel from './utils/Todo.model';
import Modal from './utils/Modal';


const AddEditTodo = ({ submitAction, data }) => {

    const [todo, setTodo] = useState({});
    const [submitted, setSubmitted] = useState(false)

    const { _id } = useParams();

    useEffect(() => {
        if (!_id) return setTodo({});
        const todoToEdit = data?.find(currentTodo => currentTodo._id === _id);
        if (todoToEdit) return setTodo(todoToEdit);
        setTodo({ error: `Todo could not be found` });
    }, [_id, data]);

    const submitTodo = (todoDescription, todoDateCreated, todoCompleted, todoId) => {
        // const _id = generateTodoId();
        const id = todoId // ?? generateTodoId();
        const todoToSubmit = new TodoModel(todoDescription, new Date(todoDateCreated).toISOString(), todoCompleted, id);
        // props.submitTodo(newTodo);
        submitAction(todoToSubmit);
        setSubmitted(true);
    }

    // const updateTodo = (todoDescription, todoDateCreated, todoCompleted) => {
    //     const updatedTodo = new TodoModel(todoDescription, todoDateCreated, todoCompleted, props.todo._id);
    //     props.updateTodo(updatedTodo);
    // }

    // const submitAction = (props.todo && Object.keys(props.todo).length === 0 && Object.getPrototypeOf(props.todo) === Object.prototype) ?
    //     submitTodo : updateTodo;

    return (
        <>
            {submitted && <Redirect to="/" />}
            {todo?.error && <Modal handleClose={() => setTodo(null)} message={todo.error} />}
            <div className="addEditTodo row">
                <h3>{_id ? `Edit` : `Add`}&nbsp;Todo</h3>
            </div>
            <TodoForm submitAction={submitTodo} todo={todo} />
        </>
    );
}

AddEditTodo.propTypes = {
    // submitTodo: PropTypes.func.isRequired,
    // updateTodo: PropTypes.func.isRequired,
    // todo: PropTypes.exact({
    //     _id: PropTypes.string,
    //     todoDescription: PropTypes.string,
    //     todoDateCreated: PropTypes.string,
    //     todoCompleted: PropTypes.bool
    // })
    submitAction: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(
        PropTypes.exact({
            _id: PropTypes.string,
            todoDescription: PropTypes.string,
            todoDateCreated: PropTypes.string,
            todoCompleted: PropTypes.bool
        })
    )
}

export default AddEditTodo;

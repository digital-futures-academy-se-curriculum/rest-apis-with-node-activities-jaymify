// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './css/AllTodos.css';

import Todo from './Todo';
import TodoModel from './utils/Todo.model';

const AllTodos = ({ data: { todos, error } }) => {

    const [dataStatus, setDataStatus] = useState({ name: `loading`, message: `Data is loading...` });

    useEffect(() => {
        // const { error } = data;
        if (error?.length) {
            return setDataStatus({ name: `error`, message: error });
        }

        setDataStatus({ name: `loading`, message: `Data is loading...` });

    }, [error]);


    const populateTable = () => {
        // console.log(`populating table`);
        // console.log(todos?.length);
        // const { todos } = data;
        if (todos?.length > 0) {
            const displayTodos = todos.map(currentTodo => {
                // console.log(`creating todo rows`);
                const todo = new TodoModel(currentTodo.todoDescription, currentTodo.todoDateCreated, currentTodo.todoCompleted, currentTodo._id);
                return <Todo todo={todo} key={todo._id} />
            });
            return displayTodos;
        }

        return (
            <tr><td id={dataStatus.name} colSpan="3">{dataStatus.message}</td></tr>
        );
    }

    return (
        <div className="row">
            <h3>Todos List</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Date Created</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{populateTable()}</tbody>
            </table>
        </div>
    );
};

// AllTodos.propTypes = {
//     data: PropTypes.exact({
//         todos: PropTypes.arrayOf(
//             PropTypes.shape({
//                 _id: PropTypes.string,
//                 todoDescription: PropTypes.string,
//                 todoDateCreated: PropTypes.string,
//                 todoCompleted: PropTypes.bool,
//             })
//         ),
//         error: PropTypes.string
//     })
// };

export default AllTodos;


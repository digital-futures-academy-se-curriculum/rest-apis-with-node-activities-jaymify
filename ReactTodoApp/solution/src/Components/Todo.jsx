import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TodoModel from './utils/Todo.model';

const Todo = ({ todo }) => {
    const { todoDescription, todoDateCreated, todoCompleted, _id } = todo;
    const dateCreated = new Date(todoDateCreated).toUTCString();
    const completedClassName = todoCompleted ? `completed` : ``;
    const completed = todoCompleted ? `N/A` : <Link className="link" to={`/edit/${_id}`}>Edit</Link>;

    return (
        <tr>
            <td className={completedClassName}>{todoDescription}</td>
            <td className={completedClassName}>{dateCreated}</td>
            <td>{completed}</td>
        </tr>
    );
};

Todo.propTypes = {
    todo: PropTypes.instanceOf(TodoModel),
    // selectTodo: PropTypes.func
}

export default Todo;


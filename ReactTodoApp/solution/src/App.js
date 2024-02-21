import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

// import sampleTodos from './sampleTodos.json';

import Header from './Components/Header';
import Footer from './Components/Footer';
import AllTodos from './Components/AllTodos';
import AddEditTodo from './Components/AddEditTodo';
import Modal from './Components/utils/Modal';
import NotFound from './Components/utils/NotFound';

function App() {

  const [todos, setTodos] = useState([]);
  // const [todoToEdit, setTodoToEdit] = useState({});
  const [getError, setGetError] = useState({ message: ``, count: 0 });
  const [postError, setPostError] = useState(``);
  const [putError, setPutError] = useState(``);

  const getTodos = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_TODOSURL);
      return res.data.length ? res.data : new Error(`There are no todos stored`);
    }
    catch (e) {
      setGetError({ message: `Data not available from the server: ${e.message}`, count: 0 });
      return [];
    }
  }

  useEffect(() => {
    const getData = async () => {
      setTodos(await getTodos());
    }
    setTimeout(() => getData(), 3000);
  }, []);

  const submitTodo = async todo => {
    try {
      await axios.post(`${process.env.REACT_APP_TODOSURL}/add`, todo);
      setPostError(`Todo added`);
    }
    catch (e) {
      setPostError(`There was a problem adding the todo: ${e.message}`);
    }
    finally {
      setTodos(await getTodos());
    }
  }

  const updateTodo = async todo => {
    try {
      await axios.put(`${process.env.REACT_APP_TODOSURL}/todo/${todo._id}`, todo);
      // setTodoToEdit({});
      setPutError(`Todo updated`);
    }
    catch (e) {
      setPutError(`There was a problem updating the todo: ${e.message}`);
    }
    finally {
      setTodos(await getTodos());
    }
  }

  // const selectTodo = todo => {
  //   setTodoToEdit(todo);
  // }

  return (
    <Router>
      {getError.count === 0 && <Modal handleClose={() => setGetError({ ...getError, count: getError.count + 1 })} message={getError.message} />}
      {postError && <Modal handleClose={() => setPostError(``)} message={postError} />}
      {putError && <Modal handleClose={() => setPutError(``)} message={putError} />}
      <div className="container">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              {/* <AllTodos data={{ todos, error: getError.message }} selectTodo={selectTodo} /> */}
              <AllTodos data={{ todos, error: getError.message }} />
            </Route>
            <Route path="/add">
              {/* <AddEditTodo submitTodo={submitTodo} todo={todoToEdit} updateTodo={updateTodo} /> */}
              <AddEditTodo submitAction={submitTodo} />
            </Route>
            <Route path="/edit/:_id">
              <AddEditTodo submitAction={updateTodo} data={todos} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

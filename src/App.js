import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Home/Header/Header';
import './App.css';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import TodolistFunction from './pages/Todolist/TodolistFunction';
import TodolistRCC from './pages/Todolist/TodolistRCC';
import ToDoListRedux from './pages/Todolist/ToDoListRedux';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>

        <Route exact path='/home' component={Home} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/detail/:id' component={Detail} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/todolistrfc' component={TodolistFunction} />
        <Route exact path='/todolistrcc' component={TodolistRCC} />
        <Route exact path='/todolistredux' component={ToDoListRedux} />

        <Route exact path='/' component={ToDoListRedux} />
        <Route path="*" component={PageNotFound} />

      </Switch>

    </BrowserRouter>
  );
}

export default App;

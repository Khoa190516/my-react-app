import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Error } from './pages/error';
import { PostDetail } from './pages/postDetail';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/login' Component={Login}/>
          <Route path='/pet/:id' Component={PostDetail}/>
          <Route path='*' Component={Error}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

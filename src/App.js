import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navibar } from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import { Error } from './pages/error';
import { PostDetail } from './pages/postDetail';
import { MyPost } from './pages/myPost';
import { Profile } from './pages/profile';
import 'bootstrap/dist/css/bootstrap.css';
import { ApiProvider } from './store/ApiContext';

function App() {

  return (
    <ApiProvider>
      <div className='App'>
        <Router>
          <Navibar />
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/login' Component={Login} />
            <Route path='/profile' Component={Profile} />
            <Route path='/pet/:id' Component={PostDetail} />
            <Route path='/my-post' Component={MyPost} />
            <Route path='*' Component={Error} />
          </Routes>
        </Router>
      </div>
    </ApiProvider>
  );
}

export default App;

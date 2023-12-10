import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Profile />}></Route>
          <Route path='/create' element={<CreateProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

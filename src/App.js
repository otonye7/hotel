import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './auth/login';
import Register from './auth/register';
import Home from './bookings/Home';
import TopNav from './component/TopNav';
import DashBoard from './user/Dashboard';
import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
    <div className="App">
      <TopNav />
      <Routes>
        <Route  path={'/'} exact={true}  element={<Home />} /> 
        <Route  path={'/register'} exact={true}  element={<Register />} /> 
        <Route  path={'/login'} exact={true}  element={<Login />} /> 
        <Route  path={'/dashboard'} exact={true}  element={<PrivateRoute><DashBoard /></PrivateRoute>} /> 
      </Routes>
    </div>
  );
}

export default App;

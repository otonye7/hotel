import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './auth/login';
import Register from './auth/register';
import Home from './bookings/Home';
import TopNav from './component/TopNav';
import DashBoard from './user/Dashboard';
import DashBoardSeller from './user/DashboardSeller';
import PrivateRoute from './component/PrivateRoute';
import NewHotels from "./hotels/New";
import StripeCallback from './stripe/StripeCallback';
import EditHotel from './hotels/EditHotel';
import ViewHotel from './hotels/ViewHotel';
import StripeSuccess from './stripe/StripeSucess';
import StripeCancel from './stripe/StripeCancel';
import SearchResult from './hotels/SearchResult';

function App() {

  return (
    <div className="App">
      <TopNav />
      <Routes>
        <Route  path={'/'} exact={true}  element={<Home />} /> 
        <Route  path={'/register'} exact={true}  element={<Register />} /> 
        <Route  path={'/login'} exact={true}  element={<Login />} /> 
        <Route  path={'/dashboard'} exact={true}  element={<PrivateRoute><DashBoard /></PrivateRoute>} /> 
        <Route  path={'/dashboard/seller'} exact={true}  element={<DashBoardSeller />} /> 
        <Route  path={'/hotels/new'} exact={true}  element={<NewHotels />} /> 
        <Route  path={'/hotel/edit/:hotelId'} exact={true}  element={<PrivateRoute><EditHotel /></PrivateRoute>} /> 
        <Route  path={'/hotel/:hotelId'} exact={true}  element={<ViewHotel />} />
        <Route  path={'/stripe/callback'} exact={true}  element={<StripeCallback />} /> 
        <Route  path={'/stripe/success/:hotelId'} exact={true}  element={<StripeSuccess />} /> 
        <Route  path={'/stripe/cancel'} exact={true}  element={<StripeCancel />} /> 
        <Route  path={'/search-result'} exact={true}  element={<SearchResult />} /> 
      </Routes>
    </div>
  );
}

export default App;

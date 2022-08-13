import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../redux/userSlice';
const TopNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logoutUser({
      data: null
    }))
    window.localStorage.removeItem("hotelUser");
    navigate("/login")
    window.location.reload()
  }
    return (
      <div className='nav bg-light d-flex justify-content-between'>
        <Link className='nav-link' to="/">Home</Link>
        {
          user !== null && (
          <>
             <Link className='nav-link' to="/dashboard">Dashboard</Link>
          </>
          )
        }
        {
          user !== null && (
            <a onClick={handleLogout} href="/login" className='nav-link'>Logout</a>
        )
        }
        {
          user === null && (
          <>
             <Link className='nav-link' to="/register">Register</Link>
             <Link className='nav-link' to="/login">Login</Link>
          </>
          )
        }
        
      </div>
    )
  }
export default TopNav
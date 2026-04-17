import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { ROUTE_PATH } from '../../utils/constants';
import './styles.css';

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // show unauthorized screen if no user is found in redux store
  if (!user) {
    return (
      <div className='unauthorized'>
        <h1>You are not authorized ☹️</h1>
        <span>
          Please <NavLink to={ROUTE_PATH.LOGIN}>Login</NavLink> to access this site.
        </span>
      </div>
    )
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from '../../utils/constants';
import { logoutUser } from '../../redux/actions/authAction';
import './styles.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const imageUrl = `https://dummyjson.com/icon/${user?._id}`;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(ROUTE_PATH.LOGIN);
  };

  return (
    <nav className='top-bar'>
      <div className='top-bar-text'>
        Dashboard
      </div>
      <div className='top-bar-profile-container'>
        {user && (
          <div className='top-bar-user-info'>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={user?.firstName}
                className='top-bar-avatar'
              />
            )}
            <span className='top-bar-user-name'>{user?.firstName || 'John'} {user?.lastName || 'Doe'}</span>
          </div>
        )}
        <button
          title='Logout'
          className='logout-btn'
          onClick={handleLogout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Header;

import { useAppDispatch } from '../../redux/hooks';
import { deleteUser } from '../../redux/actions/usersAction';
import './styles.css';

const UserRow = ({ user, onEdit }) => {
  const dispatch = useAppDispatch();

  const handleDelete = (_id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser({_id}));
    }
  };

  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button 
          onClick={() => onEdit(user)} 
          className="action-btn action-btn-edit"
        >
          Edit
        </button>
        <button 
          onClick={() => handleDelete(user._id)} 
          className="action-btn action-btn-delete"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
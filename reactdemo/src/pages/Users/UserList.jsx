/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUsers } from '../../redux/actions/usersAction';
import Card from '../../components/Card';
import UserRow from './UserRow';
import './styles.css';

const UserList = ({ onEdit }) => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Card>
      <table className='user-table'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users?.map((user) => (
              <UserRow key={user?._id} user={user} onEdit={onEdit} />
            ))
          ) : (
            <tr>
              {loading ?
                <td colSpan='5' className='user-list-empty'>
                  Loading users...
                </td>
                :
                <td colSpan='5' className='user-list-empty'>
                  No active users found. Click "Add User" to begin.
                </td>
              }
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default UserList;

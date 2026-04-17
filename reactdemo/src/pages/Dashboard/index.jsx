import { useState } from 'react';
import UserList from '../Users/UserList';
import AddEditUser from '../Users/AddEditUser';
import Button from '../../components/Button';
import './styles.css';

const Dashboard = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsAddModal(true);
  }

  const closeModals = () => {
    setIsAddModal(false);
    setSelectedUser(null);
  }

  return (
    <div className='app-container'>
      <div className='dashboard-header'>
        <h1 className="dashboard-title">
          Users
        </h1>
        <Button
          onClick={() => setIsAddModal(true)}
        >
          + Add New User
        </Button>
      </div>

      <UserList onEdit={handleEdit} />

      <AddEditUser
        isOpen={isAddModal}
        onClose={closeModals}
        title={selectedUser ? 'Edit User' : 'Add User'}
        user={selectedUser}
      />

    </div>
  );
};

export default Dashboard;
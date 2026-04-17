import Modal from '../../components/Modal';
import UserForm from './UserForm';

const AddEditUser = ({ isOpen, onClose, title, user = null }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <UserForm user={user} onSuccess={onClose} />
    </Modal>
  );
};

export default AddEditUser;
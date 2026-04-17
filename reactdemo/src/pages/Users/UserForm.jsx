import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from '../../redux/actions/usersAction';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import { USER_ROLES } from '../../utils/constants';
import { validateEmail, validateFirstName, validateLastName } from '../../utils/regex';
import './styles.css';

const UserForm = ({ user = null, onSuccess }) => {
    const [formData, setFormData] = useState({
        _id: user?._id || 1,
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        role: user?.role || USER_ROLES[2].value, // Default to 'Viewer'
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
    });
    const dispatch = useDispatch();

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        else if (!validateFirstName(formData.firstName)) newErrors.firstName = 'Please enter a valid first name';

        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        else if (!validateLastName(formData.lastName)) newErrors.lastName = 'Please enter a valid last name';

        if (!formData.email) newErrors.email = 'Email address is required';
        else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';

        if (!formData.role) newErrors.role = 'Role selection is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value?.trim() }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            if (user) {
                dispatch(updateUser(formData));
            } else {
                dispatch(createUser(formData));
            }
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className='user-form-container' noValidate>
            <Input
                title='First Name'
                name='firstName'
                placeholder='e.g. John'
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
            />
            <Input
                title='Last Name'
                name='lastName'
                placeholder='e.g. Doe'
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
            />
            <Input
                title='Email Address'
                type='email'
                name='email'
                placeholder='e.g. john@example.com'
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={user?.email}
            />
            <Dropdown
                title='Role'
                name='role'
                value={formData.role}
                onChange={handleChange}
                options={USER_ROLES}
                error={errors.role}
            />
            <div className='user-form-actions'>
                <Button
                    onClick={onSuccess}
                    className='btn-cancel'>
                    Cancel
                </Button>
                <Button
                    type="submit">
                    {user ? 'Update' : 'Save'}
                </Button>
            </div>
        </form>
    );
};

export default UserForm;

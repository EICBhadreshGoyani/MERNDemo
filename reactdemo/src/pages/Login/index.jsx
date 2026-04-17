import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { clearAuthError } from '../../redux/slices/authSlice';
import { loginUser } from '../../redux/actions/authAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ROUTE_PATH } from '../../utils/constants';
import { validateEmail, validatePassword } from '../../utils/regex';
import './styles.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error: apiError } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [screenErrors, setScreenErrors] = useState({ email: '', password: '' });

  const onChangeEmail = (event) => {
    const value = event?.target?.value;
    setEmail(value?.trim());
    if (screenErrors.email)
      setScreenErrors({ ...screenErrors, email: '' });
  }

  const onChangePassword = (event) => {
    const value = event?.target?.value;
    setPassword(value?.trim());
    if (screenErrors.password)
      setScreenErrors({ ...screenErrors, password: '' });
  }

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email';

    if (!password) newErrors.password = 'Password is required';
    else if (!validatePassword(password)) newErrors.password = 'Password must be at least 4 characters';

    setScreenErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());
    if (validate()) {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        navigate(ROUTE_PATH.DASHBOARD);
      }
    }
  };

  return (
    <div className='login-layout-container'>
      <div className='login-card-inner'>
        <div className='login-header'>
          <h2 className='login-title'>
            Sign in to Dashboard
          </h2>
          <p className='login-subtitle'>
            Welcome back! Please sign in to continue
          </p>
        </div>

        {apiError && (
          <div className='login-error-banner' role="alert">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Input
            name={'email'}
            type={'text'}
            title={'Email'}
            placeholder={'Email'}
            value={email}
            onChange={onChangeEmail}
            error={screenErrors.email}
          />
          <Input
            name={'password'}
            type={'password'}
            title={'Password'}
            placeholder={'••••••••'}
            value={password}
            onChange={onChangePassword}
            error={screenErrors.password}
          />
          <Button
            type='submit'
            className='login-btn-submit'
            disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* <div className='login-footer'>
          <p className='login-hint-text'>
            <strong>Test credentials:</strong> emilys / emilyspass
          </p>
        </div> */}

      </div>
    </div>
  )
}

export default Login;
import { useState } from 'react';
import './styles.css';

const Input = ({ 
  title, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  disabled = false,
  onChange, 
  error = '',
  classDiv = '',
  classLabel = '',
  classInput = '',
}) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`input-group ${classDiv}`}>
      {title && (
        <label className={classLabel}>
          {title}
        </label>
      )}
      <div className='input-relative'>
        <input
          name={name}
          type={inputType} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={'off'}
          className={`${error ? 'form-input-error' : 'form-input-normal'} ${isPassword && 'form-input-password'} ${classInput}`}
          disabled={disabled}
        />
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='password-toggle-btn'
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <span className='form-error-msg'>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;

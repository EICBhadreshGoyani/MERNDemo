import './styles.css';

const Dropdown = ({ 
  title, 
  value, 
  onChange, 
  name, 
  options = [],
  error = '',
  classSelect = '',
  classDiv = ''
}) => {
  return (
    <div className={classDiv}>
      {title && (
        <label className='dropdown-label'>
          {title}
        </label>
      )}
      <div className='dropdown-wrapper'>
        <select 
          name={name} 
          value={value} 
          onChange={onChange}
          className={`form-dropdown-control ${error ? 'form-dropdown-error' : 'form-dropdown-normal'} ${classSelect}`}
        >
          {options?.map((item) => (
            <option key={item?.value} value={item?.value}>
              {item?.label}
            </option>
          ))}
        </select>
        <span className='dropdown-chevron' aria-hidden='true'>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {error && (
        <span className='form-error-msg'>
          {error}
        </span>
      )}
    </div>
  );
};

export default Dropdown;

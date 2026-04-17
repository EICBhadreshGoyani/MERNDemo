import './styles.css';

const Card = ({
  classDiv = '',
  onClick,
  children,
}) => {
  return (
    <div
      className={`card ${classDiv}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

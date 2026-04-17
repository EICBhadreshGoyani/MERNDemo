import Header from '../Header';

const BaseLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;

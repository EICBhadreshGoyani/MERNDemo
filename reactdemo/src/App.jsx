import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE_PATH } from './utils/constants';
import ProtectedRoute from './components/ProtectedRoute';
import BaseLayout from './components/BaseLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTE_PATH.DASHBOARD} element={<BaseLayout><Dashboard /></BaseLayout>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;

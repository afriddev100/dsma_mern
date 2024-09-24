import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';


const AdminRoute = () => {
 // const { userInfo } = useSelector((state) => state.auth);

 const { isAuthenticated,isAdmin} = useAuthStore();
  
  return  isAuthenticated && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};
export default AdminRoute;

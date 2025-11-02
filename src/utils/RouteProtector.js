import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Protected = () => {
  let { isLoggedin} = useSelector((state) => state.user);
  let user = JSON.parse(localStorage.getItem('user'));

  if(user?.isLoggedin){
    isLoggedin = true
  }
  
  return isLoggedin ? <Outlet/>:<Navigate to={"/login"}/>
}

export default Protected
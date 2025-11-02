import { axiosAuthenticated } from "../utils/axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from '../slices/userSlice';
import { errorAlert } from "../utils/alerts";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = (defaultContent = 'application/json') => {

    const dispatch = useDispatch();
    let { accessToken } = useSelector(state => state.user);

    if(!accessToken){
        let user = JSON.parse(localStorage.getItem('user'));
        accessToken = user.jwt;
        dispatch(login(user));
    }
    const navigate = useNavigate();

    useEffect(() => {

        const requestIntercept = axiosAuthenticated.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }

                if(!config.headers['Content-Type']){
                    config.headers['Content-Type'] = defaultContent;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosAuthenticated.interceptors.response.use(
            response => response,
            async (error) => {
                if (error?.response?.status === 401 && error?.response?.data?.error === "jwt expired") {
                    errorAlert("Session expired, please login again");
                    localStorage.removeItem("user");
                    navigate("/login");
                    dispatch(logout)
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosAuthenticated.interceptors.request.eject(requestIntercept);
            axiosAuthenticated.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken])

    return axiosAuthenticated;
}

export default useAxiosPrivate;
import axios from "../utils/axios";
import { axiosAuthenticated } from "../utils/axios";


export const loginWithEmail = async (email, password) => {

    try
    {
        let response = await axios.post("/login", {
            email: email,
            password: password,
        });
        return response.data;
    }
    catch(e)
    {
        return e.response.data;
    }

};

export const signupWithEmail = async (email, password, firstName, lastName, phone) => {
    try
    {
        let response = await axios.post("/signup", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
        });
        return response.data;
    }
    catch(e)
    {
        return e.response.data;
    }
};

export const getUsers = async (axiosAuthenticated, myProfile=true, searchText="") => {
    try
    {
        let response = await axiosAuthenticated.get("/users/get-users", { 
            params:{
                myProfile,
                searchText
            }
        });
        return response.data;
    }
    catch(e)
    {
        console.log("error ", e)
        return e.response.data;
    }
}

export const changePassword = async (axiosAuthenticated, body) => {
    try
    {
        let response = await axiosAuthenticated.post("/users/change-password", 
            body, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    }
    catch(e)
    {
        console.log("error ", e)
        return e.response.data;
    }
}

export const getPrervilagedUser = async (axiosInstance) => {
    try{
        let response = await axiosInstance.get("/previlaged/listUsers", {}, {withCredentials: true});
        return response.data;
    }
    catch(e){
        return e.response.data;
    }
}

export const createPrervilagedUser = async (axiosInstance, data) => {
    try{
        let response = await axiosInstance.post("/previlaged/createUser", data, {withCredentials: true});
        return response.data;
    }
    catch(e){
        return e.response.data;
    }
}

export const editPrervilagedUser = async (axiosInstance, data) => {
    try{
        let response = await axiosInstance.post("/previlaged/editUser", data, {withCredentials: true});
        return response.data;
    }
    catch(e){
        return e.response.data;
    }
}
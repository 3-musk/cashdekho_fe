import {useEffect, useState} from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from "primereact/password";
import { Fieldset } from 'primereact/fieldset';
import { logout } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import useAxiosPrivate from "../hooks/usePrevilagedAxiosPrivate";
import { errorAlert, successAlert } from "../utils/alerts";
import { getUsers, changePassword } from "../services/user";

const MyProfile = () => {

    const dispatch = useDispatch();
    
    const [profile, setProfile] = useState({});
    const [passwordData, setPasswordData] = useState({});

    const axiosPrivate = useAxiosPrivate();

    const getMyProfile = async () => {
        const response = await getUsers(axiosPrivate);
        if(response.status) {
            setProfile(response.data);
        }
        console.log(response);
    }

    const signOut = () => {
        localStorage.removeItem('user');
        successAlert("Login again.")
        dispatch(logout());
    }


    const handlePasswordChange = async () => {
        if(!(passwordData.oldPassword && passwordData.newPassword)) {
            errorAlert("Fill old and new password!")
        }
        console.log(passwordData);
        const response = await changePassword(axiosPrivate, passwordData);

        if(response.status)
        {
            successAlert(response.message);
            signOut();
        }
        else
        {
            errorAlert(response.error)
        }
    };

    useEffect(() => {
        getMyProfile()
    }, [])

    return(
        <div className="p-4">
            <Fieldset legend="Profile Information" className="mb-4">
                <div className="flex flex-col gap-2">
                    <div>
                        <label className="font-bold">First Name : </label>
                        <span>{profile.firstName}</span>
                    </div>
                    <div>
                        <label className="font-bold">Last Name : </label>
                        <span>{profile.lastName}</span>
                    </div>
                    <div>
                        <label className="font-bold">Email : </label>
                        <span>{profile.email}</span>
                    </div>
                </div>
            </Fieldset>

            <Fieldset legend="Change Password">
                <div className="flex flex-col gap-2">
                    <div>
                        <label className="font-bold">Old Password : </label>
                        <Password 
                            value={passwordData.oldPassword}
                            className="password"
                            feedback={false}
                            onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                            toggleMask
                        />
                    </div>
                    <div>
                        <label className="font-bold">New Password : </label>
                        <Password 
                            value={passwordData.newPassword}
                            className="password"
                            feedback={false}
                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                            toggleMask
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button 
                            label="Change Password" 
                            onClick={handlePasswordChange}
                            className="border rounded-lg px-2 py-1"
                        />
                    </div>
                </div>
            </Fieldset>
        </div>
    )
}

export default MyProfile;

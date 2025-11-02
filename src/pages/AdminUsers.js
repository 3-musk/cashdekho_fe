import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Messages } from 'primereact/messages';
import { createPrervilagedUser, editPrervilagedUser, getPrervilagedUser } from '../services/user';
import usePrevilagedAxiosPrivate from "../hooks/usePrevilagedAxiosPrivate";
import { errorAlert, successAlert } from "../utils/alerts";

const AdminUsers = () => {

    const privateAxios = usePrevilagedAxiosPrivate();

    const [users, setUsers] = useState([]);

    const [createUser, setCreateUser] = useState(false);
    const [viewUser, setViewUser] = useState(false);
    const [editUser, setEditUser] = useState(false);

    const [user, setUser] = useState({})

    const actions = (user) => {
        return(
            <div className='text-white flex items-center'>
                <button 
                    onClick={()=>{
                        setViewUser(true);
                        setUser(user)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>

                <button
                    onClick={()=>{
                        setEditUser(true);
                        setUser(user)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </button>
            </div>
        )
    }
    
    const handleGetUsers = async () => {
        let response = await getPrervilagedUser(privateAxios);
        setUsers(response.data);
        // console.log(response);
    }

    const handleCreateuser = async () => {
        const response = await createPrervilagedUser(privateAxios, user);
        if(response && response.status === false)
        {
            errorAlert(response.error)
        }
        else if(response && response.status === true)
        {
            successAlert("User Created Successfully.")
            setUser({})
            setCreateUser(false);
            setViewUser(false);
            setEditUser(false);
            handleGetUsers();
        }
    }

    const handleEdituser = async () => {
        const response = await editPrervilagedUser(privateAxios, user);
        if(response && response.status === false)
        {
            errorAlert(response.error)
        }
        else if(response && response.status === true)
        {
            successAlert("User Updated Successfully.")
            setUser({})
            setCreateUser(false);
            setViewUser(false);
            setEditUser(false);
            handleGetUsers();
        }
    }

    useEffect(()=>{
        handleGetUsers();
    }, [])

    return(
        <div className="w-full h-full flex justify-center items-center text-white">

            {
                createUser
                &&
                <div className='mt-4 mb-8 text-white'>
                    <div className="text-4xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" className="h-8 pr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        Add User Details
                    </div>
                    <div className="mt-4 flex flex-col gap-2 text-xl border p-4 rounded-xl">
                        <div className="flex items-center">
                            <div className='font-bold w-[110px]'>First Name</div>
                            <span className='font-bold mr-2'>:</span>
                            <input 
                                value={user.firstname} 
                                className='p-2 rounded-lg text-black w-[250px]'
                                onChange={(e)=>setUser({...user,"firstname":e.target.value})}
                            />
                        </div>
                        <div className="flex items-center">
                            <div className='font-bold w-[110px]'>Last Name</div> 
                            <span className='font-bold mr-2'>:</span>
                            <input 
                                value={user.lastname} 
                                className='p-2 rounded-lg text-black w-[250px]'
                                onChange={(e)=>setUser({...user,"lastname":e.target.value})}
                            />
                        </div>
                        <div className="flex items-center">
                            <span className='font-bold w-[110px]'>Email</span>
                            <span className='font-bold mr-2'>:</span>
                            <input 
                                value={user.email} 
                                className='p-2 rounded-lg text-black w-[250px]'
                                onChange={(e)=>setUser({...user,"email":e.target.value})}
                            />
                        </div>
                        <div className="flex items-center">
                            <span className='font-bold w-[110px]'>Password</span>
                            <span className='font-bold mr-2'>:</span>
                            <input 
                                value={user.password} 
                                className='p-2 rounded-lg text-black w-[250px]'
                                onChange={(e)=>setUser({...user,"password":e.target.value})}
                            />
                        </div>
                        <div className="flex items-center">
                            <span className='font-bold w-[110px]'>Role</span>
                            <span className='font-bold mr-2'>:</span>
                            <select 
                                value={user.role} 
                                onChange={(e)=>setUser({...user,"role":e.target.value})}
                                className='p-2 rounded-lg text-black w-[250px]'
                            >
                                <option value="">Select a Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Chef">Chef</option>
                                <option value="DeliveryPartner">Delivery Partner</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <span className='font-bold w-[110px]'>Active</span>
                            <span className='font-bold mr-2'>:</span> 
                            <input
                                checked={user.isactive}
                                type="checkbox"
                                className='p-4 rounded-lg text-black text-white w-[30px] h-[30px]'
                                onChange={(e)=>setUser({...user,"isactive":e.target.checked})}
                            >
                            </input>
                        </div>
                        <div className='flex justify-center mt-4 mb-2 gap-4'>
                            <button 
                                className='font-bold text-xl border p-2 rounded-lg'
                                onClick={()=>{
                                    handleCreateuser();
                                }}
                            >
                                Create
                            </button>
                            <button 
                                className='font-bold text-xl border p-2 rounded-lg'
                                onClick={()=>{
                                    setCreateUser(false);
                                    setUser({});
                                }}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            }

            {
                viewUser
                &&
                <div className='mt-4 mb-8 text-white'>
                    <div className="text-4xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" className="h-8 pr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        User Details
                    </div>
                    <div className="mt-4 flex flex-col text-xl border p-4 rounded-xl">
                        <div className="flex ">
                            <div className='font-bold w-[110px]'>First Name</div>
                            <span className='font-bold mr-2'>:</span>
                            <span>{user.firstname}</span>
                        </div>
                        <div className="flex">
                            <div className='font-bold w-[110px]'>Last Name</div> 
                            <span className='font-bold mr-2'>:</span>
                            <span>{user.lastname}</span>
                        </div>
                        <div className="flex">
                            <span className='font-bold w-[110px]'>Email</span>
                            <span className='font-bold mr-2'>:</span>
                            <span>{user.email}</span>
                        </div>
                        <div className="flex">
                            <span className='font-bold w-[110px]'>Role</span>
                            <span className='font-bold mr-2'>:</span>
                            <span>{user.role}</span>
                        </div>
                        <div className="flex">
                            <span className='font-bold w-[110px]'>Active</span>
                            <span className='font-bold mr-2'>:</span> 
                            <span>{user.isactive ? "Yes" : "No"}</span>
                        </div>
                        <div className='flex justify-center mt-4 mb-2 gap-4'>
                            <button 
                                className='font-bold text-xl border p-2 rounded-lg'
                                onClick={()=>{
                                    setViewUser(false);
                                    setEditUser(true);
                                }}
                            >
                                Edit
                            </button>
                            <button 
                                className='font-bold text-xl border p-2 rounded-lg'
                                onClick={()=>{
                                    setViewUser(false);
                                    setUser({});
                                }}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            }

            {
                editUser
                &&
                <div className='mt-4 mb-8 text-white'>
                    <div className="text-4xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" className="h-8 pr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        Edit User Details
                    </div>
                    <div className="mt-4 flex flex-col gap-2 text-xl border p-4 rounded-xl">
                        <div className="flex items-center">
                            <span className='font-bold w-[110px]'>Email</span>
                            <span className='font-bold mr-2'>:</span>
                            <label>{user.email}</label>
                        </div>
                        <div className="flex items-center">
                            <div className='font-bold w-[110px]'>First Name</div>
                            <span className='font-bold mr-2'>:</span>
                            <input 
                                value={user.firstname} 
                                className='p-2 rounded-lg text-black w-[250px] text-white'
                                onChange={(e)=>setUser({...user,"firstname":e.target.value})}
                            />
                        </div>
                        <div className="flex items-center">
                            <div className='font-bold w-[110px]'>Last Name</div> 
                            <span className='font-bold mr-2'>:</span>
                            <input 
                                value={user.lastname} 
                                className='p-2 rounded-lg text-black w-[250px] text-white'
                                onChange={(e)=>setUser({...user,"lastname":e.target.value})}
                            />
                        </div>
                        <div className="flex items-center">
                            <span className='font-bold w-[110px]'>Role</span>
                            <span className='font-bold mr-2'>:</span>
                            <select 
                                value={user.role} 
                                onChange={(e)=>setUser({...user,"role":e.target.value})}
                                className='p-2 rounded-lg text-black w-[250px] text-white'
                            >
                                <option value="Admin">Admin</option>
                                <option value="Chef">Chef</option>
                                <option value="DeliveryPartner">Delivery Partner</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <span className='font-bold w-[110px]'>Active</span>
                            <span className='font-bold mr-2'>:</span> 
                            <input
                                checked={user.isactive}
                                type="checkbox"
                                className='p-4 rounded-lg text-black text-white w-[30px] h-[30px]'
                                onChange={(e)=>setUser({...user,"isactive":e.target.checked})}
                            >
                            </input>
                        </div>
                        <div className='flex justify-center mt-4 mb-2 gap-4'>
                            <button 
                                className='font-bold text-xl border p-2 rounded-lg'
                                onClick={()=>{
                                    handleEdituser()
                                }}
                            >
                                Save
                            </button>
                            <button 
                                className='font-bold text-xl border p-2 rounded-lg'
                                onClick={()=>{
                                    setEditUser(false);
                                    setUser({});
                                }}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            }

            {
                !createUser
                &&
                !viewUser 
                &&
                !editUser
                &&
                <div className="mt-4 mb-8">
                    <div className="text-4xl">
                        Admin User Management
                    </div>
                    <div className="flex justify-end">
                        <button
                            className='border px-2 py-1 rounded-lg'
                            onClick={()=>{
                                setCreateUser(true);
                            }}
                        >
                            Create
                        </button>
                    </div>

                    <div className="mt-4">
                        <DataTable value={users} showGridlines stripedRows tableStyle={{ minWidth: '60rem', minHeight: '' }}>
                            <Column field="firstname" sortable header="First Name"></Column>
                            <Column field="lastname" header="Last Name" ></Column>
                            <Column field="email" header="Email"></Column>
                            <Column field="role" sortable header="Role"></Column>
                            <Column header="Actions" body={actions}></Column>
                        </DataTable>
                    </div>
                </div>
            }


        </div>
    )
}


export default AdminUsers;
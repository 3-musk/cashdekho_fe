import { ToastContainer, toast } from "react-toastify";

export const AlertContainer = () => {
    return (<ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
    />)
    
}

export const errorAlert = (msg) => {
    toast.error(msg);
}

export const successAlert = (msg) => {
    toast.success(msg);
}
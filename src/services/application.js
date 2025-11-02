import { errorAlert } from "../utils/alerts";


export const getApplications = async (axiosAuthenticated, page, limit) => {
    try
    {
        let response = await axiosAuthenticated.get("/application/view", { params:{page:page, limit:limit}});
        return response.data;
    }
    catch(e)
    {
        console.log("error ", e)
        return e.response.data;
    }
}

export const getApplication = async (axiosAuthenticated, applicationId) => {
    try
    {
        let response = await axiosAuthenticated.get("/application/view", { params:{applicationId:applicationId}});
        return response.data;
    }
    catch(e)
    {
        console.log("error ", e)
        return e.response.data;
    }
}

export const processApplication = async (axiosAuthenticated, applicationId, processResult) => {
    try
    {
        let response = await axiosAuthenticated.post("/application/process", 
            {"result":processResult}, 
            {
                params:{applicationId:applicationId},
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

export const submitApplications = async (axiosAuthenticated, formData) => {
    try
    {
        let response = await axiosAuthenticated.post("/application/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);
        return response.data;
    }
    catch(e)
    {
        console.log("error ", e)
        return e.response.data;
    }
}

export const getPayment = async (axiosAuthenticated, applicationId) => {
    try
    {
        let response = await axiosAuthenticated.get("/application/get-payment",{ params:{applicationId:applicationId}});
        return response.data;
    }
    catch(e)
    {
        console.log("error ", e)
        return e.response.data;
    }
}


export const viewImage = async (axiosAuthenticated, imageType, applicationId) => {

    const newWindow = window.open('', '_blank');
    
    // Fetch the image with authorization header
    try {
        let response = await axiosAuthenticated.get("/application/image/view", { 
            params:{
            applicationId: applicationId,
            imageType: imageType
            },
            responseType: "blob"
        });

        if (response.status === 200) 
        {
            const imageUrl = URL.createObjectURL(response.data);
            newWindow.location.href = imageUrl;
        } 
        else 
        {
            newWindow.close();
            errorAlert('Failed to load image');
        }
    } 
    catch (error) 
    {
        console.log(error)
        newWindow.close();
        errorAlert('Error loading image');
    }
};
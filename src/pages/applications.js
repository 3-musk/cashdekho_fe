import {useEffect, useState} from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Fieldset } from 'primereact/fieldset';
import { FileUpload } from 'primereact/fileupload';
import useAxiosPrivate from "../hooks/usePrevilagedAxiosPrivate";
import ApplicationTable from "../components/ApplicationTable";
import { errorAlert, successAlert } from "../utils/alerts";
import { getApplication, submitApplications, viewImage, getPayment, processApplication } from "../services/application";
import { useSearchParams } from 'react-router-dom';
import { useSelector } from "react-redux";

const Applications = () => {

    const [createApplication, setCreateApplication] = useState(false);
    const [creationStage, setCreationStage] = useState("stage-1");

    const [viewApplication, setViewApplication] = useState(false);
    
    const [formData, setFormData] = useState({})
    const [paymentFormData, setPaymentFormData] = useState("")
    
    const axiosPrivate = useAxiosPrivate();

    const [searchParams, setSearchParams] = useSearchParams();

    const { userRole } = useSelector((state) => state.user);

    const [processText, setprocessText] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            const paymentForm = document.getElementById("payment_post");
            if (paymentForm) {
                paymentForm.submit();
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [paymentFormData]);

    useEffect(() => {
        const setApplicationData = async () => {
            const applicationId = searchParams.get('applicationId');
            if(applicationId){
                const response = await getApplication(axiosPrivate, applicationId);
                if(response?.data?.length > 0){
                    setFormData(response.data[0]);
                    setViewApplication(true);
                }
            }
        };

        setApplicationData();
    }, [])

    const formBuilder = (dataFields) => {
        return dataFields.map((field) => 
            {
                if (field.type === 'text') {
                    return (
                        <div className="w-full flex flex-column gap-2 max-w-[400px] py-2" key={field.name}>
                            <label htmlFor={field.name} className="font-bold">{field.displayText}</label>
                            <InputText
                                id={field.name}
                                className="bg-white border-1 rounded px-2 py-1"
                                aria-describedby={`${field.name}-help`}
                                onChange={(e) =>
                                    setFormData({
                                    ...formData,
                                    [field.name]: e.target.value,
                                    })
                                }
                                required={field.required}
                                value={formData[field.name]}
                            />
                            {field.helpText && (
                            <small id={`${field.name}-help`}>{field.helpText}</small>
                            )}
                        </div>
                    );
                }

                if (field.type === 'date') {
                    return (
                        <div className="w-full flex flex-column gap-2 max-w-[400px] py-2" key={field.name}>
                            <label htmlFor={field.name} className="font-bold">{field.displayText}</label>
                            <Calendar
                                id={field.name}
                                aria-describedby={`${field.name}-help`}
                                className="bg-white border-1 rounded px-2 py-1"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [field.name]: e.target.value,
                                    })
                                }
                                value={formData[field.name]}
                                showIcon
                            />
                            {field.helpText && (
                                <small id={`${field.name}-help`}>{field.helpText}</small>
                            )}
                        </div>
                    );
                }

                if (field.type === 'file') {
                    return (
                        <div className="flex flex-column gap-2 py-2" key={field.name}>
                            <label htmlFor={field.name} className="font-bold">{field.displayText}</label>
                            <FileUpload 
                                name={field.name}
                                accept="image/*" 
                                maxFileSize={1000000} 
                                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                                uploadOptions={{className:'none'}}
                                onSelect={(event)=>{
                                    if (event.files && event.files.length > 0) {
                                        const file = event.files[0];
                                        if (file.size > 1000000) 
                                        {
                                            errorAlert("File size must be less than 1MB.");
                                            setFormData({
                                                ...formData,
                                                [field.name]: null
                                            });
                                        }
                                        else
                                        {
                                            setFormData({
                                                ...formData,
                                                [field.name]: file
                                            });
                                        }
                                    }
                                }} 
                                auto={false}
                            />
                            {field.helpText && (
                                <small id={`${field.name}-help`}>{field.helpText}</small>
                            )}
                        </div>
                    );
                }
            })
    }

    const personalInfoFields = [
        {
            name: 'firstName',
            type: 'text',
            displayText: 'Firstname',
            required: true
        },
        {
            name: 'middleName',
            type: 'text',
            displayText: 'Middlename',
        },
        {
            name: 'lastName',
            type: 'text',
            displayText: 'Lastname',
            required: true
        },
        {
            name: 'email',
            type: 'text',
            displayText: 'Email',
            required: true
        },
        {
            name: 'phone',
            type: 'text',
            displayText: 'Phone',
            required: true
        },
        {
            name: 'dob',
            type: 'date',
            displayText: 'Date of Birth',
            required: false
        }
    ];

    const bankFields = [
        {
            name: 'bankAccountNumber',
            type: 'text',
            displayText: 'Bank Account Number',
            required: true
        },
        {
            name: 'bankIfsc',
            type: 'text',
            displayText: 'Bank IFSC',
            required: true
        },
        {
            name: 'bankName',
            type: 'text',
            displayText: 'Bank Name',
            required: true
        },
        {
            name: 'bankBranch',
            type: 'text',
            displayText: 'Bank Branch',
            required: true
        }
    ];

    const employmentFields = [
        {
            name: 'companyName',
            type: 'text',
            displayText: 'Company Name',
            required: true
        },
        {
            name: 'companyAddress',
            type: 'text',
            displayText: 'Company Address',
            required: true
        },
        {
            name: 'designation',
            type: 'text',
            displayText: 'Designation',
            required: true
        },
        {
            name: 'monthlySalary',
            type: 'text',
            displayText: 'Monthly Salary',
            required: true
        },
        {
            name: 'dateOfJoining',
            type: 'date',
            displayText: 'Date Of Joining',
            required: true
        }
    ];

    const documentFields = [
        {
            name: 'aadharFrontImage',
            type: 'file',
            displayText: 'Aadhaar Front Image',
            required: true
        },
        {
            name: 'aadharBackImage',
            type: 'file',
            displayText: 'Aadhaar Back Image',
            required: true
        },
        {
            name: 'panImage',
            type: 'file',
            displayText: 'Pan Image',
            required: true
        },
        {
            name: 'companyIdFrontImage',
            type: 'file',
            displayText: 'Company ID Front Image',
            required: true
        },
        {
            name: 'companyIdBackImage',
            type: 'file',
            displayText: 'Company ID Back Image',
            required: true
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] instanceof File) 
            {
                formDataToSend.append(key, formData[key]);
            } 
            else if (formData[key] instanceof Date) 
            {
                const year = formData[key].getFullYear();
                const month = String(formData[key].getMonth() + 1).padStart(2, '0');
                const day = String(formData[key].getDate()).padStart(2, '0');
                formDataToSend.append(key, `${year}-${month}-${day}`);
            } 
            else 
            {
                formDataToSend.append(key, formData[key]);
            }
        });

        const response = await submitApplications(axiosPrivate, formDataToSend);
        setFormData({
            "applicationId":response.data.applicationId, 
            "applicationStatus":response.data.applicationStatus,
            "paymentStatus": response.data.paymentStatus,
            ...formData
        })
        if(response.status === true)
        {
            successAlert("Application Created Successfully.")
            // setCreateApplication(false);
            // setFormData({});
            setCreationStage("stage-2");
        }
    }

    const getApplicationPayment = async (applicationId) => {
        console.log("clicked", applicationId)
        const response = await getPayment(axiosPrivate, applicationId);
        if(response.status === true)
        {
            console.log(response.data)
            setPaymentFormData(response.data);
        }
    }

    const handleProcessApplication = async (applicationId, processResult) => {
        if(!processResult){
            errorAlert("ApplicationResult cannont be empty");
            return 
        }
        const result = await processApplication(axiosPrivate, applicationId, processResult);

        if(result?.status){
            successAlert("Application Processed successfully.");
            setViewApplication(false);
        }
        else{
            errorAlert("Error processing application");
        }
    }

    if(createApplication && creationStage === "stage-1") 
    {
        return (
            <form 
                className="flex flex-col justify-start items-center pt-4 gap-4 px-6" 
                onSubmit={handleSubmit}
            >
                <div>
                    <span className="text-xl font-bold">New Application</span>
                </div>
                <div className="w-full flex justify-end max-w-[600px]">
                    <button 
                        onClick={()=>{setCreateApplication(false); setSearchParams({});}}
                        className="border px-2 py-1"
                    >
                        Back
                    </button>
                </div>
                <Fieldset legend="Personal Information" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                    {
                        formBuilder(personalInfoFields)
                    }
                </Fieldset>

                <Fieldset legend="Bank Details" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                    {
                        formBuilder(bankFields)
                    }
                </Fieldset>

                <Fieldset legend="Employment Details" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                    {
                        formBuilder(employmentFields)
                    }
                </Fieldset>

                <Fieldset legend="Required Documents" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                    {
                        formBuilder(documentFields)
                    }
                </Fieldset>

                {/* <Fieldset legend="Application Fee" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                    <Image src="/media/qr_code.svg" alt="Image" width="250" />
                    <span className="max-w-[250px] pt-4 font-bold">
                        Submit after paying the application through above QR code or to below UPI number
                    </span>
                    <span className="text-xl font-bold pt-2">9483404366</span>
                </Fieldset> */}

                <div className="w-full flex justify-center items-center gap-4">
                    <button 
                        type="submit"
                        className="border rounded-lg px-2 py-1"
                    >
                        Submit
                    </button>

                    <button
                        className="border rounded-lg px-2 py-1"
                    >
                        Clear
                    </button>
                </div>
            </form>
        )
    }
    else if(createApplication && creationStage === "stage-2")
    {
        return(
            <div className="flex flex-col justify-start items-center pt-4 gap-4 px-6">
                <div className="w-full flex justify-between items-center max-w-[600px]">
                    <span className="text-xl font-bold">Application Payment</span>
                    <button 
                        onClick={() => setCreateApplication(false)}
                        className="border px-2 py-1"
                    >
                        Back
                    </button>
                </div>

                <Fieldset legend="Application Status" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                    <div className="w-full flex flex-column gap-2 max-w-[400px] py-2">
                        <p><span className="font-bold">Application ID:</span> {formData.applicationId}</p>
                        <p><span className="font-bold">Payment Status:</span> {formData.paymentStatus}</p>
                    </div>
                </Fieldset>

                <div
                    dangerouslySetInnerHTML={{ __html: paymentFormData }}
                />
                {console.log(paymentFormData)}
                <div className="w-full flex justify-center items-center gap-4">
                    <button 
                        type="button"
                        onClick={()=>{
                            getApplicationPayment(formData.applicationId)
                        }}
                        className="border rounded-lg px-2 py-1"
                    >
                        Pay
                    </button>
                </div>
            </div>
        )
    } 
    else if(viewApplication) 
    {
        const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        };

        const newLinkSvg = () => {
            return(
                <svg width="50px" height="50px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none">
                    <path d="M55.4,32V53.58a1.81,1.81,0,0,1-1.82,1.82H10.42A1.81,1.81,0,0,1,8.6,53.58V10.42A1.81,1.81,0,0,1,10.42,8.6H32"/>
                    <polyline points="40.32 8.6 55.4 8.6 55.4 24.18"/>
                    <line x1="19.32" y1="45.72" x2="54.61" y2="8.91"/>
                </svg>
            )
        }

        return (
            <div className="flex flex-col justify-start items-center pt-4 gap-4 px-6">
                <div className="w-full flex justify-between items-center max-w-[600px]">
                    <span className="text-xl font-bold">Application Details</span>
                    <button 
                        onClick={() => {setViewApplication(false); setSearchParams({});}}
                        className="border px-2 py-1"
                    >
                        Back
                    </button>
                </div>

                <Fieldset legend="Application Status" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                    <div className="w-full flex flex-column gap-2 max-w-[400px] py-2">
                        <p><span className="font-bold">Application ID:</span> {formData.applicationId}</p>
                        <p><span className="font-bold">Application Status:</span> {formData.applicationStatus}</p>
                        {
                            (formData.applicationStatus === "pending" || formData.applicationStatus === "withdrawn")
                            &&
                            <p><span className="font-bold">Payment Status:</span> {formData.paymentStatus}</p>
                        }
                        {
                            formData.paymentStatus === "pending"
                            &&
                            <button 
                                className="border-1 rounded-lg py-2"
                                type="button"
                                onClick={ ()=>{
                                    setCreateApplication(true);
                                    setCreationStage("stage-2");
                                }}
                            >
                                Pay now
                            </button>
                        }
                    </div>
                </Fieldset>
                
                <Fieldset legend="Personal Information" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                    <div className="w-full flex flex-column gap-2 max-w-[400px] py-2">
                        <p><span className="font-bold">First Name:</span> {formData.firstName}</p>
                        <p><span className="font-bold">Middle Name:</span> {formData.middleName}</p>
                        <p><span className="font-bold">Last Name:</span> {formData.lastName}</p>
                        <p><span className="font-bold">Email:</span> {formData.email}</p>
                        <p><span className="font-bold">Phone:</span> {formData.phone}</p>
                        <p><span className="font-bold">Date of Birth: </span> 
                            {formatDate(formData.dob)}
                        </p>
                    </div>
                </Fieldset>

                <Fieldset legend="Bank Details" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                    <div className="w-full flex flex-column gap-2 max-w-[400px] py-2">
                        <p><span className="font-bold">Account Number:</span> {formData.bankAccountNumber}</p>
                        <p><span className="font-bold">IFSC Code:</span> {formData.bankIfsc}</p>
                        <p><span className="font-bold">Bank Name:</span> {formData.bankName}</p>
                        <p><span className="font-bold">Branch:</span> {formData.bankBranch}</p>
                    </div>
                </Fieldset>

                <Fieldset legend="Employment Details" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                    <div className="w-full flex flex-column gap-2 max-w-[400px] py-2">
                        <p><span className="font-bold">Company Name:</span> {formData.companyName}</p>
                        <p><span className="font-bold">Company Address:</span> {formData.companyAddress}</p>
                        <p><span className="font-bold">Designation:</span> {formData.designation}</p>
                        <p><span className="font-bold">Monthly Salary:</span> {formData.monthlySalary}</p>
                        <p><span className="font-bold">Date of Joining: </span> 
                            {formatDate(formData.dateOfJoining)}
                        </p>
                    </div>
                </Fieldset>

                <Fieldset legend="Documents" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                    <div className="w-full grid grid-cols-2 gap-4 max-w-[400px] py-2">
                        <button 
                            className="flex flex-col gap-2 cursor-pointer border px-2 py-1 rounded-lg  h-32 w-full justify-center items-center" 
                            onClick={() => viewImage(axiosPrivate, 'aadharFrontImage', formData.applicationId)}
                        >
                            <span className="font-bold">Aadhaar Front Image</span>
                            <span className="flex justify-center">
                                {
                                    newLinkSvg()
                                }
                            </span>
                        </button>
                        <button 
                            className="flex flex-col gap-2 cursor-pointer border px-2 py-1 rounded-lg h-32 w-full justify-center items-center" 
                            onClick={() => viewImage(axiosPrivate, 'aadharBackImage', formData.applicationId)}
                        >
                            <span className="font-bold">Aadhaar Back Image</span>
                            <span className="flex justify-center">
                                {
                                    newLinkSvg()
                                }
                            </span>
                        </button>
                        <button 
                            className="flex flex-col gap-2 cursor-pointer border px-2 py-1 rounded-lg h-32 w-full justify-center items-center" 
                            onClick={() => viewImage(axiosPrivate, 'panImage', formData.applicationId)}
                        >
                            <span className="font-bold">Pan Image</span>
                            <span className="flex justify-center">
                                {
                                    newLinkSvg()
                                }
                            </span>
                        </button>
                        <button 
                            className="flex flex-col gap-2 cursor-pointer border px-2 py-1 rounded-lg h-32 w-full justify-center items-center" 
                            onClick={() => viewImage(axiosPrivate, 'companyIdFrontImage', formData.applicationId)}
                        >
                            <span className="font-bold">Company ID Front</span>
                            <span className="flex justify-center">
                                {
                                    newLinkSvg()
                                }
                            </span>
                        </button>
                        <button 
                            className="flex flex-col gap-2 cursor-pointer border px-2 py-1 rounded-lg h-32 w-full justify-center items-center" 
                            onClick={() => viewImage(axiosPrivate, 'companyIdBackImage', formData.applicationId)}
                        >
                            <span className="font-bold">Company ID Back</span>
                            <span className="flex justify-center">
                                {
                                    newLinkSvg()
                                }
                            </span>
                        </button>
                    </div>
                </Fieldset>

                {
                    formData.applicationStatus === "pending"
                    &&
                    <div className="w-full flex justify-center items-center gap-4 mb-8">
                        <button 
                            type="button"
                            onClick={ ()=>{
                                setCreateApplication(true);
                                setCreationStage("stage-2");
                            }}
                            className="border rounded-lg px-2 py-1"
                        >
                            Proceed to Pay
                        </button>
                    </div>
                }

                {
                    (formData.applicationStatus === "completed" || formData.applicationStatus === "withdrawn")
                    &&
                    <Fieldset legend="Application Result" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                        <div className="w-full grid grid-cols-2 gap-4 max-w-[400px] py-2">
                            <InputTextarea 
                                value={
                                    formData.applicationStatus === "withdrawn" ?
                                    "Refund processed successfully for the application."
                                    : 
                                    formData.applicationResponse
                                } 
                                rows={5} 
                                className="bg-white border-1 rounded px-2 py-1 w-full"
                            />
                        </div>
                    </Fieldset>
                }

                {
                    userRole === "admin" && formData.applicationStatus === "submitted"
                    &&
                    <Fieldset legend="Process Application" className="w-full flex flex-col justify-start items-center py-4 max-w-[600px]">
                        <div className="w-full grid grid-cols-2 gap-4 max-w-[400px] py-2">
                            <InputTextarea 
                                value={processText} 
                                onChange={(e) => setprocessText(e.target.value)} 
                                rows={5} 
                                className="bg-white border-1 rounded px-2 py-1 w-full"
                            />
                            <button 
                                className="border-2 rounded px-2 py-1"
                                onClick={()=>handleProcessApplication(formData.applicationId, processText)}
                            >
                                Submit
                            </button>
                            <button 
                                className="border-2 rounded px-2 py-1"
                                onClick={()=>handleProcessApplication(formData.applicationId, "refund_application_123")}
                            >
                                Process Refund
                            </button>
                        </div>
                    </Fieldset>
                }
            </div>
        )
    }
    else
    {
        return (
            <div className="hfull w-full flex flex-col justify-center align-items gap-2 px-4">
                <div className="py-4 w-full flex justify-end pr-4">
                    <Button 
                        className="border-2 px-4 py-2"
                        onClick={()=>{setCreateApplication(true);setCreationStage("stage-1");setSearchParams({})}}
                    >
                        New Application
                    </Button>
                </div>
                <div className="flex flex-col justify-center grow gap-6 w-full h-full">
                    <ApplicationTable 
                        setView={()=>setViewApplication(true)} 
                        setFormData={(data)=>setFormData(data)} 
                    />
                </div>
            </div>
        )
    }
}

export default Applications;

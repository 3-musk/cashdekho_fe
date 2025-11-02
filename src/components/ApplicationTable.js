import {useEffect, useState} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { getApplication, getApplications } from '../services/application'; 
import useAxiosPrivate from "../hooks/usePrevilagedAxiosPrivate";

const ApplicationTable = ({setView, setFormData}) => {

    const [tableData, setTableData] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [total, setTotal] = useState(0);
    const axiosPrivate = useAxiosPrivate();

    useEffect(()=>{
        const page = first / rows + 1;
        getApplications(axiosPrivate, page, rows).then((res) => {
            if(res.status === true)
            {
                setTableData(res.data);
                setTotal(res.meta.total);
            }
        });
    }, [])

    const fetchTableData = async (rows, firstIndex) => {
        const page = firstIndex / rows + 1;
        const result = await getApplications(axiosPrivate, page, rows);
        if(result.status === true)
        {
            setTableData(result.data);
            setTotal(result.meta.total);
        }
    };

    const handleViewApplication = async (applicationId) => {
        const result = await getApplication(axiosPrivate, applicationId);
        console.log(result);
        if(result.status){
            setFormData(result.data[0]);
            setView();
        }
    }

    const onPageHandler = (event) => {
        console.log(event)
        setFirst(event.first);
        setRows(event.rows);
        fetchTableData(event.rows, event.first);
    };

    const actionButton = (e) => {
        return (
            <Button 
                label="View" 
                className="px-4 border border-2 border-gray-300 rounded-md"
                onClick={()=>handleViewApplication(e.applicationId)}
            />
        )
    }
    
    return(
        <DataTable
            value={tableData}
            tableStyle={{ minWidth: '50rem' }}
            stripedRows
            paginator
            rows={rows}
            first={first}
            onPage={onPageHandler}
            rowsPerPageOptions={[1, 2, 5, 10, 25, 50]}
            totalRecords={total}
            lazy={true}
        >
            <Column field="firstName" header="First Name" style={{ width: '25%' }}></Column>
            <Column field="applicationStatus" header="Status" style={{ width: '25%' }}></Column>
            <Column 
                field="createdAt" header="Created At" style={{ width: '25%' }}
                body={(e)=>{
                    const date = new Date(e.createdAt);
                    const day = date.getDate();
                    const month = date.toLocaleString('default', { month: 'long' });
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                }}
            ></Column>
            <Column header="Actions" style={{ width: '25%' }} body={actionButton}></Column>
        </DataTable>
    )
}

export default ApplicationTable;
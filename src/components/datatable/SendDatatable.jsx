import "./datatable.scss";
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import { smsMessageColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";



const SendDatatable = () => {
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  useEffect(() => {
    // LISTEN (REALTIME)
    const sub = onSnapshot(
      collection(db, "SendSms"),
      (snapShot) => {
        let list = snapShot.docs.map(doc=>{
          return {...doc.data(),id: doc.id}
        })
        setData(list);
      },
      (error) => {
        console.log('error');
      }
    );
    return sub;
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        SMS List
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={smsMessageColumns}
        pageSize={99}
        rowsPerPageOptions={[9]}
        components={{
          Toolbar: GridToolbar,
        }}
        
        
        sortingOrder = {['asc', 'desc', null]}
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          }}}
      />
    </div>
  );
};

export default SendDatatable;

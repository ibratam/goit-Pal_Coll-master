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
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // LISTEN (REALTIME)
    const sub = onSnapshot(
      collection(db, "SendSms"),
      (snapShot) => {
        let list = snapShot.docs.map(doc=>{
          return {...doc.data(),id: doc.id}
        })

        user.email != 'admin@palcoll.ps'? setData(list.filter((item) => item.email === user.email)):setData(list);
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

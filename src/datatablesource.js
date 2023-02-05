export const smsMessageColumns = [
  {
    field: "createdAt",
    headerName: "Created At",
    width: 180,
    renderCell: (params) => {
      return (
          <div>{`${params.row.createdAt?convertDate(params.row.createdAt.seconds): ''}`}</div>
      );
    }
  },
  { field: "number", headerName: "Phone Number", width: 150 },
  { field: "smsTitle", headerName: "SMS Title", width: 100 },
  { field: "sms", headerName: "SMS Message", width: 600 },
  { field: "sender", headerName: "SMS Header", width: 150 },
  { field: "email", headerName: "Sender Email", width: 150 },
  
];
function convertDate(time) {
  //time should be server timestamp seconds only
  let dateInMillis = time *1000
  let date = new Date(dateInMillis)
  let myDate = date.toLocaleDateString()
  let myTime = date.toLocaleTimeString()
  myDate = myDate.replaceAll('/', '-')
  return myDate + " " + myTime
  }
export const smsColumns = [
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    renderCell: (params) => {
      return (
          <div>{`${params.row.createdAt? convertDate(params.row.createdAt.seconds) : ''}`}</div>
      );
    }
    
  },
  { field: "title", headerName: "SMS Title", width: 100 },
  { field: "sms", headerName: "SMS Message", width: 400 },
  { field: "target", headerName: "Target User", width: 250 },
  

];
export const usersColumns = [
  {
    field: "createdAt",
    headerName: "Created At",
    width: 180,
    renderCell: (params) => {
      return (
          <div>{`${params.row.createdAt?convertDate(params.row.createdAt.seconds): ''}`}</div>
      );
    }
  },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 100,  renderCell: (params) => {
    return (
        <div>{`${params.row.role===0?'Root':params.row.role===1?'Admin':'User'}`}</div>
    );
  }, }
];

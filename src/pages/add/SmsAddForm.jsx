import { collection, addDoc, serverTimestamp ,getDocs,orderBy} from "firebase/firestore";
import { db } from "../../firebase";
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Formik } from 'formik';
import { addSmsSchema } from "../validation/Validation";
import { useState } from "react";
import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect } from "react";


const SmsAddForm = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [targetUser,setTargetUser]=useState() 
  const [users,setUsers]=useState([]) ;
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const querySnapshot = await getDocs(
      collection(db, "users"),
      orderBy("createdAt")
    );
    const data = querySnapshot.docs;
    const options = data.map((d) => ({
      value: d.get("email"),
      label: d.get("username"),
    }));
    setUsers(options);
  }, []);

  
  return (

    <Formik
      initialValues={{ smsTitle:'' ,sms: '' }}
      validationSchema={addSmsSchema}
      onSubmit={async (values, { setSubmitting }) => {
         await addDoc(collection(db, "sms"), {
          email: user.email,
          title: values.smsTitle,
          sms: values.sms,
          createdAt: serverTimestamp(),
          target:targetUser
        });
        setSubmitting(true);
        values.smsTitle = '';
        values.sms = '';

      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} style={{ padding: "18px" }}>
          
          <Card padding={3} elevation={3} >
            <Grid container spacing={2} padding={3}>
            
              <Grid item xs={12} >
                <Item style={{ backgroundColor: "#A5A3A3", color: "white", fontWeight: 'bold', fontSize: '25px' }}><label>Add SMS Content</label></Item>
              </Grid>
              <Grid item xs={12}>
                <FormControl required fullWidth>
                  <InputLabel id="demo-simple-select-required-label">
                    username
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={targetUser}
                    label="username*"
                    onChange={(event) => setTargetUser(event.target.value)}
                    
                  >
                    {
                    users.map((value) => (
                      <MenuItem value={value.value}>{value.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField error={errors.smsTitle && touched.smsTitle} multiline maxRows={10} fullWidth
                  helperText={!errors.smsTitle || !touched.smsTitle ? "" : errors.smsTitle}
                  name="smsTitle" id="smsTitle"
                  type={"text"} value={values.smsTitle} onBlur={handleBlur} onChange={handleChange} label="SMS Title" variant="outlined" />
              </Grid>    
              <Grid item xs={12}>
                <TextField error={errors.sms && touched.sms} multiline maxRows={10} fullWidth
                  helperText={!errors.sms || !touched.sms ? "" : errors.sms}
                  name="sms" id="sms"
                  type={"text"} value={values.sms} onBlur={handleBlur} onChange={handleChange} label="SMS Message" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <Button style={{ backgroundColor: "#f48fb1", color: "white", fontWeight: 'bold', fontSize: '18px' }} fullWidth type="submit"
                  variant="contained" endIcon={<AddIcon />}>Add SMS Message</Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      )}
    </Formik>

  )
}

export default SmsAddForm;
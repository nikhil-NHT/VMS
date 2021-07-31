import { useState, useContext } from 'react'
import styles from '../../../styles/Utils.module.css'
import Input from '../../components/Input'
import SelectDropDown from '../../components/SelectDropDown'
import DatePicker from "react-datepicker";
import LocationHandler from '../../components/LocationHandler';
import { GlobalContext } from '../../context/GlobalContext';
import "react-datepicker/dist/react-datepicker.css";
import globals from '../../utils/global';
import router from 'next/router';


const initialValues = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  location: '',
  categoryId: '',
  max: ''
}

let d = new Date();

const HostEvent = () => {

  const {userData,setUserData} = useContext(GlobalContext)
  const [values,setSelectedValues] = useState(initialValues)
  const [startDate,setStartDate] = useState(d)
  const [endDate,setEndDate] = useState(d)

  const submit = () => {
    if(!globals.getCookie('user_cookie')){
      router.push('/login')
    }
    var data = new FormData();
    data.append('access_token', globals.getCookie('user_cookie'));
    data.append('user[name]', values.title);
    data.append('user[desciption]', values.description);
    data.append('user[start_time]', startDate);
    data.append('user[end_time]', endDate);
    data.append('user[categoryId]', values.categoryId);
    data.append('user[location]', values.location);
    var config = {
      method: 'post',
      url: 'https://5d5407c40e01.ngrok.io/api/v1/events',
      headers: { 
        "Content-Type": "multipart/form-data",
        'Accept': '*/*'
      },
      data : data
    };
    
    axios(config)
    .then(function (res) {
      if(res.success){
        console.log('success')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setUserData({
    action: 'SUCCESS',
    displayResponse: true,
  })

  const handleChange = (name,value) => {
    setSelectedValues({
      ...values,
      [name]: value
    })
  }

  return (
    <div>
      <Input type='text' placeholder='Enter your title' name='name' value={values.title} handleChange={(n,v) => handleChange(n,v)}/>
      <Input type='number' placeholder='Enter you description' name='description' value={values.description} handleChange={(n,v) => handleChange(n,v)} />
      <Input type='text' placeholder='Members needed' name='max' value={values.max} handleChange={(n,v) => handleChange(n,v)} />
      <SelectDropDown loopData={userData.categories} handleSelectedValue={(value) => handleChange('cateogry',value)}/>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
      />
      <br></br>
      <button className={styles.submitButton} onClick={() => submit()}>
        Submit
      </button>
    </div>
  )
}

export default HostEvent

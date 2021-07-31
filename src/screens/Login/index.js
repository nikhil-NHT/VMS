import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../../styles/Login.module.css'
import Config from '../../../app.json'
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext'
import globals from '../../utils/global';
import Input from '../../components/Input';
import { getIpClient } from '../../services';
import { login } from '../../api/index2';
import { getFormData } from '../../utils/formData';
import router from 'next/router';

const initialValues = {
  email: '',
  password: '',
  mobile: '',
  name: '',
  location: ''
}

const Login = () => {

  const [signUp,setSignUp] = useState(true)
  const [values,setSelectedValues] = useState(initialValues)
  const { userData,setUserData } = useContext(GlobalContext)
  const [error,setError] = useState(false)

  const authenticate = async () => {
    const bodyFormData = new FormData()
    var axios = require('axios');
    var data = new FormData();
    data.append('client_id', Config.client_id);
    data.append('client_secret', Config.client_secret);
    data.append('user[email]', values.email);
    data.append('user[password]', values.password);
    data.append('user[location]', '');
    var config = {
      method: 'post',
      url: 'https://5d5407c40e01.ngrok.io/api/v1/users/sign_in',
      headers: { 
        "Content-Type": "multipart/form-data",
        'Accept': '*/*'
      },
      data : data
    };

    axios(config)
    .then(function (res) {
      if(res.data.access_token){
        globals.setCookie('user_cookie',res.data.access_token,30)
        globals.setCookie('refresh_token',res.data.refresh_token,30)
        setUserData({
          type: 'LOGIN_USER',
          payload: res.data
        })
        router.push('/events')
      }
    })

    .catch(function (error) {
      console.log(error);
    });
    // const requestParams = {
    //   client_id: Config.client_id,
    //   client_secret: Config.client_secret
    // }
    // const response = await login(data)
    // console.log(response)
  }

  const signUpUser = async () => {
    const bodyFormData = new FormData()
    bodyFormData.append('client_id', Config.CLIENT_ID)
    bodyFormData.append('client_secret', Config.CLIENT_SECRET)
    bodyFormData.append('user[email]', values.email)
    bodyFormData.append('user[password]', values.password)
    bodyFormData.append('user[name]', values.name)
    bodyFormData.append('user[mobile]', values.mobile)
    await axios.post(
      'https://5d5407c40e01.ngrok.io/api/v1/users/sign_up',
      bodyFormData,
      {
        headers: {
            "Content-Type": "multipart/form-data",
        },                    
      }
  ).then(res => {
      if(res.data) {
        globals.setCookie('user_cookie',res.data.access_token,30)
        globals.setCookie('refresh_token',res.data.refresh_tokej,30)
        setUserData({
          type: 'LOGIN_USER',
          payload: res.data
        })
      } else {
        setError(true)
      }
      }).catch(err => {
      console.log(err)
    })
  }

  const handleChange = (name,value) => {
    setSelectedValues({
      ...values,
      [name]: value
    })
  }

  const getLocation = async () => {
    const location = await getIpClient()
    setSelectedValues({
      ...values,
      location: location
    })
  }

  useEffect(() => {
    setSignUp(!userData.isAuth)
    getLocation()
  },[])

  return (
    <div>
      <div className={styles.container}>
        {!signUp ? <div className={styles.loginContainer}>
          <Input type='text' placeholder='Enter you email' name='email' value={values.email} handleChange={(n,v) => handleChange(n,v)} className={styles.inputText}/>
          <Input type='password' placeholder='Enter you pasword' name='password' value={values.password} handleChange={(n,v) => handleChange(n,v)} className={styles.inputText}/>
          <button onClick={authenticate} className={styles.submitButton}>
            Submit
          </button>
        </div> : <form className={styles.signUpContainer}>
          <Input type='text' placeholder='Enter you name' name='name' value={values.name} handleChange={(n,v) => handleChange(n,v)} className={styles.inputText}/>
          <Input type='number' placeholder='Enter you mobile' name='mobile' value={values.mobile} handleChange={(n,v) => handleChange(n,v)}  className={styles.inputText}/>
          <Input type='text' placeholder='Enter you email' name='email' value={values.email} handleChange={(n,v) => handleChange(n,v)}  className={styles.inputText}/>
          <Input type='password' placeholder='Enter you password' name='password' value={values.password} handleChange={(n,v) => handleChange(n,v)}  className={styles.inputText}/>
          <p>Near {values.location.city},{values.location.country}</p>
          <button onClick={signUpUser} className={styles.submitButton}>
            Submit
          </button>
        </form>
        }
        <button className={styles.signUp} onClick={() => {
          setSelectedValues(initialValues)
          setSignUp(!signUp)}}>
          {signUp ? 'Login' : 'Sign Up'}
        </button>
        {error && <p>Please enter correct credentials</p>}
      </div>
    </div>
  )
}

export default Login

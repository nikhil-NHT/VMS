import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../../styles/Header.module.css'
import { useRouter } from 'next/router'
import { GlobalContext } from '../../context/GlobalContext'
import globals from '../../utils/global'
import { fetchUserData } from '../../services'
import { getEvents } from '../../api/index2'

const Header = () => {

  const router = useRouter()
  const { userData,setUserData } = useContext(GlobalContext)

  useEffect(() => {
      const checkUser = async () => {
    // Check if there is a cookie for fetchAccessToken,if there call for data else logout user
        if (globals.getCookie('user_cookie') === null || globals.getCookie('user_cookie') === undefined) {
          setUserData({
            action: 'LOG_OUT'
          })
        } else {
          const response = await fetchUserData()
          setUserData({
            action: 'LOGIN_USER',
            payload: response
          })
          console.log('success')
        }
      }
      checkUser()
  },[])

  const fetchEvents = async () => {
    const response = await getEvents({ access_token : globals.getCookie('user_cookie') })
    setUserData({
      action: 'EVENTS',
      payload: response
    })
  }

  useEffect(() => {
    if(!userData.events){
      fetchEvents()
    }
  },[userData.events])

  return (
    <header className={styles.header}>
      <div className={styles.headerMain}>
        <p>
          VMS
        </p>
        <div>
          { !userData.isAuth ? <button className={styles.loginButton} onClick={() => router.push('/login')}>Log In/Sign Up</button> : <a onClick={() => 
          {
            router.push('/login')
            globals.removeCookie('user_cookie')
          }} className={styles.loginButton}>Log Out</a>}
        </div>
      </div>
    </header>
  )
}

export default Header

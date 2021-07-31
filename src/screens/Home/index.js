import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import Description from '../../components/Description'
import TopEvents from '../../components/TopEvents'
import axios from 'axios'
import config from '../../../app.json'
import LocationHandler from '../../components/LocationHandler'
import { getEvents } from '../../api/index2'
import { GlobalContext } from '../../context/GlobalContext'
import globals from '../../utils/global'
import router from 'next/router'

const Home = () => {

  const { userData,setUserData } = useContext(GlobalContext)
  const [location,setLocation] = useState('')

  // const fetchEvents = async () => {
  //   const response = await getEvents({ access_token : globals.getCookie('user_cookie') })
  //   console.log(response)
  //   setUserData({
  //     action: 'EVENTS',
  //     payload: response
  //   })
  // }

  // useEffect(() => {
  //   console.log('here')
  //   if(!userData.events){
  //     fetchEvents()
  //   }
  // },[userData.events])

  // console.log(userData)

  return (
    <div className={styles.container}>
      <div className={styles.bgImage}>
        <div className={styles.mainContainer}>
          <h1 className={styles.homeTitle}>Bring Communities Together</h1>
          <h3 className={styles.homeSubTitle}>Join unique, exciting and educational opportunities for social change</h3>
          <div className={styles.searchContainer}>
            <LocationHandler locationSelected={(value) => setLocation(value)} />
            <button className={styles.searchButton} onClick={() => router.push('/events')}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className={styles.borderTop} />
      <Description />
      <div className={styles.borderTop} />
      <TopEvents />
    </div>
  )
}

export default Home

/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from 'react'
import Image from 'next/image'
import styles from '../../../styles/Events.module.css'
import globals from '../../utils/global'
import { GlobalContext } from '../../context/GlobalContext'

const Events = ({imageUrl,date,time,title,description,points,max,min,
creator,location,id,category}) => {

  const { userData,setUserData } = useContext(GlobalContext)
  const [joined,setJoined] = useState(false)
  const join = () => {
    if(!globals.getCookie('user_cookie')){
      router.push('/login')
    }
    setTimeout(() => {
      setUserData({
        action: 'SUCCESS',
        displayResponse: true
      })
      setJoined(true)
    },2500)
   
  }

  return (
    <div className={styles.eventContainer}>
      <img className={styles.eventImage}
      src={imageUrl}
      alt={title}
      />
      <div className={styles.eventDescription}>
        <p className={styles.dateText}>{date}</p>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <p>{location}</p>
        <p className={styles.earnMax}>Earn max {points}</p>
        <p className={styles.numberPeople}>{min}/{max}</p>
      </div>
      <button className={styles.joinButton} onClick={() => join()}>
        { !joined  ? 'Join Now!.' : 'Joined'}
      </button>
    </div>
  )
}

export default Events

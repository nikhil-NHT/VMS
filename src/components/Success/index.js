import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import styles from '../../../styles/Utils.module.css'

const Success = () => {

  const { userData, setUserData } = useContext(GlobalContext)

  useEffect(() => {
    if(userData.displayResponse) {
      setTimeout(() => setUserData({
        action: 'SUCCESS',
        displayResponse: false,
        responseText: ''
      }),2500)
    }
  },[userData])

  console.log(userData.displayResponse)

  return (
    !userData.displayResponse && (
    <div className={styles.notifyContainer}>
      <div className={styles.notifyContainerText}>
        <p className={styles.notifyText}>Joined Successfully</p>
      </div>
    </div>
  )
  )
}

export default Success

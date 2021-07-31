import Image from 'next/image'
import styles from '../../../styles/Home.module.css'

const Description = () => {
  return (
    <div className={styles.descriptionContainer}>
      <h2 className={styles.descriptionTitle}>Welcome to Reward Volunteers</h2>
      <p className={styles.descriptionText}>We are delighted to welcome you to our community of passionate committed volunteer who are working to make a diference in people  bringline alive</p>
      <button className={styles.volunteerButton}>
        Volunteer Opportunities
      </button>
    </div>
  )
}

export default Description

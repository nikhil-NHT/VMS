import { useContext } from 'react'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import Events from '../Events'
import { GlobalContext } from '../../context/GlobalContext'
import router from 'next/router'

const TopEvents = () => {

  const { userData,setUserData } = useContext(GlobalContext)

  return (
    <div className={styles.topEventsContainer}>
      <div style={{display: 'flex',justifyContent: 'space-between'}}>
        <h2 className={styles.eventsTitle}>Join upcoming events and earn rewards</h2>
        <button onClick={() => router.push('/events')}>Join Other Events</button>
      </div>
      <div className={styles.topEvents}>
        {userData.events && userData.events.map((data,index) => 
          <Events 
            key={index.toString()}
            imageUrl={data.image_thumb_url}
            date={data.start_time}
            time={data.time}
            title={data.name}
            description={data.description}
            points={data.reward_points}
            max={data.total_members_needed}
            min={data.registered_members_count}
            creator={data.creator}
            location={data.location}
            id={data.id}
            category={data.category.name}
          />)}
      </div>
    </div>
  )
}

export default TopEvents

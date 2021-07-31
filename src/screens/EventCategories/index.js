import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../../styles/EventsCategories.module.css'
import SelectDropDown from '../../components/SelectDropDown'
import axios from 'axios'
import config from '../../../app.json'
import DatePicker from "react-datepicker";
import { GlobalContext } from '../../context/GlobalContext'
import Events from '../../components/Events'
import "react-datepicker/dist/react-datepicker.css";
import { getEvents } from '../../api/index2'
import globals from '../../utils/global'

let d = new Date();

const initialValues = {
  selectedDate: d,
  category: "",
  withKM: "",
  startDate: '',
  endDate: ''
}

const EventCategories = () => {

  const { userData, setUserData } = useContext(GlobalContext)
  const [values,setSelectedValues] = useState(initialValues)
  const [startDate, setStartDate] = useState(new Date());

  const onClickDay = date => {
    filterEvents('selectedDate',date)
  };

  const filterEvents = async (name,value) => {
    setUserData({
      action: 'EVENTS',
      payload: []
    })
    setSelectedValues({
        ...values,
        [name]: value,
      });
      fetchEvents()
  }

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
    <div className={styles.container}>
      <div className={styles.filterContainer}>
      <SelectDropDown loopData={userData.categories} 
  handleSelectedValue={(value) => filterEvents('cateogry',value)}/>
  <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
  />
  <SelectDropDown loopData={[{
    id: '10',
    name: 'Within 10Km'
  },
  {
    id: '20',
    name: 'Within 20Km'
  },
  {
    id: '30',
    name: 'Within 30Km'
  },
  {
    id: '40',
    name: 'Within 40Km'
  }]} 
  handleSelectedValue={(value) => filterEvents('withKM',value)}/>
      </div>
      <div>
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

export default EventCategories

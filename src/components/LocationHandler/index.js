import { useState, useContext } from 'react'
import styles from '../../../styles/Home.module.css'
import DatePicker from "react-datepicker";

const LocationHandler = ({ locationSelected }) => {

  const [location,setLocation] = useState('')
  const [searchRes,setSearchRes] = useState([])
  const [searchList,setSearchList] = useState(false)

  const filterLocation = (value) => {
    console.log(value)
    setSearchList(true)
    setLocation(value)
    // let url = `${config.apibaseurl}v1/searchQuestion`
    //     let searchList = false
    //     axios.post(url, { t: value }).then((res) => {
    //         if (res.data !== undefined && res.data !== []) {
    //             if (res.data.length == 0 && text !== '') {
    //                 searchList = false
    //             } else {
    //                 searchList = true
    //             }
    //             setSearchList(searchList)
    //             setSearchRes(res.data)
    //         }
    //     }).catch((err) => {
    //         console.log('error', err)
    //     })
    setSearchRes([{
      t: '123'
    },{
      t: '123'
    },{
      t: '123'
    },{
      t: '123'
    },{
      t: '123'
    },{
      t: '123'
    },{
      t: '123'
    }])
  }
  return (
    <>
      <input type='text' className={styles.inputText} placeholder='Enter location' value={location} onChange={(e) => filterLocation(e.target.value)} 
            onBlur={() => setSearchList(false)}/>
      { searchList && <ul className={styles.globalSearchDropdown}>
          {
              searchRes ? searchRes.map((item, i) =>
                  <li key={i} className={styles.gsdLi}>
                      <a className={styles.gsdAnchor} onClick={() => {
                        locationSelected(item.t)
                        setLocation(item.t) 
                        setSearchList(false)}}>
                          <span className={styles.gsdSpan}>{item.t}</span>
                      </a>
                  </li>
              ) : ''
          }
      </ul>}
    </>
  
  )
}

export default LocationHandler

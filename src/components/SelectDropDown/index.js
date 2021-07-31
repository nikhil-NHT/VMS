import styles from '../../../styles/Utils.module.css'

const SelectDropDown = ({ loopData, handleSelectedValue }) => {

  return (
    <select className={styles.selectContainer} onChange={(e) => handleSelectedValue(e.target.value)}>
      {loopData && loopData.map((data,index) => 
        <option key={index.toString()} value={data.id} selected>{data.name}</option>
      )}
    </select>
  )
}

export default SelectDropDown

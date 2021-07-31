import styles from '../../../styles/Utils.module.css'

const Input = ({ type, value, name, handleChange, placeholder }) => {

  return (
    <input type={type} name={name} value={value} onChange={(e) => handleChange(name,e.target.value)} placeholder={placeholder} className={styles.inputText} required/>
  )
}

export default Input

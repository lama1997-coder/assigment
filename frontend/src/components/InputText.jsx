
import React from "react"
export default function InputText({ type = 'text', id, value, label, placeholder, onChange, ...props }) {

  return (
    <div style={styles.inputContainer}>
      <label>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...props} />
    </div>
  )
}

const styles = {
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    gap: '1vh'
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
}
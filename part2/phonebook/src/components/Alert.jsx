import React from 'react'

function Alert({ alert }) {
  const alertStyle = {
    width: '100%',
    border: alert.type === 'success' ? '2px solid green' : '2px solid red',
    borderRadius: '5px',
    color: alert.type === 'success' ? 'green' : 'red',
    padding: '10px 20px',
    fontSize: '1.5rem',
    display: alert.type ? 'block' : 'none'
  }

  return (
    <div style={alertStyle}>{ alert.msg } </div>
  )
}

export default Alert
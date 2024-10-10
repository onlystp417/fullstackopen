import React from 'react'

function Alert({ alertMessage }) {
  const alertStyle = {
    width: '100%',
    border: '2px solid green',
    borderRadius: '5px',
    color: 'green',
    padding: '10px 20px',
    fontSize: '1.5rem',
    display: alertMessage ? 'block' : 'none'
  }

  return (
    <div style={alertStyle}>{ alertMessage } </div>
  )
}

export default Alert
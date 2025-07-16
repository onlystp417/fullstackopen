const Notification = ({ type, message }) => {
  const style = {
    width: '100%',
    border: type === 'success' ? '2px solid green' : '2px solid red',
    borderRadius: '5px',
    color: type === 'success' ? 'green' : 'red',
    padding: '10px 20px',
    fontSize: '1.5rem',
    display: message ? 'block' : 'none'
  }

  return (
    <div style={ style }>{ message }</div>
  )
}

export default Notification
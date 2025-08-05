import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { type, message } = useSelector(state => state.notification)

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

Notification.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
}

export default Notification
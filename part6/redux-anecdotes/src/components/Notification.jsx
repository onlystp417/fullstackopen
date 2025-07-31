import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    borderRadius: '5px',
    padding: 10,
    borderWidth: 1,
    display: notification.visible ? 'block' : 'none',
  }

  return (
    <div style={style}>
      { notification.msg }
    </div>
  )
}

export default Notification
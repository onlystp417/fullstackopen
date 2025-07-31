import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    borderRadius: '5px',
    padding: 10,
    borderWidth: 1,
    display: notification ? 'block' : 'none',
  }

  return (
    <div style={style}>
      { notification }
    </div>
  )
}

export default Notification
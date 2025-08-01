import { useState, forwardRef, useImperativeHandle } from 'react'

const Notification = forwardRef((props, ref) => {
  const [msg, setMsg] = useState('')

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  useImperativeHandle(ref, () => ({
    onSetMsg: message => setMsg(message)
  }))
  
  if (!msg) return null

  return (
    <div style={style}>
      { msg }
    </div>
  )
})

Notification.displayName = 'Notification'

export default Notification

import { useState } from 'react'

const Togglable = ({ children, buttonLable }) => {
  const [visible, setVisibale] = useState(false)
  const hide = { display: 'none' }
  const show = { display: 'block' }

  const toggleVisibility = () => { setVisibale(!visible) }

  return (
    <>
      <div style={ visible ? hide : show }>
        <button onClick={ toggleVisibility }>{ buttonLable }</button>
      </div>
      <div style={ visible ? show : hide }>
        { children }
        <button onClick={ toggleVisibility }>Cancle</button>
      </div>
    </>
  )
}

export default Togglable
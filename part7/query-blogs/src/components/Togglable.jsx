import { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import style from '../styles/togglable.module.sass'

const Togglable = ({ children, buttonLable }) => {
  const [visible, setVisibale] = useState(false)

  const toggleVisibility = () => { setVisibale(!visible) }

  return (
    <div className={style.togglable}>
      <div>
        <button onClick={ toggleVisibility }>
          { visible ? 'Cancle' : buttonLable  }
        </button>
      </div>
      <div className={clsx(!visible && 'hide')}>
        { children }
      </div>
    </div>
  )
}

Togglable.propTypes = {
  children: PropTypes.element,
  buttonLable: PropTypes.string
}

export default Togglable
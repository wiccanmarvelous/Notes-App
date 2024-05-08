import React from 'react'
import StyleIcon from '@mui/icons-material/Style';


const Menu = (props) => {
  return (
    <>
      <div className={`'side-bar' ${props.menuOpen ? 'open' : 'close'}`}>
        <div className='notes side-bar-icons'>
          <StyleIcon />
          <p className={`${props.menuOpen ? 'side-bar-icons-enter' : 'side-bar-icons-exit'}`}>Quick Notes</p>
        </div>
      </div>
    </>
  )
}

export default Menu

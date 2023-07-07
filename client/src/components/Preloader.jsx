import React from 'react'
import preloder from '../images/preload.gif'
function Preloader() {
  return (
    <div className="preloader">
    <img src={preloder} alt="" />
  </div>
  )
}

export default Preloader
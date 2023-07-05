import React from 'react'
import {NavLink} from 'react-router-dom'
import './components.css'
function Naviagtion() {

    const CustomLink=(props)=>{
        return <NavLink className={({isActive})=>{
            return isActive?'active':'notActive'
        }} {
            ...props
        }>

        </NavLink>
    }
  return (
<nav className='naviagtion1'>
    <div className="logo"><h1>mentor.io</h1></div>
    <ul>
       <CustomLink to={'/'}>Home</CustomLink>
        <CustomLink to={'/dashboard'} >dashboard</CustomLink>
        <CustomLink to={'/members'}>members</CustomLink>
        <CustomLink to={'/logout'}>logout</CustomLink>
    </ul>
</nav>
  )
}

export default Naviagtion
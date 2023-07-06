import React from 'react'
import './pages.css'
function PageNotFound() {
    const goback=()=>{
        return window.history.back()
    }
  return (
    <div className='containerfour'>
        <div className='four0four'>
        <h1>404 page not found</h1>
        <p>Looks like you got lost !!!</p>
        <button className='fourbtn' onClick={goback}> Go back</button>
        </div>
 
    </div>
  )
}

export default PageNotFound
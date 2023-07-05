import React from 'react'
import Naviagtion from '../components/Naviagtion'
import gif1 from '../images/gif1.png'
import './pages.css'
function Home() {
  return (
    <div className='landing_conatiner'>
      <Naviagtion></Naviagtion>
      <div className="landingPage">
        <div className="content">
<h1>Welcome to  Mentor .io, your ultimate platform for mentorship  </h1>
<h2>Mentor.io connects you with  perfect macth </h2>

        </div>
        <div className="illustrator">
          <img src={gif1} alt="" />
        </div>
        
      </div>




    </div>
  )
}

export default Home
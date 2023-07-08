import React from 'react'

import four from '../images/2.svg'


function MoreInfo() {
  return (
    <div className='container_more_info snap'>
        <div className="imageInfo">
           <div className="imagecont">
            
           
            <div className="newimagecont">
             <img src={four} alt="" />
             </div>
          

           </div>
        </div>
        <div className="infoDescription">

            <div className="mission">
               <h3>Our mission</h3>
               <p> Our mission is to connect aspiring individuals with experienced mentors in various fields, providing them with personalized guidance and support to achieve their goals and unlock their full potential</p>

            </div>
            <div className="mission">
               <h3>Our vision</h3>
               <p>Our vision is to create a thriving community of mentors and mentees, fostering a culture of knowledge sharing, skill development, and personal growth. </p>

            </div>
           
            <div className="mission">
               <h3>Our ambition</h3>
               <p>Our ambition is to become the go-to platform for mentorship, recognized for our high-quality matches, valuable resources, and innovative tools. </p>

            </div>
        </div>

    </div>
  )
}

export default MoreInfo
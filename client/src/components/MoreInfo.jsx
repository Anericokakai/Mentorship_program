import React from 'react'
import image1 from '../images/img.jpg'
function MoreInfo() {
  return (
    <div className='container_more_info'>
        <div className="imageInfo">
            <img src={image1} alt="" />
        </div>
        <div className="infoDescription">

            <div className="mission">
               <h3>Our mission</h3>
               <p> Our mission is to connect aspiring individuals with experienced mentors in various fields, providing them with personalized guidance and support to achieve their goals and unlock their full potential</p>

            </div>
            <div className="mission">
               <h3>Our vision</h3>
               <p>Our vision is to create a thriving community of mentors and mentees, fostering a culture of knowledge sharing, skill development, and personal growth. We aim to empower individuals to navigate their career paths with confidence and make meaningful contributions to society.</p>

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
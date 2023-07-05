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
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, ea quae voluptatibus quo quasi ad?</p>

            </div>
            <div className="mission">
               <h3>Our mission</h3>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, ea quae voluptatibus quo quasi ad?</p>

            </div>
            <div className="mission">
               <h3>Our mission</h3>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, ea quae voluptatibus quo quasi ad?</p>

            </div>
            <div className="mission">
               <h3>Our mission</h3>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, ea quae voluptatibus quo quasi ad?</p>

            </div>
        </div>

    </div>
  )
}

export default MoreInfo
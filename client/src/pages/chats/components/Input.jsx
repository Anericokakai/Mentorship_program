import React from 'react'
import attach from "../images/attachement.png"
import image from "../images/image.png"

function Input() {
  return (
    <div className='input-message' >
        <input type="text" placeholder='send message' />
        <div className="send">
            <img src={image} alt="" />
            <input type="file" id='file'  style={{display: 'none'}} />
            <label htmlFor="file">
                <img src={attach} alt="" />
                
            </label>
            <button>sedn</button>
        </div>
    </div>
  )
}

export default Input
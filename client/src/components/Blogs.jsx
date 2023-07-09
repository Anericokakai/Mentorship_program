import React, { useEffect, useState } from "react";
import image from "../images/img.png";
import image2 from "../images/img.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
function Blogs() {
  const [articles, setarticles] = useState([{}]);

  useEffect(() => {
    axios.get(" https://codefreeblogs.onrender.com/api/fetchcourse").then(data=>{
        setarticles(data.data)
    }).catch(error=>{
        console.log(error)
    })
  }, []);

  return (
    <div className="articles_container">
      <h1 className="textrev">Follow the latest artcicles & Blogs</h1>
      <div className="articles">
       {
        articles && articles.map(single=>(
            
 <Link className="link" to={'https://codefree-3b04a.web.app/login/lessonsHome'} target='_blank'>
            <div className="article">
            <div className="image_container">
              <img src={single.Image} alt="" />
              <div className="textAbsolute">
                <strong>{single.course_name}</strong>
                <p>{single.intro}</p>
              </div>
            </div>
          </div>
 </Link>
        ))
       }
  
      
      </div>
    </div>
  );
}

export default Blogs;

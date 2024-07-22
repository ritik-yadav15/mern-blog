import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/page2.scss";

const Page2 = () => {
  const [Blogs, setBlogs] = useState(null);  // Initialize to null to differentiate between loading and empty state

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/getRecentBlogs");
        setBlogs(response.data.data);
      } catch (error) {
        alert("Some error occurred");
      }
    };
    fetch();
  }, []);

  return (
    <>
      <div className="page2-container root" style={{ minHeight: '100vh' }}>  
        {!Blogs ? (
          <div className="loading-container">
            <div className="spinner"></div>  
          </div>
        ) : (
          Blogs.map((items, i) => {
            return (
              <div className="card" key={items._id}>
                <div className="card-text">
                  <div className="label">Technology</div>
                  <Link style={{ textDecoration: 'none', color: "black" }} to={`/blogspage/${items._id}`}>
                    <h2>{items.title}</h2>
                  </Link>
                  <p>{items.desc.slice(0, 250)}...</p>
                  <Link className="Link" to={`/blogspage/${items._id}`}>Read more &rarr;</Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default Page2;

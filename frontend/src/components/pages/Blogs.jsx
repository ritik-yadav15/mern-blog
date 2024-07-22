import axios from "axios";
import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import "./css/blogs.scss";
import { motion, useInView } from "framer-motion";

const sanitizeString = (str) => {
  return str.replace(/\s+/g, ' ');
};

const Blogs = () => {
  const [Blogs, setBlogs] = useState(null);  // Initialize to null to differentiate between loading and empty state
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/getAll/");
        setBlogs(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetch();
  }, []);

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <>
      <motion.div 
        className="Blogs-container root" 
        ref={ref}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth }}
        style={{ minHeight: '100vh' }} 
      >
        <div className="container d-flex text-center justify-content-center ">
          <h1 className="heading my-4">All Blogs</h1>
        </div>
        {!Blogs ? (
          <div className="loading-container">
            <div className="spinner"></div> 
          </div>
        ) : (
          Blogs.map((items, i) => {
            return (
              <motion.li 
                key={i} 
                variants={cardVariants} 
                initial="initial" 
                animate={isInView ? "animate" : "initial"} 
                transition={{ duration: 0.2, delay: i * 0.2 }}
              >
                <div className="Blogscard" key={items._id}>
                  <div className="Blogscard-text">
                    <div className="label">Technology</div>
                    <Link style={{ textDecoration: 'none', color: "black" }} to={`/blogspage/${items._id}`}>
                      <h2>{sanitizeString(items.title).slice(0, 11)}...</h2>
                    </Link>
                    <p>{sanitizeString(items.desc).slice(0, 50)}...</p>
                    <Link className="Link" to={`/blogspage/${items._id}`}>Read more &rarr;</Link>
                  </div>
                </div>
              </motion.li>
            );
          })
        )}
      </motion.div>
    </>
  );
}

export default Blogs;

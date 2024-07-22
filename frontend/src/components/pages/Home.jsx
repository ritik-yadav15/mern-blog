import React from 'react'
import Page1 from "../Home/Page1";
import Page2 from "../Home/Page2";
import { motion } from "framer-motion"

const Home = () => {
  return (
    <>
    <motion.div
    initial={{width:0}}
    animate={{width:"100%"}}
    exit={{x:window.innerWidth}}
    >
    <Page1/>
    
    <div className="d-flex justify-content-center align-items-center my-4">
    
    <h3>Latest Blogs</h3>
    </div>
    <Page2/>
    </motion.div>
    </>
  )
}

export default Home

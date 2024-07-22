import React, { useState } from 'react'
import { useEffect } from 'react'
import { BiSolidEdit } from "react-icons/bi";
import {useParams} from "react-router-dom"
import "./BlogsPage.scss"
import axios from "axios"
import { Link } from 'react-router-dom';

export default function BlogsPage() {
    const {id} = useParams()
    const [blog,setBlog ]= useState(null)

    useEffect(()=>{
        const fetch = async()=>{
          try {
            const response = await axios.get(`http://localhost:1000/api/v1/getBlogs/${id}`);
            setBlog(response.data.data);
            
          } catch (error) {
            console.error("Error fetching blog:", error);
            
          }

        }
 fetch()
    },[id])
   
  return (
    <>
    <div className='page container'>
        <div className='my-3'>

           {blog&&(
            <>
      <Link to={`/updateBlog/${blog._id}`} className=" d-flex m-2 justify-content-end edit">
      <BiSolidEdit/>
      </Link>
            <h1>{blog.title}</h1>
            <p>{blog.desc}</p>
            
            </>
           )
           }
        </div>
    </div>
    </>
  )
}

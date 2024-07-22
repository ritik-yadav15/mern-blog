import React from 'react'
import "../AddBlogs/WriteAndUpdate"
import WriteAndUpdate from '../AddBlogs/WriteAndUpdate'

export default function AddBlogs({title}) {
  return (
   <>
   <WriteAndUpdate titleName={title}/>
   </>
  )
}

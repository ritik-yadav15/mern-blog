import { useState } from 'react'
import {Route,BrowserRouter as Router,Routes} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from "./components/pages/Home"
import Blogs from "./components/pages/Blogs"
import AddBlogs from "./components/pages/AddBlogs"
import BlogsPage from './components/BlogsPage/BlogsPage'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
    <Router>
     <Navbar/>
     <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route  path='/Blogs' element={<Blogs/>} />
    <Route  path='/AddBlogs' element={<AddBlogs title={"Add"}/>} />
    <Route path='/blogsPage/:id' element={<BlogsPage  />}/>
    <Route path='/updateBlog/:id' element={<AddBlogs title={"Update"}/>}/>

     </Routes>
    </Router>
    <Footer/>
    </>
  )
}

export default App

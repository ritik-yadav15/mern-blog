import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import CustomAlert from '../CustomAlert'; 
import "./WriteAndUpdate.scss";
import { motion } from 'framer-motion';

function WriteAndUpdate({ titleName }) {
    const navigate = useNavigate();
    const [Blog, setBlog] = useState({ title: "", desc: "" });
    const { id } = useParams();
    const [isEditable, setIsEditable] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const change = (e) => {
        const { name, value } = e.target;
        setBlog({ ...Blog, [name]: value });
    };

    const cleanUpTitle = (title) => {
        return title.replace(/\s+/g, ' ').trim();
    };

    const submit = async () => {
        // Trim title and description before submission
        const cleanedTitle = cleanUpTitle(Blog.title);
        const trimmedDesc = Blog.desc.trim();

        if (cleanedTitle.length >= 6 && trimmedDesc.length >= 50) {
            try {
                if (titleName === "Add") {
                    const res = await axios.post("http://localhost:1000/api/v1/post", { title: cleanedTitle, desc: trimmedDesc });
                    setAlertMessage(res.data.message);
                    toast.success('Post has been added');
                    setBlog({ title: "", desc: "" });
                } else {
                    const res = await axios.put(`http://localhost:1000/api/v1/updateBlog/${id}`, { title: cleanedTitle, desc: trimmedDesc });
                    setAlertMessage(res.data.message);
                    toast.success('Post has been updated');
                    setShouldNavigate(true); 
                }
            } catch (error) {
                console.error("Error submitting blog:", error);
                toast.error('Error submitting blog');
            }
        } else {
            toast.warning("Title must be at least 6 characters long and description at least 50 characters long");
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                if (titleName === "Update") {
                    const response = await axios.get(`http://localhost:1000/api/v1/getBlogs/${id}`);
                    const fetchedBlog = response.data.data;
                    setBlog(fetchedBlog);
                    if (fetchedBlog.delete === false) {
                        setIsEditable(false);
                    }
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };
        fetch();
    }, [id, titleName]);

    const deletePost = async () => {
        try {
            const response = await axios.delete(`http://localhost:1000/api/v1/delete/${id}`);
            setAlertMessage(response.data.message);
            toast.success('Post has been deleted');
            setShouldNavigate(true); 
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.warning(`You can't delete this post`);
        }
    };

    const handleCloseAlert = () => {
        setAlertMessage("");
        if (shouldNavigate) {
            navigate("/"); 
        }
        navigate("/Blogs"); 
    };

    return (
        <motion.div
                initial={{width:0}}
                animate={{width:"100%"}}
                exit={{x:window.innerWidth}}
        >
            <Toaster richColors />
            <div className='container add-container my-4'>
                <h2 className='mt-5'>{titleName} Blogs</h2>
                <div className="d-flex flex-column my-3" style={{height:"100vh"}}>
                    <input
                        className='form-text p-3'
                        type="text"
                        name='title'
                        value={Blog.title}
                        placeholder='Title'
                        onChange={change}
                    />
                    <textarea
                        name="desc"
                        className='form-text p-3'
                        value={Blog.desc}
                        cols="30"
                        rows="10"
                        placeholder='Description'
                        onChange={change}
                        disabled={!isEditable}
                    />
                    <div className='container mt-4'>
                        <button className='px-4 py-2 add-blog-btn btn btn-primary' onClick={submit}>{titleName} Blog</button>
                        {titleName === "Update" &&
                            <button className='px-4 py-2 btn btn-danger delete-blog-btn m-2 rounded-4' onClick={deletePost}>Delete Blog</button>
                        }
                    </div>
                </div>
            </div>
            {alertMessage && <CustomAlert message={alertMessage} onClose={handleCloseAlert} />}
        </motion.div>
    );
}

export default WriteAndUpdate;

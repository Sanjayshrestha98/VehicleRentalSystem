import React, { useMemo, useState, useEffect, useRef } from 'react'

import ContentView from "react-froala-wysiwyg/FroalaEditorView";
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import axios from '../../axios'
import dayjs from 'dayjs';
import SuggestedPosts from './SuggestedPosts';

function SingleBlogPage() {

    const location = useLocation()
    const router = useNavigate()

    const blogId = location.pathname.split('/').pop()
    const [randomBlogData, setRandomBlogData] = useState()
    const [blogData, setBlogData] = useState()

    const getBlog = async (values, actions) => {
        try {
            let result = await axios.get('/blog/' + blogId)

            if (result.data.success) {
                setBlogData(result?.data?.data)
                // setRandomBlogData(result?.data?.data?.content)
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    const getRandomBlog = async (values, actions) => {
        try {
            let result = await axios.get('/blog/')

            if (result.data.success) {
                setRandomBlogData(result.data.data.randomBlogs || [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    useEffect(() => {
        getBlog()
        getRandomBlog()
    }, [blogId])

    return (
        <div className='max-w-7xl mx-auto'>
            <title>{blogData?.title}</title>
            <div className='flex'>
                <div className='p-10 w-2/3 min-h-screen'>
                    <div className='mb-5'>
                        <h1 className='text-4xl font-bold '>{blogData?.title}</h1>
                        <p className='text-sm text-gray-500 mt-2'>{dayjs(blogData?.updatedAt).format('D MMMM, YYYY')}</p>
                        <p className='text-sm font-semibold mt-4'>{blogData?.description}</p>
                    </div>

                    <div className='grid grid-cols-1 gap-5'>
                        <div className='w-full  h-96 bg-white rounded-md overflow-hidden  relative'>
                            <img className='absolute top-0 left-0 h-full w-full object-cover z-0' src={`${process.env.REACT_APP_IMG_URI}${blogData?.image}`} />
                        </div>

                        <div className='mt-5'>
                            <ContentView model={blogData?.content} />
                        </div>
                    </div>
                </div>
                <SuggestedPosts randomBlogData={randomBlogData} />
            </div>
        </div>
    )
}

export default SingleBlogPage
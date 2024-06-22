import React, { useEffect, useState } from 'react'

import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import axios from '../../axios'

function BlogPage() {
    // const [blogData, setBlogData] = useState([])


    // const getAllBlog = async (values, actions) => {
    //     try {
    //         let result = await axios.get('/blog', {
    //             params: {
    //                 search: '',
    //                 page: 1,
    //                 limit: 20
    //             }
    //         })

    //         if (result.data.success) {
    //             setBlogData(result?.data?.data.blogs.data)
    //         } else toast.error('Failed')
    //     } catch (ERR) {
    //         console.log(ERR)
    //         toast.error(ERR.response.data.message)
    //     }
    // }

    // useEffect(() => {
    //     getAllBlog()
    // }, [])

    return (
        <div className=' p-10 pt-5 bg-left-bottom bg-secondary' >
            <div className='text-center max-w-7xl mx-auto py-20'>
                <h1 className='text-4xl font-bold'>Blog.</h1>
                <div className='mt-4 max-w-2xl mx-auto'>
                    <p className='lg:px-20 py-5 '>Discover insightful articles and expert opinions on our blog page, offering a wealth of knowledge and inspiration for all.</p>
                </div>

                <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-6 text-left mt-10'>
                    {/* {
                        blogData.map((value, index) => (
                            <div className=' flex flex-col gap-10   p-5 justify-between rounded-lg ' key={index}>
                                <div className='flex flex-col gap-6'>
                                    <label className='font-semibold text-xl capitalize'>{value?.title}</label>
                                    <img src={`${process.env.REACT_APP_IMG_URI}${value?.image}`} className='h-44 object-cover rounded-xl' alt='blog' />
                                    <label className='text-gray-600 line-clamp-2'>{value?.description}</label>
                                    <Link to={'/blogs/' + value?._id} className='flex gap-3 items-center text-current font-bold'>Learn More <FaArrowRight /></Link>
                                </div>
                            </div>
                        ))
                    } */}

                </div>
            </div>
        </div>
    )
}

export default BlogPage
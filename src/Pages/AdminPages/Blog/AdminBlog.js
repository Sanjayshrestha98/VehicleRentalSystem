import React, { useEffect, useState } from 'react'
import axios from '../../../axios'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

function AdminBlog() {
    const navigate = useNavigate()
    const [blogData, setBlogData] = useState([])

    const [totalBlogCount, setTotalBlogCount] = useState(0)
    const [currentBlogPage, setCurrentBlogPage] = useState(1)
    const [totalBlogPage, setTotalBlogPage] = useState(1)
    const [blogPageSize, setBlogPageSize] = useState(10)
    const [keyword, setKeyword] = useState("")
    const [selectedEventData, setSelectedEventData] = useState([])


    const getAllBlog = async (values, actions) => {
        try {
            let result = await axios.get('/blog', {
                params: {
                    search: '',
                    page: currentBlogPage,
                    limit: blogPageSize
                }
            })

            if (result.data.success) {
                setBlogData(result?.data?.data.blogs.data)
                setTotalBlogCount(result?.data?.data.blogs?.count)
                setTotalBlogPage(result?.data?.data.blogs?.totalPage)
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    useEffect(() => {
        getAllBlog()
    }, [currentBlogPage, blogPageSize])


    const removeItem = async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let result = await axios.delete('blog/' + id)
                    if (result.data.success) {
                        getAllBlog()
                        toast.success('Deleted Successfully')
                    }
                }
            })

        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }



    return (
        <div className='mx-auto max-w-7xl w-full px-4'>

            <div className="flex items-baseline justify-between  pb-6 pt-5">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Blogs</h1>
                <button onClick={() => {
                    navigate('/dashboard/blog/addblog')
                }} className='bg-blue-800 p-3 rounded-md text-white font-semibold px-4'>Add Blog</button>
            </div>

            <div>
                <input className='border p-2' type='string' placeholder='Search' onChange={(e) => {
                    setKeyword(e.target.value)
                    setCurrentBlogPage(1)
                }} />
            </div>

            <div className='w-full my-5  bg-white'>
                <table className="table-auto w-full rounded-lg border text-left ">
                    <thead className='font-semibold border-b bg-blue-100'>
                        <tr className='opacity-75'>
                            <th className='p-3'>S.N</th>
                            <th className='p-3'>Name</th>
                            <th className='p-3'>Short description</th>
                            <th className='p-3'>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogData &&
                            (blogData?.length === 0 ?
                                <p className='p-5 font-semibold text-red-800'>No Data</p> :
                                blogData?.map((value, index) => (
                                    <tr key={index} className='border-b'>
                                        <td className='p-3'>{index + 1}</td>
                                        <td className='p-3'>{value?.title}</td>
                                        <td className='p-3'>{value?.description}</td>
                                        <td className='p-3 flex gap-2 flex-wrap max-w-fit'>
                                            <button className='bg-red-700 text-white p-2 rounded' onClick={() => {
                                                removeItem(value._id)
                                            }}><FaTrashAlt /></button>
                                            <button onClick={() => {
                                                navigate('/dashboard/blog/editblog/' + value._id)
                                            }} className='bg-blue-700 text-white p-2 rounded'>
                                                <FaEdit />
                                            </button>
                                        </td>
                                    </tr>
                                )))
                        }

                    </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
                        <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div className='text-sm text-gray-700'>
                            <p className="font-semibold">
                                {totalBlogCount} Total Results
                            </p>
                        </div>
                        <div className='flex flex-wrap items-center gap-3'>
                            <label>Showing</label>
                            <select defaultValue={blogPageSize} className='border rounded py-1' onChange={(e) => {
                                setCurrentBlogPage(1)
                                setBlogPageSize(e.target.value)
                            }}>
                                <option>1</option>
                                <option>5</option>
                                <option>10</option>
                                <option>20</option>
                            </select>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    disabled={currentBlogPage === 1}
                                    onClick={() => {
                                        setCurrentBlogPage(currentBlogPage - 1)
                                    }} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0">
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <p className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0">
                                    Page {currentBlogPage} of {totalBlogPage}
                                </p>

                                <button
                                    disabled={currentBlogPage === totalBlogPage}
                                    onClick={() => {
                                        setCurrentBlogPage(currentBlogPage + 1)
                                    }} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0">
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default AdminBlog
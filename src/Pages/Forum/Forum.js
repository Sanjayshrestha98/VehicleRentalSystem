import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../axios'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import { AuthContext } from '../../context/authContext';

function Forum() {

    const { isAuthenticated } = useContext(AuthContext)

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const openAddModal = () => {
        setIsAddModalOpen(true)
    }
    const closeAddModal = () => {
        setIsAddModalOpen(false)
    }

    const [forumData, setForumData] = useState()

    const getForumDetail = async (values, actions) => {
        try {
            let result = await axios.get('/online-forum/forums'
                // , {
                //     params: {
                //         title: "asd"
                //     }
                // }
            )
            if (result.data.success) {
                setForumData(result?.data?.data?.onlineForums?.data)
            }

        } catch (ERR) {
            toast.error('ERR')
            console.log(ERR)
        }
    }

    useEffect(() => {
        getForumDetail()
    }, [])


    return (
        <div className='max-w-7xl mx-auto py-10 px-5 mb-10'>

            <h1 className='lg:text-6xl text-4xl font-bold text-center mt-10'>Forum</h1>

            <p className='my-10 text-center text-xl opacity-75 leading-8'>AJH Sports has been in business for 40+ years managed by level 3 Tennis Professional Andrew Hill. Andrew has provided guidance, equiptment and facilities Australia wide for tennis, table tennis and modified sports.</p>

            {
                isAuthenticated &&
                <div className='w-full flex justify-end'>
                    <Link to={"/forum/addforum"} className='p-3  bg-blue-600 rounded-md font-semibold px-5 text-white'>Add a Post</Link>
                </div>
            }

            {/* <div className='my-4 mb-10 grid gap-2'>
                <label className='font-semibold'>Search</label>
                <input className='inputfield'></input>
            </div> */}

            {/* <div className='grid mt-4'>
                {
                    forumData?.map((value, index) => (
                        <Link to={"/forum/" + value?.slug} key={index} className='p-2 border shadow rounded-md mb-5'>
                            <p>{value?.title}</p>
                            <p>Posted By {value?.postedBy?.firstname} {value?.postedBy?.lastname}</p>
                            <p>Posted On: {dayjs(value?.updatedAt).format("MMM D YYYY")}</p>
                            <p>Total Comments: </p>
                        </Link>
                    ))
                }
            </div> */}

            <ul role="list" className="divide-y divide-gray-100 px-5 mt-10">
                {forumData?.map((value) => (
                    <Link to={"/forum/" + value?._id} key={value.email} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`${process.env.REACT_APP_IMG_URI}${value?.postedBy.image}`} alt="" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900 capitalize">{value?.title}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Posted By: {value?.postedBy?.firstname} {value?.postedBy?.lastname}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{value.role}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Posted On: {dayjs(value?.updatedAt).format("MMM D YYYY")}
                            </p>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Forum
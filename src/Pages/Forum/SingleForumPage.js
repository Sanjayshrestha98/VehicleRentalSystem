import React, { useMemo, useState, useEffect, useRef, useContext } from 'react'

import ContentView from "react-froala-wysiwyg/FroalaEditorView";
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import axios from '../../axios'
import dayjs from 'dayjs';
import SuggestedPosts from '../Blog/SuggestedPosts';
import { AuthContext } from '../../context/authContext';
import ReplyModal from './ReplyModal';
import RecursiveReplies from './RecursiveReplies';

function SingleForumPage() {

    const { isAuthenticated } = useContext(AuthContext)

    const location = useLocation()
    const router = useNavigate()

    const forumId = location.pathname.split('/').pop()
    const [randomForumData, setRandomForumData] = useState()

    const [forumData, setForumData] = useState()
    const [commentData, setCommentData] = useState()
    const [comment, setComment] = useState()

    const [showAddReply, setShowAddReply] = useState(false)
    const [selectedComment, setSelectedComment] = useState(false)

    const closeReplyModal = () => {
        setSelectedComment('')
        setShowAddReply(false)
    }

    const getForum = async () => {
        try {
            let result = await axios.get('/online-forum/' + forumId)

            if (result.data.success) {
                setForumData(result?.data?.data)
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    const getComments = async () => {
        try {
            let result = await axios.get('/online-forum/comments/' + forumId)

            if (result.data.success) {
                setCommentData(result?.data?.data)
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    const postComment = async () => {
        try {
            let result = await axios.post('/online-forum/add-comment/' + forumId, {
                comment: comment
            })

            if (result.data.success) {
                toast.success('Commented Successfully')
                setComment('')
                getComments()
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }



    useEffect(() => {
        getForum()
        getComments()
    }, [forumId])

    return (
        <div className='max-w-7xl mx-auto'>

            {
                showAddReply &&
                <ReplyModal closeModal={closeReplyModal} data={selectedComment} modalIsOpen={showAddReply} forumId={forumId} getRoute={getComments} />
            }

            <title>{forumData?.title}</title>
            <div className='flex'>
                <div className='p-10 w-full min-h-screen'>
                    <div className='mb-5'>
                        <h1 className='text-4xl font-bold '>{forumData?.title}</h1>
                        <p className='text-sm text-gray-500 mt-2'>{dayjs(forumData?.updatedAt).format('D MMMM, YYYY')}</p>
                    </div>

                    <div className='grid grid-cols-1 gap-5'>
                        <div className='mt-5'>
                            <ContentView model={forumData?.content} />
                        </div>
                    </div>

                    {
                        isAuthenticated &&

                        <div className='mt-10'>
                            <label className='font-semibold'>Leave A Comment</label>
                            <textarea value={comment} className='inputfield mt-2' onChange={(e) => {
                                setComment(e.target.value)
                            }} />

                            <button onClick={() => {
                                postComment()
                            }} className='px-4 py-2 bg-blue-700 mt-2 rounded-md font-semibold text-white'>Post</button>
                        </div>
                    }

                    <div className="py-12  flex justify-center items-center">
                        <div className="flex flex-col justify-start items-start w-full space-y-8">
                            <div className="flex justify-start items-start">
                                <p className="text-2xl lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-800">Discussions</p>
                            </div>

                            {
                                commentData?.comments.map((value, index) => (

                                    <div key={index} className="w-full flex justify-start items-start flex-col bg-gray-50 p-8 relative">

                                        <div className={"md:block "}>

                                            <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                                                <div>
                                                    <img src={`${process.env.REACT_APP_IMG_URI}${value?.postedBy[0]?.image}`} alt="girl-avatar" className='h-10 rounded-full' />
                                                </div>
                                                <div className="flex flex-col justify-start items-start space-y-2">
                                                    <p className="text-base font-medium leading-none text-gray-800">{value?.postedBy[0].firstname} {value?.postedBy[0].lastname}</p>
                                                    <p className="text-sm leading-none text-gray-600">{dayjs(value?.updatedAt).format('D MMMM, YYYY')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-start items-start flex-col bg-gray-50 md:px-8 py-8 !pt-4 relative">
                                            <p className="text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6 pl-3">{value?.comment}</p>
                                            <div className='h-full rounded-bl-2xl border-b border-l absolute w-full top-0 left-5 z-0' />

                                            {
                                                isAuthenticated &&

                                                <button className='btn-primary z-10 !p-2 !px-4 !ml-3' onClick={() => {
                                                    setSelectedComment(value)
                                                    setShowAddReply(true)
                                                }}>Reply</button>
                                            }

                                            <div className={"z-10 mt-3"}>

                                                {
                                                    value?.replies?.map((reply, index) => (

                                                        <RecursiveReplies reply={reply} setSelectedComment={setSelectedComment} showAddReply={showAddReply} setShowAddReply={setShowAddReply} isAuthenticated={isAuthenticated} />

                                                        // <div key={index} className="mt-6  justify-start items-center flex-row space-x-2.5">
                                                        //     <div className='flex gap-3'>
                                                        //         <img src={`${process.env.REACT_APP_IMG_URI}${reply?.postedBy[0]?.image}`} alt="girl-avatar" className='h-10 rounded-full' />
                                                        //         <div className="flex flex-col justify-start items-start space-y-2">
                                                        //             <p className="text-base font-medium leading-none text-gray-800">{reply?.postedBy[0].firstname} {reply?.postedBy[0].lastname}</p>
                                                        //             <p className="text-sm leading-none text-gray-600">{dayjs(reply?.updatedAt).format('D MMMM, YYYY')}</p>
                                                        //         </div>
                                                        //     </div>
                                                        //     <p className="text-base px-10 mt-4 leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">{reply?.comment}</p>

                                                        //     <div className="w-full flex justify-start items-start flex-col bg-gray-50 md:px-8 pb-4">
                                                        //         <div className={""}>

                                                        //             <div className='flex gap-3'>
                                                        //                 <button className='btn-primary !p-2 !px-4' onClick={() => {
                                                        //                     setSelectedComment(reply)
                                                        //                     setShowAddReply(true)
                                                        //                 }}>Reply</button>
                                                        //                 {
                                                        //                     reply?.replies?.length > 0 &&
                                                        //                     <button className='btn-primary !p-2 !px-4' onClick={() => {
                                                        //                         viewMoreReplies(reply._id)
                                                        //                     }}>View Replies</button>
                                                        //                 }
                                                        //             </div>

                                                        //         </div>
                                                        //     </div>

                                                        // </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}

export default SingleForumPage
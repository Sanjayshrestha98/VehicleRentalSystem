import axios from '../../axios'
import dayjs from 'dayjs'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'

function RecursiveReplies({ reply, setSelectedComment, showAddReply, setShowAddReply, isAuthenticated }) {

    const [comment, setComment] = useState()
    const [replyList, setReplyList] = useState([])

    const viewMoreReplies = async (commentId, actions) => {
        try {
            let result = await axios.get('/online-forum/replies/' + commentId, {
                comment: comment
            })

            if (result.data.success) {
                setReplyList(result.data.data.comments)
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    return (
        <>
            <div className="pt-6  justify-start items-center flex-row space-x-2.5">
                <div className='flex gap-3'>
                    <img src={`${process.env.REACT_APP_IMG_URI}${reply?.postedBy[0]?.image}`} alt="girl-avatar" className='h-10 rounded-full' />
                    <div className="flex flex-col justify-start items-start space-y-2">
                        <p className="text-base font-medium leading-none text-gray-800">{reply?.postedBy[0].firstname} {reply?.postedBy[0].lastname}</p>
                        <p className="text-sm leading-none text-gray-600">{dayjs(reply?.updatedAt).format('D MMMM, YYYY')}</p>
                    </div>
                </div>
                <p className="text-base px-10 mt-4 leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">{reply?.comment}</p>

                <div className="w-full flex justify-start items-start flex-col bg-gray-50 md:px-8 pb-4">
                    <div className={""}>

                        <div className='flex gap-3'>
                            {
                                isAuthenticated &&

                                <button className='btn-primary !p-2 !px-4' onClick={() => {
                                    setSelectedComment(reply)
                                    setShowAddReply(true)
                                }}>Reply</button>
                            }
                            {
                                reply?.replies?.length > 0 &&
                                <button className='btn-primary !p-2 !px-4' onClick={() => {
                                    viewMoreReplies(reply._id)
                                }}>View Replies</button>
                            }
                        </div>

                        {
                            replyList?.map((reply, index) => (
                                <RecursiveReplies reply={reply} index={index} setSelectedComment={setSelectedComment} showAddReply={showAddReply} setShowAddReply={setShowAddReply} isAuthenticated={isAuthenticated} />

                                // <div className="mt-6  justify-start items-center flex-row space-x-2.5">
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
                                //                 {
                                //                     isAuthenticated &&

                                //                     <button className='btn-primary !p-2 !px-4' onClick={() => {
                                //                         setSelectedComment(reply)
                                //                         setShowAddReply(true)
                                //                     }}>Reply</button>
                                //                 }
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
        </>
    )
}

export default RecursiveReplies
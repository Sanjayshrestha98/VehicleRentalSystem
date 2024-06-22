import axios from '../../axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'

function ReplyModal({ modalIsOpen, closeModal, data, forumId, getRoute }) {
    const [reply, setReply] = useState()


    const postReply = async (parentComment) => {
        try {
            let result = await axios.post('/online-forum/add-comment/' + forumId, {
                comment: reply,
                parentComment: parentComment,
            })

            if (result.data.success) {
                toast.success('Replied Successfully')
                setReply('')
                getRoute()
                closeModal()
                // setRandomForumData(result?.data?.data?.content)
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }
    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Add User Modal"
            overlayClassName="Overlay"
            className="Modal outline-none rounded-md p-5 md:w-2/4 max-h-screen overflow-auto"
        >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 capitalize">{data.eventName}</h1>

            <div className='border-b my-3'></div>

            <div className='mt-2 w-full'>
                <label className='font-semibold'>Reply</label>

                <textarea value={reply} className='inputfield mt-2' onChange={(e) => {
                    setReply(e.target.value)
                }} />

                <button onClick={() => {
                    postReply(data?._id)
                }} className='px-4 py-2 bg-blue-700 mt-2 rounded-md font-semibold text-white'>Post</button>
            </div>


        </Modal>
    )
}

export default ReplyModal
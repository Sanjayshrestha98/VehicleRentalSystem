import React from 'react'
import Modal from 'react-modal'

function EventDescModal({ modalIsOpen, closeModal, data }) {
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
            
            <p>
                {data.eventDescription}
            </p>


        </Modal>
    )
}

export default EventDescModal
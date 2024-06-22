import axios from '../../axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'

function EventRegister({ data, modalIsOpen, closeModal }) {

  const register = async () => {
    try {
      let result = await axios.post('/event-register', {
        event: data?._id
      })

      if (result.data.success) {
        toast.success('Registration Successfull')
        closeModal()
      } else toast.error('Failed')
    } catch (ERR) {
      console.log(ERR)
      toast.error(ERR.response.data.message)
      closeModal()
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Choose Option"
      overlayClassName="Overlay"
      className="Modal rounded-md p-5 md:w-2/4 max-h-screen overflow-auto"
    >

      <p className='font-semibold'>Event Registration </p>

      <div className='grid gap-2 mt-4'>

        Are you sure you want to register?

        <div className='col-span-full mt-4 flex gap-3 items-center'>
          <button
            onClick={() => {
              register()
            }}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
          <button
            onClick={closeModal}
            type="button"
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default EventRegister
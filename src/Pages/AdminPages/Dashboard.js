import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiTennisBall, BiUser } from 'react-icons/bi'
import { FaBoxes, FaShoppingBag, FaShoppingCart, FaBlog } from 'react-icons/fa'
import { MdEventSeat } from 'react-icons/md'

function Dashboard() {
  const [totalEventCount, setTotalEventCount] = useState(0)
  const [totalBlogCount, setTotalBlogCount] = useState(0)
  const [totalContactCount, setTotalContactCount] = useState(0)
  const [totalSessionsCount, setTotalSessionsCount] = useState(0)


  console.log('totalBlogCount', totalBlogCount)

  const getAllSessions = async () => {
    try {
      let result = await axios.get('/coaching', {
        params: {
          search: "",
          page: 1,
          limit: 10
        }
      })

      if (result.data.success) {
        setTotalSessionsCount(result.data.data.count)
      } else toast.error('Failed')
    } catch (ERR) {
      console.log(ERR)
      // toast.error(ERR.response.data.message)
    }
  }

  const getAllContact = async (values, actions) => {
    try {
      let result = await axios.get('/contact', {
        params: {
          search: "",
          page: 1,
          limit: 10
        }
      })

      if (result.data.success) {
        setTotalContactCount(result?.data?.data.count)
      } else toast.error('Failed')

    } catch (ERR) {
      console.log(ERR)
      // toast.error(ERR.response.data.message)
    }
  }

  const getAllBlog = async () => {
    try {
      let result = await axios.get('/blog', {
        params: {
          search: "",
          page: 1,
          limit: 10
        }
      })

      if (result.data.success) {
        setTotalBlogCount(result.data.data.blogs.count)
        console.log('result.data.blogs', result.data.data.blogs.count)
      } else toast.error('Failed')
    } catch (ERR) {
      console.log(ERR)
      // toast.error(ERR.response.data.message)
    }
  }

  const getAllEvents = async () => {
    try {
      let result = await axios.get('/event', {
        params: {
          search: "",
          page: 1,
          limit: 10
        }
      })

      if (result.data.success) {
        setTotalEventCount(result.data.data.count)
      } else toast.error('Failed')
    } catch (ERR) {
      console.log(ERR)
      // toast.error(ERR.response.data.message)
    }
  }

  useEffect(() => {
    getAllContact()
    getAllEvents()
    getAllSessions()
    getAllBlog()
  }, [])

  return (
    <div className='mx-auto max-w-7xl px-4'>

      <h1 className='text-4xl font-semibold'>Admin Dashboard</h1>

      <div className='grid md:grid-cols-2 gap-4 mt-10'>

        <div className='shadow p-3 py-10 bg-blue-100 flex flex-col items-center'>
          <label className='font-semibold text-xl flex items-center gap-3'><FaBlog /> Total Blogs</label>
          <label className='text-4xl mt-3 text-gray-500'>{totalBlogCount}</label>
        </div>
        <div className='shadow p-3 py-10 flex bg-yellow-200 flex-col items-center'>
          <label className='font-semibold text-xl flex items-center gap-3'><BiTennisBall /> Total Sessions</label>
          <label className='text-4xl mt-3 text-gray-500'>{totalSessionsCount}</label>
        </div>
        <div className='shadow p-3 py-10 flex bg-green-200 flex-col items-center'>
          <label className='font-semibold text-xl flex items-center gap-3'><BiUser /> Total Contact</label>
          <label className='text-4xl mt-3 text-gray-500'>{totalContactCount}</label>
        </div>
        <div className='shadow p-3 py-10 bg-orange-200 flex flex-col items-center'>
          <label className='font-semibold text-xl flex items-center gap-3'><MdEventSeat /> Total Events</label>
          <label className='text-4xl mt-3 text-gray-500'>{totalEventCount}</label>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
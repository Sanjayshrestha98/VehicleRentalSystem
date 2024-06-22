
import React, { useEffect, useState } from 'react'

import { FaArrowRight } from 'react-icons/fa'
import axios from '../../axios'
import toast from 'react-hot-toast'
import EventDescModal from '../../components/EventDescModal'
import EventRegister from './EventRegister'
import dayjs from 'dayjs'

function EventPage() {

    const data = [
        {
            day: "Daily",
            name: 'Kids Sports Parties',
            location: 'Kings Park',
        },
        {
            day: "Mon-Thu",
            name: 'Social Matches Meetup',
            location: 'Kings Park',
        },
        {
            day: "Daily",
            name: 'Kids Sports Parties',
            location: 'Kings Park',
        },
        {
            day: "Daily",
            name: 'Kids Sports Parties',
            location: 'Kings Park',
        },
    ]

    const [eventData, setEventData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedElement, setSelectedElement] = useState(false)
    const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
    }
    const closeRegistrationModal = () => {
        setRegisterModalIsOpen(false)
    }

    const getAllEvent = async () => {
        try {
            let result = await axios.get('/event', {
                params: {
                    search: "",
                    page: 1,
                    limit: 20
                }
            })

            if (result.data.success) {
                setEventData(result.data.data.data)
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    useEffect(() => {
        getAllEvent()
    }, [])


    return (
        <div className='lg:p-20 p-10 bg-left-bottom' style={{
            background: `url(/wave.png)`
        }}>

            {
                isModalOpen &&
                <EventDescModal closeModal={closeModal} data={selectedElement} modalIsOpen={isModalOpen} />
            }
            {
                registerModalIsOpen &&
                <EventRegister closeModal={closeRegistrationModal} data={selectedElement} modalIsOpen={registerModalIsOpen} />
            }

            <div className='text-center max-w-7xl mx-auto py-20'>
                <h1 className='text-4xl font-bold'>Our Events.</h1>
                <div className='mt-4 max-w-2xl mx-auto'>
                    <p className='lg:px-20 py-5 '>With lots of unique blocks, you can easily build a page without coding. Build your next landing page.</p>
                </div>

                <div className='grid xl:grid-cols-4 md:grid-cols-2 gap-6 text-left mt-10'>
                    {
                        eventData.map((value, index) => (
                            <div role='button' onClick={async () => {
                                await setSelectedElement(value)
                                setIsModalOpen(true)
                            }} key={index} className='border flex flex-col gap-10 h-72 bg-white p-5 justify-between rounded-lg shadow border-gray-50'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex items-center gap-2 '>
                                        {
                                            value.occurrence.map((occ, index) => (
                                                <label className='text-current uppercase font-bold text-sm border-b'>{occ}</label>
                                            ))
                                        }
                                    </div>
                                    {/* <label className='font-semibold text-sm capitalize'>{dayjs(value?.startDate).format('MMM DD YYYY')} - {dayjs(value?.endDate).format('MMM DD YYYY')}</label> */}
                                    <label className='font-semibold text-sm capitalize'>{dayjs(`1/1/1 ${value?.startTime}`).format('h:mm A')} - {dayjs(`1/1/1 ${value?.endTime}`).format('h:mm A')}</label>
                                    <label className='font-semibold text-xl capitalize'>{value?.eventName}</label>
                                    <label className='text-gray-400'>{value?.location}</label>
                                </div>
                                <div className='flex gap-4 items-center font-semibold' role='button' onClick={(e) => {
                                    setSelectedElement(value)
                                    setRegisterModalIsOpen(true)
                                    e.stopPropagation()
                                }}>
                                    <span className='bg-orange-500 p-2  rounded-full'><FaArrowRight /></span> Register Now</div>
                            </div>
                        ))
                    }
                    {/* {
                    data.map((value, index) => (
                        <div key={index} className='border flex flex-col gap-10 h-72 bg-white p-5 justify-between rounded-lg shadow border-gray-50'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-current uppercase font-bold text-sm'>{value?.day}</label>
                                <label className='font-semibold text-xl'>{value?.name}</label>
                                <label className='text-gray-400'>{value?.location}</label>
                            </div>
                            <div className='flex gap-4 items-center font-semibold'>
                                <button className='bg-orange-500 p-2  rounded-full'><FaArrowRight /></button> Register Now</div>
                        </div>
                    ))
                } */}

                </div>
            </div>
        </div>
    )
}

export default EventPage
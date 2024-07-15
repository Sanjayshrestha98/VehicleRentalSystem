import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function BookingSpending() {
 
    const [bookingDetails, setBookingDetails] = useState()
 
    const getData = async (values, actions) => {
        try {
            const result = await axios.get('/booking/my-booking-transaction/');

            if (result.data.success) {
                setBookingDetails(result.data.result)
                console.log(result.data.result)
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.response.data.msg)
        }
    };

    useEffect(() => {
        getData()
    }, [])


    const renderDiv = (data) => {
        switch (data._id) {
            case "null":
                return <>
                    <div className='grid place-items-center p-5 bg-gray-200 rounded-md'>
                        <span className='font-semibold'>Total Bookings</span>
                        <span>{data?.totalBooking}</span>
                    </div>
                    <div className='grid place-items-center p-5 bg-gray-200 rounded-md'>
                        <span className='font-semibold'>Total Amount</span>
                        <span>{data?.totalAmount}</span>
                    </div>
                </>
            case "two-wheeler":
                return <>
                    <div className='grid place-items-center p-5 bg-gray-200 rounded-md'>
                        <span className='font-semibold'>Two-Wheeler</span>
                        <span>{data?.totalBooking}</span>
                    </div>
                    <div className='grid place-items-center p-5 bg-gray-200 rounded-md'>
                        <span className='font-semibold'>Total Amount</span>
                        <span>{data?.totalAmount}</span>
                    </div>
                </>
            case "four-wheeler":
                return <>
                    <div className='grid place-items-center p-5 bg-gray-200 rounded-md'>
                        <span className='font-semibold'>Four Wheeler</span>
                        <span>{data?.totalBooking}</span>
                    </div>
                    <div className='grid place-items-center p-5 bg-gray-200 rounded-md'>
                        <span className='font-semibold'>Total Amount</span>
                        <span>{data?.totalAmount}</span>
                    </div>
                </>
            default:
                break;
        }
    }

    return (
        <div className='bg-white px-10 p-4 rounded-lg'>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Booking Spendings
                </h2>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">

                {
                    bookingDetails?.map((value) => (
                            renderDiv(value)
                    ))
                }


            </div>
        </div>
    )
}

export default BookingSpending
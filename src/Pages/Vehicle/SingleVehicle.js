import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

function SingleVehicle() {

    const { sku } = useParams()
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [vehicleData, setVehicleData] = useState()

    console.log('vehicleData', vehicleData)

    const getVehicleDetails = async () => {
        try {
            let result = await axios.get('/vehicle/' + sku)

            if (result.data.success) {
                setVehicleData(result.data.data)
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    useEffect(() => {
        getVehicleDetails()
    }, [])

    return (
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">

            <div className="">
                <img className="w-full" alt="img of a girl posing" src="https://i.ibb.co/QMdWfzX/component-image-one.png" />
                <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-2 overflow-x-auto">
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />
                </div>
            </div>
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm leading-none text-gray-600">Balenciaga Fall Collection</p>
                    <h1
                        className="
                        lg:text-2xl
                        text-xl
                        font-semibold
                        lg:leading-6
                        leading-7
                        text-gray-800
                        mt-2
                    "
                    >
                        Balenciaga Signature Sweatshirt
                    </h1>
                </div>
                <div className="border-b border-gray-200 py-6">
                    <p className=" text-gray-600">Experience the thrill of driving with this sleek and powerful Hyundai. Perfect for both city cruising and long-distance travels, this car offers exceptional comfort and performance.</p>

                </div>
                <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm leading-none text-gray-600">Key Feature</p>

                    <div className='grid grid-cols-3 justify-center gap-8 my-10 w-3/4'>
                        <div className='grid items-center justify-items-center gap-2'>
                            <div className='h-10 w-10 grid place-items-center p-2 rounded-full bg-gray-200'>
                                <img className='h-4 ' src='/seat.png' />
                            </div>
                            <p>{vehicleData?.seat} Seats</p>
                        </div>
                        <div className='grid items-center justify-items-center gap-2'>
                            <div className='h-10 w-10 grid place-items-center p-2 rounded-full bg-gray-200'>
                                <img className='h-4 ' src='/mileage.png' />
                            </div>
                            <p>{vehicleData?.mileage} Km/L</p>
                        </div>
                        <div className='grid items-center justify-items-center gap-2'>
                            <div className='h-10 w-10 grid place-items-center p-2 rounded-full bg-gray-200'>
                                <img className='h-4 ' src='/petrol.png' />
                            </div>
                            <p className='capitalize'>{vehicleData?.fuel_type}</p>
                        </div>
                        <div className='grid items-center justify-items-center gap-2'>
                            <div className='h-10 w-10 grid place-items-center p-2 rounded-full bg-gray-300'>
                                <img className='h-4 ' src='/engine.png' />
                            </div>
                            <p className='capitalize'>{vehicleData?.engine} Engine</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleVehicle
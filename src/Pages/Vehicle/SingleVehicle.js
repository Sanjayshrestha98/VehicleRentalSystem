import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiSolidStar, BiStar } from 'react-icons/bi'
import { CiCircleCheck } from 'react-icons/ci'
import Rating from 'react-rating'
import { useParams } from 'react-router-dom'

function SingleVehicle() {

    const { sku } = useParams()
    const [selectedImage, setSelectedImage] = useState();
    const [show2, setShow2] = useState(false);
    const [vehicleData, setVehicleData] = useState()

    console.log('vehicleData', vehicleData)

    const includedInPrice = [
        "Map",
        "Unlimited Mileage",
        "Theft Insurance"
    ]

    const getVehicleDetails = async () => {
        try {
            let result = await axios.get('/vehicle/' + sku)

            if (result.data.success) {
                setVehicleData(result.data.data)
                setSelectedImage(result.data.data.images[0])

            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // for smoothly scrolling
        });
    };

    useEffect(() => {
        getVehicleDetails()
        scrollToTop()
    }, [])

    return (
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4 container mx-auto">

            <div className="md:w-1/2">
                <img className="w-full md:h-96 h-72 object-contain" alt={vehicleData?.name} src={`${process.env.REACT_APP_IMG_URI}${selectedImage}`} />
                <div className="flex items-center  mt-3 space-x-4 md:space-x-2 overflow-x-auto">
                    {vehicleData?.images && vehicleData?.images.map((img) => (
                        <img onClick={() => {
                            setSelectedImage(img)
                        }} alt={vehicleData?.name} className={`md:w-48 md:h-48 h-20 w-full object-contain border-2 ${selectedImage === img ? "border-blue-600 shadow" : "border-gray-200"}`} src={`${process.env.REACT_APP_IMG_URI}${img}`} />
                    ))}
                </div>
            </div>
            <div className=" md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <Rating initialRating={4.5} step={1} readonly fullSymbol={<BiSolidStar size={20} fill='#FFA128' />} emptySymbol={<BiStar size={20} fill='#FFA128' />} />

                <div className="border-b border-gray-200 pb-6">
                    <h1
                        className="
                        lg:text-2xl
                        text-xl
                        font-semibold
                        lg:leading-6
                        leading-7
                        text-gray-800
                        mt-2
                        capitalize
                        "
                    >
                        {vehicleData?.name}
                    </h1>
                    <p className=" leading-none text-gray-600 mt-4">Rs. {vehicleData?.price}/Day</p>
                </div>
                <div className="border-b border-gray-200 py-6">
                    <p className=" text-gray-600">{vehicleData?.description}</p>

                </div>
                <div className="border-b border-gray-200 py-6">
                    <p className="text-lg leading-none font-semibold">Key Feature</p>

                    <div className='grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-2 justify-center gap-8 mt-10 mb-3 '>
                        <div className='flex items-center  gap-2'>
                            <div className='h-10 w-10 grid place-items-center p-2 rounded-full bg-gray-200'>
                                <img className='h-4 ' src='/seat.png' />
                            </div>
                            <div className='text-sm'>
                                <p className='uppercase font-semibold text-xs'>Passengers</p>
                                <p className='capitalize'>{vehicleData?.seat} Seats</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-items-center gap-2'>
                            <div className='h-10 w-10 grid place-items-center p-2 rounded-full bg-gray-200'>
                                <img className='h-4 ' src='/mileage.png' />
                            </div>
                            <div className='text-sm'>
                                <p className='uppercase font-semibold text-xs'>Mileage:</p>
                                <p className='capitalize'>{vehicleData?.mileage} Km/L</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-items-center gap-2'>
                            <div className='h-10 w-10 grid place-items-center p-2 rounded-full bg-gray-200'>
                                <img className='h-4 ' src='/year.png' />
                            </div>
                            <div className='text-sm'>
                                <p className='uppercase font-semibold text-xs'>Year:</p>
                                <p className='capitalize'>{vehicleData?.year} Model</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-items-center gap-2'>
                            <div className='h-10 w-10 grid place-items-center p-2 rounded-full bg-gray-200'>
                                <img className='h-4 ' src='/petrol.png' />
                            </div>
                            <div className='text-sm'>
                                <p className='uppercase font-semibold text-xs'>Fuel:</p>
                                <p className='capitalize'>{vehicleData?.fuel_type}</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-items-center gap-2'>
                            <div className='h-10 w-10 grid place-items-center p-2 rounded-full bg-gray-300'>
                                <img className='h-4 ' src='/engine.png' />
                            </div>
                            <div className='text-sm'>
                                <p className='uppercase font-semibold text-xs'>Engine:</p>
                                <p className='capitalize'>{vehicleData?.engine}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-200 py-6">
                    <p className="text-lg leading-none font-semibold">Included in the Price</p>

                    <ul className='mt-4'>
                        {
                            includedInPrice.map((value) => (
                                <li className='flex gap-2 items-center text-gray-600 mb-2'><CiCircleCheck color='green' size={20} /> {value}</li>
                            ))
                        }
                    </ul>
                </div>

                <div className="border-b border-gray-200 py-6">
                    <p className="text-lg leading-none font-semibold">Rental Policy</p>

                    <ul className='mt-4 pl-2'>

                        <li className='text-gray-600 mb-2'><b>Pay only 15% now,</b> and the rest at the destination.</li>
                        <li className='text-gray-600 mb-2'>Cancel up-to <b>48 hours before pick-up</b> and get a full refund.</li>
                        <li className='text-gray-600 mb-2'>This vehicle requires a licence category <b>A1,</b> or equivalent.</li>
                        <li className='text-gray-600 mb-2'>You’ll need to be at least <b>18 years old</b> to rent it with 12 months driving experience.</li>
                        <li className='text-gray-600 mb-2'>A <b>refundable</b> security-deposit is required ( 24 € debit-card, ) on pickup.</li>
                        <li className='text-gray-600 mb-2'>This car includes <b>unlimited mileage </b> per day in the price.</li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SingleVehicle
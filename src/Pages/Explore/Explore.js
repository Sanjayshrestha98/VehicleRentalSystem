import toast from 'react-hot-toast'
import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import Modal from 'react-modal'
import { BiLoader, BiSolidStar, BiStar } from 'react-icons/bi'
import { BsChevronDoubleRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Rating from 'react-rating'



function Explore() {

    const [vehicleData, setVehicleData] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [packageList, setPackageList] = useState()

    // const vehicleData = [{
    //     name: 'BYD',
    //     description: 'BYD',
    //     type: 'two-wheeler',
    //     seat: 2,
    //     sku: 'two-wheeler',
    //     price: 15000,
    //     engine: 'BYD',
    //     year: '2022',
    //     model: 'BYD',
    //     mileage: '25',
    //     fuel_type: 'petrol',
    //     images: ['car1.png'],
    //     is_active: true,
    //     is_deleted: false,
    // },
    // {
    //     name: 'BYD',
    //     description: 'BYD',
    //     type: 'four-wheeler',
    //     seat: 4,
    //     sku: 'fpous-wheeler',
    //     price: 50000,
    //     engine: 'BYD',
    //     year: '2021',
    //     model: 'BYD',
    //     mileage: '11',
    //     fuel_type: 'diesel',
    //     images: ['car1.png'],
    //     is_active: true,
    //     is_deleted: false,
    // }]


    const closeModal = () => {
        setModalIsOpen(false)
        setPackageList(undefined)
    }

    const getAllVehicle = async () => {
        try {
            let result = await axios.get("/vehicle", {
                // params: {
                //     search: keyword,
                //     page: currentVehiclePage,
                //     limit: vehiclePageSize,
                // },
            });

            if (result.data.success) {
                setVehicleData(result.data.data);
                // setTotalVehicleCount(result.data.totalCount);
                // setTotalVehiclePage(result.data.totalPage);
            } else toast.error("Failed");
        } catch (ERR) {
            console.log(ERR);
            toast.error(ERR.response.data.message);
        }
    }

    useEffect(() => {
        getAllVehicle()
    }, [])


    const makePayment = async (value, type) => {
        try {
            setIsLoading(true)
            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PL)

            // const body = {
            //     lesson_name: "",
            //     lesson: "lessoniD",
            //     lesson_type: "private",
            //     price: "400"
            // }
            const body = {
                lesson_name: value?.name,
                lesson: packageList?._id,
                lesson_type: type,
                price: value[type]
            }

            const response = await axios.post(`${process.env.REACT_APP_BASE_URI}booking/create-intent`, body)
            const result = stripe.redirectToCheckout({
                vehicleId: response.data.id
            })
            if ((await result).error) {
                setTimeout(() => {
                    setIsLoading(false)
                }, 500)
                console.log((await result).error)
            }
        } catch (error) {
            setTimeout(() => {
                setIsLoading(false)
                toast.error(error.response.data.message)
            }, 500)
            console.log(error)
        }
    }

    return (
        <div className='max-w-7xl mx-auto p-5'>

            {
                isLoading &&
                <div className='fixed h-screen top-0 w-full bg-black bg-opacity-65 z-[999999] grid place-items-center'>
                    <label className='flex items-center gap-3 font-semibold text-white'><BiLoader className='animate-spin' /> Loading... </label>
                </div>
            }

            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Choose Option"
                overlayClassName="Overlay"
                className="Modal rounded-md p-5 md:w-2/4 max-h-screen overflow-auto"
            >

                <p className='font-semibold'>Choose a Package of - "{packageList?.title}"</p>

                <div className='grid gap-2 mt-4'>

                    {
                        packageList?.price.map((value, index) => (
                            <div className='py-3 '>
                                <p className='font-semibold' key={index}>{value?.name}</p>
                                <div className='flex items-center gap-3 mt-1'>
                                    <div className='flex  hover:bg-blue-300 w-fit p-2 border border-blue-100 rounded ' role='button' onClick={() => {
                                        makePayment(value, "private")
                                    }}>
                                        <label>Private - </label>
                                        <p className='' key={index}> $ {value?.private}</p>
                                    </div>
                                    <div className='flex  hover:bg-blue-300 w-fit p-2 border rounded border-blue-100' role='button' onClick={() => {
                                        makePayment(value, "group")
                                    }}>
                                        <label>Group - </label>
                                        <p className='' key={index}> $ {value?.group}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Modal>

            <div className='max-w-7xl mx-auto py-10 px-5 mb-10'>
                <h1 className='lg:text-5xl text-4xl font-bold text-center '>Rent Your Dream Car and Bike</h1>
            </div>

            <div className='grid md:grid-cols-3 gap-7'>
                <select className='inputfield'>
                    <option>Sort By Vehicle type</option>
                </select>
                <select className='inputfield'>
                    <option>Filter By Price</option>
                </select>
                <input type='string' className='inputfield' placeholder='Search Here..............' />
            </div>

            <div className='grid md:grid-cols-3 gap-7 mt-10'>
                {
                    vehicleData &&
                    (vehicleData.length === 0 ?
                        <p className='p-5 font-semibold text-red-800'>No Vehicles Yet</p> :
                        vehicleData.map((value, index) => (
                            <div className={`  border rounded-2xl  overflow-hidden`}>
                                <div className='relative'>
                                    <span className='w-fit absolute bg-blue-800 top-4 right-4 p-1 px-4 text-sm text-white rounded-md'>{value?.year} model</span>
                                    {/* <img className='w-full h-64 mb-5 object-cover' src={`${value?.images[0]}`} /> */}
                                    <img className='w-full h-64 mb-5 object-cover' src={`${process.env.REACT_APP_IMG_URI}${value?.images[0]}`} />
                                </div>

                                <div className='p-3 px-4 text-center'>
                                    <Rating initialRating={4.5} step={1} readonly fullSymbol={<BiSolidStar size={20} fill='#FFA128' />} emptySymbol={<BiStar size={20} fill='#FFA128'/>} />
                                    <h2 className='lg:text-2xl text-xl font-bold mt-3'>{value?.name}</h2>
                                    <p> <b className='text-blue-700'>Rs. {value.price}</b> / Day</p>

                                    <div className='grid grid-cols-2 justify-center gap-8 my-10'>
                                        <div className='grid items-center justify-items-center gap-2'>
                                            <img className='h-5' src='/seat.png' />
                                            <p>{value?.seat} Seats</p>
                                        </div>
                                        <div className='grid items-center justify-items-center gap-2'>
                                            <img className='h-5' src='/mileage.png' />
                                            <p>{value?.mileage} Km/L</p>
                                        </div>
                                        <div className='grid items-center justify-items-center gap-2'>
                                            <img className='h-5' src='/petrol.png' />
                                            <p className='capitalize'>{value?.fuel_type}</p>
                                        </div>
                                        <div className='grid items-center justify-items-center gap-2'>
                                            <img className='h-5' src='/engine.png' />
                                            <p className='capitalize'>{value?.engine} Engine</p>
                                        </div>
                                    </div>
                                    <Link to={'/vehicle/' + value.sku} className='!justify-center gap-2 btn-primary rounded-xl w-full' onClick={() => {
                                        // setModalIsOpen(true)
                                        // setPackageList(value)
                                    }}>Book Now <BsChevronDoubleRight size={14} strokeWidth='1' /></Link>
                                </div>
                            </div>
                        )))
                }
            </div>
        </div >
    )
}

export default Explore
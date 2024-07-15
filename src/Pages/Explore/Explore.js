import toast from 'react-hot-toast'
import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import { BiLoader, BiSolidStar, BiStar } from 'react-icons/bi'
import { BsChevronDoubleRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Rating from 'react-rating'
import { Field, Form, Formik } from 'formik'

function Explore() {

    const [vehicleData, setVehicleData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [totalVehicleCount, setTotalVehicleCount] = useState(10)
    const [totalVehiclePage, setTotalVehiclePage] = useState(10)
    const [currentVehiclePage, setCurrentVehiclePage] = useState(1)
    const [vehiclePageSize, setVehiclePageSize] = useState(10)

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)
    const [vehicleType, setVehicleType] = useState("")

    // const getAllVehicle = async (min, max) => {
    //     try {
    //         let result = await axios.get("/vehicle", {
    //             params: {
    //                 search: keyword,
    //                 page: currentVehiclePage,
    //                 limit: vehiclePageSize,
    //                 min: min,
    //                 max: max,
    //                 type: vehicleType

    //             },
    //         });

    //         if (result.data.success) {
    //             setVehicleData(result.data.data);
    //             setTotalVehicleCount(result.data.totalCount);
    //             setTotalVehiclePage(result.data.totalPage);
    //         } else toast.error("Failed");
    //     } catch (ERR) {
    //         console.log(ERR);
    //         toast.error(ERR.response.data.msg);
    //     }
    // }

    const searchVehicle = async (values) => {
        try {
            let result = await axios.get("/vehicle/search", {
                params: {
                    pickup_date: values.pickup_date,
                    drop_date: values.drop_date,
                    type: values.type,
                    search: values.search,
                    min: values.min,
                    max: values.max,
                },
            });

            if (result.data.success) {
                setVehicleData(result.data.data);
                // setTotalVehicleCount(result.data.totalCount);
                // setTotalVehiclePage(result.data.totalPage);
            } else toast.error("Failed");
        } catch (ERR) {
            console.log(ERR);
            toast.error(ERR.response.data.msg);
        }
    }



    // useEffect(() => {
    //     getAllVehicle()
    // }, [keyword, totalVehiclePage, totalVehicleCount, vehicleType])



    return (
        <div className='max-w-7xl mx-auto p-5'>

            {
                isLoading &&
                <div className='fixed h-screen top-0 w-full bg-black bg-opacity-65 z-[999999] grid place-items-center'>
                    <label className='flex items-center gap-3 font-semibold text-white'><BiLoader className='animate-spin' /> Loading... </label>
                </div>
            }

            <div className='max-w-7xl mx-auto py-10 px-5 mb-10'>
                <h1 className='lg:text-5xl text-4xl font-bold text-center '>Rent Your Dream Car and Bike</h1>

                <Formik
                    initialValues={{
                        pickup_date: "",
                        drop_date: "",
                        type: "",
                        search: "",
                        min: "",
                        max: ""
                    }}
                    onSubmit={(values, actions) => {
                        searchVehicle(values, actions)
                    }}>
                    {(props) => (
                        <Form>
                            {console.log(props.values)}
                            <div className='grid grid-cols-3 gap-4 mt-10'>
                                <div className='w-full'>
                                    <label>Pickup Date</label>
                                    <Field className='inputfield mt-2' required name='pickup_date' type='date' />
                                </div>
                                <div className='w-full'>
                                    <label>Drop Date</label>
                                    <Field className='inputfield mt-2' required name='drop_date' type='date' min={props.values.pickup_date} />
                                </div>
                                <div className=' group relative'>
                                    <label>Filter By Price</label>
                                    <div className='flex bg-white w-full gap-2  mt-2 border'>

                                        <Field
                                            placeholder='Min'
                                            onChange={(e) => {
                                                setMinPrice(e.target.value)
                                            }}
                                            type="number"
                                            class="inputfield w-full"
                                            min="10"
                                            max="10000"
                                            step="1" />

                                        <Field
                                            placeholder='max'
                                            onChange={(e) => {
                                                setMaxPrice(e.target.value)
                                            }}
                                            type="number"
                                            class="inputfield w-full"
                                            min={minPrice}
                                            max="100000"
                                            step="1" />
                                    </div>
                                </div>

                                <div>
                                    <label>Search</label>

                                    <Field type='string' name="search" className='inputfield' placeholder='Search Here..............' />
                                </div>
                                <div className='w-full'>
                                    <label>Vehicle Type</label>
                                    <Field as="select" className='inputfield h-10' name='type'>
                                        <option value={""}>Sort By Vehicle type</option>
                                        <option value={"two-wheeler"}>Two Wheeler</option>
                                        <option value={"four-wheeler"}>Four-Wheeler</option>
                                    </Field>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <button className='mt-5 p-3 btn-primary px-5'>Submit</button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>


            <div>


                {/* <div className='grid md:grid-cols-3 gap-7'>
                    <select onChange={(e) => {
                        setVehicleType(e.target.value)
                    }} className='inputfield'>
                        <option value={""}>Sort By Vehicle type</option>
                        <option value={"two-wheeler"}>Two Wheeler</option>
                        <option value={"four-wheeler"}>Four-Wheeler</option>
                    </select>
                    <div className='inputfield group relative'>
                        <span>Filter By Price</span>
                        <div className='group-hover:h-fit z-10 group-hover:block h-0 hidden absolute bg-white p-5 border w-full left-0' >
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                getAllVehicle(minPrice, maxPrice)
                            }} className='flex flex-wrap gap-5'>
                                <div class="range-input">
                                    <p>Min</p>
                                    <input
                                        required
                                        onChange={(e) => {
                                            setMinPrice(e.target.value)
                                        }}
                                        type="number"
                                        class="inputfield"
                                        min="10"
                                        max="10000"
                                        step="1" />
                                </div>

                                <div class="range-input">
                                    <p>Max</p>
                                    <input
                                        required
                                        onChange={(e) => {
                                            setMaxPrice(e.target.value)
                                        }}
                                        type="number"
                                        class="inputfield"
                                        min={minPrice}
                                        max="100000"
                                        step="1" />
                                </div>
                                <button type="submit">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>

                    <input type='string' className='inputfield' onChange={(e) => {
                        setKeyword(e.target.value)
                    }} placeholder='Search Here..............' />
                </div> */}
                {
                    vehicleData &&
                    <>

                        <div className='max-w-7xl mx-auto  px-5 mb-10'>
                            <h1 className='text-xl font-bold text-center '>Search Results</h1>
                        </div>
                        <div className='grid md:grid-cols-3 gap-7 mt-10'>
                            {
                                (vehicleData.length === 0 ?
                                    <p className='p-5 font-semibold text-red-800'>No Vehicles Found</p> :
                                    vehicleData.map((value, index) => (
                                        <div className={`  border rounded-2xl  overflow-hidden`}>
                                            <div className='relative'>
                                                <span className='w-fit absolute bg-blue-800 top-4 right-4 p-1 px-4 text-sm text-white rounded-md'>{value?.year} model</span>
                                                {/* <img className='w-full h-64 mb-5 object-cover' src={`${value?.images[0]}`} /> */}
                                                <img className='w-full h-64 mb-5 object-cover' src={`${process.env.REACT_APP_IMG_URI}${value?.images[0]}`} />
                                            </div>

                                            <div className='p-3 px-4 text-center'>
                                                <Rating initialRating={value?.rating} step={1} readonly fullSymbol={<BiSolidStar size={20} fill='#FFA128' />} emptySymbol={<BiStar size={20} fill='#FFA128' />} />
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
                                                <Link to={'/vehicle/' + value.sku} className='!justify-center gap-2 btn-primary rounded-xl w-full'>Book Now <BsChevronDoubleRight size={14} strokeWidth='1' /></Link>
                                            </div>
                                        </div>
                                    )))
                            }
                        </div>
                    </>
                }
            </div>


        </div >
    )
}

export default Explore
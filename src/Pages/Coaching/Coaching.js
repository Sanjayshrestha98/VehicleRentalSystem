import toast from 'react-hot-toast'
import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import Modal from 'react-modal'
import { BiLoader } from 'react-icons/bi'

function Coaching() {

    const [sessionData, setSessionData] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [packageList, setPackageList] = useState()

    const closeModal = () => {
        setModalIsOpen(false)
        setPackageList(undefined)
    }

    const getAllSession = async () => {
        try {
            let result = await axios.get('/coaching', {
                params: {
                    page: 1,
                    limit: 20
                }
            })

            if (result.data.success) {
                setSessionData(result.data.data.data)
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    useEffect(() => {
        getAllSession()
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
                sessionId: response.data.id
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
        <div>

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
                <h1 className='lg:text-6xl text-4xl font-bold text-center mt-10'>Coaching</h1>

                <p className='my-10 text-center text-xl opacity-75 leading-8'>AJH Sports has been in business for 40+ years managed by level 3 Tennis Professional Andrew Hill. Andrew has provided guidance, equiptment and facilities Australia wide for tennis, table tennis and modified sports.</p>

                <div className='mt-5'>
                    <img src='/coaching.png' className='mx-auto w-full' />
                </div>
            </div>

            {
                sessionData &&
                (sessionData.length === 0 ?
                    <p className='p-5 font-semibold text-red-800'></p> :
                    sessionData.map((value, index) => (
                        <div className={`${(index % 2 === 0) && 'bg-[#F4F7FA]'} p-10 `}>
                            <div className='max-w-7xl mx-auto py-10'>
                                <h2 className='lg:text-5xl text-3xl font-bold'>{value?.title}</h2>

                                <div>
                                    <img className='w-full  h-96 my-10 object-cover shadow rounded' src={`${process.env.REACT_APP_IMG_URI}${value?.image}`} />
                                </div>

                                <p className='p-3 my-5'>{value?.description}</p>

                                <table class="table-auto mx-auto text-left shadow rounded overflow-hidden border">
                                    <thead>
                                        <tr className='bg-[#F8F8F8]'>
                                            <th className='border py-2 px-5'> </th>
                                            {
                                                value?.price.map((value, index) => (
                                                    <th className='border py-2 px-5' key={index}>{value?.name}</th>
                                                ))
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='bg-white'>
                                            <td className='border py-2 px-5'>Private</td>
                                            {
                                                value?.price.map((value, index) => (
                                                    <td className='border py-2 px-5' key={index}>$ {value?.private}</td>
                                                ))
                                            }
                                        </tr>
                                        <tr className='bg-[#F8F8F8]'>
                                            <td className='border py-2 px-5'>Group</td>
                                            {
                                                value?.price.map((value, index) => (
                                                    <td className='border py-2 px-5' key={index}>$ {value?.group}</td>
                                                ))
                                            }
                                        </tr>
                                    </tbody>
                                </table>

                                <button className='mx-auto btn-primary' onClick={() => {
                                    setModalIsOpen(true)
                                    setPackageList(value)
                                }}>Register Now</button>

                            </div>
                        </div>
                    )))
            }

        </div >
    )
}

export default Coaching
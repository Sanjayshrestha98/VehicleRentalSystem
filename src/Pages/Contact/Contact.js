import axios from '../../axios'
import { Field, Form, Formik } from 'formik'
import toast from 'react-hot-toast'
import { CgMail } from 'react-icons/cg'
import { FaLocationDot, FaLocationPin } from 'react-icons/fa6'
import { HiPhone } from 'react-icons/hi'

function Contact() {

    const handleFormSubmit = async (values, actions) => {
        try {
            let result = await axios.post('/contact', values)

            if (result.data.success) {
                toast.success('Message Submitted Successfully')
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    return (
        <>
            <div className="mx-auto  relative overflow-hidden">
                <img src='./contactbg.png' className='w-full h-72 object-cover' />
                <div className='absolute top-1/2 left-10 -translate-y-1/2 text-white w-full'>
                    <div className='max-w-6xl mx-auto'>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h2>
                    </div>
                </div>
            </div>
            <div className='flex py-10 justify-center divide-x-2 divide-gray-400 gap-4'>
                <div className="isolate  px-6 pb-10">
                    <Formik
                        enableReinitialize
                        initialValues={{

                            fullname: "",
                            email: "",
                            mobile_no: "",
                            message: "",
                        }}
                        onSubmit={(values, actions) => {

                            const newvalues = values
                            newvalues.fullname = `${values.firstname} ${values.lastname}`

                            handleFormSubmit(newvalues, actions);
                        }}>

                        {
                            (props) => (

                                <Form className="mx-auto max-w-xl  ">
                                    <p className='mb-10'>Contact us about anything related to our company or services. We’ll do our best to get back to you as soon as possible.</p>

                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="firstname" className="block text-sm font-semibold leading-6 text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2.5">
                                                <Field
                                                    type="text"
                                                    name="firstname"
                                                    id="firstname"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="lastname" className="block text-sm font-semibold leading-6 text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2.5">
                                                <Field
                                                    type="text"
                                                    name="lastname"
                                                    id="lastname"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                                Email
                                            </label>
                                            <div className="mt-2.5">
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="mobile_no" className="block text-sm font-semibold leading-6 text-gray-900">
                                                Phone number
                                            </label>
                                            <div className="relative mt-2.5">
                                                <div className="absolute inset-y-0 left-0 flex items-center">
                                                    <label htmlFor="country" className="sr-only">
                                                        Country Code
                                                    </label>
                                                    <p
                                                        disabled
                                                        id="country"
                                                        name="country"
                                                        className="h-full rounded-md border-0 bg-transparent bg-none py-2.5 pl-4 pr-1 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                    >
                                                        +977
                                                    </p>
                                                </div>
                                                <Field
                                                    type="tel"
                                                    name="mobile_no"
                                                    id="mobile_no"
                                                    autoComplete="tel"
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 pl-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                                Message
                                            </label>
                                            <div className="mt-2.5">
                                                <Field
                                                    as="textarea"
                                                    name="message"
                                                    id="message"
                                                    rows={4}
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue={''}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-10">
                                        <button
                                            type="submit"
                                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                <div className="isolate  px-6  lg:px-8">
                    <img src='./contact1.png' />
                    <div className='text-center md:text-2xl mt-4'> <p><b className=''>GO RIDE</b><br />Drive Your Adventure</p></div>

                    <ul className='mt-4'>
                        <li className='flex items-center justify-center gap-3 md:text-xl text-sm'> <span><FaLocationDot color='blue' size={20} /></span>  Kathmandu Nepal</li>
                        <li className='flex items-center justify-center gap-3 md:text-xl text-sm'> <span><HiPhone color='blue' size={20} /></span>  +977-9000000075</li>
                        <li className='flex items-center justify-center gap-3 md:text-xl text-sm'> <span><CgMail color='blue' size={20} /></span>  goride@gmail.com</li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Contact
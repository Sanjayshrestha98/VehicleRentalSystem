import axios from '../../../axios'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import * as yup from 'yup';
import FieldError from '../../../components/FieldError'
import Select from 'react-select'
import dayjs from 'dayjs'
import ReactSelect from '../../../components/ReactSelect'

function EditVehicle({ modalIsOpen, closeModal, getRoute, data }) {

    const handleFormSubmit = async (values, actions) => {
        try {
            let result = await axios.put('/vehicle/' + data?.vehicleSlug, values)

            if (result.data.success) {
                toast.success('Vehicle Edited Successfully')
                closeModal()
                getRoute()
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.message)
        }
    }

    const validationSchema = yup.object({
        vehicleName: yup.string()
            .required('This Field is required'),
        vehicleDescription: yup.string()
            .required('This Field is required'),
        startDate: yup.string()
            .required('This Field is required'),
        endDate: yup.string()
            .required('This Field is required'),
        startTime: yup.string()
            .required('This Field is required'),
        endTime: yup.string()
            .required('This Field is required'),
        location: yup.string()
            .required('This Field is required'),
        occurrence: yup.array().of(yup.string().required('This Field is required')),
    });

    const occurrenceType = [
        {
            value: "weekdays",
            label: "Week Days"
        },
        {
            value: "weekends",
            label: "Weekends"
        },
        {
            value: "sun",
            label: "Sunday"
        },
        {
            value: "mon",
            label: "Monday"
        },
        {
            value: "tue",
            label: "Tuesday"
        },
        {
            value: "wed",
            label: "Wednesday"
        },
        {
            value: "thrus",
            label: "Thursday"
        },
        {
            value: "fri",
            label: "Friday"
        },
        {
            value: "sat",
            label: "Saturday"
        },
    ]

    const [selectedOccurence, setSelectedOccurence] = useState(data?.occurrence)

    const [selectedOptions, setSelectedOptions] = useState()

    const handleOption = (data) => {
        let newData = occurrenceType.filter(option => data.includes(option.value))
    }


    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Edit Vehicle Modal"
            overlayClassName="Overlay"
            className="Modal rounded-md p-5 md:w-2/4 max-h-screen overflow-auto"
        >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Edit Vehicle</h1>

            <div className='mt-4'>
                <Formik
                    enableReinitialize
                    initialValues={{
                        vehicleName: data?.vehicleName,
                        vehicleDescription: data?.vehicleDescription,
                        startDate: dayjs(data?.startDate).format('YYYY-MM-DD'),
                        endDate: dayjs(data?.endDate).format('YYYY-MM-DD'),
                        startTime: data?.startTime,
                        endTime: data?.endTime,
                        occurrence: data?.occurrence,
                        location: data?.location,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        handleFormSubmit(values, actions);
                    }}
                >
                    {(props) => (
                        <Form className='gap-3 grid grid-cols-2'>
                            <div className=''>
                                <label htmlFor="vehicleName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Vehicle Name
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="vehicleName"
                                        name="vehicleName"
                                        autoComplete="vehicleName"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <FieldError message={props.touched.vehicleName && props.errors.vehicleName} />

                            </div>
                            <div>
                                <label htmlFor="vehicleDescription" className="block text-sm font-medium leading-6 text-gray-900">
                                    Vehicle Description
                                </label>
                                <div className="mt-2">
                                    <Field
                                        as="textarea"
                                        id="vehicleDescription"
                                        name="vehicleDescription"
                                        autoComplete="vehicleDescription"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <FieldError message={props.touched.vehicleDescription && props.errors.vehicleDescription} />
                            </div>

                            <div className=''>
                                <label htmlFor="startDate" className="block  text-sm font-medium leading-6 text-gray-900">
                                    Start Date
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        autoComplete="startDate"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <FieldError message={props.touched.startDate && props.errors.startDate} />

                            </div>
                            <div className=''>
                                <label htmlFor="endDate" className="block  text-sm font-medium leading-6 text-gray-900">
                                    End Date
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        autoComplete="endDate"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <FieldError message={props.touched.endDate && props.errors.endDate} />

                            </div>
                            <div className=''>
                                <label htmlFor="startTime" className="block  text-sm font-medium leading-6 text-gray-900">
                                    Start Time
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="time"
                                        id="startTime"
                                        name="startTime"
                                        autoComplete="startTime"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <FieldError message={props.touched.startTime && props.errors.startTime} />

                            </div>
                            <div className=''>
                                <label htmlFor="endTime" className="block  text-sm font-medium leading-6 text-gray-900">
                                    End Time
                                </label>
                                <div className="mt-2">
                                    <Field
                                        type="time"
                                        id="endTime"
                                        name="endTime"
                                        autoComplete="endTime"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <FieldError message={props.touched.endTime && props.errors.endTime} />

                            </div>

                            <div className='col-span-full text-center opacity-15'>
                                ------------
                            </div>

                            <div className=''>
                                <label htmlFor="occurrence" className="block  text-sm font-medium leading-6 text-gray-900">
                                    Occurrence
                                </label>
                                <div className="mt-2">

                                    <Field
                                        className="my-2"
                                        name="occurrence"
                                        isMulti={true}
                                        component={ReactSelect}
                                        options={occurrenceType} />
                                </div>
                                <FieldError message={props.touched.occurrence && props.errors.occurrence} />

                            </div>

                            <div className=''>
                                <label htmlFor="location" className="block  text-sm font-medium leading-6 text-gray-900">
                                    Location
                                </label>
                                <div className="mt-2">
                                    <Field
                                        className="inputfield"
                                        name="location"
                                        required
                                    />

                                </div>
                                <FieldError message={props.touched.location && props.errors.location} />
                            </div>


                            <div className='col-span-full mt-4'>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                            </div>


                        </Form>
                    )}
                </Formik>
            </div>

        </Modal>
    )
}

export default EditVehicle
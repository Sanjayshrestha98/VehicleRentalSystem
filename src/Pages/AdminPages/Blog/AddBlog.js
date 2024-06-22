import React, { useMemo, useState, useEffect, useRef } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-hot-toast'
import axios from '../../../axios'
import { useNavigate } from 'react-router-dom'
import ContentEditor from "../../../content_editor/ContentEditor"

function AddBlog() {

    const router = useNavigate()
    const [image, setImage] = useState()
    const [contentData, setContentData] = useState()
    const uploadRef = useRef(null)

    const addBlogDetail = async (values, actions) => {
        try {
            const formData = new FormData()
            // values.content = contentData
            // values.image = image
            for (let value in values) {
                if (typeof values[value] === 'object') {
                    formData.append(value, JSON.stringify(values[value]))
                } else {
                    formData.append(value, values[value])
                }
            }

            if (contentData) {
                formData.append('content', contentData)
            }

            if (image) {
                formData.append('image', image)
                let result = await axios.post('/blog/', formData)
                if (result.data.success) {
                    toast.success('Blog Added.')
                    router('/dashboard/blog')
                } else toast.error('Failed')
            } else toast.error('Please Select A Image')


        } catch (ERR) {
            toast.error('ERR')
            console.log(ERR)
        }
    }

    const handleImage = (value) => {
        if (value) {
            setImage(value)
        }
    }

    const handleButtonClick = () => {
        // Access and interact with the DOM element
        if (uploadRef.current) {
            uploadRef.current.click()
        }
    }
    const handleModelChange = (data) => {
        setContentData(data)
    }

    const initialValues = {
        title: '',
        description: '',
    }


    return (
        <div className='max-w-7xl mx-auto'>
            {/* <button
                className='flex items-center gap-2'
                onClick={() => {
                    router.back()
                }}
            >
                <ArrowLeft /> Go Back
            </button> */}
            <div className='mt-4 p-8  mx-auto border rounded  bg-white'>
                <div className='mb-5'>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Add Blog</h1>
                </div>

                <Formik
                    // enableReinitialize
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        addBlogDetail(values, actions)
                        // alert(JSON.stringify(values, null, 2));
                        // actions.setSubmitting(false);
                    }}
                >
                    {props => (
                        <Form>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                                <div className='col-span-full'>
                                    <span className='font-semibold btn'>Blog Title</span>
                                    <div className='mt-2'>
                                        <Field required value={props.values.title}

                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            // className='inputfield'
                                            name='title'
                                            id='title'
                                            placeholder='Blog Title' />


                                    </div>
                                </div>
                                {/* <div className=''>
                                    <span className='font-semibold'>Author</span>
                                    <div className='mt-2'>
                                        <Field required value={props.values.author} className='inputfield' name='author' id='author' placeholder='Blog Author' />
                                    </div>
                                </div> */}

                                <div className='col-span-full'>
                                    <span className='font-semibold'>Short Description</span>
                                    <div className='mt-2'>
                                        <Field
                                            as="textarea"
                                            required
                                            value={props.values.description}
                                            className='inputfield'
                                            name='description'
                                            id='description'
                                            placeholder='Short Description'
                                        />
                                    </div>
                                </div>

                                <div className=''>
                                    <span className='font-semibold'>Image</span>
                                    <div className='mt-2'>
                                        <input
                                            ref={uploadRef}
                                            type='file'
                                            accept="image/png, image/jpeg"
                                            onChange={(e) => handleImage(e.target.files[0])}
                                            className='inputfield hidden'
                                            name='image'
                                            id='image'
                                            placeholder='End Date'
                                        />
                                    </div>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            handleButtonClick()
                                        }}
                                        className='border-2 border-dashed w-full h-20'
                                    >
                                        Upload
                                    </button>
                                    {image && (
                                        <div
                                            className='relative w-fit'
                                            style={{
                                                height: '230px',
                                            }}
                                        >
                                            <img fill={true} alt='currentimage' placeholder="blur" blurDataURL={'/img/logo.png'} className='border !relative my-2 w-full h-full' src={URL.createObjectURL(image)} />

                                            <button
                                                type='button'
                                                onClick={() => {
                                                    setImage('')
                                                    uploadRef.current.value = ''
                                                }}
                                                className='absolute bottom-0 bg-red-400 w-full'>Remove</button>
                                        </div>
                                    )}
                                </div>

                                <div className='col-span-full'>
                                    <span className='font-semibold'>Blog Details</span>
                                    <div className='mt-2'>
                                        <ContentEditor allowPaste={true} model={contentData} handleModelChange={handleModelChange} />
                                    </div>
                                </div>
                            </div>

                            <div className='justify-end flex'>
                                <button type='submit' className='btn-primary mt-4'>
                                    Confirm
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AddBlog
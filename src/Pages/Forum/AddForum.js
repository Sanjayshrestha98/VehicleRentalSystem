import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { toast } from 'react-hot-toast'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'
import ContentEditor from "../../content_editor/ContentEditor"

function AddForum() {

    const router = useNavigate()
    const [contentData, setContentData] = useState()

    const addForumDetail = async (values, actions) => {
        try {

            values.content = contentData

            let result = await axios.post('/online-forum/', values)
            if (result.data.success) {
                toast.success('Forum Added.')
                router('/forum')
            }

        } catch (ERR) {
            toast.error('ERR')
            console.log(ERR)
        }
    }

    const handleModelChange = (data) => {
        setContentData(data)
    }

    const initialValues = {
        title: '',
    }

    return (
        <div className='max-w-7xl mx-auto'>
           
            <div className='mt-4 p-8  mx-auto border rounded  bg-white'>
                <div className='mb-5'>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Add Forum</h1>
                </div>

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        addForumDetail(values, actions)
                    }}
                >
                    {props => (
                        <Form>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                                <div className='col-span-full'>
                                    <span className='font-semibold btn'>Forum Title</span>
                                    <div className='mt-2'>
                                        <Field required value={props.values.title}

                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            name='title'
                                            id='title'
                                            placeholder='Forum Title' />


                                    </div>
                                </div>

                                <div className='col-span-full'>
                                    <span className='font-semibold'>Message</span>
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

export default AddForum
"use client"

import React, { useState, useId } from 'react'
import style from '../../styles/layout/form.module.scss'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useAppSelector } from '@/store/hooks'

interface SubmitSectionProps {
    title: string,
    signForm: boolean
}

const SubmitSection = ({ title, signForm }: SubmitSectionProps) => {

    const [checked, setChecked] = useState<boolean>(false)
    const checkboxId = useId()
    const { loading } = useAppSelector(state => state.authReducer)

    return (

        <>
            <div className={style['checkbox-section']}>
                {
                    signForm
                    &&
                    <>
                        <Input type='checkbox' className='form-checkbox' id={checkboxId} onChange={() => setChecked(!checked)} />
                        <p>
                            By signing in, you agree to our Terms of Service and Privacy Policy. You acknowledge that your data will be securely stored and used to enhance your learning experience.
                        </p>
                    </>
                }
            </div>
            {
                checked || !signForm
                    ?
                    <Button loadingColor='primary' loading={loading} type='submit' disable={false} className='sign-button' title={title} />
                    :
                    <Button type='submit' disable={true} className='disable-sign-button' title={title} />
            }
        </>

    )
}

export default SubmitSection
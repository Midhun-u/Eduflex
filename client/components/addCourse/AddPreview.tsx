'use client'

import React, { useId, useState } from 'react'
import styles from '../../styles/addCourse/addPreview.module.scss'
import Input from '../ui/Input'
import Button from '../ui/Button'
import {
  X as CloseIcon
} from 'lucide-react'
import { toast } from 'react-toastify'

interface AddPreviewProps{
  setAddPreviewSection : React.Dispatch<React.SetStateAction<boolean>>
  setPreviewLink : React.Dispatch<React.SetStateAction<string>>
}

const AddPreview = ({setAddPreviewSection , setPreviewLink} : AddPreviewProps) => {

    const previewInputId = useId()
    const [inputValue , setValue] = useState<string>()

    //function for add prevew
    const handleAddPreview = () => {

      const youtubeLinkRegex = /^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(\?.*)?$/

      if(!inputValue){
        toast.error("Fill the form")
        return
      }

      if(!youtubeLinkRegex.test(inputValue.trim())){
        toast.error("Invalid link")
        return
      }

      setPreviewLink(inputValue.trim())
      setAddPreviewSection(false)

    }

  return (
    
    <div className={styles['container']}>
        <div className={styles['preview']}>
            <CloseIcon onClick={() => setAddPreviewSection(false)} className={styles['close-icon']} />
            <label htmlFor={previewInputId}>Preview Youtube Embed Link</label>
            <Input onChange={(event) => setValue(event.target.value)} id={previewInputId} className='preview-input' placeholder='Enter youtube embed link' type='text' />
            <Button onClick={() => handleAddPreview()} title='Add Preview' className='add-preview-button' type='button'  />
        </div>
    </div>

  )
}

export default AddPreview
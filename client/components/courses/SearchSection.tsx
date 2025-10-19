'use client'

import React, { useId, useState } from 'react'
import styles from '../../styles/courses/searchSection.module.scss'
import Image from 'next/image'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { assets } from '@/public/assets/assets'
import {
    X as CloseIcon
} from 'lucide-react'

interface SearchSectionProps {
    pagination: { page: number, limit: number, totalCount: number },
    setPagination: React.Dispatch<React.SetStateAction<{ page: number, limit: number, totalCount: number }>>,
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
}

const SearchSection = ({
    pagination,
    setPagination,
    setSearchQuery,
    searchQuery,
}: SearchSectionProps) => {

    const searchId = useId()
    const [inputValue, setInputValue] = useState<string>('')

    //function for searching courses
    const handleGetSearchCourses = async () => {

        if(!inputValue.trim()) return

        setSearchQuery(inputValue.trim())
        setPagination({...pagination , page : 1 , limit : 10 , totalCount : 0})
        setInputValue('')

    }

    //function for remove search query
    const handleRemoveSearchQuery = async () => {

        setPagination({...pagination , page : 1 , limit : 10 , totalCount : 0})
        setSearchQuery('')
        setInputValue('')
    }

    return (

        <section className={styles['input-section']}>
            <div className={styles['input-box-section']}>
                <Input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='course-search-input' id={searchId} type='text' placeholder='Search Course' />
                <div className={styles['input-search-circle']}>
                    <Image src={assets.searchIcon} alt='' className={styles['search-icon']} />
                </div>
                <Button onClick={() => handleGetSearchCourses()} title='Search' type='button' disable={false} className='course-search-button' />
            </div>
            <div className={styles['query-container']}>
                {
                    searchQuery
                    &&
                    <div onClick={() => handleRemoveSearchQuery()} className={styles['search-query-section']}>
                        <p className={styles['search-query']}>{searchQuery}</p>
                        <CloseIcon strokeWidth={1.5} />
                    </div>
                }
            </div>
        </section>

    )
}

export default SearchSection
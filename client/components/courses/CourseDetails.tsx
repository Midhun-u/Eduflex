"use client"

import React, { useEffect, useState } from 'react'
import styles from '../../styles/courses/courseDetails.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import Button from '../ui/Button'
import { CourseType } from '@/types/courseType'
import Preview from './Preview'
import { toast } from 'react-toastify'
import { addCartApi, getCartItemApi } from '@/api/cart'
import { addWishlistApi, getWishlistItem } from '@/api/wishlist'
import { getEnrolledCourseApi, getTotalEnrollmentsApi } from '@/api/enrollment'
import CourseStructureAccordion from './CourseStructureAccordion'
import {
    LanguagesIcon,
    UsersIcon as EnrollmentsIcon,
    BookIcon as CourseIcon,
    UserPenIcon as EducatorIcon,
    ShoppingBag as PurchasedIcon
} from 'lucide-react'
import { getTotalRatingsApi } from '@/api/rate'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChapterType } from '@/types/chapterType'

interface CourseDetailsProps {
    courseDetails: CourseType
}

const CourseDetails = ({ courseDetails }: CourseDetailsProps) => {

    const [cartItem, setCartItem] = useState<{ courseId: string, userId: string, _id: string }>()
    const [wishlistItem, setWishlistItem] = useState<{ courseId: string, userId: string, _id: string }>()
    const [enrollmentItem, setEnrollmentItem] = useState<{ courseId: string, userId: string, _id: string, courseEducatorId: string }>()
    const [totalEnrollments, setTotalEnrollments] = useState<number>(0)
    const [ratings, setRatings] = useState<{ totalRatingsCount: number, averageRatings: number }>({
        totalRatingsCount: 0,
        averageRatings: 0
    })
    const router = useRouter()


    //function for adding course to cart
    const handleAddCart = async () => {

        try {
            const result = await addCartApi(courseDetails?.id, courseDetails?.price)

            if (result?.success) {
                toast.success(result?.message)
                setCartItem(result?.cartItem)
            }

        } catch (error: any) {
            console.log(error)

            toast.error("Course could not add to cart")
        }

    }

    //function for getting one cart item
    const handleGetCartItem = async () => {

        try {

            const result = await getCartItemApi(courseDetails?.id)

            if (result?.success) {
                setCartItem(result?.cartItem)
            }

        } catch (error) {
            console.log(error)
        }

    }

    //function for add course to wishlist
    const handleAddWishlist = async () => {

        try {

            const result = await addWishlistApi(courseDetails?.id, courseDetails?.category)
            if (result?.success) {
                toast.success(result?.message)
                setWishlistItem(result?.wishlistItem)
            }

        } catch (error) {
            toast.error("Course could not add to wishlist")
            console.log(error)
        }

    }

    //function for getting wishlist item
    const handleGetWishlistItem = async () => {

        try {

            const result = await getWishlistItem(courseDetails?.id)
            if (result?.success) {
                setWishlistItem(result?.wishlistItem)
            }

        } catch (error) {
            console.log(error)
        }

    }

    //function for getting an enrolled course
    const handleGetEnrolledCourse = async () => {

        try {

            const result = await getEnrolledCourseApi(courseDetails?.id)
            if (result?.success) {
                setEnrollmentItem(result?.enrolledCourse)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }

    }

    //function for getting total enrollments
    const handleGetTotalEnrollments = async () => {

        try {

            if (courseDetails?.id) {

                const result = await getTotalEnrollmentsApi(courseDetails?.id)

                if (result?.success) {
                    setTotalEnrollments(result?.totalEnrollments)
                }

            }

        } catch (error) {
            console.log(error)
        }

    }

    //function for getting total ratings
    const handleGetTotalRatings = async () => {

        try {

            if (courseDetails?.id) {

                const result = await getTotalRatingsApi(courseDetails?.id)

                if (result?.success) {
                    setRatings({ ...ratings, totalRatingsCount: result?.totalRatings || 0, averageRatings: result?.averageRatings || 0 })
                }

            }

        } catch (error) {
            console.log(error)
            setRatings({ ...ratings, totalRatingsCount: 0, averageRatings: 0 })
        }

    }

    useEffect(() => {
        handleGetEnrolledCourse()
        handleGetCartItem()
        handleGetWishlistItem()
        handleGetTotalEnrollments()
        handleGetTotalRatings()
    }, [courseDetails?.id])

    if (!courseDetails) return


    return (

        <>
            <section className={styles['container']}>
                <div className={styles['detail-container']}>
                    {/* section one */}
                    <div className={styles['section-one']}>
                        <h1 className={styles['course-title']}>{courseDetails?.title}</h1>
                        <p className={styles['course-description']}>{courseDetails?.description}</p>
                        <div className={styles['other-details']}>
                            <div className={styles['rate']}>
                                <p>{ratings.averageRatings}</p>
                                <p>({ratings.totalRatingsCount} Rating)</p>
                                <Image width={17} height={17} src={assets.ratingIcon} alt='' className={styles['rate-icon']} />
                            </div>
                            <div className={styles['enrollments']}>
                                <EnrollmentsIcon strokeWidth={1} size={23} />
                                <p>{totalEnrollments} Students enrolled</p>
                            </div>
                            <div className={styles['chapters']}>
                                <CourseIcon strokeWidth={1} size={23} />
                                <p>{courseDetails?.chapterNumber} Chapters</p>
                            </div>
                            <div className={styles['language']}>
                                <LanguagesIcon strokeWidth={1} size={23} />
                                <p>{courseDetails?.language}</p>
                            </div>
                            <div className={styles['educator-detail']}>
                                <EducatorIcon strokeWidth={1} size={23} />
                                <p>Created by <Link className={styles['nav-link']} href={`/courses/educator/${courseDetails?.educator.id}`}>{courseDetails?.educator.fullname}</Link></p>
                            </div>
                        </div>
                        <div className={styles['preview-container']}>
                            <Preview youtubePreviewLink={courseDetails?.previewLink} />
                        </div>
                        <div className={styles['keypoints']}>
                            {
                                courseDetails?.keypoints
                                &&
                                <>
                                    <span>What's you will learn</span>
                                    {
                                        courseDetails?.keypoints.map((keypoint, index) => (
                                            <li key={index}>{keypoint}</li>
                                        ))
                                    }
                                </>
                            }

                        </div>
                        <div className={styles['course-structure']}>
                            {
                                courseDetails?.chapters.length
                                &&
                                <>
                                    <span>Course Structure</span>
                                    {
                                        courseDetails?.chapters.map((chapter, chapterIndex) => (

                                            chapter.lectures.length
                                            ?
                                            <CourseStructureAccordion
                                                key={chapterIndex}
                                                chapter={chapter}
                                                chapterIndex={chapterIndex}
                                                preview
                                            />
                                            :
                                            null

                                        ))
                                    }
                                </>
                            }
                        </div>
                    </div>
                    {/* section two */}
                    <div className={styles['section-two']}>
                        {
                            courseDetails?.thumbnail.url
                            &&
                            <Image className={styles['thumbnail']} src={courseDetails?.thumbnail.url} alt='course thumbnail' width={250} height={125} />
                        }
                        <h1 className={styles['price']}>₹{courseDetails?.price}</h1>
                        <div className={styles['button-container']}>
                            {
                                enrollmentItem
                                    ?
                                    <Button onClick={() => router.push(`/my-learnings/learn/${courseDetails?.id}`)} title='Learn' className='enroll-button' type='button' />
                                    :
                                    <Button onClick={() => router.push(`/courses/checkout/${courseDetails?.id}`)} title='Enroll now' className='enroll-button' type='button' />
                            }
                            {
                                cartItem && !enrollmentItem
                                    ?
                                    <Button className='cart-success-button' type='button'>
                                        <Image src={assets.cartSuccessIcon} width={19} height={19} alt='' />
                                        <span>Added to cart</span>
                                    </Button>
                                    :
                                    (
                                        enrollmentItem
                                            ?
                                            <Button type='button' disable className='purchased-button'>
                                                <PurchasedIcon
                                                    strokeWidth={1.5}
                                                    size={20}
                                                    className={styles['purchased-icon']}
                                                />
                                                <span>Purchased</span>
                                            </Button>
                                            :
                                            <Button onClick={() => handleAddCart()} className='cart-button' type='button'>
                                                <Image src={assets.cartIcon} width={19} height={19} alt='' />
                                                <span>Add to cart</span>
                                            </Button>
                                    )

                            }
                            {
                                wishlistItem
                                    ?
                                    <Button className='wishlist-success-button' type='button'>
                                        <Image src={assets.activeWishlistIcon} width={19} height={19} alt='' />
                                        <span>Added to wishlist</span>
                                    </Button>
                                    :
                                    <Button onClick={() => handleAddWishlist()} className='wishlist-button' type='button'>
                                        <Image src={assets.wishlistIcon} width={19} height={19} alt='' />
                                        <span>Add to wishlist</span>
                                    </Button>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default CourseDetails
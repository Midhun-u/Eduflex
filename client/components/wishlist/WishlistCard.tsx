'use client'

import React from 'react'
import styles from '../../styles/wishlist/wishlistCard.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import { useRouter } from 'next/navigation'

interface WishlistCardProps {
  id: string
  courseId: string,
  thumbnail: string,
  title: string,
  educatorName: string,
  averageRating: number ,
  ratings: number ,
  price: number,
  handleRemoveWishlist : (wishlistItemId : string) => void
  
}

const WishlistCard = ({ id, courseId, thumbnail, title, educatorName, averageRating, ratings, price , handleRemoveWishlist}: WishlistCardProps) => {

  const router = useRouter()

  return (

    <div className={styles['container']}>
      <div onClick={() => handleRemoveWishlist(id)} className={styles['wishlist-icon-container']}>
        <Image className={styles['wishlist-active-icon']} src={assets.activeWishlistIcon} width={20} height={20} alt='' />
      </div>
      {
        thumbnail
          &&
          <div className={styles['thumbnail-container']}>
            <Image className={styles['thumbnail']} src={thumbnail} width={200} height={110} alt='' />
          </div>
      }
      <div onClick={() => router.push(`/courses/${courseId}`)} className={styles['details-container']}>
        <h1 className={styles['title']}>{title}</h1>
        <p className={styles['educator']}>by {educatorName}</p>
        <div className={styles['ratings']}>
          <p >{averageRating}</p>
          <Image src={assets.ratingIcon} alt='' width={15} height={15} />
          <p>({ratings})</p>
        </div>
        <p className={styles['price']}>₹{price}</p>
      </div>
    </div>

  )
}

export default WishlistCard
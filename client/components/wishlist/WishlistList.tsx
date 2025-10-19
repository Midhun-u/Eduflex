import React from 'react'
import styles from '../../styles/wishlist/wishlistList.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import { categories } from '@/utils/category'
import NotFound from '../layout/NotFound'
import WishlistCard from './WishlistCard'
import Button from '../ui/Button'
import { removeWishlistItem } from '@/api/wishlist'
import { toast } from 'react-toastify'
import {
  FilterIcon
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { wishlistFailed, wishlistRequest, wishlistSuccess } from '@/store/wishlistSlice'
import Spinner from '../ui/Spinner'

interface WishlistListProps {
  pagination: { page: number, limit: number, totalCount: number },
  setPagination: React.Dispatch<React.SetStateAction<{ page: number, limit: number, totalCount: number }>>,
  handleFetchWishlist: (category?: string) => void
}

const WishlistList = ({ pagination, setPagination, handleFetchWishlist }: WishlistListProps) => {

  const { wishlistItems, loading } = useAppSelector(state => state.wishlistReduer)
  const dispatch = useAppDispatch()

  //function for removing course from wishlist
  const handlRemoveWishlist = async (wishlistItemId: string) => {

    try {

      dispatch(wishlistRequest())
      const result = await removeWishlistItem(wishlistItemId)

      if (result?.success) {

        const newWishlistItems = wishlistItems.filter(wishlistItem => wishlistItem._id !== wishlistItemId)

        dispatch(wishlistSuccess({ wishlistItems: newWishlistItems }))
        setPagination({ ...pagination, totalCount: pagination.totalCount - 1 })

      }

    } catch (error: any) {
      dispatch(wishlistFailed({ error: error.message }))
      console.log(error)
      toast.error("Something went wrong")
    }

  }

  return (

    <section className={styles['list-container']}>
      <div className={styles['title-section']}>
        <div className={styles['title']}>
          <Image src={assets.activeWishlistIcon} width={20} height={20} alt='' />
          <h1>Wishlist</h1>
        </div>
        <div className={styles['filter-section']}>
          <FilterIcon size={20} strokeWidth={1} />
          <select onChange={(event) => handleFetchWishlist(event.target.value)} className={styles['selector']}>
            <option value={""}>All</option>
            {
              categories.map((category, index) => (

                category.title !== 'Popular'
                &&
                <option key={index} value={category.category}>{category.title}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div className={styles['list']}>
        {
          wishlistItems.map((wishlistItem) => (

            <WishlistCard
              key={wishlistItem?._id}
              id={wishlistItem._id}
              courseId={wishlistItem.courseId}
              thumbnail={wishlistItem?.courseDetails?.thumbnail.url}
              title={wishlistItem?.courseDetails.title}
              educatorName={wishlistItem?.courseDetails.educator.fullname}
              averageRating={wishlistItem?.courseDetails.averageRatings || 0}
              ratings={wishlistItem.courseDetails?.totalRatings || 0}
              price={wishlistItem?.courseDetails.price}
              handleRemoveWishlist={handlRemoveWishlist}
            />

          ))
        }
        {
          loading
            ?
            <Spinner color='primary' size={25} />
            :
            (
              !wishlistItems.length
                ?
                <NotFound />
                :
                null
            )
        }
      </div>
      {
        wishlistItems.length < pagination.totalCount && !loading && wishlistItems.length
        ?
        <Button onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })} title='Load more' type='button' className='load-button' />
        :
        null
      }
    </section>

  )
}

export default WishlistList 
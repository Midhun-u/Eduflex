import { assets } from "@/public/assets/assets"
import { StaticImageData } from "next/image"

interface NavLinks {
    title : string,
    route : string,
    icon ? : StaticImageData,
    activeIcon ? : StaticImageData
}

export const navLinks : NavLinks[] = [
    {
        title : 'Home',
        route : '/'
    },
    {
        title : 'Courses',
        route : '/courses'
    },
    {
        title : 'My Learnings',
        route : '/my-learnings'
    },
    {
        title : 'Educator Dashboard',
        route : '/educator-dashboard'
    },
    {
        title : 'Categories',
        route : '/categories'
    },
    {
        title : 'Settings',
        route : '/settings'
    },
    {
        title : 'Cart',
        icon : assets.cartIcon,
        route : '/cart',
        activeIcon : assets.activeCartIcon
    },
    {
        title : 'Wishlist',
        icon : assets.wishlistIcon,
        route : '/wishlist',
        activeIcon : assets.activeWishlistIcon
    },
]
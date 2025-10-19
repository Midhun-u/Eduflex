import { assets } from "@/public/assets/assets"
import { StaticImageData } from "next/image"

export interface CategoryType{
    title : string,
    about : string,
    icon : StaticImageData,
    category : string
}

export const categories : CategoryType[] = [
    {
        title : 'Popular',
        about : 'The popular course contains a collection of trending and in-demand topics such as web development, mobile app development, data science, AI, UI/UX design, and more',
        icon : assets.popularIcon,
        category : 'popular'
    },
    {
        title : 'Web Development',
        about : 'Learn the basics of web development, from building responsive layouts to creating dynamic web apps using modern tools and technologies.',
        icon : assets.webIcon,
        category : 'web-development'
    },
    {
        title : 'App Development',
        about : 'Explore the essentials of app development, from designing user interfaces to building powerful mobile applications for Android and iOS.',
        icon : assets.appIcon,
        category : 'app-development'
    },
    {
        title : 'Game Development',
        about : 'Dive into game development by learning how to design, build, and deploy interactive games using modern tools and engines.',
        icon : assets.gameIcon,
        category : 'game-development'
    },
    {
        title : 'Cyber Security',
        about : 'Understand the core principles of cybersecurity, including how to protect systems, networks, and data from digital threats.',
        icon : assets.cyberSecurityIcon,
        category : 'cyber-securiy'
    },
]
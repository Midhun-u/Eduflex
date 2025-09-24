import { assets } from "@/public/assets/assets"
import { StaticImageData } from "next/image"

type SocialMediasType = {image : string | StaticImageData , link : string , title : string}[]
type CompanyInfoType = {title : string , link : string}[]

export const socialMedias : SocialMediasType = [
    {
        title : "X",
        image : assets.XIcon,
        link : "/"
    } ,  
    {
        title : "Instagram",
        image : assets.instagramIcon,
        link : "/"
    },
    {
        title : "Facebook",
        image : assets.facebookIcon,
        link : "/"
    },
    {
        title : "Youtube",
        image : assets.youtubeIcon,
        link : "/"
    },{
        title : "Linkedin",
        image : assets.linkedinIcon,
        link : "/"
    },
]

export const companyInfo:CompanyInfoType = [
    {
        title : "Home",
        link : "/"
    },
    {
        title : "Courses",
        link : "/courses",
    },
    {
        title : "About Us",
        link : "/about"
    },
    {
        title : "Contact Us",
        link : "/"
    }
]
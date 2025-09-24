import { assets } from "@/public/assets/assets"
import { StaticImageData } from "next/image"

interface SidebarNavLinks{
    title : string,
    route : string,
    icon : StaticImageData | string
}

export const sidebarNavLinks : SidebarNavLinks[] = [
    {
        title : 'Dashboard',
        route : '/educator-dashboard',
        icon : assets.dashboardIcon
    },
    {
        title : 'Add Course',
        route : '/educator-dashboard/add-course',
        icon : assets.addCourseIcon
    },
    {
        title : 'My Courses',
        route : '/educator-dashboard/my-courses',
        icon : assets.myCourseIcon
    },
    {
        title : 'Enrolled Students',
        route : '/educator-dashboard/enrolled-students',
        icon : assets.enrolledStudentsIcon
    },
    {
        title : 'Home',
        route : '/',
        icon : assets.homeIcon
    },
]
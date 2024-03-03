import {SidebarItemType} from '../../components/layout/main/components/sidebar/types'

// Icons Import
import {BsFillPeopleFill} from 'react-icons/bs'


export const sidebarItems : SidebarItemType[] = [
    {
        icon: BsFillPeopleFill,
        text: 'About',
        link: '/admin/abouts'
    },
    {
        icon: BsFillPeopleFill,
        text: 'Software',
        link: '/admin/softwares'
    },
    {
        icon: BsFillPeopleFill,
        text: 'Feature',
        link: '/admin/features'
    },
]
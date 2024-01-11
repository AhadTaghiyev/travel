import { IconType } from "react-icons";


export interface INavigationItemType{
    text: string,
    path: string,
    color: string,
    Icon: IconType,
    quantity?: number
}
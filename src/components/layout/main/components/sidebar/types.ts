import { IconType } from "react-icons";

export interface SidebarItemType {
  icon: IconType;
  text: string;
  link?: string;
  onlyManagement?: boolean;
  children?: SidebarItemType[];
}

export interface SidebarItem {
  items: SidebarItemType[];
  color: string;
}

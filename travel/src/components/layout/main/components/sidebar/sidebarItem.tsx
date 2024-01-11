import React, { useState } from "react";
import { SidebarItemType } from "./types";
import { AiOutlineRight } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import styles from './sidebar.module.css';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const SidebarItem: React.FC<{item:SidebarItemType}> = ({ item }) => {
    // hadle submenu open
    const { t } = useTranslation();
    
    const [isOpen, setisOpen] = useState(false);

    return (
        <>
            {item.link !== undefined ? (
                <Link style={{borderBottom: '1px solid rgb(49 49 49)',color:"#c4c5c6"}} to={item.link}  className={styles.sidebarItem}>
                    <div style={{paddingBottom:"6px"}} >
                        <item.icon style={{color:"#c4c5c6"}} className={styles.sidebarItemIcon} />
                        <span className={styles.sidebarItemText}>
                            {t(item.text)}
                        </span>
                    </div>
                    <AiOutlineRight />
                </Link>
            ) : (
                <div 
                style={{borderBottom: '1px solid rgb(49 49 49)',color:"#c4c5c6"}}
                    className={styles.sidebarItem}
                    onClick={() => setisOpen(!isOpen)}
                >
                    <div style={{paddingBottom:"6px"}}  >
                        <item.icon style={{color:"#c4c5c6"}}  className={styles.sidebarItemIcon} />
                        <span   className={styles.sidebarItemText}>
                        {t(item.text)}
                        </span>
                    </div>
                    {!isOpen ? <AiOutlineRight /> : <BsChevronDown />}
                </div>
            )}
            {item.children && isOpen && (
                <div className={styles.sidebarItemChildren}>
                    {item.children.map((child, childKey) => (
                        <Link
                      style={{color:"#c4c5c6"}}
                            to={child.link!}
                            key={childKey}
                            className={styles.sidebarItem}
                        >
                            <div>
                                <child.icon  style={{color:"#c4c5c6"}}
                                    className={styles.sidebarItemIcon}
                                />
                                <span className={styles.sidebarItemText}>
                                    {t(child.text)}
                                </span>
                            </div>
                            <AiOutlineRight />
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

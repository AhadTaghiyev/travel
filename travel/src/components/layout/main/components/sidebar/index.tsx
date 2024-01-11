import styles from "./sidebar.module.css";
import bubble from "@/assets/bubble.png";
import { SidebarItem as SidebarItemType } from "./types";
import { SidebarItem } from "./sidebarItem";

export default function Sidebar({ items }: SidebarItemType) {
  return (
    <div
      id="sidebar"
      className={styles.sidebar}
      style={{ backgroundColor: "black" }}
    >
      <div className={styles.sidebarHeading}>
        <img src={bubble} />
        <h3 className={styles.logoText}>Travacco</h3>
      </div>
      <div>
        {items.map((item, key) => (
          <SidebarItem key={key} item={item} />
        ))}
      </div>
    </div>
  );
}

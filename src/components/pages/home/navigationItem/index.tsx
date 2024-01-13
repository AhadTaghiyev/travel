import { Link } from "react-router-dom";
import { INavigationItemType } from "./types";
import styles from './navigationItem.module.css';
import { useTranslation } from 'react-i18next';
export default function navigationItem({text, path, color, Icon, quantity} : INavigationItemType) {
  const { t } = useTranslation();
  return (
    // <Link to={path} style={{textDecoration: 'none'}}>
    //   <div className={styles.itemWrapper}>
    //     <div className={styles.iconWrapper} style={{backgroundColor: color+'33'}}>
    //       <Icon className={styles.icon} style={{color: color}}/>
    //     </div>
    //     <p className={styles.text} >{text}</p>
    //     <span className={styles.quantity}>{quantity}</span>
    //   </div>
    // </Link>
    <Link to={path} style={{textDecoration: 'none'}}>
    <div style={{padding:"4%",display:"flex",justifyContent:"space-evenly",alignItems:"center",backgroundColor:color}}>
      <div  >
        <Icon className={styles.icon} />
      </div>
      <p style={{color:"white"}}>
        
        {/* {text} */}
        {t(text)} {/* Çeviri burada yapılır */}
      
      </p>
      <span >{quantity}</span>
    </div>
  </Link>

  )
}

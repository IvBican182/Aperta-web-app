
import styles from "./Footer.module.css";

//footer component with my details
export default function Footer() {
    return (
        <div className={styles.footer}>
            <a className={styles.link}>
                <p>Developed by IvBican182</p>
            </a>
            <p className={styles.copyright}>© Copyright 2024 Ivan Bićanić. All rights reserved.</p>
        </div>
    )
}
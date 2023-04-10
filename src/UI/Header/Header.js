import styles from "./Header.module.css";
import StatsIcon from "../../icons/StatsIcon";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.headerLogo}>
      <StatsIcon />
    </div>
    <div className={styles.headerItem}>
      <h1 className={styles.heading}>STATS</h1>
      <div className={styles.headerBtnDiv}>
        <button className={styles.logOutBtn}>logout</button>
      </div>
    </div>
  </header>
);

export default Header;

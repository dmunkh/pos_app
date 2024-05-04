import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import ProfileIcon from "../../icons/ProfileIcon";
import AboutIcon from "../../icons/AboutIcon";
import FriendsIcon from "../../icons/FriendsIcon";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (currentPath, pagePath) => {
    if (currentPath === pagePath) return styles.active;
    else return "";
  };

  return (
    <div className={styles.parent}>
      <label className={styles["hamburger-menu"]}>
        <input type="checkbox" />
      </label>
      <div className={styles.sidebar}>
        <nav className={styles.nav}>
          <Link
            to={"/balance"}
            className={`${styles.navItem}  ${isActive(
              location.pathname,
              "/balance"
            )}`}
          >
            {" "}
            <div className={styles.menuDiv}>
              <div className={styles.svgIcon}>
                <AboutIcon />
              </div>
              <div className={styles.menuText}>about</div>
            </div>
          </Link>
          <Link
            to={"/baraa"}
            className={`${styles.navItem} ${isActive(
              location.pathname,
              "/baraa"
            )}`}
          >
            <div className={styles.menuDiv}>
              <div className={styles.svgIcon}>
                <ProfileIcon />
              </div>
              <div className={styles.menuText}>profile</div>
            </div>
          </Link>
          <Link
            to={"/friends"}
            className={`${styles.navItem}  ${isActive(
              location.pathname,
              "/friends"
            )}`}
          >
            {" "}
            <div className={styles.menuDiv}>
              <div className={styles.svgIcon}>
                <FriendsIcon />
              </div>
              <div className={styles.menuText}>friends</div>
            </div>
          </Link>
          <Link
            to={"/market"}
            className={`${styles.navItem}  ${isActive(
              location.pathname,
              "/market"
            )}`}
          >
            {" "}
            <div className={styles.menuDiv}>
              <div className={styles.svgIcon}>
                <AboutIcon />
              </div>
              <div className={styles.menuText}>about</div>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;

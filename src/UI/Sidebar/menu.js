import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import ProfileIcon from "../../icons/ProfileIcon";

const VerticalMenu = () => {
  const location = useLocation();

  const isActive = (currentPath, pagePath) => {
    if (currentPath === pagePath) return styles.active;
    else return "";
  };
  return (
    <div className="bg-gray-800 h-16 flex items-center justify-between px-4">
      <div className="flex">
        <div className={styles.sidebar}>
          <nav className={styles.nav}>
            <Link
              to={"/profile"}
              className={`${styles.navItem} ${isActive(
                location.pathname,
                "/profile"
              )}`}
            >
              <div className={styles.menuDiv}>
                <div className={styles.svgIcon}>
                  <ProfileIcon />
                </div>
                <div className={styles.menuText}>profile</div>
              </div>
            </Link>
          </nav>
        </div>
        <a
          href="/"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
        >
          Home
        </a>
        <a
          href="/pages/goods"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
        >
          Бараа
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
        >
          Services
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default VerticalMenu;

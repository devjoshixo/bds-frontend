import styles from "./SidebarHeader.module.css";

const SidebarHeader = (props) => {
  return (
    <div className={styles.headercontainer}>
      <div className={styles.sidebarheader}>{props.name}</div>
      <div className={styles.hamburger} onClick={props.toggleSidebarHandler}>
        <div
          className={`${styles.ham} ${styles.ham1} ${
            props.sidebarStatus && styles.ham1in
          }`}
        ></div>
        <div
          className={`${styles.ham} ${styles.ham2} ${
            props.sidebarStatus && styles.ham2in
          } `}
        ></div>
      </div>
    </div>
  );
};
export default SidebarHeader;

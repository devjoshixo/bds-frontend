import styles from "./SidebarOptions.module.css";

const SidebarOptions = (props) => {
  return (
    <div className={styles.sidebaroption} onClick={props.closeSidebar}>
      {props.children}
      {props.name}
    </div>
  );
};
export default SidebarOptions;

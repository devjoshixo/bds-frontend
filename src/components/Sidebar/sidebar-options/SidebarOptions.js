import styles from "./SidebarOptions.module.css";

const SidebarOptions = (props) => {
  return (
    <a href={`#${props.name}`}>
      <div
        className={styles.sidebaroption}
        id={props.name}
        onClick={() => {
          props.closeSidebar();
          props.menuToggleHandler(props.name);
        }}
      >
        {props.children}
        {props.name}
      </div>
    </a>
  );
};
export default SidebarOptions;

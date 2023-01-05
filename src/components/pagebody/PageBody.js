import styles from "./PageBody.module.css";

const PageBody = (props) => {
  return (
    <div className={styles.pagewrapper}>
      {/* page heading */}
      <div className={styles.pageheadingcontainer}>
        <h1 className={styles.pageheading}>{props.heading.toUpperCase()}</h1>
      </div>
      {/* pagebody */}
      <div className={styles.pagebody}>{props.children}</div>
      <div id="bar1" className={styles.sideoverlay1}></div>
      <div id="bar1" className={styles.sideoverlay2}></div>
    </div>
  );
};
export default PageBody;

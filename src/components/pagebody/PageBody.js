import styles from "./PageBody.module.css";

const PageBody = (props) => {
  return (
    <div className={styles.pagewrapper}>
      {/* page heading */}
      <div className={styles.pageheadingcontainer}>
        <h1 className={styles.pageheading}>{props.heading}</h1>
      </div>
      {/* pagebody */}
      <div className={styles.pagebody}>{props.children}</div>
    </div>
  );
};
export default PageBody;

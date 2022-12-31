import styles from "./PageBody.module.css";

const PageBody = (props) => {
  return (
    <div className={styles.pagewrapper}>
      <div className={styles.pageheadingcontainer}>
        <h1 className={styles.pageheading}>{props.heading}</h1>
      </div>
      <div className={styles.pagebody}></div>
    </div>
  );
};
export default PageBody;

import styles from "./CustomFields.module.scss";
const CustomFields = (props) => {
  return (
    <div className={styles.customfieldcontainer}>
      <table className={styles.customfieldstable}>
        <tr className={styles.tablehead}>
          <th className={styles.tablehead}>TYPE</th>
          <th className={styles.tablehead}>TITLE</th>
          <th className={styles.tablehead}>FIELD ID</th>
          <th className={styles.tablehead}>CREATED ON</th>
          <th className={styles.tablehead}>DESCTIPTION</th>
          <th className={styles.tablehead}>TYPE</th>
        </tr>
      </table>
    </div>
  );
};
export default CustomFields;

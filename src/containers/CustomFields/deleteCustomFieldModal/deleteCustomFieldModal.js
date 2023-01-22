import styles from "./deleteCustomFieldModal.module.css";

const DeleteCustomFieldModal = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.warningmodal}>
        <div
          className={styles.modalmessage}
        >{`are you sure you want to delete this field`}</div>
        <div className={styles.modalbuttonscontainer}>
          <div
            className={`${styles.cancelbutton} ${styles.modalbutton}`}
            onClick={props.cancel}
          >
            Cancel
          </div>
          <div
            className={`${styles.yesbutton} ${styles.modalbutton}`}
            onClick={() => {
              props.delete(props.arg);
            }}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteCustomFieldModal;

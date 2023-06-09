import styles from "./deleteContactModal.module.css";

const DeleteContactModal = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.warningmodal}>
        <div
          className={styles.modalmessage}
        >{`are you sure you want to delete the contact(s)`}</div>
        <div className={styles.modalbuttonscontainer}>
          <div
            className={`${styles.cancelbutton} ${styles.modalbutton}`}
            onClick={props.cancel}
          >
            Cancel
          </div>
          <div
            className={`${styles.yesbutton} ${styles.modalbutton}`}
            onClick={props.delete}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteContactModal;

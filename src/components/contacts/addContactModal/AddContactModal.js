import React from "react";
import styles from "./AddContactModal.module.scss";

const AddContactModal = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.addmodal}>
        <div className={styles.header}>Add Contact</div>
        <div className={styles.addcontactform}>
          <label>
            Name <input />
          </label>
          <label>
            Email ID <input />
          </label>
          <label>
            WhatsApp Number <input />
          </label>
          <label>
            Phone Number <input />
          </label>
        </div>
        <div className={styles.footer}>
          <div>Close</div>
          <div>Add Contact</div>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;

import React from "react";
import styles from "./AddContactModal.module.scss";
import addContact from "../../../API calls/addContact";
import { CgClose } from "react-icons/cg";

const AddContactModal = (props) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [whatsappMobile, setWhatsappMobile] = React.useState("");
  const [mobile, setMobile] = React.useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "whatsappMobile":
        setWhatsappMobile(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      default:
        break;
    }
  };

  const addContactHandler = async () => {
    const contact = {
      name: name,
      email: email,
      whatsappMobile: whatsappMobile,
      mobile: mobile,
    };

    await addContact(contact);
    props.closeCard();
    props.updateContacts(contact.email);
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.addmodal}>
        <div className={styles.header}>ADD CONTACT</div>
        <div className={styles.addcontactform}>
          <label className={styles.inputfield}>
            Name
            <input name="name" value={name} onChange={handleInputChange} />
          </label>
          <label className={styles.inputfield}>
            Email ID
            <input name="email" value={email} onChange={handleInputChange} />
          </label>
          <label className={styles.inputfield}>
            WhatsApp Number
            <input
              name="whatsappMobile"
              value={whatsappMobile}
              onChange={handleInputChange}
            />
          </label>
          <label className={styles.inputfield}>
            Phone Number
            <input name="mobile" value={mobile} onChange={handleInputChange} />
          </label>
        </div>
        <div className={styles.footer}>
          <div className={styles.closecard} onClick={props.closeCard}>
            <CgClose size={25} />
          </div>
          <div className={styles.submitcard} onClick={addContactHandler}>
            Add
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addContactHandler();
          }}
        >
          <div className={styles.header}>ADD CONTACT</div>
          <div className={styles.addcontactform}>
            <label className={styles.inputfield}>
              Name
              <input
                name="name"
                value={name}
                type="text"
                onChange={handleInputChange}
                required
              />
            </label>
            <label className={styles.inputfield}>
              Email ID
              <input
                name="email"
                value={email}
                type="email"
                onChange={handleInputChange}
                required
              />
            </label>
            <label className={styles.inputfield}>
              Phone Number
              <input
                name="mobile"
                value={mobile}
                type="tel"
                pattern="[0-9]{10}"
                onChange={handleInputChange}
                required
              />
            </label>
            <label className={styles.inputfield}>
              WhatsApp Number
              <input
                name="whatsappMobile"
                value={whatsappMobile}
                type="tel"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles.footer}>
            <div className={styles.closecard} onClick={props.closeCard}>
              <CgClose size={25} />
            </div>
            <button className={styles.submitcard} type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;

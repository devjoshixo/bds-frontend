import React from "react";
import styles from "./AddContactModal.module.scss";
import addContact from "../../../API calls/addContact";

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
        <div className={styles.header}>Add Contact</div>
        <div className={styles.addcontactform}>
          <label>
            Name
            <input name="name" value={name} onChange={handleInputChange} />
          </label>
          <label>
            Email ID
            <input name="email" value={email} onChange={handleInputChange} />
          </label>
          <label>
            WhatsApp Number
            <input
              name="whatsappMobile"
              value={whatsappMobile}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone Number
            <input name="mobile" value={mobile} onChange={handleInputChange} />
          </label>
        </div>
        <div className={styles.footer}>
          <div onClick={props.closeCard}>Close</div>
          <div onClick={addContactHandler}>Add Contact</div>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;

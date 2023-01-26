import { useState } from "react";

import addContact from "../../../API calls/addContact";

import { CgClose } from "react-icons/cg";

import styles from "./AddContactModal.module.scss";

const AddContactModal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappMobile, setWhatsappMobile] = useState("");
  const [mobile, setMobile] = useState("");

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

    var status = await addContact(contact);
    if (status == 409) {
      alert("Contact with same Email ID already exists");
    } else {
      props.closeCard();
      props.updateContacts(contact.email);
    }
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.addmodal}>
        <div className={styles.header}>ADD CONTACT</div>
        <div className={styles.addcontactform}>
          <form
            id="addContactForm"
            onSubmit={(e) => {
              e.preventDefault();
              addContactHandler();
            }}
          >
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
          </form>
        </div>
        <div className={styles.footer}>
          <div className={styles.closecard} onClick={props.closeCard}>
            <CgClose size={25} />
          </div>
          <input
            className={styles.submitcard}
            form="addContactForm"
            value="Add"
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;

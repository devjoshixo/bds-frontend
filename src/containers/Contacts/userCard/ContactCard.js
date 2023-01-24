import { useEffect, useState } from "react";

import { RiEdit2Fill } from "react-icons/ri";

import styles from "./ContactCard.module.scss";

const ContactCard = (props) => {
  const [customFieldsData, setCustomFieldsData] = useState({});
  const [contactData, setContactData] = useState({});
  const [editToggle, setEditToggle] = useState(false);

  const fetchfieldtype = async (name) => {
    try {
      const response = await fetch(
        "http://localhost:5000/contacts/customfield/type?title=" + name
      ).then((res) => res.text());

      switch (response) {
        case "Text":
          return "text";
        case "Number":
          return "number";
        case "Date":
          return "date";
        default:
          break;
      }
    } catch (error) {
      //temporary jugad
      console.log(error);
      return "text";
    }
  };

  const addCustomFieldsTitle = () => {
    var list = [];
    let keys = Object.keys(customFieldsData);
    for (let i of keys) {
      list.push(
        <>
          <br />
          {i}
        </>
      );
    }
    return list;
  };

  const addCustomFieldsData = () => {
    var list = [];
    let keys = Object.keys(customFieldsData);
    for (let i of keys) {
      list.push(
        <>
          <br />
          {editToggle ? (
            <input
              type={fetchfieldtype(i)}
              value={customFieldsData[`${i}`]}
              name={i}
              onChange={handleChange}
            />
          ) : (
            customFieldsData[`${i}`]
          )}
        </>
      );
    }
    return list;
  };

  const handleChange = (e) => {
    if (
      e.target.name == "name" ||
      e.target.name == "email" ||
      e.target.name == "mobile" ||
      e.target.name == "whatsappMobile"
    ) {
      var obj = { ...contactData };
      obj[`${e.target.name}`] = e.target.value;
      setContactData({ ...obj });
    } else {
      var obj = { ...customFieldsData };
      obj[`${e.target.name}`] = e.target.value;
      setCustomFieldsData({ ...obj });
    }
  };

  useEffect(() => {
    var obj = {};
    let keys = Object.keys(props.userData.CustomFields);
    for (let i of keys) {
      obj[`${i}`] = props.userData.CustomFields[`${i}`];
    }
    setCustomFieldsData(obj);

    setContactData({
      name: props.userData.name,
      email: props.userData.email,
      mobile: props.userData.mobile,
      whatsappMobile: props.userData.whatsappMobile,
    });
  }, []);

  return (
    <div className={`${styles.backdrop} ${props.cardStatus && styles.active}`}>
      <div
        className={`${styles.contactcard} ${props.cardStatus && styles.active}`}
      >
        <div className={styles.cardheader}>
          <div className={styles.username}>{props.userData.name}</div>
          <div className={styles.buttonscontainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              onClick={() => {
                props.showDeleteWarningHandler(props.userData._id);
              }}
            >
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
          </div>
        </div>
        <div className={styles.cardbody}>
          <div className={styles.detailscontainer}>
            <div
              className={`${styles.detailparameters} ${styles.detailsubcontainer}`}
            >
              Name
              <br />
              Mobile
              <br />
              E-mail
              <br />
              Whatsapp
              {props.userData.CustomFields && addCustomFieldsTitle()}
            </div>
            <div
              className={`${styles.detailvalues} ${styles.detailsubcontainer}`}
            >
              {editToggle ? (
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={contactData.name}
                />
              ) : (
                contactData.name
              )}
              <br />
              {editToggle ? (
                <input
                  name="mobile"
                  type="tel"
                  pattern="[0-9]{10}"
                  onChange={handleChange}
                  value={contactData.mobile}
                />
              ) : (
                contactData.mobile
              )}
              <br />
              {editToggle ? (
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={contactData.email}
                />
              ) : (
                contactData.email
              )}
              <br />
              {editToggle ? (
                <input
                  name="whatsappMobile"
                  type="tel"
                  pattern="[0-9]{10}"
                  onChange={handleChange}
                  value={contactData.whatsappMobile}
                />
              ) : (
                contactData.whatsappMobile
              )}
              {props.userData.CustomFields && addCustomFieldsData()}
            </div>
          </div>
        </div>
        <div className={styles.closecard} onClick={props.CardCloseHandler}>
          &#x2715;
        </div>
      </div>
    </div>
  );
};
export default ContactCard;

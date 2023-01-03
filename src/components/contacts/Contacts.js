import styles from "./Contacts.module.css";
import React from "react";
import ContactRow from "./ContactRow";
import { useEffect } from "react";
import { useState } from "react";
const Contacts = (props) => {
  const [contactsData, updateContactsData] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/contacts")
      .then((response) => response.json())
      .then((data) => {
        updateContactsData(data);
      });
  }, []);

  const addNewRow = () => {
    var list = [];
    for (var i in contactsData) {
      var contact = contactsData[i];
      list.push(
        <ContactRow
          name={contact["name"]}
          email={contact["email"]}
          mobile={contact["mobile"]}
          whatsappMobile={contact["whatsappMobile"]}
        ></ContactRow>
      );
    }
    return list;
  };
  console.log(contactsData);
  return (
    <div className={styles.contacts}>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>mobile</th>
            <th>W.A. Mobile</th>
            <th>E.mail</th>
          </tr>
          {addNewRow()}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;

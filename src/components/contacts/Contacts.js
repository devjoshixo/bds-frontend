import styles from "./Contacts.module.css";
import React from "react";
import ContactRow from "./contactRow";
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
  });

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
          {/* {for (var i in contactsData){
            <ContactRow></ContactRow>
          }} */}
        </tbody>
      </table>
    </div>
  );
};
export default Contacts;

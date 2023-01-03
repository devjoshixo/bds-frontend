import styles from "./Contacts.module.css";
import React from "react";
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
  }, [contactsData]);

  console.log(contactsData.length);
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
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;

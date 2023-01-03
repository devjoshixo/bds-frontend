import styles from "./Contacts.module.css";
import React from "react";
import { useEffect } from "react";
const Contacts = (props) => {
  useEffect(() => {
    fetch("http://loc")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;

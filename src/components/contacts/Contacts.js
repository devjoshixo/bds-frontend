import styles from "./Contacts.module.css";

const Contacts = (props) => {
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

import ContactCardButton from "./contactcardbutton/ContactCardButton";
import styles from "./Contacts.module.scss";

const ContactRow = (props) => {
  const handleChange = () => {
    if (props.selectedContacts.includes(props.cid)) {
      props.setSelectedContacts(
        props.selectedContacts.filter((item) => item !== props.cid)
      );
    } else {
      props.setSelectedContacts([...props.selectedContacts, props.cid]);
    }
  };
  const fillCustomFields = () => {
    var list = [];
    for (let i of props.availableFields) {
      list.push(
        <td key={i.title} className={styles.customfielddata}>
          {props.contact.CustomFields[`${i["title"]}`]}
        </td>
      );
    }
    return list;
  };

  return (
    <tr id={`${props.cid}`}>
      <td>
        <input
          type="checkbox"
          checked={props.selectedContacts.includes(props.cid)}
          onChange={handleChange}
        />
      </td>
      <td>
        <ContactCardButton
          cid={props.cid}
          contact={props.contact}
          CardOpenHandler={props.CardOpenHandler}
          showDeleteWarningHandler={props.showDeleteWarningHandler}
        />
      </td>

      <td>{`${props.contact.name.split(" ")[0]} ${
        props.contact.name.split(" ")[1]
      }`}</td>
      <td>{props.contact.mobile}</td>
      <td>{props.contact.whatsappMobile}</td>
      <td>{props.contact.email}</td>
      {fillCustomFields()}
    </tr>
  );
};
export default ContactRow;

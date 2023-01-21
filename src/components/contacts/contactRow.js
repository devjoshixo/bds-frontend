import ContactCardButton from "./contactcardbutton/ContactCardButton";

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
      console.log(i.title);
      list.push(<td className={styles.customfielddata}>{props.contact.CustomFields[`${i["title"]}`]}</td>);
    }
    console.log(list);
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
          CardOpenHandler={props.CardOpenHandler}
          name={props.name}
          mobile={props.mobile}
          email={props.email}
          whatsappMobile={props.whatsappMobile}
          cid={props.cid}
          fetchData={props.fetchData}
          showDeleteWarningHandler={props.showDeleteWarningHandler}
        />
      </td>

      <td>{`${props.name.split(" ")[0]} ${props.name.split(" ")[1]}`}</td>
      <td>{props.mobile}</td>
      <td>{props.whatsappMobile}</td>
      <td>{props.email}</td>
      {fillCustomFields()}
    </tr>
  );
};
export default ContactRow;

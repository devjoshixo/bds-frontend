import ContactCardButton from "./contactcardbutton/ContactCardButton";

const ContactRow = (props) => {
  return (
    <tr id={`${props.cid}`}>
      <td>
        <input type="checkbox"></input>
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
          // showDeleteWarningHandler={props.showDeleteWarningHandler}
          // showDeleteWarning={props.showDeleteWarning}
          // setShowDeleteWarning={props.setShowDeleteWarning}
        />
      </td>

      <td>{`${props.name.split(" ")[0]} ${props.name.split(" ")[1]}`}</td>
      <td>{props.mobile}</td>
      <td>{props.whatsappMobile}</td>
      <td>{props.email}</td>
    </tr>
  );
};
export default ContactRow;

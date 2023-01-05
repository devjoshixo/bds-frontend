import ContactCardButton from "./contactcardbutton/ContactCardButton";

const ContactRow = (props) => {
  return (
    <tr>
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
        />
      </td>

      <td>{props.name}</td>
      <td>{props.mobile}</td>
      <td>{props.whatsappMobile}</td>
      <td>{props.email}</td>
    </tr>
  );
};
export default ContactRow;

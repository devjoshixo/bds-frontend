const ContactRow = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.mobile}</td>
      <td>{props.whatsappMobile}</td>
      <td>{props.email}</td>
    </tr>
  );
};
export default ContactRow;

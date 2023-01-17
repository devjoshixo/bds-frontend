import CustomFieldButton from "./CustomFieldButtons/CustomFieldButton";

const CustomFieldRow = (props) => {
  return (
    <tr>
      <td>{props.type}</td>
      <td>{props.title}</td>
      <td>{props.fieldid}</td>
      <td>{props.createdon}</td>
      <td>{props.description}</td>
      <td>
        <CustomFieldButton />
      </td>
    </tr>
  );
};
export default CustomFieldRow;

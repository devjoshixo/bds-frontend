import CustomFieldButton from "./CustomFieldButtons/CustomFieldButton";

const CustomFieldRow = (props) => {
  return (
    <tr>
      <td>{props.type}</td>
      <td>{props.title}</td>
      <td>{props.createdOn}</td>
      <td>{props.description}</td>
      <td>
        <CustomFieldButton
          id={props.id}
          title={props.title}
          delete={props.delete}
        />
      </td>
    </tr>
  );
};
export default CustomFieldRow;

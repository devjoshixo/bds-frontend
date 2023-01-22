import CustomFieldButton from "./CustomFieldButtons/CustomFieldButton";

const CustomFieldRow = (props) => {
  return (
    <tr>
      <td label="TYPE">{props.type}</td>
      <td label="TITLE">{props.title}</td>
      <td label="CREATED ON">{props.createdOn}</td>
      <td label="DESCRIPTION">{props.description}</td>
      <td label="ACTIONS">
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

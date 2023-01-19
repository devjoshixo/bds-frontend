import styles from "./CustomFields.module.scss";
import CustomFieldRow from "./CustomFieldRow";
import { useEffect, useState } from "react";
import fetchCustomFields from "../../API calls/fetchCustomFields";
import deleteCustomField from "../../API calls/deleteCustomFields";
import DeleteCustomFieldModal from "./deleteCustomFieldModal/deleteCustomFieldModal";
import { IoAdd } from "react-icons/io5";

const CustomFields = (props) => {
  const [customFieldsData, updateCustomFieldsData] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [delArg, detDelArg] = useState("");
  const [updateField, setUpdateField] = useState(null);

  const showDeleteWarningHandler = (arg) => {
    detDelArg(arg);
    setShowDeleteWarning(true);
  };
  const deleteRowHandler = async (arg) => {
    await deleteCustomField(arg);
    setShowDeleteWarning(false);
    setUpdateField(arg);
  };

  useEffect(() => {
    const fetchData = async () => {
      const customFields = await fetchCustomFields();
      updateCustomFieldsData(customFields);
    };
    fetchData();
  }, [updateField]);
  return (
    <div className={styles.customfieldcontainer}>
      <div className={styles.buttonssection}>
        <div className={styles.addnewrowbutton}>
          <IoAdd />
          Add Custom Field
        </div>
      </div>
      <table className={styles.customfieldstable}>
        <tbody>
          <tr className={styles.tablehead}>
            <th className={styles.tablehead}>TYPE</th>
            <th className={styles.tablehead}>TITLE</th>
            <th className={styles.tablehead}>CREATED ON</th>
            <th className={styles.tablehead}>DESCTIPTION</th>
            <th className={styles.tablehead}>ACTIONS</th>
          </tr>
          {customFieldsData.map((customField) => {
            return (
              <CustomFieldRow
                key={customField._id}
                id={customField._id}
                type={customField.type}
                title={customField.title}
                createdOn={customField.createdOn}
                description={customField.description}
                delete={showDeleteWarningHandler}
              />
            );
          })}
        </tbody>
      </table>

      {showDeleteWarning ? (
        <DeleteCustomFieldModal
          cancel={() => {
            setShowDeleteWarning(false);
          }}
          arg={delArg}
          delete={deleteRowHandler}
        />
      ) : null}
    </div>
  );
};
export default CustomFields;

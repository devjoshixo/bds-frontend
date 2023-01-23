import React, { useState } from "react";

import { addCustomField } from "../../../API calls";

import { CgClose } from "react-icons/cg";
import { Loader } from "../../../components";

import styles from "./AddCustomFieldModal.module.scss";

const AddCustomFieldModal = (props) => {
  const [customFieldName, setCustomFieldName] = useState("");
  const [customFieldType, setCustomFieldType] = useState("");
  const [customFieldDes, setCustomFieldDes] = useState("");
  const [customOptions, setCustomOptions] = useState([]);
  const [optionsArray, setOptionsArray] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const addCustomFieldHandler = async () => {
    setLoadingStatus(true);
    const customField = {
      title: customFieldName,
      type: customFieldType,
      description: customFieldDes,
    };
    var status = await addCustomField(customField);
    if (status == 409) {
      setLoadingStatus(false);
      alert("Custom Field already exists");
    } else {
      setLoadingStatus(false);
      props.closeCard();
      props.updateField(customField);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setCustomFieldName(value);
        break;
      case "type":
        setCustomFieldType(value);
        break;
      case "description":
        setCustomFieldDes(value);
        break;
      default:
        break;
    }
  };
  // const customOptions = [];

  const addNewOption = () => {
    setCustomOptions([
      ...customOptions,
      <div className={styles.optionfielddiv}>
        <input className={styles.optionfield}></input>
      </div>,
    ]);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.addmodal}>
        <div className={styles.header}>ADD CUSTOM FIELD</div>
        <div className={styles.addfieldform}>
          {loadingStatus && (
            <div className={styles.loaderbackdrop}>
              <Loader />
            </div>
          )}
          <form
            className={styles.addCustomFieldForm}
            id="addCustomFieldForm"
            onSubmit={(e) => {
              e.preventDefault();
              addCustomFieldHandler();
            }}
          >
            <label className={styles.inputfield}>
              Name
              <input
                name="title"
                value={customFieldName}
                type="text"
                onChange={handleInputChange}
                required
              />
            </label>
            <label className={styles.inputfield}>
              description
              <input
                name="description"
                value={customFieldDes}
                type="text"
                onChange={handleInputChange}
                required
              />
            </label>
            <label className={styles.inputfield}>
              Custom Field Type
              <select
                name="type"
                value={customFieldType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Field Type
                </option>
                <option value="Text">Text</option>
                <option value="Number">Number</option>
                <option value="Date">Date</option>
                <option value="Select">Select</option>
                <option value="MultiSelect">MultiSelect</option>
              </select>
            </label>
            {(customFieldType == "Select" ||
              customFieldType == "MultiSelect") && (
              <div className={styles.addnewoptioncontainer}>
                {customOptions}
                <div className={styles.addnewbutton} onClick={addNewOption}>
                  +
                </div>
              </div>
            )}
          </form>
        </div>
        <div className={styles.footer}>
          <div className={styles.closecard} onClick={props.closeCard}>
            <CgClose size={25} />
          </div>
          <input
            className={styles.submitcard}
            form="addCustomFieldForm"
            value="Add"
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default AddCustomFieldModal;

import React, { useEffect, useState, useRef } from "react";

import {
  fetchContacts,
  deleteContacts,
  fetchCustomFields,
} from "../../API calls";

import { IoAdd } from "react-icons/io5";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { Loader } from "../../components";

import styles from "./Contacts.module.scss";
import ContactRow from "./ContactRow";
import ContactCard from "./userCard/ContactCard";
import DeleteContactModal from "./deleteContactModal/deleteContactModal";
import AddContactModal from "./addContactModal/AddContactModal";

const Contacts = () => {
  const [cardStatus, SetCardStatus] = useState(false);
  const [contactsData, updateContactsData] = useState(null);
  const [cardData, setCardData] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [updateContacts, setUpdateContacts] = useState(null);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [delCid, setDelCid] = useState("");
  const [dataLength, setDataLength] = useState(10);
  const [startFrom, setStartFrom] = useState(0);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [bulkOptionsStatus, setBulkOptionStatus] = useState(false);
  const bulkOptions = useRef(null);
  const [addContactModalStatus, setAddContactModalStatus] = useState(false);
  const [availableFields, setAvailableFields] = useState(null);

  const bulkOptiontoggle = () => {
    setBulkOptionStatus(!bulkOptionsStatus);
  };
  const CardOpenHandler = (userData) => {
    SetCardStatus(true);
    setCardData(userData);
  };
  const CardCloseHandler = () => {
    SetCardStatus(false);
  };

  const showDeleteWarningHandler = (cid) => {
    setDelCid(cid);
    setShowDeleteWarning(true);
    setBulkOptionStatus(false);
  };
  const deleteRowHandler = async (cid) => {
    var id = typeof cid == "string" ? [cid] : cid;
    await deleteContacts(id);
    setShowDeleteWarning(false);
    cardStatus && SetCardStatus(false);
    setUpdateContacts(cid);
  };

  const handleSelectAll = () => {
    if (selectedContacts.length == contactsData.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contactsData.map((contact) => contact["_id"]));
    }
  };

  const closeBulkActionMenu = (e) => {
    if (bulkOptionsStatus && !bulkOptions.current.contains(e.target)) {
      setBulkOptionStatus(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      updateContactsData(await fetchContacts(startFrom, dataLength));

      setAvailableFields(await fetchCustomFields());

      setLoadingStatus(false);
    };

    fetchData();
    setSelectedContacts([]);
  }, [updateContacts, dataLength, startFrom]);

  useEffect(() => {
    if (contactsData && selectedContacts.length == contactsData.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selectedContacts]);

  useEffect(() => {
    document.addEventListener("click", closeBulkActionMenu, true);
    return () => {
      document.removeEventListener("click", closeBulkActionMenu, true);
    };
  }, [bulkOptionsStatus]);

  const addNewRow = () => {
    var list = [];
    for (let contact of contactsData) {
      list.push(
        <ContactRow
          key={contact["_id"]}
          contact={contact}
          CardOpenHandler={() => CardOpenHandler(contact)}
          showDeleteWarningHandler={() => {
            showDeleteWarningHandler(contact["_id"]);
          }}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
          availableFields={availableFields}
        />
      );
    }
    return list;
  };
  const addFieldName = () => {
    var fieldNames = [];
    for (let i of availableFields) {
      fieldNames.push(
        <th className={styles.customfield} key={i.title}>
          {i.title}
        </th>
      );
    }
    return fieldNames;
  };

  return (
    <div className={styles.contactWapper}>
      <div className={styles.buttonssection}>
        <div
          className={styles.addnewrowbutton}
          onClick={() => {
            setAddContactModalStatus(true);
          }}
        >
          <IoAdd />
          Add Contacts
        </div>
      </div>
      {addContactModalStatus && (
        <AddContactModal
          closeCard={() => {
            setAddContactModalStatus(false);
          }}
          updateContacts={setUpdateContacts}
        />
      )}
      <div className={styles.contacts}>
        {loadingStatus ? (
          <Loader />
        ) : (
          <table>
            <tbody>
              <tr className={styles.a}>
                <th>
                  <div className={styles.select}>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={() => handleSelectAll()}
                    ></input>
                  </div>
                </th>
                <th>actions</th>
                <th>Name</th>
                <th>mobile</th>
                <th>W.A. Mobile</th>
                <th>E.mail</th>
                {addFieldName()}
              </tr>
              {addNewRow()}
            </tbody>
          </table>
        )}
        {showDeleteWarning ? (
          <DeleteContactModal
            cancel={() => {
              setShowDeleteWarning(false);
            }}
            delete={() => {
              deleteRowHandler(delCid);
              if (delCid == cardData._id) {
                SetCardStatus(false);
              }
            }}
          />
        ) : null}
        {cardStatus && (
          <ContactCard
            updateDom={setUpdateContacts}
            showDeleteWarningHandler={() =>
              showDeleteWarningHandler(cardData._id)
            }
            cardStatus={cardStatus}
            CardCloseHandler={CardCloseHandler}
            userData={cardData}
          />
        )}
      </div>
      <div className={styles.contactoptions}>
        <div className={styles.datalength}>
          <div>
            <label className={styles.optiontext}>
              No. of contacts
              <select
                value={dataLength}
                onChange={(e) => setDataLength(e.target.value)}
              >
                <option value="10">10</option>
                Delete <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </label>
          </div>
        </div>
        {selectedContacts.length > 0 && (
          <div className={styles.bulkactions}>
            <button
              className={styles.bulkactions_heading}
              onClick={bulkOptiontoggle}
            >
              Bulk Actions
            </button>
            <div
              ref={bulkOptions}
              className={`${styles.bulkactions_options} ${
                bulkOptionsStatus && styles.showbulkactions_options
              }`}
            >
              <div
                className={styles.bulkactions_option}
                onClick={() => {
                  showDeleteWarningHandler(selectedContacts);
                }}
              >
                Delete
              </div>
              <div className={styles.bulkactions_option}>Edit</div>
            </div>
          </div>
        )}
        <div className={styles.driver}>
          <div
            className={`${styles.previous} ${styles.btn}`}
            onClick={() => {
              if (startFrom >= dataLength) {
                setStartFrom(startFrom - dataLength);
              } else {
                setStartFrom(0);
              }
            }}
          >
            <TfiAngleLeft />
            previous
          </div>
          <div
            className={`${styles.next} ${styles.btn}`}
            onClick={() =>
              setStartFrom(parseInt(startFrom) + parseInt(dataLength))
            }
          >
            next
            <TfiAngleRight />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contacts;

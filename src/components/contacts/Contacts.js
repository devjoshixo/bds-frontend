import React from "react";
import styles from "./Contacts.module.scss";
import ContactCard from "./userCard/ContactCard";
import ContactRow from "./ContactRow";
import { useEffect } from "react";
import { useState } from "react";
import fetchContacts from "../../API calls/fetchContacts";
import Loader from "../loader/Loader";
import deleteContacts from "../../API calls/deleteContact";
import DeleteContactModal from "./deleteContactModal/deleteContactModal";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";

const Contacts = () => {
  const [cardStatus, SetCardStatus] = useState(false);
  const [contactsData, updateContactsData] = useState([]);
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
    var id = typeof cid === "string" ? [cid] : cid;
    await deleteContacts(id);
    setShowDeleteWarning(false);
    setUpdateContacts(cid);
    setSelectedContacts([]);
  };

  const handleSelectAll = () => {
    if (selectedContacts.length == dataLength) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contactsData.map((contact) => contact["_id"]));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      updateContactsData(await fetchContacts(startFrom, dataLength));
      setLoadingStatus(false);
    };
    fetchData();
  }, [updateContacts, dataLength, startFrom]);

  useEffect(() => {
    if (selectedContacts.length == dataLength) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selectedContacts]);

  useEffect(() => {
    setSelectedContacts([]);
    setAllSelected(false);
  }, [dataLength]);

  const addNewRow = () => {
    var list = [];
    for (var i in contactsData) {
      var contact = contactsData[i];
      list.push(
        <ContactRow
          name={contact["name"]}
          email={contact["email"]}
          mobile={contact["mobile"]}
          whatsappMobile={contact["whatsappMobile"]}
          key={contact["_id"]}
          cid={contact["_id"]}
          CardOpenHandler={CardOpenHandler}
          showDeleteWarningHandler={showDeleteWarningHandler}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        />
      );
    }
    return list;
  };

  return (
    <div className={styles.contactWapper}>
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
            cid={delCid}
            delete={deleteRowHandler}
            userData={cardData}
            setCardStatus={SetCardStatus}
          />
        ) : null}
        <ContactCard
          showDeleteWarningHandler={showDeleteWarningHandler}
          cardStatus={cardStatus}
          CardCloseHandler={CardCloseHandler}
          userData={cardData}
        ></ContactCard>
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

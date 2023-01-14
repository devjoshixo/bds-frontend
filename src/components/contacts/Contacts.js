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
  };
  const deleteRowHandler = async (cid) => {
    var id = typeof cid === "string" ? [cid] : cid;
    await deleteContacts(id);
    setShowDeleteWarning(false);
    setUpdateContacts(cid);
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === dataLength) {
      setSelectedContacts([]);
      setAllSelected(false);
    } else {
      setSelectedContacts(contactsData.map((contact) => contact["_id"]));
      setAllSelected(true);
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
    if (selectedContacts.length === dataLength) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selectedContacts]);

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
        {selectedContacts.length > 0 ? (
          <button
            className={styles.multideletebutton}
            onClick={() => {
              showDeleteWarningHandler(selectedContacts);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
          </button>
        ) : null}
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
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </label>
          </div>
        </div>
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
            onClick={() => setStartFrom(startFrom + dataLength - 1)}
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

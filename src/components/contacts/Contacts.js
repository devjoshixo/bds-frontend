import React from "react";
import styles from "./Contacts.module.css";
import ContactCard from "./userCard/ContactCard";
import ContactRow from "./ContactRow";
import { useEffect } from "react";
import { useState } from "react";
import fetchContacts from "../../API calls/fetchContacts";
import Loader from "../loader/Loader";
import deleteIndividual from "../../API calls/deleteContact";
import DeleteContactModal from "./deleteContactModal/deleteContactModal";
const Contacts = (props) => {
  const [cardStatus, SetCardStatus] = useState(false);
  const [contactsData, updateContactsData] = useState([]);
  const [cardData, setCardData] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [updateContacts, setUpdateContacts] = useState(null);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [delCid, setDelCid] = useState("");
  const [dataLength, setDataLength] = useState(10);
  const [startFrom, setStartFrom] = useState(0);

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
    await deleteIndividual(cid);
    setShowDeleteWarning(false);
    setUpdateContacts(cid);
  };

  useEffect(() => {
    const fetchData = async () => {
      updateContactsData(await fetchContacts(startFrom, dataLength));
      setLoadingStatus(false);
    };
    fetchData();
  }, [updateContacts, dataLength, startFrom]);

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
          // setUpdateContacts={setUpdateContacts}
        ></ContactRow>
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
                    <input type="checkbox"></input>
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
          />
        ) : null}
        <ContactCard
          cardStatus={cardStatus}
          CardCloseHandler={CardCloseHandler}
          userData={cardData}
        ></ContactCard>
      </div>
      <div className={styles.contactoptions}>
        <div className={styles.datalength}>
          <div className={styles.optiontext}>No. of contacts</div>
          <div
            className={`${styles.n_rows} ${styles.btn}`}
            onClick={() => setDataLength(10)}
          >
            10
          </div>
          <div
            className={`${styles.n_rows} ${styles.btn}`}
            onClick={() => setDataLength(50)}
          >
            50
          </div>
          <div
            className={`${styles.n_rows} ${styles.btn}`}
            onClick={() => setDataLength(100)}
          >
            100
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
          >{`< previous`}</div>
          <div
            className={`${styles.next} ${styles.btn}`}
            onClick={() => setStartFrom(startFrom + dataLength - 1)}
          >
            {` next >`}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contacts;

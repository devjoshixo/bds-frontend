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
      updateContactsData(await fetchContacts(0, 10));
      setLoadingStatus(false);
    };
    fetchData();
  }, [updateContacts]);

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
  );
};
export default Contacts;

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
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const CardOpenHandler = (userData) => {
    SetCardStatus(true);
    setCardData(userData);
  };
  const CardCloseHandler = () => {
    SetCardStatus(false);
  };

  const showDeleteWarningHandler = () => {
    setShowDeleteWarning(true);
  };

  const deleteRowHandler = async (cid) => {
    console.log(`delete this ${cid}`);
    await deleteIndividual(cid);
    setShowDeleteWarning(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      updateContactsData(await fetchContacts());
      setLoadingStatus(false);
    };
    fetchData();
  }, []);

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
          showDeleteWarning={showDeleteWarning}
          showDeleteWarningHandler={showDeleteWarningHandler}
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
          delete={(cid) => {
            deleteRowHandler(cid);
          }}
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

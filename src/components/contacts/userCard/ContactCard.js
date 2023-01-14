import styles from "./ContactCard.module.scss";

const ContactCard = (props) => {
  return (
    <div className={`${styles.backdrop} ${props.cardStatus && styles.active}`}>
      <div
        className={`${styles.contactcard} ${props.cardStatus && styles.active}`}
      >
        <div className={styles.cardheader}>
          <div className={styles.username}>{props.userData.name}</div>
          <div className={styles.buttonscontainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              onClick={() => {
                props.showDeleteWarningHandler(props.userData.cid);
              }}
            >
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
            </svg>
          </div>
        </div>
        <div className={styles.cardbody}>
          <div className={styles.detailscontainer}>
            <div
              className={`${styles.detailparameters} ${styles.detailsubcontainer}`}
            >
              Name
              <br />
              Mobile
              <br />
              E-mail
              <br />
              Whatsapp
            </div>
            <div
              className={`${styles.detailvalues} ${styles.detailsubcontainer}`}
            >
              {props.userData.name}
              <br />
              {props.userData.mobile}
              <br />
              {props.userData.email}
              <br />
              {props.userData.whatsappMobile}
            </div>
          </div>
        </div>
        <div className={styles.closecard} onClick={props.CardCloseHandler}>
          &#x2715;
        </div>
      </div>
    </div>
  );
};
export default ContactCard;

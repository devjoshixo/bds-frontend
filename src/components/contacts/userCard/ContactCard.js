import styles from "./ContactCard.module.scss";

const ContactCard = (props) => {
  return (
    <div
      className={`${styles.contactcard} ${props.cardStatus && styles.active}`}
    >
      <div className={styles.cardheader}>
        <div className={styles.username}>{props.userData.name}</div>
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
        <div className={styles.cardbuttons}>
          <button id={styles.editbutton} className={styles.cardbutton}>
            Edit
          </button>
          <button id={styles.deletebutton} className={styles.cardbutton}>
            Delete
          </button>
        </div>
      </div>
      <div className={styles.closecard} onClick={props.CardCloseHandler}>
        &#x2715;
      </div>
    </div>
  );
};
export default ContactCard;

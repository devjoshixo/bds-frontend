import styles from "./ContactCard.module.css";

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
            mobile
            <br />
            E-mail
            <br />
            whatsapp
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
        X
      </div>
    </div>
  );
};
export default ContactCard;

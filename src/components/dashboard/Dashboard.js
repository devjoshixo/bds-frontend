import React from "react";
import { motion } from "framer-motion";
import styles from "./Dashboard.module.scss";
import { FaWhatsappSquare } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";

const dashboard = (props) => {
  return (
    <div>
      <div className={styles.api_cards__container}>
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: "tween" }}
          className={styles.api_card}
        >
          <FaWhatsappSquare size={50} />
          <h2>W.A. Team</h2>
          <p>
            WhatsApp Official Business API Solution. Send message through API
            without any limitation.
          </p>
          <button
            onClick={() => {
              props.setToShow("W.A. Team");
            }}
          >
            Go to W.A. Team
          </button>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: "tween" }}
          className={styles.api_card}
        >
          <MdBusinessCenter size={50} />
          <h2>Auto WAP</h2>
          <p>
            Manage all your chats in a unified team inbox. One stop solution for
            all your customers.
          </p>
          <button
            onClick={() => {
              props.setToShow("Auto WAP");
            }}
          >
            Go to Auto WAP
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default dashboard;

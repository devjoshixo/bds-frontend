import styles from "./PageBody.module.scss";

import { FaWhatsappSquare } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";

const PageBody = (props) => {
  const pageHeadingIcon = (selectedAPI) => {
    if (selectedAPI === "W.A. Team") {
      return <FaWhatsappSquare />;
    } else if (selectedAPI === "Auto WAP") {
      return <MdBusinessCenter />;
    }
  };

  return (
    <div className={styles.pagewrapper}>
      {/* page heading */}
      <div className={styles.pageheadingcontainer}>
        <h1 className={styles.pageheading}>
          {pageHeadingIcon(props.selectedAPI)}
          {props.heading.toUpperCase()}
        </h1>
      </div>
      {/* pagebody */}
      <div className={styles.pagebody}>{props.children}</div>
      <div id={styles.bar1} className={styles.sideoverlay} />
      <div id={styles.bar2} className={styles.sideoverlay} />
    </div>
  );
};

export default PageBody;

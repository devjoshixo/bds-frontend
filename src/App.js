import { useState } from "react";
import styles from "./App.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import PageBody from "./components/pagebody/PageBody";
import Contacts from "./components/contacts/Contacts";

function App() {
  // const sidebarStatus

  const [sidebarStatus, setSidebarStatus] = useState(false);

  const [toShow, setToShow] = useState("dashboard");

  const toggleSidebarHandler = () => {
    setSidebarStatus(!sidebarStatus);
  };
  const closeSidebarHandler = () => {
    setSidebarStatus(false);
  };

  const rendered = (toShow) => {
    if (toShow === "Contacts") {
      return <Contacts></Contacts>;
    } else if (toShow === "Dashboard") {
      return <div>dashboard</div>;
    }
  };

  const menuToggleHandler = (id) => {
    setToShow(id);
    return id;
  };

  return (
    <div className={styles.App}>
      <Sidebar
        closeSidebar={closeSidebarHandler}
        toggleSidebarHandler={toggleSidebarHandler}
        sidebarStatus={sidebarStatus}
        menuToggleHandler={menuToggleHandler}
      ></Sidebar>

      <PageBody heading={toShow}>{rendered(toShow)}</PageBody>
    </div>
  );
}

export default App;

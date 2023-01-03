import { useState } from "react";
import styles from "./App.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import PageBody from "./components/pagebody/PageBody";
import Contacts from "./components/contacts/Contacts";

function App() {
  // const sidebarStatus

  const [sidebarStatus, setSidebarStatus] = useState(false);

  const toggleSidebarHandler = () => {
    setSidebarStatus(!sidebarStatus);
  };
  const closeSidebarHandler = () => {
    setSidebarStatus(false);
  };
  var count = 0;
  return (
    <div className={styles.App}>
      <Sidebar
        closeSidebar={closeSidebarHandler}
        toggleSidebarHandler={toggleSidebarHandler}
        sidebarStatus={sidebarStatus}
      ></Sidebar>
      <PageBody count={count + 1} heading={"CONTACTS"}>
        <Contacts></Contacts>
      </PageBody>
    </div>
  );
}

export default App;

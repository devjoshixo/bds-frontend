import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import PageBody from "./components/pagebody/PageBody";
import Contacts from "./components/contacts/Contacts";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  // const sidebarStatus

  const [sidebarStatus, setSidebarStatus] = useState(false);

  const [toShow, setToShow] = useState("Dashboard");

  const hashChangeHandler = (e) => {
    console.log(e);
    setToShow(decodeURI(e.target.location.hash.split("#")[1]));
  };

  useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, []);

  const toggleSidebarHandler = () => {
    setSidebarStatus(!sidebarStatus);
  };
  const closeSidebarHandler = () => {
    setSidebarStatus(false);
  };

  const rendered = (toShow) => {
    if (toShow === "Contacts") {
      return <Contacts />;
    } else if (toShow === "Dashboard") {
      return <Dashboard setToShow={setToShow} />;
    }
  };

  const menuToggleHandler = (id) => {
    setToShow(id);
    return id;
  };

  return (
    <div className={styles.App}>
      <Sidebar
        toShow={toShow}
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

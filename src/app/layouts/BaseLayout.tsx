import { Outlet } from "react-router-dom";
import styles from "./BaseLayout.module.scss";

export const BaseLayout = () => (
  <div className={styles.layout}>
    {/* header */}
    <main className={styles.content}>
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

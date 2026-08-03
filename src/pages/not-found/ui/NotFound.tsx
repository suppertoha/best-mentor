import { Link } from "react-router-dom";
import notFoundImage from "@/shared/assets/images/not_found.png";
import { ROUTES } from "@/shared/config";
import styles from "./NotFound.module.scss";

export const NotFoundPage = () => {
  return (
    <section className={styles.page}>
      <img className={styles.icon} src={notFoundImage} alt="" aria-hidden />
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.description}>
        Возможно, ссылка устарела или страница была удалена
      </p>
      <Link to={ROUTES.main} className={styles.backBtn}>
        На главную
      </Link>
    </section>
  );
};

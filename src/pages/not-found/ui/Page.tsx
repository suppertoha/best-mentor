import notFoundImage from "@/shared/assets/images/not_found.png";
import styles from "./Page.module.scss";

export const NotFoundPage = () => {

  return (
    <section className={styles.page}>
      <img className={styles.icon} src={notFoundImage} alt="" aria-hidden />
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.description}>
        Возможно, ссылка устарела или страница была удалена
      </p>
      <button
        type="button"
        className={styles.backBtn}
      >
        На главную
      </button>
    </section>
  );
};

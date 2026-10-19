import { Link } from "react-router-dom";
import notFoundImage from "@/shared/assets/images/not_found.png";
import { ROUTES } from "@/shared/config";
import { bem } from "@/shared/lib/bem";
import styles from "./NotFound.module.scss";

const b = bem(styles, "not-found-page");

export const NotFound = () => {
  return (
    <section className={b.block()}>
      <img className={b.el("icon")} src={notFoundImage} alt="" aria-hidden />
      <h1 className={b.el("title")}>Страница не найдена</h1>
      <p className={b.el("description")}>
        Возможно, ссылка устарела или страница была удалена
      </p>
      <Link to={ROUTES.main} className={b.el("back-link")}>
        На главную
      </Link>
    </section>
  );
};

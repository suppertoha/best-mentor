import { ProfileForm } from "@/features/profile-edit";
import { bem } from "@/shared/lib/bem";
import styles from "./Profile.module.scss";

const b = bem(styles, "profile-page");

export const Profile = () => {
  return (
    <div className={b.block()}>
      <h1 className={b.el("title")}>Профиль</h1>
      <ProfileForm />
    </div>
  );
};

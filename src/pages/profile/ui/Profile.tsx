import { ProfileForm } from "@/features/profile-edit";
import styles from "./Profile.module.scss";

export const Profile = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Профиль</h1>
      <ProfileForm />
    </div>
  );
};

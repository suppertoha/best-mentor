import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { clearToken } from "@/entities/user";
import { api } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { TOKEN_STORAGE_KEY } from "@/shared/config/token";
import styles from "./Page.module.scss";

interface Section {
  id: number;
  title: string;
  slug: string;
  description: string;
}

export const SectionsPage = () => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchSections = async () => {
      try {
        const { data } = await api.get<Section[]>("/sections", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSections(data);
      } catch (err) {
        if (isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("Не удалось загрузить разделы");
        }
      } finally {
        setIsLoading(false);
      }
    };

    void fetchSections();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    dispatch(clearToken());
    navigate(ROUTES.login, { replace: true });
  };

  if (isLoading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Разделы</h1>
        <button className={styles.logoutBtn} type="button" onClick={handleLogout}>
          Выйти
        </button>
      </div>
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id} className={styles.item}>
            <strong>{section.title}</strong>
            <span>{section.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { api } from "@/shared/api";
import type { Section } from "../model/types";
import { SectionItem } from "./SectionItem";
import styles from "./Sections.module.scss";

export const SectionsPage = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSections = async (signal: AbortSignal) => {
    try {
      const { data } = await api.get<Section[]>("/sections", { signal });
      setSections(data);
    } catch (err) {
      if (isAxiosError(err) && err.code === "ERR_CANCELED") {
        return;
      }

      if (isAxiosError(err)) {
        setError(err.message);
      } else {
        setError("Не удалось загрузить разделы");
      }
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchSections(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Разделы</h2>
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id}>
            <SectionItem section={section} />
          </li>
        ))}
      </ul>
    </div>
  );
};

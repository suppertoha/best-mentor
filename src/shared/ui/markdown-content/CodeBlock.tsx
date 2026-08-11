import clsx from "clsx";
import { useState, type ReactNode } from "react";
import styles from "./MarkdownContent.module.scss";

const getTextContent = (node: ReactNode): string => {
  if (typeof node === "string") {
    return node;
  }

  if (typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    return getTextContent((node as { props: { children?: ReactNode } }).props.children);
  }

  return "";
};

interface CodeBlockProps {
  children: ReactNode;
}

export const CodeBlock = ({ children }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = getTextContent(children).trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be unavailable outside secure context
    }
  };

  return (
    <div
      className={clsx(styles.codeBlock, "wmde-markdown")}
      data-color-mode="dark"
    >
      <button
        type="button"
        className={styles.copyBtn}
        onClick={handleCopy}
        aria-label="Скопировать код"
      >
        {copied ? "Скопировано" : "Копировать"}
      </button>
      <pre>{children}</pre>
    </div>
  );
};

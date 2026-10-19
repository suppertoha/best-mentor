import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import { bem } from "@/shared/lib/bem";
import { CodeBlock } from "./CodeBlock";
import styles from "./MarkdownContent.module.scss";

import "@uiw/react-markdown-preview/markdown.css";

const b = bem(styles, "markdown");

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export const MarkdownContent = ({ content, className }: MarkdownContentProps) => (
  <div className={clsx(b.block(), className)}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypePrism]}
      components={{
        pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

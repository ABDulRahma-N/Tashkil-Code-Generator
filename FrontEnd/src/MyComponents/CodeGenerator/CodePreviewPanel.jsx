import { CodeTabs } from "./PreviewPanel/CodeTabs";

export function CodePreviewPanel({ allCode }) {
  return (
    <div className="flex flex-col gap-5 p-2">
      <CodeTabs allCode={allCode}></CodeTabs>
    </div>
  );
}

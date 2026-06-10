import { CodeTabs } from "./PreviewPanel/CodeTabs";

export function CodePreviewPanel({ entityCode }) {
  return (
    <div className="flex flex-col gap-5 p-2">
      <CodeTabs entityCode={entityCode}></CodeTabs>
    </div>
  );
}

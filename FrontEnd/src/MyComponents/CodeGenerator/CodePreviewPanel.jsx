import { CodeTabs } from "./PreviewPanel/CodeTabs";

export function CodePreviewPanel({
  entityCode,
  repositoryInterfaceCode,
  repositoryImplementationCode,
}) {
  return (
    <div className="flex flex-col gap-5 p-2">
      <CodeTabs
        entityCode={entityCode}
        repositoryInterfaceCode={repositoryInterfaceCode}
        repositoryImplementationCode={repositoryImplementationCode}
      ></CodeTabs>
    </div>
  );
}

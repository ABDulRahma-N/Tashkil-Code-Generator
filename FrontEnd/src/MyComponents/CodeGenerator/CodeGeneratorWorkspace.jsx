import { useCodeGenerator } from "@/hooks/useCodeGenerator";
import { CodeGeneratorSidebar } from "./CodeGeneratorSidebar";
import { CodePreviewPanel } from "./CodePreviewPanel";
import { useEffect, useState } from "react";

export function CodeGeneratorWorkspace() {
  const {
    entityCode,
    repositoryImplementationCode,
    repositoryInterfaceCode,
    entityGeneration,
    repositoryImplementationGeneration,
    repositoryInterfaceGeneration,
  } = useCodeGenerator();
  const [createEntity, setCreateEntity] = useState([]);
  useEffect(() => {
    if (createEntity !== null) {
      entityGeneration(createEntity);
    }
  }, [createEntity]);

  return (
    <div className="grid grid-cols-3 gap-2 mt-10">
      <div className="col-span-1">
        <CodeGeneratorSidebar
          setCreateEntity={setCreateEntity}
        ></CodeGeneratorSidebar>
      </div>
      <div className="col-span-2">
        <CodePreviewPanel
          tableName={createEntity.tableName}
          repositoryInterfaceCode={repositoryInterfaceCode}
          repositoryImplementationCode={repositoryImplementationCode}
          entityCode={entityCode}
        ></CodePreviewPanel>
      </div>
    </div>
  );
}

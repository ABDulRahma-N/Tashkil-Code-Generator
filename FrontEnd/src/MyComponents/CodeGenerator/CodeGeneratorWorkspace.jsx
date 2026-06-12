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
    resetEntityCode,
    resetRepositoryInterfaceCode,
    resetRepositoryImplementationCode,
  } = useCodeGenerator();
  const [selectedTable, setSelectedTable] = useState("");
  const [createEntity, setCreateEntity] = useState({});
  const [createRepositoryInterface, setCreateRepositoryInterface] =
    useState("");
  const [createRepositoryImplementation, setCreateRepositoryImplementation] =
    useState({});
  const [allCode, setAllCode] = useState([
    { layer: "Entity", code: "", tableName: selectedTable },
    { layer: "IRepository", code: "", tableName: selectedTable },
    {
      layer: "Repository",
      code: "",
      tableName: selectedTable,
    },
  ]);

  useEffect(() => {
    if (createEntity?.tableName) {
      entityGeneration(createEntity);
    } else {
      resetEntityCode();
    }
  }, [createEntity]);

  useEffect(() => {
    if (createRepositoryInterface) {
      repositoryInterfaceGeneration(createRepositoryInterface);
    } else {
      resetRepositoryInterfaceCode();
    }
  }, [createRepositoryInterface]);

  useEffect(() => {
    if (createRepositoryImplementation?.tableName) {
      repositoryImplementationGeneration(createRepositoryImplementation);
    } else {
      resetRepositoryImplementationCode();
    }
  }, [createRepositoryImplementation]);

  useEffect(() => {
    setAllCode([
      { layer: "Entity", code: entityCode, tableName: selectedTable },
      {
        layer: "IRepository",
        code: repositoryInterfaceCode,
        tableName: selectedTable,
      },
      {
        layer: "Repository",
        code: repositoryImplementationCode,
        tableName: selectedTable,
      },
    ]);
  }, [entityCode, repositoryInterfaceCode, repositoryImplementationCode]);

  return (
    <div className="grid grid-cols-3 gap-2 mt-10">
      <div className="col-span-1">
        <CodeGeneratorSidebar
          setSelectedtable={setSelectedTable}
          setCreateEntity={setCreateEntity}
          setCreateRepositoryInterface={setCreateRepositoryInterface}
          setCreateRepositoryImplementation={setCreateRepositoryImplementation}
        ></CodeGeneratorSidebar>
      </div>
      <div className="col-span-2">
        <CodePreviewPanel allCode={allCode}></CodePreviewPanel>
      </div>
    </div>
  );
}

import { useSchema } from "@/hooks/useSchema";
import { CodeGeneratorSidebar } from "./CodeGeneratorSidebar";
import { CodePreviewPanel } from "./CodePreviewPanel";

export function CodeGeneratorWorkspace() {
  const {
    loading,
    databases,
    tables,
    columns,
    selectedDatabase,
    selectedTable,
    setSelectedDatabase,
    setSelectedTable,
  } = useSchema();
  return (
    <div className="grid grid-cols-3 gap-2 mt-10">
      <div className="col-span-1">
        <CodeGeneratorSidebar databases={databases}></CodeGeneratorSidebar>
      </div>
      <div className="col-span-2">
        <CodePreviewPanel></CodePreviewPanel>
      </div>
    </div>
  );
}

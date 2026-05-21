import { CodeGeneratorSidebar } from "./CodeGeneratorSidebar";
import { CodePreviewPanel } from "./CodePreviewPanel";

export function CodeGeneratorWorkspace() {
  return (
    <div className="grid grid-cols-3 gap-2 mt-10">
      <div className="col-span-1">
        <CodeGeneratorSidebar></CodeGeneratorSidebar>
      </div>
      <div className="col-span-2">
        <CodePreviewPanel></CodePreviewPanel>
      </div>
    </div>
  );
}

import { CodeGeneratorSidebar } from "./CodeGeneratorSidebar";

export function CodeGeneratorWorkspace() {
  return (
    <div className="grid grid-cols-3 gap-2 mt-10">
      <div className="col-span-1">
        <CodeGeneratorSidebar></CodeGeneratorSidebar>
      </div>
      <div className="bg-green-100 col-span-2">Preview Panel</div>
    </div>
  );
}

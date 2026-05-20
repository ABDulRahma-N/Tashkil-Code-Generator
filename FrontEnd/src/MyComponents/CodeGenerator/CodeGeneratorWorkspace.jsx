import { CodeGeneratorSidebar } from "./CodeGeneratorSidebar";

export function CodeGeneratorWorkspace() {
  return (
    <div className="bg-red-100 grid grid-cols-3 gap-2">
      <div className="bg-blue-100 col-span-1">
        <CodeGeneratorSidebar></CodeGeneratorSidebar>
      </div>
      <div className="bg-green-100 col-span-2">Preview Panel</div>
    </div>
  );
}

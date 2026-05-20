import { CodeGeneratorHeader } from "@/MyComponents/CodeGenerator/CodeGeneratorHeader";
import { CodeGeneratorWorkspace } from "@/MyComponents/CodeGenerator/CodeGeneratorWorkspace";

export function CodeGeneratorPage() {
  return (
    <div className="px-2 sm:px-8 md:px-16 lg:px-24 xl:px-[15%] mt-3.5">
      <CodeGeneratorHeader></CodeGeneratorHeader>
      <CodeGeneratorWorkspace></CodeGeneratorWorkspace>
    </div>
  );
}

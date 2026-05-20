import { DatabaseSelector } from "./CodeSidebar/DatabaseSelector";
import { TableSelector } from "./CodeSidebar/TableSelector";

export function CodeGeneratorSidebar() {
  return (
    <div className="flex flex-col gap-5 p-2">
      <DatabaseSelector></DatabaseSelector>
      <TableSelector></TableSelector>
    </div>
  );
}

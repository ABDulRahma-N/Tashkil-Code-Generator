import { Button } from "@/components/ui/button";
import { ColumnSelectionPanel } from "./CodeSidebar/ColumnSelectionPanel";
import { DatabaseSelector } from "./CodeSidebar/DatabaseSelector";
import { LayerSelectionPanel } from "./CodeSidebar/LayerSelectionPanel";
import { TableSelector } from "./CodeSidebar/TableSelector";
import { useSchema } from "@/hooks/useSchema";

export function CodeGeneratorSidebar() {
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
    <div className="flex flex-col gap-5 p-2">
      <DatabaseSelector
        databases={databases}
        selectedDatabase={selectedDatabase}
        setSelectedDatabase={setSelectedDatabase}
      ></DatabaseSelector>
      <TableSelector
        tables={tables}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      ></TableSelector>
      <ColumnSelectionPanel></ColumnSelectionPanel>
      <LayerSelectionPanel></LayerSelectionPanel>
      <div className="flex flex-cole justify-between">
        <Button variant="outline">Reset</Button>
        <Button>Generate</Button>
      </div>
    </div>
  );
}

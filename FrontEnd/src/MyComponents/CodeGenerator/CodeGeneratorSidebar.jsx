import { Button } from "@/components/ui/button";
import { ColumnSelectionPanel } from "./CodeSidebar/ColumnSelectionPanel";
import { DatabaseSelector } from "./CodeSidebar/DatabaseSelector";
import { LayerSelectionPanel } from "./CodeSidebar/LayerSelectionPanel";
import { TableSelector } from "./CodeSidebar/TableSelector";

export function CodeGeneratorSidebar({ databases }) {
  return (
    <div className="flex flex-col gap-5 p-2">
      <DatabaseSelector databases={databases}></DatabaseSelector>
      <TableSelector></TableSelector>
      <ColumnSelectionPanel></ColumnSelectionPanel>
      <LayerSelectionPanel></LayerSelectionPanel>
      <div className="flex flex-cole justify-between">
        <Button variant="outline">Reset</Button>
        <Button>Generate</Button>
      </div>
    </div>
  );
}

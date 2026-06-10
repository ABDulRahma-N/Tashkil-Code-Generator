import { Button } from "@/components/ui/button";
import { ColumnSelectionPanel } from "./CodeSidebar/ColumnSelectionPanel";
import { DatabaseSelector } from "./CodeSidebar/DatabaseSelector";
import { LayerSelectionPanel } from "./CodeSidebar/LayerSelectionPanel";
import { TableSelector } from "./CodeSidebar/TableSelector";
import { useSchema } from "@/hooks/useSchema";
import { useState } from "react";

export function CodeGeneratorSidebar({ setCreateEntity }) {
  const {
    loading,
    databases,
    tables,
    columns,
    selectedDatabase,
    selectedTable,
    setSelectedDatabase,
    setSelectedTable,
    setColumns,
  } = useSchema();
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setSelectedDatabase(null);
    setSelectedTable(null);
    setColumns([]);
    setResetKey((prev) => prev + 1);
  };

  const handleGenerate = () => {
    if (selectedTable && columns.length > 0) {
      setCreateEntity({
        tableName: selectedTable,
        columns: columns,
      });
    } else {
      alert("Please select a table and at least one column to generate code.");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-2">
      <DatabaseSelector
        key={`db-${resetKey}`}
        databases={databases}
        selectedDatabase={selectedDatabase}
        setSelectedDatabase={setSelectedDatabase}
      ></DatabaseSelector>
      <TableSelector
        key={`table-${resetKey}`}
        tables={tables}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      ></TableSelector>
      <ColumnSelectionPanel
        key={`columns-${resetKey}`}
        columns={columns}
      ></ColumnSelectionPanel>
      <LayerSelectionPanel></LayerSelectionPanel>
      <div className="flex flex-cole justify-between">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleGenerate}>Generate</Button>
      </div>
    </div>
  );
}

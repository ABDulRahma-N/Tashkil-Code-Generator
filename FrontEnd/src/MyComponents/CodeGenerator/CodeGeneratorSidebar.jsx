import { Button } from "@/components/ui/button";
import { ColumnSelectionPanel } from "./CodeSidebar/ColumnSelectionPanel";
import { DatabaseSelector } from "./CodeSidebar/DatabaseSelector";
import { LayerSelectionPanel } from "./CodeSidebar/LayerSelectionPanel";
import { TableSelector } from "./CodeSidebar/TableSelector";
import { useSchema } from "@/hooks/useSchema";
import { useState } from "react";

export function CodeGeneratorSidebar({
  setCreateEntity,
  setCreateRepositoryInterface,
  setCreateRepositoryImplementation,
  setSelectedtable,
}) {
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
  const [resetLayersKey, setResetLayersKey] = useState(0);
  const [selectedLayers, setSelectedLayers] = useState({
    entity: false,
    repositoryInterface: false,
    repositoryImplementation: false,
    serviceInterface: false,
    serviceImplementation: false,
    DTOs: false,
  });

  const isAnyLayerSelected = Object.values(selectedLayers).some(
    (value) => value === true,
  );

  const isGenerateDisabled =
    !selectedTable || columns.length === 0 || !isAnyLayerSelected;

  const handleReset = () => {
    setSelectedLayers({
      entity: false,
      repositoryInterface: false,
      repositoryImplementation: false,
      serviceInterface: false,
      serviceImplementation: false,
      DTOs: false,
    });
    setSelectedDatabase(null);
    setSelectedTable(null);
    setColumns([]);
    setResetKey((prev) => prev + 1);
    setResetLayersKey((prev) => prev + 1);
  };

  const handleSelectedTableChange = (table) => {
    setSelectedTable(table);
    setSelectedtable(table);
  };
  const handleGenerate = () => {
    if (selectedTable && columns.length > 0) {
      setCreateEntity(
        selectedLayers.entity ? { tableName: selectedTable, columns } : null,
      );
      setCreateRepositoryInterface(
        selectedLayers.repositoryInterface ? selectedTable : null,
      );
      setCreateRepositoryImplementation(
        selectedLayers.repositoryImplementation
          ? { tableName: selectedTable, columns }
          : null,
      );
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
        setSelectedTable={handleSelectedTableChange}
      ></TableSelector>
      <ColumnSelectionPanel
        key={`columns-${resetKey}`}
        columns={columns}
      ></ColumnSelectionPanel>
      <LayerSelectionPanel
        key={`layers-${resetLayersKey}`}
        setSelectedLayers={setSelectedLayers}
      />
      <div className="flex flex-cole justify-between">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button disabled={isGenerateDisabled} onClick={handleGenerate}>
          Generate
        </Button>
      </div>
    </div>
  );
}

import { getColumns, getDatabase, getTables } from "@/services/SchemaService";
import { useEffect, useState } from "react";

export function useSchema() {
  const [databases, setDatabases] = useState([]);
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDatabases() {
      setLoading(true);
      try {
        const dbs = await getDatabase();
        setDatabases(dbs);
      } catch (error) {
        console.error("Error fetching databases:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDatabases();
  }, []);

  useEffect(() => {
    async function fetchTables() {
      if (!selectedDatabase) return;
      setLoading(true);
      try {
        const tbls = await getTables(selectedDatabase);
        setTables(tbls);
      } catch (error) {
        console.error("Error fetching tables:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTables();
  }, [selectedDatabase]);

  useEffect(() => {
    async function fetchColumns() {
      if (!selectedDatabase || !selectedTable) return;
      setLoading(true);
      try {
        const cols = await getColumns(selectedDatabase, selectedTable);
        setColumns(cols);
      } catch (error) {
        console.error("Error fetching columns:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchColumns();
  }, [selectedDatabase, selectedTable]);

  return {
    databases,
    tables,
    columns,
    loading,
    selectedDatabase,
    setSelectedDatabase,
    selectedTable,
    setSelectedTable,
    setColumns,
  };
}

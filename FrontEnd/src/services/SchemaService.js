import api from "@/lib/api";

export async function getDatabase() {
  try {
    const res = await api.get("/Schema");
    return res.data;
  } catch (error) {
    console.error("Error fetching databases:", error);
    throw error;
  }
}
export async function getTables(database) {
  try {
    const res = await api.get(`/Schema/${database}/tables`);
    return res.data;
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
}
export async function getColumns(database, table) {
  try {
    const res = await api.get(`/Schema/${database}/tables/${table}/columns`);
    return res.data;
  } catch (error) {
    console.error("Error fetching columns:", error);
    throw error;
  }
}
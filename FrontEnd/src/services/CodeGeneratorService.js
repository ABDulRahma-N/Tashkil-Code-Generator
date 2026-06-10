import api from "@/lib/api";

export async function generateEntity(createEntityDto) {
  try {
    const res = await api.post(
      "/CodeGenerator/GenerateEntity",
      createEntityDto,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching databases:", error);
    throw error;
  }
}
export async function generateRepositoryImplementation(createRepositoryDto) {
  try {
    const res = await api.post(
      "/CodeGenerator/GenerateRepositoryImplementation",
      createRepositoryDto,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching databases:", error);
    throw error;
  }
}
export async function generateRepositoryInterface(tableName) {
  try {
    const res = await api.post("/CodeGenerator/GenerateRepositoryInterface", {
      TableName: tableName,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching databases:", error);
    throw error;
  }
}

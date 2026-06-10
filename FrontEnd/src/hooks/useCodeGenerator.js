import {
  generateEntity,
  generateRepositoryImplementation,
  generateRepositoryInterface,
} from "@/services/CodeGeneratorService";
import { useState } from "react";

export function useCodeGenerator() {
  const [entityCode, setEntityCode] = useState("");
  const [repositoryImplementationCode, setRepositoryImplementationCode] =
    useState("");
  const [repositoryInterfaceCode, setRepositoryInterfaceCode] = useState("");
  const [loading, setLoading] = useState(false);

  const entityGeneration = async (createEntityDto) => {
    setLoading(true);
    try {
      const code = await generateEntity(createEntityDto);
      setEntityCode(code);
    } catch (error) {
      console.error("Error generating entity:", error);
    } finally {
      setLoading(false);
    }
  };

  const repositoryImplementationGeneration = async (createRepositoryDto) => {
    setLoading(true);
    try {
      const code = await generateRepositoryImplementation(createRepositoryDto);
      setRepositoryImplementationCode(code);
    } catch (error) {
      console.error("Error generating repository implementation:", error);
    } finally {
      setLoading(false);
    }
  };

  const repositoryInterfaceGeneration = async (tableName) => {
    setLoading(true);
    try {
      const code = await generateRepositoryInterface(tableName);
      setRepositoryInterfaceCode(code);
    } catch (error) {
      console.error("Error generating repository interface:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    entityCode,
    repositoryImplementationCode,
    repositoryInterfaceCode,
    loading,
    entityGeneration,
    repositoryImplementationGeneration,
    repositoryInterfaceGeneration,
  };
}

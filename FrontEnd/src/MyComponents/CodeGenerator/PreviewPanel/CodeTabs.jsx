import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "./CodeEditor";

export function CodeTabs({ tableName = "User", entityCode = "" }) {
  const [generationId, setGenerationId] = useState(0);

  useEffect(() => {
    setGenerationId((prev) => prev + 1);
  }, [entityCode]);

  return (
    <Tabs defaultValue="Entity" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="Entity">{tableName}.cs</TabsTrigger>
        <TabsTrigger value="IRepository">I{tableName}Repository.cs</TabsTrigger>
        <TabsTrigger value="Repository">{tableName}Repository.cs</TabsTrigger>
      </TabsList>
      <TabsContent value="Entity">
        <CodeEditor
          language="csharp"
          code={entityCode || `public class ${tableName}Entity {\n\n}`}
          generationId={generationId}
        />
      </TabsContent>
      <TabsContent value="IRepository">
        <CodeEditor
          language="csharp"
          code={`public interface I${tableName}Repository {\n\n}`}
          generationId={generationId}
        />
      </TabsContent>
      <TabsContent value="Repository">
        <CodeEditor
          language="csharp"
          code={`public class ${tableName}Repository : I${tableName}Repository {\n\n}`}
          generationId={generationId}
        />
      </TabsContent>
    </Tabs>
  );
}

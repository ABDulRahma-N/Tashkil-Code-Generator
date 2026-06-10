import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "./CodeEditor";

export function CodeTabs({ tableName = "User", entityCode = "" }) {
  return (
    <Tabs defaultValue="Entity" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="Entity">{tableName}.cs</TabsTrigger>
        <TabsTrigger value="IRepository">I{tableName}Repository.cs</TabsTrigger>
        <TabsTrigger value="Repository">{tableName}Repository.cs</TabsTrigger>
      </TabsList>
      <TabsContent value="Entity">
        <CodeEditor
          key={entityCode.length}
          language="csharp"
          code={entityCode || `public class ${tableName}Entity {\n\n}`}
        />
      </TabsContent>
      <TabsContent value="IRepository">
        <CodeEditor
          language="csharp"
          code={`public interface I${tableName}Repository {\n\n}`}
        />
      </TabsContent>
      <TabsContent value="Repository">
        <CodeEditor
          language="csharp"
          code={`public class ${tableName}Repository : I${tableName}Repository {\n\n}`}
        />
      </TabsContent>
    </Tabs>
  );
}

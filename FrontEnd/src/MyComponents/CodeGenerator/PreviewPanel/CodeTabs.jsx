import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "./CodeEditor";

export function CodeTabs({ allCode }) {
  const generationCounters = useRef({});
  const [activeTab, setActiveTab] = useState(null);

  const validCodes = allCode.filter((c) => c.code && c.code.trim() !== "");

  const getFileName = (tableName, layer) => {
    if (!tableName) return `${layer}.cs`;
    switch (layer) {
      case "Entity":
        return `${tableName}.cs`;
      case "IRepository":
        return `I${tableName}Repository.cs`;
      case "Repository":
        return `${tableName}Repository.cs`;
      case "IService":
        return `I${tableName}Service.cs`;
      case "Service":
        return `${tableName}Service.cs`;
      default:
        return `${tableName}${layer}.cs`;
    }
  };

  validCodes.forEach((code) => {
    const key = `${code.tableName}-${code.layer}`;
    const prev = generationCounters.current[key];
    if (prev?.code !== code.code) {
      generationCounters.current[key] = {
        code: code.code,
        id: (prev?.id ?? 0) + 1,
      };
    }
  });

  const currentTab =
    activeTab && validCodes.find((c) => c.layer === activeTab)
      ? activeTab
      : validCodes[0]?.layer;

  if (validCodes.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500 p-4 border rounded-md">
        No code generated yet. Select layers and click Generate.
      </div>
    );
  }

  return (
    <Tabs value={currentTab} onValueChange={setActiveTab} className="w-full">
      <TabsList variant="line">
        {validCodes.map((code) => (
          <TabsTrigger
            key={`${code.tableName}-${code.layer}`}
            value={code.layer}
          >
            {getFileName(code.tableName, code.layer)}
          </TabsTrigger>
        ))}
      </TabsList>

      {validCodes.map((code) => {
        const key = `${code.tableName}-${code.layer}`;
        const generationId = `${code.tableName}-${code.layer}-${generationCounters.current[key]?.id ?? 0}`;
        return (
          <TabsContent key={key} value={code.layer}>
            <CodeEditor
              language="csharp"
              code={code.code}
              generationId={generationId}
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

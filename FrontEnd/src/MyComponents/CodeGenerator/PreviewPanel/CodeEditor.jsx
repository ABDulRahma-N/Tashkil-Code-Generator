import React, { useCallback } from "react";
import Editor from "@monaco-editor/react";

export function CodeEditor({
  code,
  fileName = "UserEntity.cs",
  language = "csharp",
  height = "500px",
  readOnly = false,
  onChange,
}) {
  const fallbackCode =
    "// Select a table and click Generate to preview code here.";

  const defineTheme = useCallback((monaco) => {
    monaco.editor.defineTheme("clean-terminal", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "6500a4", fontStyle: "bold" },
        { token: "string", foreground: "0f766e" },
        { token: "comment", foreground: "94a3b8", fontStyle: "italic" },
        { token: "number", foreground: "7c3aed" },
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#172033",
        "editorLineNumber.foreground": "#94a3b8",
        "editorLineNumber.activeForeground": "#000000",
        "editorCursor.foreground": "#6500a4",
        "editor.selectionBackground": "#dbeafe",
        "editor.lineHighlightBackground": "#f8fafc",
        "editorIndentGuide.background": "#e2e8f0",
        "editorIndentGuide.activeBackground": "#cbd5e1",
      },
    });
  }, []);

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white ">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        <div className="max-w-[60%] truncate font-mono text-xs font-semibold tracking-wide text-slate-500">
          {fileName}
        </div>

        <div className="rounded-md border border-slate-200 bg-white px-2 py-1 font-mono text-[11px] font-semibold uppercase text-slate-400">
          {language}
        </div>
      </div>

      <div className="relative w-full" style={{ height }}>
        <Editor
          height="100%"
          language={language}
          theme="clean-terminal"
          value={code || fallbackCode}
          beforeMount={defineTheme}
          onChange={onChange}
          loading={
            <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
              Loading editor...
            </div>
          }
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily:
              "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
            fontLigatures: true,
            wordWrap: "on",
            readOnly,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            lineNumbersMinChars: 3,
            renderLineHighlight: "all",
            padding: { top: 18, bottom: 18 },
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
          }}
        />
      </div>
    </div>
  );
}

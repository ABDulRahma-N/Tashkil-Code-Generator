import { useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Badge } from "@/components/ui/badge";

export function CodeEditor({
  code,
  fileName = "UserEntity.cs",
  language = "csharp",
  height = "500px",
  readOnly = false,
  onChange,
}) {
  const defineTheme = useCallback((monaco) => {
    monaco.editor.defineTheme("vivid-night", {
      base: "vs-dark",
      inherit: false,
      rules: [
        { token: "", foreground: "eeffff" },
        { token: "keyword", foreground: "ff00ff", fontStyle: "bold" },
        { token: "keyword.control", foreground: "ff00ff", fontStyle: "bold" },
        {
          token: "keyword.control.flow",
          foreground: "ff00ff",
          fontStyle: "bold",
        },
        { token: "keyword.operator", foreground: "00e5ff" },
        { token: "keyword.new", foreground: "ff00ff", fontStyle: "bold" },
        { token: "type", foreground: "ffe000" },
        { token: "type.identifier", foreground: "ffe000" },
        { token: "string", foreground: "00ff88" },
        { token: "string.quoted", foreground: "00ff88" },
        { token: "string.verbatim", foreground: "00ff88" },
        { token: "string.interpolated", foreground: "00ff88" },
        { token: "number", foreground: "ff6a00" },
        { token: "comment", foreground: "3a5a6e", fontStyle: "italic" },
        { token: "identifier", foreground: "00aaff" },
        { token: "operator", foreground: "00e5ff" },
        { token: "delimiter", foreground: "00e5ff" },
        { token: "delimiter.parenthesis", foreground: "ffe000" },
        { token: "delimiter.curly", foreground: "eeffff" },
        { token: "delimiter.square", foreground: "00e5ff" },
        { token: "delimiter.angle", foreground: "00e5ff" },
      ],
      colors: {
        "editor.background": "#080d14",
        "editor.foreground": "#eeffff",
        "editorLineNumber.foreground": "#1e3347",
        "editorLineNumber.activeForeground": "#4a8aab",
        "editorCursor.foreground": "#00e5ff",
        "editor.selectionBackground": "#1a3a5c80",
        "editor.lineHighlightBackground": "#0f1a27",
        "editorIndentGuide.background1": "#152030",
        "editorIndentGuide.activeBackground1": "#2a4a6a",
        "scrollbarSlider.background": "#1a3a5c40",
        "scrollbarSlider.hoverBackground": "#1a3a5c90",
      },
    });
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-800/50 bg-[#080d14] shadow-2xl shadow-black/70">
      <div className="flex items-center justify-between border-b border-slate-800/50 bg-[#060a10] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57] shadow-[0_0_8px_#ff5f57]" />
          <span className="size-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#28c840] shadow-[0_0_8px_#28c840]" />
        </div>
        <span className="font-mono text-xs font-medium text-slate-500">
          {fileName}
        </span>
        <Badge
          variant="outline"
          className="border-slate-700 bg-slate-900 font-mono text-[10px] uppercase tracking-widest text-slate-400"
        >
          {language}
        </Badge>
      </div>

      <div style={{ height }}>
        <Editor
          height="100%"
          language={language}
          theme="vivid-night"
          value={
            code ?? "// Select a table and click Generate to preview code here."
          }
          beforeMount={defineTheme}
          onChange={onChange}
          loading={
            <div className="flex h-full items-center justify-center bg-[#080d14] font-mono text-sm text-slate-600">
              Loading…
            </div>
          }
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
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
            padding: { top: 16, bottom: 16 },
            scrollbar: { verticalScrollbarSize: 5, horizontalScrollbarSize: 5 },
          }}
        />
      </div>
    </div>
  );
}

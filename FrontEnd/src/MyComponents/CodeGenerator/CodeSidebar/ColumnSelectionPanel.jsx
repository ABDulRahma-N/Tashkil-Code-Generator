import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ColumnSelectionPanel({ columns }) {
  const listColumns = columns.map((column) => {
    return (
      <Field orientation="horizontal" key={column.columnName}>
        <Label htmlFor={column.columnName}>
          {column.columnName}
          {"  "}
          <span className="text-slate-800/75">({column.sqlDataType})</span>
        </Label>
      </Field>
    );
  });
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <Label htmlFor="frameworks">Available Columns</Label>
        <Label className={"underline underline-offset-2 cursor-pointer"}>
          Select All
        </Label>
      </div>
      <div className="flex flex-col border rounded-md mt-2 p-3 bg-muted/40">
        <ScrollArea className="h-[200px] w-full pr-4">
          <div className="flex flex-col gap-4">{listColumns}</div>
        </ScrollArea>
      </div>
    </div>
  );
}

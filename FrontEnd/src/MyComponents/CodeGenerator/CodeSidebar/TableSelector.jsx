import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

export function TableSelector({ tables, setSelectedTable }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="tables">Table</Label>
      <Combobox
        items={tables}
        onValueChange={(value) => {
          setSelectedTable(value);
        }}
      >
        <ComboboxInput placeholder="Select a table" />
        <ComboboxContent>
          <ComboboxEmpty>No tables found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.tableName} value={item.tableName}>
                {item.tableName}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

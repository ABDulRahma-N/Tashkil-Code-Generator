import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

export function DatabaseSelector({ databases }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="frameworks">Database</Label>
      <Combobox items={databases} onSelect={(value) => console.log(value)}>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.databaseName} value={item.databaseName}>
                {item.databaseName}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

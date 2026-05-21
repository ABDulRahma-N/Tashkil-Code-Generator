import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

export function DatabaseSelector({ databases, setSelectedDatabase }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="databases">Database</Label>
      <Combobox
        items={databases}
        onValueChange={(value) => {
          setSelectedDatabase(value);
        }}
      >
        <ComboboxInput placeholder="Select a database" />
        <ComboboxContent>
          <ComboboxEmpty>No Database found.</ComboboxEmpty>
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

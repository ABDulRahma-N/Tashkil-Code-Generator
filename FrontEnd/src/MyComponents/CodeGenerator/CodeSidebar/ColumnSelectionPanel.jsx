import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export function ColumnSelectionPanel() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <Label htmlFor="frameworks">Available Columns</Label>
        <Label className={"underline underline-offset-2 cursor-pointer"}>
          Select All
        </Label>
      </div>
      <div className="flex flex-col gap-4 border rounded-md mt-2 p-3 bg-muted/40">
        <Field orientation="horizontal">
          <Checkbox id="terms-checkbox" name="terms-checkbox" />
          <Label htmlFor="terms-checkbox">Id </Label>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="terms-checkbox" name="terms-checkbox" />
          <Label htmlFor="terms-checkbox">Name </Label>
        </Field>
      </div>
    </div>
  );
}

import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function LayerSelectionPanel() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="frameworks">Layers to Generate</Label>
      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <Label htmlFor="terms-checkbox">Entity</Label>
      </Field>
      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" disabled />
        <Label htmlFor="terms-checkbox">IRepository</Label>
      </Field>
      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" disabled />
        <Label htmlFor="terms-checkbox">Repository</Label>
      </Field>
      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" disabled />
        <Label htmlFor="terms-checkbox">CRUD Dtos </Label>
      </Field>
      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" disabled />
        <Label htmlFor="terms-checkbox">IService </Label>
      </Field>
      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" disabled />
        <Label htmlFor="terms-checkbox">Service </Label>
      </Field>
    </div>
  );
}

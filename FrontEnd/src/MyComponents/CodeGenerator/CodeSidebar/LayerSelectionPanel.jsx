import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export function LayerSelectionPanel({ setSelectedLayers }) {
  const handleLayerChange = (layer, checked) => {
    setSelectedLayers((prev) => ({
      ...prev,
      [layer]: checked,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="frameworks">Layers to Generate</Label>

      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox
          id="entity"
          name="entity"
          onCheckedChange={(checked) => handleLayerChange("entity", checked)}
        />
        <Label htmlFor="entity">Entity</Label>
      </Field>

      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox
          id="repository-interface"
          name="repository-interface"
          onCheckedChange={(checked) =>
            handleLayerChange("repositoryInterface", checked)
          }
        />
        <Label htmlFor="repository-interface">IRepository</Label>
      </Field>
      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox
          id="repository-implementation"
          name="repository-implementation"
          onCheckedChange={(checked) =>
            handleLayerChange("repositoryImplementation", checked)
          }
        />
        <Label htmlFor="repository-implementation">Repository</Label>
      </Field>
      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox
          disabled
          id="dto-checkbox"
          name="dto-checkbox"
          onCheckedChange={(checked) => handleLayerChange("DTOs", checked)}
        />
        <Label htmlFor="dto-checkbox">CRUD Dtos </Label>
      </Field>
      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox
          disabled
          id="service-interface-checkbox"
          name="service-interface-checkbox"
          onCheckedChange={(checked) =>
            handleLayerChange("serviceInterface", checked)
          }
        />
        <Label htmlFor="service-interface-checkbox">IService </Label>
      </Field>
      <Field className={"flex flex-cole gap-4"} orientation="horizontal">
        <Checkbox
          disabled
          id="service-implementation-checkbox"
          name="service-implementation-checkbox"
          onCheckedChange={(checked) =>
            handleLayerChange("serviceImplementation", checked)
          }
        />
        <Label htmlFor="service-implementation-checkbox">Service </Label>
      </Field>
    </div>
  );
}

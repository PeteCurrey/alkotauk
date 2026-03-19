import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

interface CompareModel {
  name: string;
  seriesName: string;
  gpm: string;
  psi: string;
  powerSource: string;
  heatingFuel?: string;
  configuration: string;
}

interface ProductCompareProps {
  models: CompareModel[];
  onRemove: (modelName: string, seriesName: string) => void;
  onClose: () => void;
}

const specRows = [
  { label: "Series", key: "seriesName" as const },
  { label: "GPM (Flow)", key: "gpm" as const },
  { label: "PSI (Pressure)", key: "psi" as const },
  { label: "Power Source", key: "powerSource" as const },
  { label: "Heating Fuel", key: "heatingFuel" as const },
  { label: "Configuration", key: "configuration" as const },
];

const ProductCompare = ({ models, onRemove, onClose }: ProductCompareProps) => {
  const hasHeatingFuel = models.some((m) => m.heatingFuel);
  const filteredRows = hasHeatingFuel
    ? specRows
    : specRows.filter((r) => r.key !== "heatingFuel");

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <div className="bg-background border border-border w-full max-w-4xl max-h-[85vh] overflow-auto m-4 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-background z-10">
          <h2 className="text-xl font-light tracking-tight">
            Compare Models
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close comparison"
          >
            <X size={20} strokeWidth={1} />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-6">
          <div className="border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-light text-xs w-[140px]">Spec</TableHead>
                  {models.map((model) => (
                    <TableHead key={model.name} className="font-light text-xs text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-normal text-foreground">{model.name}</span>
                        <span className="text-[10px] text-muted-foreground">{model.seriesName}</span>
                        <button
                          onClick={() => onRemove(model.name, model.seriesName)}
                          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRows.map((row) => (
                  <TableRow key={row.key}>
                    <TableCell className="font-light text-sm text-muted-foreground">
                      {row.label}
                    </TableCell>
                    {models.map((model) => {
                      const value = model[row.key] || "—";
                      return (
                        <TableCell
                          key={model.name}
                          className="text-sm font-light text-center"
                        >
                          {row.key === "gpm" || row.key === "psi" ? (
                            <span className="text-primary font-normal">{value}</span>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
                {/* CU Row */}
                <TableRow>
                  <TableCell className="font-light text-sm text-muted-foreground">
                    Cleaning Units
                  </TableCell>
                  {models.map((model) => {
                    const gpm = parseFloat(model.gpm.replace(/,/g, ""));
                    const psi = parseFloat(model.psi.replace(/,/g, ""));
                    const cu = isNaN(gpm) || isNaN(psi) ? "—" : (gpm * psi).toLocaleString();
                    return (
                      <TableCell
                        key={model.name}
                        className="text-sm font-normal text-center text-primary"
                      >
                        {cu}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 flex justify-center">
            <Link to="/contact">
              <Button variant="outline" size="sm" className="font-light tracking-wide">
                Request a Quote for Selected Models
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCompare;

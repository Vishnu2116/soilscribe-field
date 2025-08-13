import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Copy, GripVertical } from "lucide-react";
import { TextField, SelectField } from "./Field";
import { Horizon } from "@/lib/storage";
import { 
  TEXTURES, 
  MOTTLES, 
  BOUNDARY_DISTINCT, 
  BOUNDARY_TOPO, 
  STRUCTURE_GRADE, 
  STRUCTURE_SIZE, 
  STRUCTURE_TYPE,
  CONS_DRY,
  CONS_MOIST,
  CONS_STICKY,
  CONS_PLASTIC,
  FRAGMENT_PCT,
  FRAGMENT_SIZE,
  CONCRETIONS,
  PORE_FREQ,
  PORE_TYPE,
  CUTANS,
  ROOT_ABUND,
  ROOT_SIZE,
  CRACKS,
  ARTEFACTS,
  LIME,
  MUNSELL_PRESETS
} from "@/lib/options";

interface HorizonRowRepeaterProps {
  title: string;
  horizons: Horizon[];
  onHorizonsChange: (horizons: Horizon[]) => void;
}

const emptyHorizon: Horizon = {
  label: "",
  depthFrom: 0,
  depthTo: 0,
  boundaryDistinct: "",
  boundaryTopo: "",
  colour: "",
  mottles: "None",
  texture: "",
  structureGrade: "",
  structureSize: "",
  structureType: "",
  consistenceDry: "",
  consistenceMoist: "",
  consistenceWet: "",
  coarseFragments: "0–5%",
  concretions: "None",
  pores: "",
  cutans: "None",
  roots: "",
  cracks: "None",
  artefacts: "None",
  lime: "None visible",
  sampleNo: ""
};

interface HorizonRowProps {
  horizon: Horizon;
  index: number;
  onUpdate: (field: keyof Horizon, value: string | number) => void;
  onDelete: () => void;
  isExpanded: boolean;
  onToggle: () => void;
  canDelete: boolean;
}

function HorizonRow({ horizon, index, onUpdate, onDelete, isExpanded, onToggle, canDelete }: HorizonRowProps) {
  const [fragmentSize, setFragmentSize] = useState("");
  const [poreType, setPoreType] = useState("");
  const [rootSize, setRootSize] = useState("");

  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <button
            onClick={onToggle}
            className="flex items-center space-x-2 text-left flex-1"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">
              {horizon.label || `Horizon ${index + 1}`}: {horizon.depthFrom}-{horizon.depthTo}cm
              {horizon.texture && ` | ${horizon.texture}`}
              {horizon.structureType && ` | ${horizon.structureType}`}
            </span>
          </button>
          
          {canDelete && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDelete}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              label="Horizon Label"
              value={horizon.label}
              onChange={(value) => onUpdate('label', value)}
              placeholder="e.g., Ap, A, E, Bt"
              required
            />
            <TextField
              label="Depth From (cm)"
              type="number"
              value={horizon.depthFrom}
              onChange={(value) => onUpdate('depthFrom', parseInt(value) || 0)}
              required
            />
            <TextField
              label="Depth To (cm)"
              type="number"
              value={horizon.depthTo}
              onChange={(value) => onUpdate('depthTo', parseInt(value) || 0)}
              required
            />
          </div>

          {/* Lower Boundary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Boundary Distinctness"
              value={horizon.boundaryDistinct}
              onChange={(value) => onUpdate('boundaryDistinct', value)}
              options={BOUNDARY_DISTINCT}
              showOther={false}
            />
            <SelectField
              label="Boundary Topography"
              value={horizon.boundaryTopo}
              onChange={(value) => onUpdate('boundaryTopo', value)}
              options={BOUNDARY_TOPO}
              showOther={false}
            />
          </div>

          {/* Color and Mottles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Colour (moist)"
              value={horizon.colour}
              onChange={(value) => onUpdate('colour', value)}
              options={MUNSELL_PRESETS}
              required
            />
            <SelectField
              label="Mottles/Speckles"
              value={horizon.mottles}
              onChange={(value) => onUpdate('mottles', value)}
              options={MOTTLES}
              showOther={false}
            />
          </div>

          {/* Texture */}
          <SelectField
            label="Texture"
            value={horizon.texture}
            onChange={(value) => onUpdate('texture', value)}
            options={TEXTURES}
            showOther={false}
            required
          />

          {/* Structure */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label="Structure Grade"
              value={horizon.structureGrade}
              onChange={(value) => onUpdate('structureGrade', value)}
              options={STRUCTURE_GRADE}
              showOther={false}
            />
            <SelectField
              label="Structure Size"
              value={horizon.structureSize}
              onChange={(value) => onUpdate('structureSize', value)}
              options={STRUCTURE_SIZE}
              showOther={false}
            />
            <SelectField
              label="Structure Type"
              value={horizon.structureType}
              onChange={(value) => onUpdate('structureType', value)}
              options={STRUCTURE_TYPE}
              showOther={false}
            />
          </div>

          {/* Consistence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Consistence Dry"
              value={horizon.consistenceDry}
              onChange={(value) => onUpdate('consistenceDry', value)}
              options={CONS_DRY}
              showOther={false}
            />
            <SelectField
              label="Consistence Moist"
              value={horizon.consistenceMoist}
              onChange={(value) => onUpdate('consistenceMoist', value)}
              options={CONS_MOIST}
              showOther={false}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Wet - Stickiness"
              value={horizon.consistenceWet}
              onChange={(value) => onUpdate('consistenceWet', value)}
              options={CONS_STICKY}
              showOther={false}
            />
            <SelectField
              label="Wet - Plasticity"
              value={horizon.consistenceWet}
              onChange={(value) => onUpdate('consistenceWet', value)}
              options={CONS_PLASTIC}
              showOther={false}
            />
          </div>

          {/* Coarse Fragments with sub-dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Coarse Fragments</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Percentage"
                value={horizon.coarseFragments}
                onChange={(value) => onUpdate('coarseFragments', value)}
                options={FRAGMENT_PCT}
                showOther={false}
              />
              <SelectField
                label="Size"
                value={fragmentSize}
                onChange={setFragmentSize}
                options={FRAGMENT_SIZE}
                showOther={false}
              />
            </div>
          </div>

          {/* Concretions */}
          <SelectField
            label="Concretions (Fe/Mn/Ca)"
            value={horizon.concretions}
            onChange={(value) => onUpdate('concretions', value)}
            options={CONCRETIONS}
            showOther={false}
          />

          {/* Pores with sub-dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Pores</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Frequency"
                value={horizon.pores}
                onChange={(value) => onUpdate('pores', value)}
                options={PORE_FREQ}
                showOther={false}
              />
              <SelectField
                label="Type"
                value={poreType}
                onChange={setPoreType}
                options={PORE_TYPE}
                showOther={false}
              />
            </div>
          </div>

          {/* Cutans */}
          <SelectField
            label="Cutans (coatings)"
            value={horizon.cutans}
            onChange={(value) => onUpdate('cutans', value)}
            options={CUTANS}
            showOther={false}
          />

          {/* Roots with sub-dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Roots</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Abundance"
                value={horizon.roots}
                onChange={(value) => onUpdate('roots', value)}
                options={ROOT_ABUND}
                showOther={false}
              />
              <SelectField
                label="Size"
                value={rootSize}
                onChange={setRootSize}
                options={ROOT_SIZE}
                showOther={false}
              />
            </div>
          </div>

          {/* Other Properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Cracks"
              value={horizon.cracks}
              onChange={(value) => onUpdate('cracks', value)}
              options={CRACKS}
              showOther={false}
            />
            <SelectField
              label="Artefacts"
              value={horizon.artefacts}
              onChange={(value) => onUpdate('artefacts', value)}
              options={ARTEFACTS}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Lime"
              value={horizon.lime}
              onChange={(value) => onUpdate('lime', value)}
              options={LIME}
              showOther={false}
            />
            <TextField
              label="Sample No."
              value={horizon.sampleNo}
              onChange={(value) => onUpdate('sampleNo', value)}
              placeholder="Enter sample number"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function HorizonRowRepeater({ title, horizons, onHorizonsChange }: HorizonRowRepeaterProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set([0]));

  const addHorizon = () => {
    const newHorizon = { ...emptyHorizon };
    const updatedHorizons = [...horizons, newHorizon];
    onHorizonsChange(updatedHorizons);
    
    // Auto-expand the new row
    setExpandedRows(prev => new Set([...prev, updatedHorizons.length - 1]));
  };

  const copyLastHorizon = () => {
    if (horizons.length > 0) {
      const lastHorizon = { ...horizons[horizons.length - 1] };
      lastHorizon.label = ""; // Clear label for new horizon
      lastHorizon.sampleNo = ""; // Clear sample number
      const updatedHorizons = [...horizons, lastHorizon];
      onHorizonsChange(updatedHorizons);
      
      // Auto-expand the new row
      setExpandedRows(prev => new Set([...prev, updatedHorizons.length - 1]));
    }
  };

  const deleteHorizon = (index: number) => {
    if (horizons.length > 1) {
      const updatedHorizons = horizons.filter((_, i) => i !== index);
      onHorizonsChange(updatedHorizons);
      
      // Update expanded rows indices
      setExpandedRows(prev => {
        const newSet = new Set<number>();
        prev.forEach(rowIndex => {
          if (rowIndex < index) {
            newSet.add(rowIndex);
          } else if (rowIndex > index) {
            newSet.add(rowIndex - 1);
          }
        });
        return newSet;
      });
    }
  };

  const updateHorizon = (index: number, field: keyof Horizon, value: string | number) => {
    const updatedHorizons = horizons.map((horizon, i) => 
      i === index ? { ...horizon, [field]: value } : horizon
    );
    onHorizonsChange(updatedHorizons);
  };

  const toggleRow = (index: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex space-x-2">
            {horizons.length > 0 && (
              <Button variant="outline" size="sm" onClick={copyLastHorizon}>
                <Copy className="w-4 h-4 mr-1" />
                Copy Last
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={addHorizon}>
              <Plus className="w-4 h-4 mr-1" />
              Add Horizon
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {horizons.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No horizons added yet.</p>
            <Button variant="outline" onClick={addHorizon} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add First Horizon
            </Button>
          </div>
        ) : (
          horizons.map((horizon, index) => (
            <HorizonRow
              key={index}
              horizon={horizon}
              index={index}
              onUpdate={(field, value) => updateHorizon(index, field, value)}
              onDelete={() => deleteHorizon(index)}
              isExpanded={expandedRows.has(index)}
              onToggle={() => toggleRow(index)}
              canDelete={horizons.length > 1}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Copy, GripVertical } from "lucide-react";
import { TextField, SelectField } from "./Field";
import { Observation } from "@/lib/storage";
import { TEXTURES, MOTTLES, REACTION, CONCRETIONS, FRAGMENT_PCT, FRAGMENT_SIZE, MUNSELL_PRESETS } from "@/lib/options";

interface RowRepeaterProps {
  title: string;
  rows: Observation[];
  onRowsChange: (rows: Observation[]) => void;
}

const emptyObservation: Observation = {
  depthFrom: 0,
  depthTo: 0,
  colour: "",
  texture: "",
  mottles: "None",
  reaction: "",
  concretions: "None",
  rockFragments: "0–5%"
};

export default function RowRepeater({ title, rows, onRowsChange }: RowRepeaterProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set([0]));

  const addRow = () => {
    const newRow = { ...emptyObservation };
    const updatedRows = [...rows, newRow];
    onRowsChange(updatedRows);
    
    // Auto-expand the new row
    setExpandedRows(prev => new Set([...prev, updatedRows.length - 1]));
  };

  const copyLastRow = () => {
    if (rows.length > 0) {
      const lastRow = { ...rows[rows.length - 1] };
      const updatedRows = [...rows, lastRow];
      onRowsChange(updatedRows);
      
      // Auto-expand the new row
      setExpandedRows(prev => new Set([...prev, updatedRows.length - 1]));
    }
  };

  const deleteRow = (index: number) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((_, i) => i !== index);
      onRowsChange(updatedRows);
      
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

  const updateRow = (index: number, field: keyof Observation, value: string | number) => {
    const updatedRows = rows.map((row, i) => 
      i === index ? { ...row, [field]: value } : row
    );
    onRowsChange(updatedRows);
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
            {rows.length > 0 && (
              <Button variant="outline" size="sm" onClick={copyLastRow}>
                <Copy className="w-4 h-4 mr-1" />
                Copy Last
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={addRow}>
              <Plus className="w-4 h-4 mr-1" />
              Add Row
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {rows.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No observations added yet.</p>
            <Button variant="outline" onClick={addRow} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add First Observation
            </Button>
          </div>
        ) : (
          rows.map((row, index) => {
            const isExpanded = expandedRows.has(index);
            return (
              <Card key={index} className="border border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleRow(index)}
                      className="flex items-center space-x-2 text-left flex-1"
                    >
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        Obs {index + 1}: {row.depthFrom}-{row.depthTo}cm
                        {row.texture && ` | ${row.texture}`}
                        {row.colour && ` | ${row.colour}`}
                      </span>
                    </button>
                    
                    {rows.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteRow(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                {isExpanded && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <TextField
                        label="Depth From (cm)"
                        type="number"
                        value={row.depthFrom}
                        onChange={(value) => updateRow(index, 'depthFrom', parseInt(value) || 0)}
                        required
                      />
                      <TextField
                        label="Depth To (cm)"
                        type="number"
                        value={row.depthTo}
                        onChange={(value) => updateRow(index, 'depthTo', parseInt(value) || 0)}
                        required
                      />
                    </div>
                    
                    <SelectField
                      label="Colour (rubbed)"
                      value={row.colour}
                      onChange={(value) => updateRow(index, 'colour', value)}
                      options={MUNSELL_PRESETS}
                      required
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectField
                        label="Texture"
                        value={row.texture}
                        onChange={(value) => updateRow(index, 'texture', value)}
                        options={TEXTURES}
                        showOther={false}
                        required
                      />
                      
                      <SelectField
                        label="Mottles"
                        value={row.mottles}
                        onChange={(value) => updateRow(index, 'mottles', value)}
                        options={MOTTLES}
                        showOther={false}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectField
                        label="Reaction"
                        value={row.reaction}
                        onChange={(value) => updateRow(index, 'reaction', value)}
                        options={REACTION}
                        showOther={false}
                      />
                      
                      <SelectField
                        label="Concretions"
                        value={row.concretions}
                        onChange={(value) => updateRow(index, 'concretions', value)}
                        options={CONCRETIONS}
                        showOther={false}
                      />
                    </div>
                    
                    <SelectField
                      label="Rock Fragments"
                      value={row.rockFragments}
                      onChange={(value) => updateRow(index, 'rockFragments', value)}
                      options={FRAGMENT_PCT}
                      showOther={false}
                    />
                  </CardContent>
                )}
              </Card>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
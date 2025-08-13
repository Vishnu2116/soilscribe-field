import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, getStoredData, autosave, getEmptySheet1Data, STORAGE_KEYS, Sheet1Data } from "@/lib/storage";
import { TextField, SelectField, TextAreaField } from "@/components/Field";
import SectionCard from "@/components/SectionCard";
import RowRepeater from "@/components/RowRepeater";
import HeaderBar from "@/components/HeaderBar";
import StickyActions from "@/components/StickyActions";
import { toast } from "@/hooks/use-toast";
import { 
  DISTRICTS_TG, 
  SOIL_SERIES, 
  MAPPING_UNITS, 
  BASE_MAP, 
  PHYSIOGRAPHY, 
  SITE_LOCATION, 
  PARENT_MATERIAL, 
  SLOPE_ASPECT, 
  NATURAL_VEGETATION, 
  LAND_USE, 
  SALINITY, 
  EROSION_TYPE, 
  EROSION_SEVERITY, 
  ROCKY_STONY 
} from "@/lib/options";

export default function Sheet1() {
  const navigate = useNavigate();
  const [data, setData] = useState<Sheet1Data>(() => 
    getStoredData(STORAGE_KEYS.SHEET1, getEmptySheet1Data())
  );

  useEffect(() => {
    // Check authentication
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Autosave whenever data changes
    autosave(STORAGE_KEYS.SHEET1, data);
  }, [data]);

  const updateHeader = (field: string, value: string | number) => {
    setData(prev => ({
      ...prev,
      header: {
        ...prev.header,
        [field]: value
      }
    }));
  };

  const updateObservations = (observations: any[]) => {
    setData(prev => ({
      ...prev,
      observations
    }));
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved locally",
    });
  };

  const handleNext = () => {
    // Basic validation
    const requiredFields = [
      'village', 'tehsil', 'district', 'physiography', 
      'siteLocation', 'parentMaterial'
    ];
    
    const missingFields = requiredFields.filter(field => 
      !data.header[field as keyof typeof data.header]
    );

    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before proceeding",
        variant: "destructive"
      });
      return;
    }

    navigate("/sheet2");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <HeaderBar subtitle="Sheet-1: Shallow Pit / Auger Bore" />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Shallow Pit / Auger Bore Examination
          </h2>
          <p className="text-muted-foreground">
            Field observation data collection form
          </p>
        </div>

        {/* Location & Admin */}
        <SectionCard title="Location & Administrative Details">
          <TextField
            label="NW/Sub-watershed"
            value={data.header.nwSubWatershed}
            onChange={(value) => updateHeader('nwSubWatershed', value)}
            placeholder="Enter watershed name"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Village"
              value={data.header.village}
              onChange={(value) => updateHeader('village', value)}
              placeholder="Enter village name"
              required
            />
            <TextField
              label="Tehsil"
              value={data.header.tehsil}
              onChange={(value) => updateHeader('tehsil', value)}
              placeholder="Enter tehsil name"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="District"
              value={data.header.district}
              onChange={(value) => updateHeader('district', value)}
              options={DISTRICTS_TG}
              required
            />
            <SelectField
              label="State"
              value={data.header.state}
              onChange={(value) => updateHeader('state', value)}
              options={["Telangana", "Other"]}
              showOther={false}
            />
          </div>
        </SectionCard>

        {/* Soil Mapping */}
        <SectionCard title="Soil Mapping Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Series"
              value={data.header.series}
              onChange={(value) => updateHeader('series', value)}
              options={SOIL_SERIES}
            />
            <SelectField
              label="Mapping Unit"
              value={data.header.mappingUnit}
              onChange={(value) => updateHeader('mappingUnit', value)}
              options={MAPPING_UNITS}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Auger bore / Sh. pit no."
              value={data.header.augerBoreNo}
              onChange={(value) => updateHeader('augerBoreNo', value)}
              placeholder="Enter bore/pit number"
            />
            <SelectField
              label="Base map"
              value={data.header.baseMap}
              onChange={(value) => updateHeader('baseMap', value)}
              options={BASE_MAP}
            />
          </div>
        </SectionCard>

        {/* Site Description */}
        <SectionCard title="Site Description">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Physiography"
              value={data.header.physiography}
              onChange={(value) => updateHeader('physiography', value)}
              options={PHYSIOGRAPHY}
              required
            />
            <SelectField
              label="Site location / Land position"
              value={data.header.siteLocation}
              onChange={(value) => updateHeader('siteLocation', value)}
              options={SITE_LOCATION}
              required
            />
          </div>
          
          <SelectField
            label="Parent material"
            value={data.header.parentMaterial}
            onChange={(value) => updateHeader('parentMaterial', value)}
            options={PARENT_MATERIAL}
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Slope (%)"
              type="number"
              value={data.header.slope}
              onChange={(value) => updateHeader('slope', parseFloat(value) || 0)}
              placeholder="Enter slope percentage"
            />
            <SelectField
              label="Aspect"
              value={data.header.aspect}
              onChange={(value) => updateHeader('aspect', value)}
              options={SLOPE_ASPECT}
              showOther={false}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Natural vegetation"
              value={data.header.naturalVegetation}
              onChange={(value) => updateHeader('naturalVegetation', value)}
              options={NATURAL_VEGETATION}
            />
            <SelectField
              label="Land use"
              value={data.header.landUse}
              onChange={(value) => updateHeader('landUse', value)}
              options={LAND_USE}
            />
          </div>
          
          <SelectField
            label="Saline/alkali"
            value={data.header.salineAlkali}
            onChange={(value) => updateHeader('salineAlkali', value)}
            options={SALINITY}
            showOther={false}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Erosion Type"
              value={data.header.erosionType}
              onChange={(value) => updateHeader('erosionType', value)}
              options={EROSION_TYPE}
              showOther={false}
            />
            <SelectField
              label="Erosion Severity"
              value={data.header.erosionSeverity}
              onChange={(value) => updateHeader('erosionSeverity', value)}
              options={EROSION_SEVERITY}
              showOther={false}
            />
          </div>
          
          <SelectField
            label="Rocky/Stony phases"
            value={data.header.rockyStonyPhases}
            onChange={(value) => updateHeader('rockyStonyPhases', value)}
            options={ROCKY_STONY}
            showOther={false}
          />
          
          <TextAreaField
            label="Remarks (optional)"
            value={data.header.remarks}
            onChange={(value) => updateHeader('remarks', value)}
            placeholder="Additional observations or notes"
            rows={3}
          />
        </SectionCard>

        {/* Observations */}
        <RowRepeater
          title="Field Observations"
          rows={data.observations}
          onRowsChange={updateObservations}
        />
      </div>

      <StickyActions
        onSaveDraft={handleSaveDraft}
        onNext={handleNext}
        nextLabel="Next: Sheet-2"
      />
    </div>
  );
}
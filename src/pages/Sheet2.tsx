import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, getStoredData, autosave, getEmptySheet2Data, STORAGE_KEYS, Sheet2Data } from "@/lib/storage";
import HorizonRowRepeater from "@/components/HorizonRowRepeater";
import HeaderBar from "@/components/HeaderBar";
import StickyActions from "@/components/StickyActions";
import { toast } from "@/hooks/use-toast";

export default function Sheet2() {
  const navigate = useNavigate();
  const [data, setData] = useState<Sheet2Data>(() => 
    getStoredData(STORAGE_KEYS.SHEET2, getEmptySheet2Data())
  );

  useEffect(() => {
    // Check authentication
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Autosave whenever data changes
    autosave(STORAGE_KEYS.SHEET2, data);
  }, [data]);

  const updateHorizons = (horizons: any[]) => {
    setData(prev => ({
      ...prev,
      horizons
    }));
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved locally",
    });
  };

  const handleFinish = () => {
    // Basic validation
    const hasValidHorizons = data.horizons.length > 0 && 
      data.horizons.every(h => h.label && h.depthFrom >= 0 && h.depthTo > h.depthFrom);

    if (!hasValidHorizons) {
      toast({
        title: "Validation Error",
        description: "Please add at least one complete horizon with valid depths",
        variant: "destructive"
      });
      return;
    }

    // Check for depth overlaps
    const sortedHorizons = [...data.horizons].sort((a, b) => a.depthFrom - b.depthFrom);
    let hasOverlaps = false;
    
    for (let i = 1; i < sortedHorizons.length; i++) {
      if (sortedHorizons[i].depthFrom < sortedHorizons[i-1].depthTo) {
        hasOverlaps = true;
        break;
      }
    }

    if (hasOverlaps) {
      toast({
        title: "Depth Overlap Warning",
        description: "Some horizons have overlapping depths. Please review.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Profile Complete ✓",
      description: "Soil profile morphological data saved successfully",
    });
    
    // Could navigate back to sheet1 or a summary page
    navigate("/sheet1");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <HeaderBar subtitle="Sheet-2: Morphological Description" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Morphological Description
          </h2>
          <p className="text-muted-foreground">
            Detailed horizon characteristics and soil profile analysis
          </p>
        </div>

        {/* Horizon Data Collection */}
        <HorizonRowRepeater
          title="Soil Horizons"
          horizons={data.horizons}
          onHorizonsChange={updateHorizons}
        />
      </div>

      <StickyActions
        onSaveDraft={handleSaveDraft}
        onNext={handleFinish}
        nextLabel="Finish Profile"
      />
    </div>
  );
}
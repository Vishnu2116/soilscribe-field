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
    // Gentle validation - no blocking, just warnings
    if (data.horizons.length === 0) {
      toast({
        title: "No horizons added",
        description: "Consider adding at least one horizon for complete data",
      });
    }

    // Check for depth overlaps but don't block
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
        title: "Depth Overlap Notice",
        description: "Some horizons have overlapping depths - this is saved as-is",
      });
    }

    toast({
      title: "Profile Saved ✓",
      description: "Morphological description saved successfully",
    });
    
    // Navigate to summary page
    navigate("/summary");
  };

  return (
    <div className="min-h-screen relative">
      {/* Soil Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-amber-50 to-amber-100"></div>
      <div className="fixed inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23795548' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3Ccircle cx='35' cy='15' r='1.5'/%3E%3Ccircle cx='15' cy='35' r='1'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Content Layer */}
      <div className="relative z-10 pb-24">
        <HeaderBar subtitle="Sheet-2: Morphological Description" />
        
        <div className="container mx-auto px-4 py-6">
          {/* Main Content Card */}
          <div className="backdrop-blur-md bg-white/85 rounded-2xl shadow-xl p-4 md:p-5">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-[#795548] mb-2">
                Morphological Description
              </h2>
              <p className="text-muted-foreground text-sm">
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
        </div>
      </div>

      <StickyActions
        onSaveDraft={handleSaveDraft}
        onNext={handleFinish}
        nextLabel="Next: Summary"
      />
    </div>
  );
}
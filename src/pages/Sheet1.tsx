import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, getStoredData, autosave, getEmptySheet1Data, STORAGE_KEYS, Sheet1Data } from "@/lib/storage";
import HeaderBar from "@/components/HeaderBar";
import StickyActions from "@/components/StickyActions";
import { toast } from "@/hooks/use-toast";

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

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved locally",
    });
  };

  const handleNext = () => {
    navigate("/sheet2");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <HeaderBar subtitle="Sheet-1: Shallow Pit / Auger Bore" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Shallow Pit / Auger Bore Examination
          </h2>
          <p className="text-muted-foreground">
            Field observation data collection form
          </p>
        </div>

        {/* Content will be implemented in next iteration */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Form Implementation</h3>
            <p className="text-muted-foreground mb-4">
              The detailed form fields will be implemented based on your page-by-page prompts.
            </p>
            <div className="text-sm text-success">
              ✓ Ready for detailed form implementation
            </div>
          </div>
        </div>
      </div>

      <StickyActions
        onSaveDraft={handleSaveDraft}
        onNext={handleNext}
        nextLabel="Next: Sheet-2"
      />
    </div>
  );
}
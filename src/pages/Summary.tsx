import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, getStoredData, STORAGE_KEYS, Sheet1Data, Sheet2Data, clearUser } from "@/lib/storage";
import HeaderBar from "@/components/HeaderBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Edit, Download, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Summary() {
  const navigate = useNavigate();
  const [sheet1Data, setSheet1Data] = useState<Sheet1Data | null>(null);
  const [sheet2Data, setSheet2Data] = useState<Sheet2Data | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    // Check authentication
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    // Load data from localStorage
    const userData = localStorage.getItem('tgrec.user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const s1Data = getStoredData(STORAGE_KEYS.SHEET1, null);
    const s2Data = getStoredData(STORAGE_KEYS.SHEET2, null);
    
    setSheet1Data(s1Data);
    setSheet2Data(s2Data);
  }, [navigate]);

  const handleExit = () => {
    clearUser();
    toast({
      title: "Logged out",
      description: "Your form data remains on this device.",
    });
    navigate("/login");
  };

  const handleExportJSON = () => {
    const exportData = {
      sheet1: sheet1Data,
      sheet2: sheet2Data,
      exportedAt: new Date().toISOString(),
      user: user?.username
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tgrec-profile-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Data exported",
      description: "Profile data downloaded as JSON file",
    });
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === "") {
      return "—";
    }
    return String(value);
  };

  if (!sheet1Data && !sheet2Data) {
    return (
      <div className="min-h-screen relative">
        <div className="fixed inset-0 bg-[url('/soil-bg.jpg')] bg-cover bg-center"></div>
        <div className="fixed inset-0 bg-[url('/soil-overlay.svg')] opacity-30"></div>
        
        <div className="relative z-10">
          <HeaderBar subtitle="Profile Summary" />
          
          <div className="container mx-auto px-4 py-6">
            <div className="backdrop-blur-md bg-white/85 rounded-2xl shadow-xl p-6 text-center">
              <h2 className="text-xl font-semibold text-[#795548] mb-4">No Data Found</h2>
              <p className="text-muted-foreground mb-6">No profile data found on this device.</p>
              <div className="space-y-3">
                <Button onClick={() => navigate("/sheet1")} className="w-full">
                  Start Sheet-1
                </Button>
                <Button variant="outline" onClick={() => navigate("/login")} className="w-full">
                  Back to Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Soil Background */}
      <div className="fixed inset-0 bg-[url('/soil-bg.jpg')] bg-cover bg-center"></div>
      <div className="fixed inset-0 bg-[url('/soil-overlay.svg')] opacity-30"></div>
      
      {/* Content Layer */}
      <div className="relative z-10 pb-24">
        <HeaderBar subtitle="Profile Summary" />
        
        <div className="container mx-auto px-4 py-6">
          {/* Welcome & Controls */}
          <div className="backdrop-blur-md bg-white/85 rounded-2xl shadow-xl p-4 md:p-5 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#795548] mb-1">
                  Profile Summary
                </h2>
                {user && (
                  <p className="text-muted-foreground">
                    Welcome back, {user.username}
                  </p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {sheet1Data && (
                  <Button variant="outline" size="sm" onClick={() => navigate("/sheet1")}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit Sheet-1
                  </Button>
                )}
                {sheet2Data && (
                  <Button variant="outline" size="sm" onClick={() => navigate("/sheet2")}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit Sheet-2
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleExportJSON}>
                  <Download className="w-4 h-4 mr-1" />
                  Export JSON
                </Button>
              </div>
            </div>
          </div>

          {/* Data Sections */}
          <div className="space-y-6">
            {/* Sheet-1 Data */}
            {sheet1Data && (
              <div className="backdrop-blur-md bg-white/85 rounded-2xl shadow-xl overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="header-details" className="border-none">
                    <AccordionTrigger className="px-4 md:px-5 py-4 text-lg font-semibold text-[#795548]">
                      Header Details (Sheet-1)
                    </AccordionTrigger>
                    <AccordionContent className="px-4 md:px-5 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">NW/Sub-watershed:</span>
                            <span>{formatValue(sheet1Data.header.nwSubWatershed)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Village:</span>
                            <span>{formatValue(sheet1Data.header.village)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">District:</span>
                            <span>{formatValue(sheet1Data.header.district)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Series:</span>
                            <span>{formatValue(sheet1Data.header.series)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Physiography:</span>
                            <span>{formatValue(sheet1Data.header.physiography)}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Parent Material:</span>
                            <span>{formatValue(sheet1Data.header.parentMaterial)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Slope (%):</span>
                            <span>{formatValue(sheet1Data.header.slope)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Land Use:</span>
                            <span>{formatValue(sheet1Data.header.landUse)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Erosion Type:</span>
                            <span>{formatValue(sheet1Data.header.erosionType)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Rocky/Stony:</span>
                            <span>{formatValue(sheet1Data.header.rockyStonyPhases)}</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="observations" className="border-none">
                    <AccordionTrigger className="px-4 md:px-5 py-4 text-lg font-semibold text-[#795548]">
                      Observations (Sheet-1) - {sheet1Data.observations.length} rows
                    </AccordionTrigger>
                    <AccordionContent className="px-4 md:px-5 pb-4">
                      {sheet1Data.observations.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No observations added yet.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead className="bg-muted/50 sticky top-0">
                              <tr>
                                <th className="px-2 py-2 text-left">From</th>
                                <th className="px-2 py-2 text-left">To</th>
                                <th className="px-2 py-2 text-left">Colour</th>
                                <th className="px-2 py-2 text-left">Texture</th>
                                <th className="px-2 py-2 text-left">Mottles</th>
                                <th className="px-2 py-2 text-left">Reaction</th>
                                <th className="px-2 py-2 text-left">Concretions</th>
                                <th className="px-2 py-2 text-left">Rock Fragments</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sheet1Data.observations.map((obs, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-muted/20' : ''}>
                                  <td className="px-2 py-2">{formatValue(obs.depthFrom)}</td>
                                  <td className="px-2 py-2">{formatValue(obs.depthTo)}</td>
                                  <td className="px-2 py-2">{formatValue(obs.colour)}</td>
                                  <td className="px-2 py-2">{formatValue(obs.texture)}</td>
                                  <td className="px-2 py-2">{formatValue(obs.mottles)}</td>
                                  <td className="px-2 py-2">{formatValue(obs.reaction)}</td>
                                  <td className="px-2 py-2">{formatValue(obs.concretions)}</td>
                                  <td className="px-2 py-2">{formatValue(obs.rockFragments)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* Sheet-2 Data */}
            {sheet2Data && (
              <div className="backdrop-blur-md bg-white/85 rounded-2xl shadow-xl overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="horizons" className="border-none">
                    <AccordionTrigger className="px-4 md:px-5 py-4 text-lg font-semibold text-[#795548]">
                      Horizons (Sheet-2) - {sheet2Data.horizons.length} rows
                    </AccordionTrigger>
                    <AccordionContent className="px-4 md:px-5 pb-4">
                      {sheet2Data.horizons.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No horizons added yet.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead className="bg-muted/50 sticky top-0">
                              <tr>
                                <th className="px-2 py-2 text-left">Label</th>
                                <th className="px-2 py-2 text-left">From</th>
                                <th className="px-2 py-2 text-left">To</th>
                                <th className="px-2 py-2 text-left">Boundary</th>
                                <th className="px-2 py-2 text-left">Colour</th>
                                <th className="px-2 py-2 text-left">Texture</th>
                                <th className="px-2 py-2 text-left">Structure</th>
                                <th className="px-2 py-2 text-left">Consistency</th>
                                <th className="px-2 py-2 text-left">Fragments</th>
                                <th className="px-2 py-2 text-left">Sample No.</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sheet2Data.horizons.map((horizon, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-muted/20' : ''}>
                                  <td className="px-2 py-2 font-medium">{formatValue(horizon.label)}</td>
                                  <td className="px-2 py-2">{formatValue(horizon.depthFrom)}</td>
                                  <td className="px-2 py-2">{formatValue(horizon.depthTo)}</td>
                                  <td className="px-2 py-2">{formatValue(`${horizon.boundaryDistinct} ${horizon.boundaryTopo}`)}</td>
                                  <td className="px-2 py-2">{formatValue(horizon.colour)}</td>
                                  <td className="px-2 py-2">{formatValue(horizon.texture)}</td>
                                  <td className="px-2 py-2">{formatValue(`${horizon.structureGrade} ${horizon.structureType}`)}</td>
                                  <td className="px-2 py-2">{formatValue(`${horizon.consistenceDry}/${horizon.consistenceMoist}`)}</td>
                                  <td className="px-2 py-2">{formatValue(horizon.coarseFragments)}</td>
                                  <td className="px-2 py-2">{formatValue(horizon.sampleNo)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Exit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
        <div className="container mx-auto">
          <Button 
            onClick={handleExit}
            className="w-full h-12 bg-[#1B5E20] hover:bg-[#1B5E20]/90 text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Exit to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
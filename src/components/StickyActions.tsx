import { Button } from "@/components/ui/button";
import { Save, ArrowRight } from "lucide-react";

interface StickyActionsProps {
  onSaveDraft: () => void;
  onNext: () => void;
  nextLabel?: string;
  showNext?: boolean;
  isLoading?: boolean;
}

export default function StickyActions({ 
  onSaveDraft, 
  onNext, 
  nextLabel = "Next", 
  showNext = true,
  isLoading = false 
}: StickyActionsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
      <div className="container mx-auto flex space-x-3">
        <Button
          variant="outline"
          onClick={onSaveDraft}
          disabled={isLoading}
          className="flex-1 touch-target"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        
        {showNext && (
          <Button
            onClick={onNext}
            disabled={isLoading}
            className="flex-1 touch-target"
          >
            {nextLabel}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
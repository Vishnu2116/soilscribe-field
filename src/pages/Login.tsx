import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isLoggedIn, loginUser } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";
import HeaderBar from "@/components/HeaderBar";
import OfflinePill from "@/components/OfflinePill";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to sheet1
    if (isLoggedIn()) {
      navigate("/sheet1");
    }
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both username and password",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate brief loading for better UX
    setTimeout(() => {
      loginUser(username.trim());
      toast({
        title: "Welcome!",
        description: "Successfully logged in to TGREC Soil Profiles",
      });
      navigate("/sheet1");
      setIsLoading(false);
    }, 500);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginUser("Guest");
      toast({
        title: "Guest Access",
        description: "Continuing as guest user",
      });
      navigate("/sheet1");
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Logo and Title Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-foreground">TG</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">TGREC Soil Profiles</h2>
            <p className="text-muted-foreground">Field Data Capture</p>
          </div>

          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="touch-target"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="touch-target"
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me on this device
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full touch-target"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Button
                  variant="link"
                  onClick={handleGuestLogin}
                  disabled={isLoading}
                  className="text-muted-foreground"
                >
                  Continue as Guest
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center space-y-3">
            <OfflinePill />
            <p className="text-xs text-muted-foreground">
              Offline ready. Data stored only on this device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
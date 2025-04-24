
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/id/1/1200/800')] bg-cover bg-center opacity-10 animate-pulse-light"></div>
      </div>
      
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
        <div className="flex-1 text-center lg:text-left animate-fade-in">
          <div className="mb-6 flex justify-center lg:justify-start">
            <img 
              src="https://picsum.photos/id/237/200/200" 
              alt="VNR VJIET Logo" 
              className="h-24 w-auto animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 font-heading">
            Career Vision Approach
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4 font-heading">
            VNR VJIET
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering and Technology
          </p>
          <p className="text-gray-500">
            Bachupally, Hyderabad, Telangana - 500090
          </p>
        </div>
        
        <div className="w-full max-w-md animate-scale-in">
          <Card className="border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">Sign in to access Career Vision Approach portal</CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Student Email</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@vnrvjiet.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="faculty">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label htmlFor="faculty-email" className="text-sm font-medium">Faculty Email</label>
                      <Input
                        id="faculty-email"
                        type="email"
                        placeholder="faculty@vnrvjiet.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="faculty-password" className="text-sm font-medium">Password</label>
                        <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                      </div>
                      <Input
                        id="faculty-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="admin">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label htmlFor="admin-email" className="text-sm font-medium">Admin Email</label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@vnrvjiet.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="admin-password" className="text-sm font-medium">Password</label>
                        <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                      </div>
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;

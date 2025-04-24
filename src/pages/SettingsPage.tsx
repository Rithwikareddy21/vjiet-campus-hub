
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { AlertTriangle, Bell, Lock, Settings as SettingsIcon, User } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [browserNotifications, setBrowserNotifications] = useState(true);
  const [calendarIntegration, setCalendarIntegration] = useState(false);

  const handleSaveNotifications = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated",
    });
  };

  const handleSavePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-heading mb-2">Settings</h1>
        <p className="text-gray-600 mb-6">
          Manage your account settings and preferences
        </p>
        
        <Tabs defaultValue="profile">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-48 space-y-1">
              <TabsList className="grid grid-cols-3 md:grid-cols-1">
                <TabsTrigger value="profile" className="justify-start md:justify-center">
                  <User className="h-4 w-4 mr-2 md:mr-0 md:mb-1" />
                  <span className="hidden md:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start md:justify-center">
                  <Bell className="h-4 w-4 mr-2 md:mr-0 md:mb-1" />
                  <span className="hidden md:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="justify-start md:justify-center">
                  <Lock className="h-4 w-4 mr-2 md:mr-0 md:mb-1" />
                  <span className="hidden md:inline">Security</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="profile" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                      Manage your profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user?.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={user?.email} disabled />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="section">Section</Label>
                        <Input id="section" defaultValue={user?.section || ""} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" defaultValue={user?.department || ""} />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Email Notifications</h3>
                          <p className="text-sm text-gray-500">
                            Receive email notifications for events and registrations
                          </p>
                        </div>
                        <Switch
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Browser Notifications</h3>
                          <p className="text-sm text-gray-500">
                            Receive browser notifications for upcoming events
                          </p>
                        </div>
                        <Switch
                          checked={browserNotifications}
                          onCheckedChange={setBrowserNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Calendar Integration</h3>
                          <p className="text-sm text-gray-500">
                            Automatically add events to your calendar when registered
                          </p>
                        </div>
                        <Switch
                          checked={calendarIntegration}
                          onCheckedChange={setCalendarIntegration}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Update your password and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-700">
                        Make sure to use a strong password that you don't use elsewhere.
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSavePassword}>Update Password</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;

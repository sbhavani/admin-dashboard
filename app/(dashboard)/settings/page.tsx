import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set email preferences.
        </p>
      </div>
      <Separator />
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        {/* Account Tab Content */}
        <TabsContent value="account" className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Account</h3>
            <p className="text-sm text-muted-foreground">
              Make changes to your account here.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Make changes to your profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" defaultValue="Mercy General Hospital" readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="pedro@example.com" type="email" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password here. You'll be logged out after changing your password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        {/* Notifications Tab Content */}
        <TabsContent value="notifications" className="space-y-4">
          
        </TabsContent>
      </Tabs>
    </div>
  );
}

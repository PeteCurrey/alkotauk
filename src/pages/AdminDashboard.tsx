import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import AdminEnquiries from "@/components/admin/AdminEnquiries";
import AdminDistributors from "@/components/admin/AdminDistributors";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminBlog from "@/components/admin/AdminBlog";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate("/admin/login");
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) navigate("/admin/login");
      }
    );
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold tracking-tight">ALKOTA</h1>
          <span className="text-xs text-muted-foreground font-light tracking-wider border-l border-border pl-3">ADMIN</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="font-light text-xs">
          <LogOut size={14} className="mr-1" /> Sign Out
        </Button>
      </header>

      <div className="p-6">
        <Tabs defaultValue="enquiries">
          <TabsList className="mb-6">
            <TabsTrigger value="enquiries" className="font-light text-xs">Enquiries</TabsTrigger>
            <TabsTrigger value="distributors" className="font-light text-xs">Distributors</TabsTrigger>
            <TabsTrigger value="products" className="font-light text-xs">Products</TabsTrigger>
            <TabsTrigger value="blog" className="font-light text-xs">Blog</TabsTrigger>
          </TabsList>
          <TabsContent value="enquiries" className="min-h-[calc(100vh-180px)]">
            <AdminEnquiries />
          </TabsContent>
          <TabsContent value="distributors">
            <AdminDistributors />
          </TabsContent>
          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>
          <TabsContent value="blog">
            <AdminBlog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Distributor {
  id: string;
  name: string;
  country: string;
  region: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
}

const emptyForm = {
  name: "",
  country: "US",
  region: "",
  city: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  description: "",
  is_active: true,
  sort_order: 0,
};

const AdminDistributors = () => {
  const { toast } = useToast();
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetch = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("distributors")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error) setDistributors(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (d: Distributor) => {
    setEditingId(d.id);
    setForm({
      name: d.name,
      country: d.country,
      region: d.region || "",
      city: d.city || "",
      address: d.address || "",
      phone: d.phone || "",
      email: d.email || "",
      website: d.website || "",
      description: d.description || "",
      is_active: d.is_active,
      sort_order: d.sort_order,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      name: form.name,
      country: form.country,
      region: form.region || null,
      city: form.city || null,
      address: form.address || null,
      phone: form.phone || null,
      email: form.email || null,
      website: form.website || null,
      description: form.description || null,
      is_active: form.is_active,
      sort_order: form.sort_order,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("distributors").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("distributors").insert(payload));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editingId ? "Updated" : "Created", description: `Distributor ${editingId ? "updated" : "added"}` });
      setDialogOpen(false);
      fetch();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("distributors").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted" });
      fetch();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light tracking-tight">Distributors</h2>
        <Button variant="outline" size="sm" className="font-light text-xs" onClick={openNew}>
          <Plus size={14} className="mr-1" /> Add Distributor
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground font-light">Loading...</p>
      ) : (
        <div className="border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-light text-xs">Name</TableHead>
                <TableHead className="font-light text-xs">Country</TableHead>
                <TableHead className="font-light text-xs">City</TableHead>
                <TableHead className="font-light text-xs">Active</TableHead>
                <TableHead className="font-light text-xs w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {distributors.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="text-sm font-light">{d.name}</TableCell>
                  <TableCell className="text-xs font-light text-muted-foreground">{d.country}</TableCell>
                  <TableCell className="text-xs font-light text-muted-foreground">{d.city || "—"}</TableCell>
                  <TableCell className="text-xs font-light">{d.is_active ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(d)}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(d.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {distributors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-muted-foreground font-light py-8">
                    No distributors yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-light">{editingId ? "Edit" : "Add"} Distributor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-light">Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="font-light" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-light">Country</Label>
                <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="font-light" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-light">Region</Label>
                <Input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className="font-light" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-light">City</Label>
                <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="font-light" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Address</Label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="font-light" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-light">Phone</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="font-light" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-light">Email</Label>
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="font-light" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Website</Label>
              <Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="font-light" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="font-light" rows={3} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                <Label className="text-xs font-light">Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs font-light">Sort Order</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="font-light w-20" />
              </div>
            </div>
            <Button variant="outline" className="w-full font-light tracking-wide" onClick={handleSave}>
              {editingId ? "Update" : "Create"} Distributor
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDistributors;

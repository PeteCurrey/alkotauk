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
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  extended_description: string | null;
  hero_image_url: string | null;
  series_data: any;
  is_active: boolean;
  sort_order: number;
}

const emptyForm = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  extended_description: "",
  hero_image_url: "",
  series_data: "[]",
  is_active: true,
  sort_order: 0,
};

const AdminProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle || "",
      description: p.description || "",
      extended_description: p.extended_description || "",
      hero_image_url: p.hero_image_url || "",
      series_data: JSON.stringify(p.series_data || [], null, 2),
      is_active: p.is_active,
      sort_order: p.sort_order,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    let parsedSeries;
    try {
      parsedSeries = JSON.parse(form.series_data);
    } catch {
      toast({ title: "Error", description: "Invalid JSON in series data", variant: "destructive" });
      return;
    }

    const payload = {
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle || null,
      description: form.description || null,
      extended_description: form.extended_description || null,
      hero_image_url: form.hero_image_url || null,
      series_data: parsedSeries,
      is_active: form.is_active,
      sort_order: form.sort_order,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("products").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editingId ? "Updated" : "Created", description: `Product ${editingId ? "updated" : "added"}` });
      setDialogOpen(false);
      fetchProducts();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted" });
      fetchProducts();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light tracking-tight">Products</h2>
        <Button variant="outline" size="sm" className="font-light text-xs" onClick={openNew}>
          <Plus size={14} className="mr-1" /> Add Product
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground font-light">Loading...</p>
      ) : (
        <div className="border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-light text-xs">Title</TableHead>
                <TableHead className="font-light text-xs">Slug</TableHead>
                <TableHead className="font-light text-xs">Subtitle</TableHead>
                <TableHead className="font-light text-xs">Active</TableHead>
                <TableHead className="font-light text-xs w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="text-sm font-light">{p.title}</TableCell>
                  <TableCell className="text-xs font-light text-muted-foreground">{p.slug}</TableCell>
                  <TableCell className="text-xs font-light text-muted-foreground">{p.subtitle || "—"}</TableCell>
                  <TableCell className="text-xs font-light">{p.is_active ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(p)}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(p.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-muted-foreground font-light py-8">
                    No products yet. Add products here or they will fall back to the built-in catalog.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-light">{editingId ? "Edit" : "Add"} Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-light">Title *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="font-light" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-light">Slug *</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="font-light" placeholder="e.g. hot-water-pressure-washers" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Subtitle</Label>
              <Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="font-light" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="font-light" rows={3} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Extended Description</Label>
              <Textarea value={form.extended_description} onChange={(e) => setForm({ ...form, extended_description: e.target.value })} className="font-light" rows={3} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Hero Image URL</Label>
              <Input value={form.hero_image_url} onChange={(e) => setForm({ ...form, hero_image_url: e.target.value })} className="font-light" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Series Data (JSON)</Label>
              <Textarea
                value={form.series_data}
                onChange={(e) => setForm({ ...form, series_data: e.target.value })}
                className="font-light font-mono text-xs"
                rows={10}
                placeholder='[{"name":"Series Name","image":"url","specs":{"PSI":"3000"},"highlights":["Feature 1"]}]'
              />
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
              {editingId ? "Update" : "Create"} Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;

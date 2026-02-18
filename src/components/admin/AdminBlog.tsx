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

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string | null;
  image_url: string | null;
  category: string;
  is_published: boolean;
  published_at: string | null;
}

const emptyForm = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  image_url: "",
  category: "",
  is_published: false,
};

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content || "",
      image_url: p.image_url || "",
      category: p.category,
      is_published: p.is_published,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt,
      content: form.content || null,
      image_url: form.image_url || null,
      category: form.category,
      is_published: form.is_published,
      published_at: form.is_published ? new Date().toISOString() : null,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(payload));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editingId ? "Updated" : "Created", description: `Blog post ${editingId ? "updated" : "added"}` });
      setDialogOpen(false);
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted" });
      fetchPosts();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light tracking-tight">Blog Posts</h2>
        <Button variant="outline" size="sm" className="font-light text-xs" onClick={openNew}>
          <Plus size={14} className="mr-1" /> Add Post
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
                <TableHead className="font-light text-xs">Category</TableHead>
                <TableHead className="font-light text-xs">Published</TableHead>
                <TableHead className="font-light text-xs w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="text-sm font-light">{p.title}</TableCell>
                  <TableCell className="text-xs font-light text-muted-foreground">{p.category}</TableCell>
                  <TableCell className="text-xs font-light">{p.is_published ? "Yes" : "Draft"}</TableCell>
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
              {posts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm text-muted-foreground font-light py-8">
                    No blog posts yet.
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
            <DialogTitle className="font-light">{editingId ? "Edit" : "Add"} Blog Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-light">Title *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="font-light" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-light">Slug *</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="font-light" placeholder="e.g. my-blog-post" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Category *</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="font-light" placeholder="e.g. Safety, Product Guide" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Excerpt *</Label>
              <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="font-light" rows={3} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Full Content</Label>
              <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="font-light" rows={8} placeholder="Full article content..." />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-light">Image URL</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="font-light" placeholder="https://..." />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
              <Label className="text-xs font-light">Published</Label>
            </div>
            <Button variant="outline" className="w-full font-light tracking-wide" onClick={handleSave}>
              {editingId ? "Update" : "Create"} Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;

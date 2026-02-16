import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  product_interest: string | null;
  preferred_location: string | null;
  status: string;
  created_at: string;
}

const AdminEnquiries = () => {
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setEnquiries(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      if (selectedEnquiry?.id === id) setSelectedEnquiry((prev) => prev ? { ...prev, status } : null);
      toast({ title: "Updated", description: `Status changed to ${status}` });
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    } else {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      toast({ title: "Deleted", description: "Enquiry removed" });
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "new": return "default";
      case "contacted": return "secondary";
      case "closed": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="flex h-full">
      {/* Table */}
      <div className={`flex-1 overflow-auto ${selectedEnquiry ? "hidden lg:block" : ""}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light tracking-tight">Enquiries</h2>
          <span className="text-sm text-muted-foreground font-light">{enquiries.length} total</span>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground font-light">Loading...</p>
        ) : enquiries.length === 0 ? (
          <p className="text-sm text-muted-foreground font-light">No enquiries yet.</p>
        ) : (
          <div className="border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-light text-xs">Date</TableHead>
                  <TableHead className="font-light text-xs">Name</TableHead>
                  <TableHead className="font-light text-xs">Email</TableHead>
                  <TableHead className="font-light text-xs">Product</TableHead>
                  <TableHead className="font-light text-xs">Status</TableHead>
                  <TableHead className="font-light text-xs w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.map((enquiry) => (
                  <TableRow key={enquiry.id} className="cursor-pointer" onClick={() => setSelectedEnquiry(enquiry)}>
                    <TableCell className="text-xs font-light">{new Date(enquiry.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm font-light">{enquiry.name}</TableCell>
                    <TableCell className="text-xs font-light text-muted-foreground">{enquiry.email}</TableCell>
                    <TableCell className="text-xs font-light text-muted-foreground">{enquiry.product_interest || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={statusColor(enquiry.status)} className="text-xs font-light">{enquiry.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDelete(enquiry.id); }} className="h-7 w-7">
                        <Trash2 size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selectedEnquiry && (
        <div className="w-full lg:w-[400px] lg:border-l border-border p-6 overflow-auto bg-muted/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-light tracking-tight">Details</h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedEnquiry(null)} className="text-xs font-light">Close</Button>
          </div>
          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground font-light mb-1">Name</p>
              <p className="text-sm font-light">{selectedEnquiry.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-light mb-1">Email</p>
              <a href={`mailto:${selectedEnquiry.email}`} className="text-sm font-light text-primary">{selectedEnquiry.email}</a>
            </div>
            {selectedEnquiry.phone && (
              <div>
                <p className="text-xs text-muted-foreground font-light mb-1">Phone</p>
                <a href={`tel:${selectedEnquiry.phone}`} className="text-sm font-light text-primary">{selectedEnquiry.phone}</a>
              </div>
            )}
            {selectedEnquiry.company && (
              <div>
                <p className="text-xs text-muted-foreground font-light mb-1">Company</p>
                <p className="text-sm font-light">{selectedEnquiry.company}</p>
              </div>
            )}
            {selectedEnquiry.product_interest && (
              <div>
                <p className="text-xs text-muted-foreground font-light mb-1">Product Interest</p>
                <p className="text-sm font-light">{selectedEnquiry.product_interest}</p>
              </div>
            )}
            {selectedEnquiry.preferred_location && (
              <div>
                <p className="text-xs text-muted-foreground font-light mb-1">Preferred Region</p>
                <p className="text-sm font-light">{selectedEnquiry.preferred_location}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground font-light mb-1">Message</p>
              <p className="text-sm font-light leading-relaxed">{selectedEnquiry.message}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-light mb-1">Submitted</p>
              <p className="text-sm font-light">{new Date(selectedEnquiry.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-light mb-2">Status</p>
              <Select value={selectedEnquiry.status} onValueChange={(val) => handleStatusChange(selectedEnquiry.id, val)}>
                <SelectTrigger className="font-light"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="new" className="font-light">New</SelectItem>
                  <SelectItem value="contacted" className="font-light">Contacted</SelectItem>
                  <SelectItem value="closed" className="font-light">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;

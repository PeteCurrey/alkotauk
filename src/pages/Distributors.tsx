import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MapPin, Wrench, BookOpen, FileText, Mail, Building2, Globe } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
  preferred_location: z.string().optional().or(z.literal("")),
});

type DistributorFormData = z.infer<typeof contactSchema>;

const usRegions = [
  { name: "Northeast", states: ["Connecticut", "Delaware", "Maine", "Maryland", "Massachusetts", "New Hampshire", "New Jersey", "New York", "Pennsylvania", "Rhode Island", "Vermont"] },
  { name: "Southeast", states: ["Alabama", "Arkansas", "Florida", "Georgia", "Kentucky", "Louisiana", "Mississippi", "North Carolina", "South Carolina", "Tennessee", "Virginia", "West Virginia"] },
  { name: "Midwest", states: ["Illinois", "Indiana", "Iowa", "Kansas", "Michigan", "Minnesota", "Missouri", "Nebraska", "North Dakota", "Ohio", "South Dakota", "Wisconsin"] },
  { name: "Southwest", states: ["Arizona", "New Mexico", "Oklahoma", "Texas"] },
  { name: "Mountain West", states: ["Colorado", "Idaho", "Montana", "Nevada", "Utah", "Wyoming"] },
  { name: "Pacific", states: ["Alaska", "California", "Hawaii", "Oregon", "Washington"] },
];

const internationalRegions = [
  { region: "Canada", note: "Full distributor coverage across all provinces" },
  { region: "Mexico & Central America", note: "Growing network of authorized partners" },
  { region: "Europe", note: "Select distributors in UK, Germany, and Scandinavia" },
  { region: "Middle East", note: "Oil & gas focused distribution in UAE and Saudi Arabia" },
  { region: "Australia & New Zealand", note: "Authorized partners for mining and agriculture" },
];

const Distributors = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DistributorFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleStateClick = (state: string) => {
    setSelectedRegion(state);
    setValue("preferred_location", state);
    document.getElementById("distributor-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: DistributorFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("enquiries").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.message,
        product_interest: "Find a Distributor",
        preferred_location: data.preferred_location || null,
      });
      if (error) throw error;
      toast({
        title: "Request Submitted",
        description: "We'll connect you with your nearest Alkota distributor shortly.",
      });
      reset();
      setSelectedRegion(null);
    } catch {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us at 1-800-255-6823.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Find a Distributor
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Alkota Distributor Network
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed">
              Alkota has distributors across the United States and internationally.
              Our authorized distributors provide sales, service, parts, and ongoing
              support for all Alkota cleaning equipment. Select your region below
              or fill out the form to get connected.
            </p>
          </div>
        </div>
      </section>

      {/* Regional Map */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-light tracking-tight mb-2">
            Browse by Region
          </h2>
          <p className="text-sm text-muted-foreground font-light mb-10">
            Click any state to auto-fill the contact form below and we'll connect you with distributors in your area.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {usRegions.map((region) => (
              <div key={region.name} className="border border-border p-6">
                <h3 className="text-lg font-light tracking-tight mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-primary" strokeWidth={1} />
                  {region.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {region.states.map((state) => (
                    <button
                      key={state}
                      onClick={() => handleStateClick(state)}
                      className={`text-xs font-light py-2 px-3 border transition-colors ${
                        selectedRegion === state
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* International */}
          <div className="border border-border p-8 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Globe size={18} className="text-primary" strokeWidth={1} />
              <h2 className="text-2xl font-light tracking-tight">
                International Distributors
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {internationalRegions.map((item) => (
                <div key={item.region} className="space-y-1">
                  <p className="text-sm font-light">{item.region}</p>
                  <p className="text-xs text-muted-foreground font-light">{item.note}</p>
                </div>
              ))}
              <div className="space-y-1">
                <p className="text-sm font-light">Other Regions</p>
                <p className="text-xs text-muted-foreground font-light">
                  Contact us for distributor info in your country
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form + Info */}
          <div className="grid lg:grid-cols-3 gap-16" id="distributor-form">
            {/* Sidebar Info */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 size={16} className="text-primary" strokeWidth={1} />
                  <h3 className="text-lg font-light tracking-tight">Headquarters</h3>
                </div>
                <div className="space-y-3 text-sm font-light">
                  <p className="text-foreground">Alkota Cleaning Systems</p>
                  <p className="text-muted-foreground">
                    Alcester, South Dakota<br />
                    United States
                  </p>
                  <div className="pt-2 space-y-2">
                    <a href="tel:1-800-255-6823" className="flex items-center gap-2 text-primary">
                      <Phone size={14} strokeWidth={1} />
                      1-800-255-6823
                    </a>
                    <a href="tel:605-934-2222" className="flex items-center gap-2 text-muted-foreground">
                      <Phone size={14} strokeWidth={1} />
                      605-934-2222 (Local)
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-border">
                <h3 className="text-lg font-light tracking-tight mb-4">
                  What Distributors Offer
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Wrench size={14} className="text-primary mt-1" strokeWidth={1} />
                    <div>
                      <p className="text-sm font-light mb-1">Sales & Service</p>
                      <p className="text-xs text-muted-foreground font-light">
                        Equipment demos, installation, and ongoing maintenance
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen size={14} className="text-primary mt-1" strokeWidth={1} />
                    <div>
                      <p className="text-sm font-light mb-1">Parts & Support</p>
                      <p className="text-xs text-muted-foreground font-light">
                        OEM replacement parts and technical assistance
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText size={14} className="text-primary mt-1" strokeWidth={1} />
                    <div>
                      <p className="text-sm font-light mb-1">Warranty Service</p>
                      <p className="text-xs text-muted-foreground font-light">
                        Authorized warranty repair and registration
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={14} className="text-primary mt-1" strokeWidth={1} />
                    <div>
                      <p className="text-sm font-light mb-1">Training</p>
                      <p className="text-xs text-muted-foreground font-light">
                        Operator training and best practices guidance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 border border-border p-8"
              >
                <div>
                  <h2 className="text-2xl font-light tracking-tight mb-2">
                    Find Your Distributor
                  </h2>
                  <p className="text-sm text-muted-foreground font-light">
                    Fill out the form below and we'll connect you with an authorized Alkota distributor in your area.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-light">Name *</Label>
                    <Input id="name" {...register("name")} placeholder="Your name" className="font-light" />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-light">Email *</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="your@email.com" className="font-light" />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-light">Phone</Label>
                    <Input id="phone" type="tel" {...register("phone")} placeholder="(555) 123-4567" className="font-light" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-light">Company</Label>
                    <Input id="company" {...register("company")} placeholder="Your company" className="font-light" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-sm font-light">Your Location / State</Label>
                    <Select
                      value={selectedRegion || undefined}
                      onValueChange={(val) => {
                        setSelectedRegion(val);
                        setValue("preferred_location", val);
                      }}
                    >
                      <SelectTrigger className="font-light">
                        <SelectValue placeholder="Select your state or region" />
                      </SelectTrigger>
                      <SelectContent>
                        {usRegions.flatMap((r) => r.states).map((state) => (
                          <SelectItem key={state} value={state} className="font-light">
                            {state}
                          </SelectItem>
                        ))}
                        <SelectItem value="Canada" className="font-light">Canada</SelectItem>
                        <SelectItem value="International" className="font-light">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-light">Message *</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Tell us what equipment you're looking for or any questions you have..."
                    className="font-light min-h-[120px]"
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                </div>

                <Button type="submit" disabled={isSubmitting} variant="outline" className="font-light tracking-wide">
                  {isSubmitting ? "Submitting..." : "Find My Distributor"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Distributors;

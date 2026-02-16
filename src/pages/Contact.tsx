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
import { Phone, Mail, MapPin } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
  product_interest: z.string().optional().or(z.literal("")),
  preferred_location: z.string().trim().max(200).optional().or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactSchema>;

const productOptions = [
  "Hot Water Pressure Washers",
  "Cold Water Pressure Washers",
  "Steam & Dry Steam Cleaners",
  "Pressure Washer Trailers",
  "Industrial Parts Washers",
  "Space Heaters",
  "Water Treatment",
  "Custom Build",
  "Other",
];

const distributorRegions = [
  "Northeast US",
  "Southeast US",
  "Midwest US",
  "Southwest US",
  "Northwest US",
  "Western US",
  "Canada",
  "International",
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("enquiries").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.message,
        product_interest: data.product_interest || null,
        preferred_location: data.preferred_location || null,
      });

      if (error) throw error;

      toast({
        title: "Enquiry Submitted",
        description:
          "Thank you for your interest. An Alkota representative will be in touch shortly.",
      });
      reset();
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
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Contact Alkota
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed">
              Ready to get #AlkotaClean? Our team is here to help you find the
              right cleaning solution. Fill out the form below and we'll connect
              you with your local Alkota distributor.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-light tracking-tight mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone
                      size={18}
                      strokeWidth={1}
                      className="text-primary mt-1"
                    />
                    <div>
                      <p className="text-sm font-light mb-1">Call Us</p>
                      <a
                        href="tel:1-800-255-6823"
                        className="text-sm text-primary font-light"
                      >
                        1-800-255-6823
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail
                      size={18}
                      strokeWidth={1}
                      className="text-primary mt-1"
                    />
                    <div>
                      <p className="text-sm font-light mb-1">Email</p>
                      <p className="text-sm text-muted-foreground font-light">
                        Contact your local distributor
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin
                      size={18}
                      strokeWidth={1}
                      className="text-primary mt-1"
                    />
                    <div>
                      <p className="text-sm font-light mb-1">Headquarters</p>
                      <p className="text-sm text-muted-foreground font-light">
                        Alcester, South Dakota
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-light tracking-tight mb-4">
                  Find a Distributor
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                  Alkota has a robust distribution network servicing industries
                  including agriculture, oil and gas, fleet maintenance,
                  industrial operations, and many more. Select your preferred
                  region in the form to be connected with your nearest
                  distributor.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 border border-border p-8"
              >
                <h2 className="text-2xl font-light tracking-tight mb-2">
                  Request a Quote or Information
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-light">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Your name"
                      className="font-light"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-light">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your@email.com"
                      className="font-light"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-light">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="(555) 123-4567"
                      className="font-light"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-light">
                      Company
                    </Label>
                    <Input
                      id="company"
                      {...register("company")}
                      placeholder="Your company"
                      className="font-light"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-light">
                      Product Interest
                    </Label>
                    <Select
                      onValueChange={(val) =>
                        setValue("product_interest", val)
                      }
                    >
                      <SelectTrigger className="font-light">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {productOptions.map((opt) => (
                          <SelectItem key={opt} value={opt} className="font-light">
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-light">
                      Preferred Distributor Region
                    </Label>
                    <Select
                      onValueChange={(val) =>
                        setValue("preferred_location", val)
                      }
                    >
                      <SelectTrigger className="font-light">
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                      <SelectContent>
                        {distributorRegions.map((region) => (
                          <SelectItem
                            key={region}
                            value={region}
                            className="font-light"
                          >
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-light">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Tell us about your cleaning needs..."
                    className="font-light min-h-[120px]"
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="outline"
                  className="font-light tracking-wide"
                >
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
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

export default Contact;

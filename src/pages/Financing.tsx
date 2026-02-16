import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Percent, Calendar } from "lucide-react";

const zeroInterestPayments = [
  { amount: "$5,000", payment: "$416.66" },
  { amount: "$7,500", payment: "$625.00" },
  { amount: "$10,000", payment: "$833.33" },
  { amount: "$12,500", payment: "$1,041.66" },
  { amount: "$15,000", payment: "$1,250.00" },
];

const termPayments = [
  { term: "12 Mo.", p5k: "$441.10", p7k: "$661.61", p10k: "$882.20", p15k: "$1,323.30" },
  { term: "24 Mo.", p5k: "$227.45", p7k: "$341.18", p10k: "$454.90", p15k: "$682.35" },
  { term: "36 Mo.", p5k: "$157.95", p7k: "$236.92", p10k: "$315.90", p15k: "$473.85" },
  { term: "48 Mo.", p5k: "$122.65", p7k: "$183.98", p10k: "$245.30", p15k: "$367.95" },
  { term: "60 Mo.", p5k: "$102.65", p7k: "$153.00", p10k: "$204.00", p15k: "$306.00" },
];

const Financing = () => {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Equipment Financing"
        description="Finance your Alkota pressure washer with 0% interest for 12 months or flexible term options. Get industrial cleaning equipment with affordable monthly payments."
        path="/financing"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Equipment Financing
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Financing with Alkota
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed">
              Get the equipment that works as hard as you do. Choose from two
              great financing options to fit your budget and get cleaning today.
            </p>
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* 0% Interest */}
            <div className="border border-primary/30 bg-primary/5 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 border border-primary flex items-center justify-center">
                  <Percent className="w-6 h-6 text-primary" strokeWidth={1} />
                </div>
                <div>
                  <h2 className="text-2xl font-light tracking-tight">
                    0% Interest
                  </h2>
                  <p className="text-sm text-primary font-light">12 Months</p>
                </div>
              </div>

              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                No need to compromise with 12 months at 0% interest! 12 equal
                payments on all new Alkota equipment. Available January 1st –
                December 31st, 2026.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm font-light">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  12 equal payments over 12 months
                </div>
                <div className="flex items-center gap-2 text-sm font-light">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  All NEW Alkota equipment eligible
                </div>
                <div className="flex items-center gap-2 text-sm font-light">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Minimum $5,000 finance amount
                </div>
                <div className="flex items-center gap-2 text-sm font-light">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Pay off early with no penalty
                </div>
              </div>

              <h3 className="text-sm font-light tracking-wide mb-3">
                Sample Monthly Payments
              </h3>
              <div className="border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-light">Financed</TableHead>
                      <TableHead className="text-xs font-light text-right">Monthly</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {zeroInterestPayments.map((row) => (
                      <TableRow key={row.amount}>
                        <TableCell className="text-sm font-light">{row.amount}</TableCell>
                        <TableCell className="text-sm font-light text-right">{row.payment}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <p className="text-xs text-muted-foreground font-light mt-4 leading-relaxed">
                First payment due at contract signing. U.S.A. only. Subject to
                credit approval.
              </p>
            </div>

            {/* Term Financing */}
            <div className="border border-border p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 border border-border flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" strokeWidth={1} />
                </div>
                <div>
                  <h2 className="text-2xl font-light tracking-tight">
                    $0 Down
                  </h2>
                  <p className="text-sm text-muted-foreground font-light">
                    12–60 Months
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                You choose: 12 to 60 month options with $0 down to get you
                cleaning like a pro today. Enjoy competitive rates and terms.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm font-light">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  12–60 month term options
                </div>
                <div className="flex items-center gap-2 text-sm font-light">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Quick approval with great rates
                </div>
                <div className="flex items-center gap-2 text-sm font-light">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  All NEW Alkota equipment eligible
                </div>
                <div className="flex items-center gap-2 text-sm font-light">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Minimum $5,000 / 2 years in business
                </div>
              </div>

              <h3 className="text-sm font-light tracking-wide mb-3">
                Sample Monthly Payments*
              </h3>
              <div className="border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-light">Term</TableHead>
                      <TableHead className="text-xs font-light text-right">$5K</TableHead>
                      <TableHead className="text-xs font-light text-right">$7.5K</TableHead>
                      <TableHead className="text-xs font-light text-right">$10K</TableHead>
                      <TableHead className="text-xs font-light text-right">$15K</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {termPayments.map((row) => (
                      <TableRow key={row.term}>
                        <TableCell className="text-sm font-light">{row.term}</TableCell>
                        <TableCell className="text-sm font-light text-right">{row.p5k}</TableCell>
                        <TableCell className="text-sm font-light text-right">{row.p7k}</TableCell>
                        <TableCell className="text-sm font-light text-right">{row.p10k}</TableCell>
                        <TableCell className="text-sm font-light text-right">{row.p15k}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <p className="text-xs text-muted-foreground font-light mt-4 leading-relaxed">
                *Rates based on term and credit score. Minimum 675 credit score.
                Early payoff before 12 months adds 5% fee. U.S.A. only.
              </p>
            </div>
          </div>

          {/* Partners */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-light tracking-tight mb-4">
              Financing Partners
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-4">
              Alkota has partnered with Western Equipment Finance and ClickLease
              to make it easier than ever to afford the best cleaning equipment
              in the industry.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              <strong className="font-normal text-foreground">Western Equipment Finance</strong>{" "}
              offers flexible terms and great rates with quick approval
              decisions. <strong className="font-normal text-foreground">ClickLease</strong>{" "}
              lets you apply in minutes with real approval in seconds — no
              hard credit pull, no documents needed.
            </p>
            <Link to="/distributors">
              <Button variant="outline" size="sm" className="font-light tracking-wide">
                Find a Distributor to Apply
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Financing;

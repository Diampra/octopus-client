import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 26, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using the services provided by Octopus Inc., you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services</h2>
              <p className="text-muted-foreground">
                Octopus Inc. provides professional printing, branding, and creative design services including but not limited to: visiting cards, brochures, banners, stickers, packaging labels, UV printing, acrylic prints, and logo design services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Orders and Payment</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All orders are subject to acceptance and availability.</li>
                <li>Prices are quoted in Indian Rupees (INR) and are subject to change without notice.</li>
                <li>Payment must be made in full before production begins unless otherwise agreed.</li>
                <li>We accept various payment methods including bank transfer, UPI, and cash on delivery for select orders.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Artwork and Design Files</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Customers are responsible for providing print-ready artwork in acceptable formats.</li>
                <li>We are not responsible for errors in customer-supplied artwork.</li>
                <li>Design modifications may incur additional charges.</li>
                <li>We retain the right to use completed work in our portfolio unless otherwise requested.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Production and Delivery</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Production timelines are estimates and may vary based on complexity and quantity.</li>
                <li>Delivery times are approximate and do not constitute guaranteed delivery dates.</li>
                <li>We are not liable for delays caused by factors beyond our control.</li>
                <li>Shipping charges are calculated based on destination and package weight.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Quality and Returns</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>We strive for the highest quality in all our products.</li>
                <li>Minor color variations between screen displays and printed materials are normal.</li>
                <li>Claims for defective products must be made within 7 days of delivery.</li>
                <li>Custom printed items cannot be returned unless defective.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground">
                Customers warrant that they own or have the right to use all artwork, logos, and materials submitted for printing. Octopus Inc. is not responsible for copyright or trademark infringement resulting from customer-supplied materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Octopus Inc.'s liability is limited to the value of the order in question. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Cancellation Policy</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Orders may be cancelled before production begins for a full refund.</li>
                <li>Once production has started, cancellation fees may apply.</li>
                <li>Custom orders cannot be cancelled once approved for production.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms of Service are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Patna, Bihar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions regarding these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p><strong>Octopus Inc.</strong></p>
                <p>Patna, Bihar, India</p>
                <p>Email: legal@octopusinc.in</p>
                <p>Phone: +91 98765 43210</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
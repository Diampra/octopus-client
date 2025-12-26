import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 26, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to Octopus Inc. ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our printing and branding services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We may collect information about you in a variety of ways, including:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and mailing address when you place an order or contact us.</li>
                <li><strong>Business Information:</strong> Company name, business details, and project requirements for printing services.</li>
                <li><strong>Design Files:</strong> Artwork, logos, and other creative materials you submit for printing projects.</li>
                <li><strong>Payment Information:</strong> Billing details processed through secure payment gateways.</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Process and fulfill your printing orders</li>
                <li>Communicate with you about your projects and orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send promotional materials and updates (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our business, such as payment processors and delivery partners, under strict confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookies</h2>
              <p className="text-muted-foreground">
                Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect certain website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p><strong>Octopus Inc.</strong></p>
                <p>Patna, Bihar, India</p>
                <p>Email: privacy@octopusinc.in</p>
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

export default PrivacyPolicy;
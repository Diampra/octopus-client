import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const DMCA = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">DMCA Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 26, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Octopus Inc. respects the intellectual property rights of others and expects our users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA) and similar international laws, we will respond to valid notices of alleged copyright infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Copyright Infringement Claims</h2>
              <p className="text-muted-foreground">
                If you believe that your copyrighted work has been copied and is accessible on our website or through our services in a way that constitutes copyright infringement, please notify our designated copyright agent with the following information:
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Required Information for DMCA Notice</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>Identification of the material that is claimed to be infringing, including its location on our website or services.</li>
                <li>Your contact information including address, telephone number, and email address.</li>
                <li>A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law.</li>
                <li>A statement, made under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner or authorized to act on behalf of the owner.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Designated Copyright Agent</h2>
              <p className="text-muted-foreground">
                Please send all DMCA notices to our designated copyright agent:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-foreground"><strong>DMCA Agent</strong></p>
                <p className="text-muted-foreground">Octopus Inc.</p>
                <p className="text-muted-foreground">Patna, Bihar, India</p>
                <p className="text-muted-foreground">Email: dmca@octopusinc.in</p>
                <p className="text-muted-foreground">Phone: +91 98765 43210</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Counter-Notification</h2>
              <p className="text-muted-foreground mb-4">
                If you believe that your content was removed or disabled by mistake or misidentification, you may file a counter-notification with the following information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Your physical or electronic signature.</li>
                <li>Identification of the material that was removed and its location before removal.</li>
                <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification.</li>
                <li>Your name, address, telephone number, and a statement that you consent to the jurisdiction of the courts in your area.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Repeat Infringers</h2>
              <p className="text-muted-foreground">
                Octopus Inc. reserves the right to terminate the accounts of users who are repeat infringers of intellectual property rights. We will remove or disable access to content that is found to be infringing upon the intellectual property rights of others.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Customer Responsibility</h2>
              <p className="text-muted-foreground">
                As a printing and design services provider, we require our customers to warrant that they own or have proper licensing for all artwork, logos, images, and materials submitted for printing. Customers are solely responsible for any copyright infringement resulting from materials they provide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Good Faith</h2>
              <p className="text-muted-foreground">
                Please note that misrepresentations in a DMCA notice or counter-notification may result in legal liability. We recommend consulting with an attorney before filing a DMCA notice or counter-notification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Modifications</h2>
              <p className="text-muted-foreground">
                Octopus Inc. reserves the right to modify this DMCA Policy at any time. Changes will be posted on this page with an updated revision date.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DMCA;
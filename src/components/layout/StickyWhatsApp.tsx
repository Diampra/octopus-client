import { MessageCircle } from "lucide-react";

const StickyWhatsApp = () => {
  const whatsappNumber = "919312699450"; // Use the same number as Contact page
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in your printing services. Can you help me with a quote?");

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 whatsapp-pulse border-2 border-foreground"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  );
};

export default StickyWhatsApp;

import WhatsAppIcon from "@/assets/whatsapp.svg";

const StickyWhatsApp = () => {
  const phoneNumber = "+919471006334";
  const message = "Hello, I would like to know more about your services.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 transition hover:scale-110 bg-white rounded-full"
      aria-label="Chat on WhatsApp"
    >
      <img
        src="src/assets/whatsapp.svg"
        alt="WhatsApp"
        className="w-8 h-8"
      />
    </a>
  );
};

export default StickyWhatsApp;

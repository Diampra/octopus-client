import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
  schema?: Record<string, any>;
}

export default function SEO({
  title,
  description,
  name = "Octopus",
  type = "website",
  url = "https://octopus.in",
  image = "https://octopus.in/og-image.jpg",
  schema,
}: SEOProps) {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: name,
    url: url,
    description: description,
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* JSON-LD for bot crawls / structured data */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}

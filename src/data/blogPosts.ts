export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Printing Tips" | "Design Trends" | "Company News";
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "choosing-right-paper-business-cards",
    title: "Choosing the Right Paper for Your Business Cards",
    excerpt: "Learn how paper weight, texture, and finish can elevate your business card from ordinary to extraordinary.",
    content: `
# Choosing the Right Paper for Your Business Cards

Your business card is often the first physical impression someone has of your brand. The paper you choose speaks volumes about your business before they even read your name.

## Paper Weight Matters

Paper weight is measured in GSM (grams per square meter). For business cards, we recommend:

- **300 GSM**: Standard, professional feel
- **350 GSM**: Premium, substantial weight
- **400+ GSM**: Luxury, makes a statement

## Finish Options

### Matte Finish
Perfect for minimalist designs. Easy to write on and reduces glare. Gives a sophisticated, understated look.

### Glossy Finish
Makes colors pop and photographs shine. Creates a vibrant, eye-catching appearance. Best for colorful, image-heavy designs.

### Soft Touch Lamination
Velvety texture that feels luxurious. Creates a memorable tactile experience. Premium option that stands out.

## Special Textures

Consider textured papers like linen, felt, or cotton for added character. These work beautifully with embossed or letterpress printing.

## Our Recommendation

For most businesses, we recommend 350 GSM paper with a matte or soft-touch finish. It strikes the perfect balance between professionalism and memorability.

Contact us for free paper samples and let your business card make the impression it deserves.
    `,
    category: "Printing Tips",
    author: "Rahul Sharma",
    date: "2024-12-15",
    readTime: "4 min read",
    image: "/placeholder.svg"
  },
  {
    id: "2024-logo-design-trends",
    title: "Top Logo Design Trends for 2024",
    excerpt: "Discover the hottest logo design trends that are shaping brand identities this year.",
    content: `
# Top Logo Design Trends for 2024

Stay ahead of the curve with these trending logo design approaches that are dominating the branding landscape.

## 1. Minimalist Geometry

Clean geometric shapes continue to dominate. Simple circles, squares, and triangles create memorable, versatile logos that work across all platforms.

## 2. Bold Typography

Custom typefaces and bold letterforms are making statements. Brands are moving away from generic fonts to create unique typographic identities.

## 3. Gradient Renaissance

Gradients are back, but more sophisticated. Subtle color transitions add depth and modernity to flat designs.

## 4. Negative Space Magic

Clever use of negative space creates dual meanings and visual intrigue. These logos reward closer inspection and create memorable brand marks.

## 5. Hand-Drawn Elements

Authentic, hand-crafted touches add warmth and personality. Perfect for brands wanting to appear approachable and human.

## 6. Motion-Ready Logos

With digital-first branding, logos designed with animation in mind are increasingly important. Simple, modular designs that can move and transform.

## 7. Retro Revival

Nostalgic design elements from the 70s, 80s, and 90s continue to influence modern logos, bringing warmth and familiarity.

## What This Means for Your Brand

Whether you're starting fresh or considering a rebrand, understanding these trends helps you make informed decisions. However, always prioritize timelessness over trendiness.

Need a logo that stands the test of time? Our design team blends current trends with classic principles.
    `,
    category: "Design Trends",
    author: "Priya Patel",
    date: "2024-12-10",
    readTime: "5 min read",
    image: "/placeholder.svg"
  },
  {
    id: "octopus-expands-uv-printing",
    title: "Octopus Inc. Expands UV Printing Capabilities",
    excerpt: "We're excited to announce our new state-of-the-art UV printing equipment for enhanced quality and faster turnaround.",
    content: `
# Octopus Inc. Expands UV Printing Capabilities

We're thrilled to announce a major expansion of our UV printing capabilities with the addition of new state-of-the-art equipment.

## What's New

Our new UV flatbed printer brings:

- **Larger Format Printing**: Up to 2.5m x 1.3m in a single print
- **Higher Resolution**: Crystal-clear 1440 dpi output
- **More Materials**: Print on acrylic, wood, metal, glass, and more
- **Faster Turnaround**: 40% faster production times

## What This Means for You

### For Signage
Larger, more vibrant signs with incredible durability. Perfect for outdoor displays that need to withstand the elements.

### For Displays
Point-of-sale displays and exhibition graphics with stunning visual impact. Rigid materials for professional presentation.

### For Custom Products
Personalized gifts, awards, and promotional items with photographic quality printing on virtually any surface.

## Special Launch Offer

To celebrate, we're offering 20% off all UV printing orders placed this month. Use code UV2024 at checkout or mention it when you contact us.

## Visit Our Workshop

We invite you to visit our facility and see the new equipment in action. Schedule a tour and discuss your project with our team.

Thank you for your continued trust in Octopus Inc. We're committed to bringing you the best in printing technology and service.
    `,
    category: "Company News",
    author: "Octopus Inc. Team",
    date: "2024-12-05",
    readTime: "3 min read",
    image: "/placeholder.svg"
  },
  {
    id: "brochure-design-mistakes",
    title: "5 Common Brochure Design Mistakes to Avoid",
    excerpt: "Make your brochures more effective by avoiding these frequent design pitfalls.",
    content: `
# 5 Common Brochure Design Mistakes to Avoid

A well-designed brochure can be a powerful marketing tool. Here's how to avoid the most common mistakes we see.

## 1. Too Much Text

**The Problem**: Cramming every detail into your brochure overwhelms readers.

**The Fix**: Focus on key messages. Use bullet points. Let white space breathe. Save detailed information for your website.

## 2. Poor Image Quality

**The Problem**: Pixelated or stretched images make your business look unprofessional.

**The Fix**: Always use high-resolution images (300 dpi minimum). Invest in professional photography when possible.

## 3. Ignoring the Fold

**The Problem**: Important information gets lost in folds or looks awkward when the brochure is folded.

**The Fix**: Design with the fold in mind. Use fold lines as natural section dividers. Keep crucial content away from fold areas.

## 4. Inconsistent Branding

**The Problem**: Colors, fonts, and style don't match your other marketing materials.

**The Fix**: Follow your brand guidelines strictly. Use consistent colors, fonts, and imagery across all materials.

## 5. Weak Call to Action

**The Problem**: Readers don't know what to do next.

**The Fix**: Include a clear, compelling call to action. Make contact information prominent. Give readers a reason to act now.

## Bonus Tip: Proofread Everything

Typos and errors destroy credibility. Always have multiple people review before printing.

Need help with your next brochure? Our design team creates effective marketing materials that get results.
    `,
    category: "Printing Tips",
    author: "Amit Kumar",
    date: "2024-11-28",
    readTime: "4 min read",
    image: "/placeholder.svg"
  },
  {
    id: "sustainable-printing-practices",
    title: "Our Commitment to Sustainable Printing",
    excerpt: "Learn about the eco-friendly practices we've implemented to reduce our environmental impact.",
    content: `
# Our Commitment to Sustainable Printing

At Octopus Inc., we believe great printing shouldn't come at the cost of our planet. Here's how we're making a difference.

## Eco-Friendly Materials

### Recycled Papers
We offer a wide range of recycled paper options, from 50% to 100% post-consumer waste content. Quality doesn't have to suffer for sustainability.

### Soy-Based Inks
We've transitioned to soy-based inks for many of our printing processes. They produce vibrant colors while being easier to de-ink for paper recycling.

### FSC Certified Options
All our paper suppliers are FSC certified, ensuring responsible forest management.

## Reduced Waste

- **Digital Proofing**: Reducing paper waste from physical proofs
- **Optimized Cutting**: Software that minimizes paper waste
- **Recycling Program**: All paper waste is recycled

## Energy Efficiency

Our facility uses:
- LED lighting throughout
- Energy-efficient equipment
- Smart power management systems

## What You Can Do

When ordering, consider:
- Do you need that many copies?
- Can you use a slightly smaller format?
- Would recycled paper work for your project?

## Looking Forward

We're continuously exploring new ways to reduce our environmental footprint. This includes investigating waterless printing technologies and carbon offset programs.

Choose Octopus Inc. for printing that looks good and does good.
    `,
    category: "Company News",
    author: "Octopus Inc. Team",
    date: "2024-11-20",
    readTime: "4 min read",
    image: "/placeholder.svg"
  },
  {
    id: "color-psychology-marketing",
    title: "Color Psychology in Marketing Materials",
    excerpt: "Understanding how colors influence customer perception and behavior in your print marketing.",
    content: `
# Color Psychology in Marketing Materials

Colors aren't just aesthetic choices—they're powerful psychological tools that influence how customers perceive your brand.

## The Meaning of Colors

### Red
- Evokes: Energy, urgency, passion
- Best for: Sales, food, entertainment
- Use sparingly: Can feel aggressive if overused

### Blue
- Evokes: Trust, security, professionalism
- Best for: Finance, healthcare, technology
- Most universally liked color

### Green
- Evokes: Nature, health, growth
- Best for: Organic products, wellness, environment
- Calming and balanced

### Yellow
- Evokes: Optimism, clarity, warmth
- Best for: Children's products, creative industries
- Attention-grabbing but can cause eye strain

### Orange
- Evokes: Enthusiasm, confidence, creativity
- Best for: Calls to action, youth brands
- Great for impulse purchases

### Purple
- Evokes: Luxury, creativity, wisdom
- Best for: Premium products, beauty, spirituality
- Associated with royalty and quality

### Black
- Evokes: Elegance, power, sophistication
- Best for: Luxury brands, formal services
- Classic and timeless

## Applying Color Psychology

### Know Your Audience
Age, gender, and culture influence color preferences. Research your target demographic.

### Consider Context
Colors work differently in different contexts. Test your materials with real customers.

### Create Contrast
Ensure readability with proper contrast. Dark text on light backgrounds works best for body copy.

### Be Consistent
Use your brand colors consistently across all materials for recognition.

Need help choosing the perfect color palette for your marketing materials? Our design team understands the science of color.
    `,
    category: "Design Trends",
    author: "Priya Patel",
    date: "2024-11-15",
    readTime: "5 min read",
    image: "/placeholder.svg"
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === slug);
};

export const getPostsByCategory = (category: BlogPost["category"]): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

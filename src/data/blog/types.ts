export interface BlogSection {
  h2: string;
  paragraphs: string[];
  h3s?: {
    h3: string;
    text: string;
  }[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  steps?: string[];
  bullets?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InternalLink {
  text: string;
  href: string;
}

export interface BlogPostCMS {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  category: string;
  author: string;
  publishedDate: string;
  heroImage: {
    url: string;
    alt: string;
  };
  introduction: string;
  sections: BlogSection[];
  internalLinks: InternalLink[];
  faq: FAQItem[];
  cta: {
    headline: string;
    text: string;
    buttonText: string;
    buttonUrl: string;
  };
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  searchIntent?: string;
  readingTime?: string;
  wordCount?: number;
  tags?: string[];
  isFeatured?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  rankingDifficulty?: "Low" | "Medium" | "High";
  publicationPriority?: "High" | "Medium" | "Low";
  summaryParagraph?: string;
  relatedArticles?: { title: string; slug: string }[];
  imagePrompt?: string;
}

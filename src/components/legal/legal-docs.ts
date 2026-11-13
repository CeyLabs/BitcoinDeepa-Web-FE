// The site's legal documents, used for the "Legal" cross-links on each legal
// page, breadcrumbs and the sitemap.

export interface LegalDoc {
  title: string;
  href: string;
}

export const LEGAL_DOCS: LegalDoc[] = [
  { title: "Terms of Service", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Return Policy", href: "/return-policy" },
  { title: "Open Source License", href: "/license" },
];

export interface LegalSectionRef {
  id: string;
  title: string;
}

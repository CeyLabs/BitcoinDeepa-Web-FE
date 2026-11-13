import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/src/components/legal/legal-page";
import { pageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Open Source License",
  description:
    "Bitcoin Deepa is an open source community project. The website's source code is released under the MIT License.",
  path: "/license",
});

const SECTIONS = [
  { id: "mit-license", title: "MIT License" },
  { id: "source-code", title: "Source Code" },
];

export default function LicensePage() {
  const currentYear = new Date().getFullYear();
  return (
    <LegalPage
      title="Open Source License"
      tag="Open Source"
      updated="Nov 12, 2026"
      updatedIso="2026-11-12"
      path="/license"
      sections={SECTIONS}
    >
      <div>
        <p>
          BitcoinDeepa is an open source community initiative. The website&apos;s
          source code is released under the MIT License. You are free to use,
          modify, and distribute this project provided that the following
          license notice is included with your copies.
        </p>
      </div>

      <LegalSection id={SECTIONS[0].id} title={SECTIONS[0].title}>
        <pre>{`MIT License

Copyright (c) ${currentYear} BitcoinDeepa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`}</pre>
      </LegalSection>

      <LegalSection id={SECTIONS[1].id} title={SECTIONS[1].title}>
        <p>
          The code for this website lives on GitHub at{" "}
          <a href="https://github.com/CeyLabs/BitcoinDeepa-Web-FE" target="_blank" rel="noopener noreferrer">
            CeyLabs/BitcoinDeepa-Web-FE
          </a>
          . Release notes for each version are on our{" "}
          <a href="/releases">releases page</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

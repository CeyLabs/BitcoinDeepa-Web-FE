import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "License | BitcoinDeepa",
  description:
    "Open source license information for the BitcoinDeepa community project",
};

export default function LicensePage() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="relative overflow-hidden bg-black">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 pointer-events-none"></div>
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bitcoin/20 via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10">
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Open Source</span>
                  <span className="text-bitcoin ml-2">License</span>
                </h1>
              </div>
              <div className="space-y-10">
                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <p className="text-gray-300 text-justify">
                    BitcoinDeepa is an open source community initiative. The
                    website's source code is released under the MIT License. You
                    are free to use, modify, and distribute this project
                    provided that the following license notice is included with
                    your copies.
                  </p>
                  <pre className="mt-4 whitespace-pre-wrap text-gray-400 text-xs bg-zinc-950 p-4 rounded-lg">
                    {`MIT License

Copyright (c) ${currentYear} BitcoinDeepa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`}
                  </pre>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

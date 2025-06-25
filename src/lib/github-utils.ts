/**
 * GitHub release content formatting utilities
 * These helper functions convert GitHub release markdown to HTML
 */

/**
 * Format GitHub-specific release content with custom styling
 * @param text GitHub release markdown text
 * @returns Formatted HTML string with BitcoinDeepa styling
 */
export function formatGithubReleaseContent(text: string): string {
  if (!text) return '';
  
  // Process features section first
  let processedText = formatFeaturesList(text);
  
  // Handle New Contributors section
  processedText = processedText.replace(
    /New Contributors/g,
    '<h2 class="text-xl font-bold text-bitcoin mb-3">New Contributors</h2>'
  );

  // Format contributor lines - replace full URLs with nicer links
  processedText = processedText.replace(
    /\* (@[a-zA-Z0-9_-]+) made their first contribution in (https:\/\/github\.com\/CeyLabs\/BitcoinDeepa-Web-FE\/pull\/\d+)/gm,
    '<div class="flex items-center gap-2 my-2"><span class="text-bitcoin font-medium">$1</span> made their first contribution in <a href="$2" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">Pull Request</a></div>'
  );

  // Format custom feature lines with PR numbers
  processedText = processedText.replace(
    /- (.*) by @([a-zA-Z0-9_-]+) in (#\d+)(?![^<]*>)/g,
    '- $1 by <span class="text-bitcoin">@$2</span> in <a href="https://github.com/CeyLabs/BitcoinDeepa-Web-FE/pull/$3" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">$3</a>'
  );
  
  // Format custom feature lines that use raw URL
  processedText = processedText.replace(
    /- (.*) by @([a-zA-Z0-9_-]+) in \[(#\d+)\]\((https:\/\/github\.com\/CeyLabs\/BitcoinDeepa-Web-FE\/pull\/\d+)\)(?![^<]*>)/g,
    '- $1 by <span class="text-bitcoin">@$2</span> in <a href="$4" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">$3</a>'
  );

  // Format @mentions properly
  processedText = processedText.replace(
    /@([a-zA-Z0-9_-]+)(?![^<]*>)/g,
    '<span class="text-bitcoin">@$1</span>'
  );

  // Format Full Changelog line
  processedText = processedText.replace(
    /Full Changelog: (https:\/\/github\.com\/CeyLabs\/BitcoinDeepa-Web-FE\/commits\/v\d+\.\d+\.\d+)(?![^<]*>)/g,
    '<div class="mt-4 pt-2 border-t border-zinc-800"><span class="font-medium text-white">Full Changelog:</span> <a href="$1" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">View All Commits</a></div>'
  );

  // Handle PR links (#X) - do this BEFORE handling direct URLs to avoid double processing
  processedText = processedText.replace(
    /#(\d+)(?![^<]*>)/g, // Only match #numbers that aren't already in HTML tags
    '<a href="https://github.com/CeyLabs/BitcoinDeepa-Web-FE/pull/$1" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">#$1</a>'
  );

  // Handle direct links to GitHub PRs/pulls/commits
  processedText = processedText.replace(
    /(https:\/\/github\.com\/CeyLabs\/BitcoinDeepa-Web-FE\/pull\/\d+)(?![^<]*>)/g, // Only match URLs that aren't already in HTML tags
    '<a href="$1" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">Pull Request</a>'
  );

  // Special handling for common patterns seen in screenshot
  processedText = processedText.replace(
    /\[v1\.0\.0\] – 2025-06-25/g,
    '<h2 class="text-2xl font-bold text-bitcoin mb-3">[v1.0.0] – 2025-06-25</h2>'
  );

  return processedText;
}

/**
 * Specifically format a features section with rocket emoji and special styling
 * @param text Original release text
 * @returns Properly formatted features HTML
 */
export function formatFeaturesList(text: string): string {
  if (!text) return '';
  
  // Replace Features heading with styled version and rocket emoji
  const processedText = text.replace(
    /🚀 Features/g,
    '<h2 class="text-xl font-bold text-bitcoin mb-4 flex items-center gap-2"><span class="text-2xl">🚀</span> Features</h2>'
  );
  
  // Format specific feature format like "- Integrated `lu.ma` Events API by @kasuncfdo in #1"
  return processedText.replace(
    /- ([^@]+) by @([a-zA-Z0-9_-]+) in (#\d+)(?![^<]*>)/g,
    '<div class="mb-3">- $1 by <span class="text-bitcoin font-medium">@$2</span> in <a href="https://github.com/CeyLabs/BitcoinDeepa-Web-FE/pull/$3" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">$3</a></div>'
  );
}

/**
 * Parse general markdown content to HTML with BitcoinDeepa styling
 * @param text Markdown text to parse
 * @returns Formatted HTML string
 */
export function parseMarkdown(text: string): string {
  if (!text) return '';
  
  // First process GitHub release specific content
  let processedText = formatGithubReleaseContent(text);

  return processedText
    .replace(
      /^### (.*$)/gim,
      '<h3 class="text-lg font-semibold text-bitcoin mb-2">$1</h3>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-xl font-bold text-bitcoin mb-3">$1</h2>'
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-2xl font-bold text-bitcoin mb-4">$1</h1>'
    )
    .replace(/^\* (.*$)/gim, '<li class="text-gray-300 ml-4">• $1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(
      /`(.*?)`/g,
      '<code class="bg-zinc-800 px-2 py-1 rounded text-bitcoin text-sm">$1</code>'
    )
    // Handle Markdown links: [text](url) - only those not already in HTML tags
    .replace(
      /\[(.*?)\]\((.*?)\)(?![^<]*>)/g,
      '<a href="$2" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">$1</a>'
    )
    // Handle mentions: @username - only those not already in HTML tags
    .replace(
      /@([a-zA-Z0-9_-]+)(?![^<]*>)/g,
      '<span class="text-bitcoin">@$1</span>'
    )
    // Handle issue/PR references: #123 - only those not already in HTML tags
    .replace(
      /#(\d+)(?![^<]*>)/g,
      '<a href="https://github.com/CeyLabs/BitcoinDeepa-Web-FE/pull/$1" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">#$1</a>'
    )
    .split('\n')
    .map((line) => {
      // Skip lines that already have HTML tags
      if (line.trim().startsWith('<')) return line;
      return line.trim() ? `<p class="text-gray-300 mb-2">${line}</p>` : '';
    })
    .join('');
}

/**
 * Format date to a human-readable string
 * @param dateString ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

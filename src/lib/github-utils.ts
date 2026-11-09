/**
 * GitHub release content formatting utilities
 * These helper functions convert GitHub release markdown to HTML
 */

/**
 *    // Fixes section with bug emoji
    .replace(
      /🐛 Fixes/g,
      '<h2 class="text-xl font-bold text-bitcoin mb-4 flex items-center gap-2"><span class="text-2xl">🐛</span> Fixes</h2>'
    )at GitHub-specific release content with custom styling
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

  // Format contributor lines - handle both URL and non-URL formats
  processedText = processedText.replace(
    /\* (@[a-zA-Z0-9_-]+) made their first contribution in (https:\/\/github\.com\/CeyLabs\/[A-Za-z0-9_-]+\/pull\/\d+)/gm,
    '<div class="flex items-center gap-2 my-2"><span class="text-bitcoin font-medium">$1</span> made their first contribution in <a href="$2" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">Pull Request</a></div>'
  );
  
  // Format simple contributor references (without URL)
  processedText = processedText.replace(
    /(@[a-zA-Z0-9_-]+)\s*made their first contribution in\s*Pull Request(?![^<]*>)/gm,
    '<div class="flex items-center gap-2 my-2"><span class="text-bitcoin font-medium">$1</span> made their first contribution in Pull Request</div>'
  );

  // Format custom feature lines with PR numbers - dynamically handle repo
  processedText = processedText.replace(
    /- (.*) by @([a-zA-Z0-9_-]+) in (#\d+)(?![^<]*>)/g,
    (match, p1, p2, p3, offset, string) => {
      // Determine which repo context we're in based on content
      let repoPath = 'BitcoinDeepa-Web-FE';
      if (string.includes('BitcoinDeepaBot-TMA')) {
        repoPath = 'BitcoinDeepaBot-TMA';
      } else if (string.includes('BitcoinDeepaBot')) {
        repoPath = 'BitcoinDeepaBot';
      }
      return `- ${p1} by <span class="text-bitcoin">@${p2}</span> in <a href="https://github.com/CeyLabs/${repoPath}/pull/${p3.substring(1)}" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">${p3}</a>`;
    }
  );
  
  // Format custom feature lines that use raw URL - support all repos
  processedText = processedText.replace(
    /- (.*) by @([a-zA-Z0-9_-]+) in \[(#\d+)\]\((https:\/\/github\.com\/CeyLabs\/[A-Za-z0-9_-]+\/pull\/\d+)\)(?![^<]*>)/g,
    '- $1 by <span class="text-bitcoin">@$2</span> in <a href="$4" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">$3</a>'
  );

  // Format @mentions properly
  processedText = processedText.replace(
    /@([a-zA-Z0-9_-]+)(?![^<]*>)/g,
    '<span class="text-bitcoin">@$1</span>'
  );

  // Format Full Changelog line - handle various formats including bold (**Full Changelog**) with commits pattern
  processedText = processedText.replace(
    /\*\*Full Changelog\*\*: (https:\/\/github\.com\/CeyLabs\/[A-Za-z0-9_-]+\/commits\/v\d+\.\d+\.\d+)(?![^<]*>)/g,
    '<div class="mt-4 pt-2 border-t border-zinc-800"><span class="font-medium text-white">Full Changelog:</span> <a href="$1" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">View All Commits</a></div>'
  );

  // Handle bold format with compare pattern (used by Bot repo)
  processedText = processedText.replace(
    /\*\*Full Changelog\*\*: (https:\/\/github\.com\/CeyLabs\/[A-Za-z0-9_-]+\/compare\/[A-Za-z0-9_\-\.]+\.\.\.[A-Za-z0-9_\-\.]+)(?![^<]*>)/g,
    '<div class="mt-4 pt-2 border-t border-zinc-800"><span class="font-medium text-white">Full Changelog:</span> <a href="$1" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">View All Commits</a></div>'
  );

  // Handle non-bold version with commits pattern
  processedText = processedText.replace(
    /Full Changelog: (https:\/\/github\.com\/CeyLabs\/[A-Za-z0-9_-]+\/commits\/v\d+\.\d+\.\d+)(?![^<]*>)/g,
    '<div class="mt-4 pt-2 border-t border-zinc-800"><span class="font-medium text-white">Full Changelog:</span> <a href="$1" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">View All Commits</a></div>'
  );
  
  // Handle non-bold version with compare pattern
  processedText = processedText.replace(
    /Full Changelog: (https:\/\/github\.com\/CeyLabs\/[A-Za-z0-9_-]+\/compare\/[A-Za-z0-9_\-\.]+\.\.\.[A-Za-z0-9_\-\.]+)(?![^<]*>)/g,
    '<div class="mt-4 pt-2 border-t border-zinc-800"><span class="font-medium text-white">Full Changelog:</span> <a href="$1" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">View All Commits</a></div>'
  );
  
  // Handle plain text version without full URL
  processedText = processedText.replace(
    /Full Changelog: ((?!https:\/\/)github\.com\/CeyLabs\/[A-Za-z0-9_-]+\/commits\/v\d+\.\d+\.\d+)(?![^<]*>)/g,
    '<div class="mt-4 pt-2 border-t border-zinc-800"><span class="font-medium text-white">Full Changelog:</span> <a href="https://$1" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">View All Commits</a></div>'
  );

  // Determine which repo context we're in based on content
  let currentRepoPath = 'BitcoinDeepa-Web-FE'; // default
  if (text.includes('BitcoinDeepaBot-TMA')) {
    currentRepoPath = 'BitcoinDeepaBot-TMA';
  } else if (text.includes('BitcoinDeepaBot')) {
    currentRepoPath = 'BitcoinDeepaBot';
  }

  // Handle PR links (#X) - do this BEFORE handling direct URLs to avoid double processing
  processedText = processedText.replace(
    /#(\d+)(?![^<]*>)/g, // Only match #numbers that aren't already in HTML tags
    `<a href="https://github.com/CeyLabs/${currentRepoPath}/pull/$1" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">#$1</a>`
  );

  // Handle direct links to GitHub PRs/pulls/commits for any repo
  processedText = processedText.replace(
    /(https:\/\/github\.com\/CeyLabs\/[A-Za-z0-9_-]+\/pull\/\d+)(?![^<]*>)/g, // Only match URLs that aren't already in HTML tags
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
  
  // Process section headings with emojis
  let processedText = text
    // What's Changed section (used by GitHub automated release notes)
    .replace(
      /## What's Changed/g,
      '<h2 class="text-xl font-bold text-bitcoin mb-4">What\'s Changed</h2>'
    )
    // Features section with rocket emoji
    .replace(
      /🚀 Features/g,
      '<h2 class="text-xl font-bold text-bitcoin mb-4 flex items-center gap-2"><span class="text-2xl">🚀</span> Features</h2>'
    )
    // Improvements section with tools emoji
    .replace(
      /🛠️ Improvements/g,
      '<h2 class="text-xl font-bold text-bitcoin mb-4 flex items-center gap-2"><span class="text-2xl">🛠️</span> Improvements</h2>'
    )
    // Fixes section with bug emoji
    .replace(
      /� Fixes/g,
      '<h2 class="text-xl font-bold text-bitcoin mb-4 flex items-center gap-2"><span class="text-2xl">�</span> Fixes</h2>'
    )
    // Documentation section with books emoji
    .replace(
      /📚 Documentation/g, 
      '<h2 class="text-xl font-bold text-bitcoin mb-4 flex items-center gap-2"><span class="text-2xl">📚</span> Documentation</h2>'
    );
  
  // Determine which repo context we're in based on the content
  let repoPath = 'BitcoinDeepa-Web-FE'; // default
  if (text.includes('BitcoinDeepaBot-TMA')) {
    repoPath = 'BitcoinDeepaBot-TMA';
  } else if (text.includes('BitcoinDeepaBot')) {
    repoPath = 'BitcoinDeepaBot';
  }
  
  // Format feature lines with dash and PR numbers for all repos (Web format)
  processedText = processedText.replace(
    /- ([^@]+) by @([a-zA-Z0-9_-]+) in (#\d+)(?![^<]*>)/g,
    `<div class="mb-3">- $1 by <span class="text-bitcoin font-medium">@$2</span> in <a href="https://github.com/CeyLabs/${repoPath}/pull/$3" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">$3</a></div>`
  );
  
  // Format GitHub automated release notes with asterisk format (Bot format)
  processedText = processedText.replace(
    /\* ([^@]+) by @([a-zA-Z0-9_-]+) in (https:\/\/github\.com\/CeyLabs\/[A-Za-z0-9_-]+\/pull\/(\d+))(?![^<]*>)/g,
    '<div class="mb-3">• $1 by <span class="text-bitcoin font-medium">@$2</span> in <a href="$3" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">Pull Request #$4</a></div>'
  );
  
  return processedText;
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
      '<h3>$1</h3>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2>$1</h2>'
    )
    .replace(
      /^# (.*$)/gim,
      '<h1>$1</h1>'
    )
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(
      /`(.*?)`/g,
      '<code>$1</code>'
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
      (match, prNumber, offset, originalString) => {
        // Determine which repo context we're in
        let currentRepo = 'BitcoinDeepa-Web-FE';
        if (originalString.includes('BitcoinDeepaBot-TMA')) {
          currentRepo = 'BitcoinDeepaBot-TMA';
        } else if (originalString.includes('BitcoinDeepaBot')) {
          currentRepo = 'BitcoinDeepaBot';
        }
        return `<a href="https://github.com/CeyLabs/${currentRepo}/pull/${prNumber}" target="_blank" class="text-bitcoin hover:text-bitcoin-light hover:underline">#${prNumber}</a>`;
      }
    )
    .split('\n')
    .map((line) => {
      // Skip lines that already have HTML tags
      if (line.trim().startsWith('<')) return line;
      return line.trim() ? `<p>${line}</p>` : '';
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

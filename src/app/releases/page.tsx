"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// Import standard icons from Lucide
import { Calendar, ExternalLink } from "lucide-react";
// Import custom icons from our icons component
import {
  Download,
  Github,
  User,
  AlertCircle,
  RefreshCw,
} from "@/src/components/icons";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

// Import types and utilities
import { GitHubRelease } from "@/src/types/github";
import { formatDate, parseMarkdown } from "@/src/lib/github-utils";

export default function ReleasesPage() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch from our server-side API route, not directly from GitHub
  const fetchReleases = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/github/releases");

      if (!response.ok) throw new Error("Failed to fetch releases");

      const data: GitHubRelease[] = await response.json();
      setReleases(data);
    } catch (err) {
      console.error("Error fetching releases:", err);
      setError("Failed to load releases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 pointer-events-none"></div>
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bitcoin/20 via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10">
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Release</span>
                  <span className="text-bitcoin ml-2">Notes</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                  Stay up to date with the latest features and improvements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="https://github.com/CeyLabs/BitcoinDeepa-Web-FE/releases"
                    target="_blank"
                  >
                    <Button className="bg-bitcoin hover:bg-bitcoin-dark">
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Loading State */}
              {loading && (
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 animate-pulse"
                    >
                      <div className="h-6 bg-zinc-700 rounded w-1/3 mb-4"></div>
                      <div className="h-4 bg-zinc-700 rounded w-full mb-2"></div>
                      <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 max-w-md mx-auto">
                    <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      Failed to Load Releases
                    </h3>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <Button
                      onClick={fetchReleases}
                      className="bg-bitcoin hover:bg-bitcoin-dark"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {/* Releases */}
              {!loading && !error && (
                <div className="space-y-8">
                  {releases.map((release, index) => (
                    <motion.div
                      key={release.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8 hover:border-bitcoin/30 transition-all"
                    >
                      {/* Release Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-bitcoin mb-2">
                            {release.name || release.tag_name}
                          </h2>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(release.published_at)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{release.author.login}</span>
                            </div>
                            <Link
                              href={release.html_url}
                              target="_blank"
                              className="text-bitcoin hover:text-bitcoin-light flex items-center gap-1"
                            >
                              <span>View on GitHub</span>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Release Notes */}
                      {release.body && (
                        <div
                          className="mb-6 prose prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: parseMarkdown(release.body),
                          }}
                        />
                      )}

                      {/* Downloads */}
                      {release.assets.length > 0 && (
                        <div className="border-t border-zinc-800 pt-4 mt-6">
                          <h4 className="text-sm font-medium text-bitcoin mb-4">
                            Downloads
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {release.assets.map((asset) => (
                              <Link
                                key={asset.id}
                                href={asset.browser_download_url}
                                className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <Download className="h-4 w-4 text-bitcoin" />
                                  <span className="text-sm text-gray-300 truncate">
                                    {asset.name}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {asset.download_count} downloads
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {releases.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-400">No releases found.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

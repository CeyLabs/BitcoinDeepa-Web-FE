"use client";

import React, { useState, useEffect } from "react";
import { Calendar, ExternalLink, AlignLeft, List } from "lucide-react";
import {
  Download,
  Github,
  User,
  AlertCircle,
  RefreshCw,
} from "@/src/components/icons";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/motion-tabs";
import type { GitHubRelease } from "@/src/types/github";
import { formatDate, parseMarkdown } from "@/src/lib/github-utils";

// Repository configurations
const REPOSITORIES = {
  web: {
    name: "Bitcoin Deepa Web",
    displayName: "Bitcoin දීප Web",
    description: "The Main Bitcoin දීප web Landing Repository",
    githubUrl: "https://github.com/CeyLabs/BitcoinDeepa-Web-FE",
  },
  bot: {
    name: "Bitcoin Deepa Bot",
    displayName: "Bitcoin දීප Bot",
    description:
      "@BitcoinDeepaBot 🏅 - A Telegram Lightning ⚡️ Bitcoin wallet and tip bot for group chats.",
    githubUrl: "https://github.com/CeyLabs/BitcoinDeepaBot",
  },
  tma: {
    name: "Bitcoin Deepa TMA",
    displayName: "Bitcoin දීප TMA",
    description: "The Bitcoin දීප TMA Repository",
    githubUrl: "https://github.com/CeyLabs/BitcoinDeepaBot-TMA",
  },
};

type RepoKey = keyof typeof REPOSITORIES;

export default function ReleasesPage() {
  const [activeRepo, setActiveRepo] = useState<RepoKey>("web");
  const [releases, setReleases] = useState<Record<RepoKey, GitHubRelease[]>>({
    web: [],
    bot: [],
    tma: [],
  });
  const [loading, setLoading] = useState<Record<RepoKey, boolean>>({
    web: false,
    bot: false,
    tma: false,
  });
  const [error, setError] = useState<Record<RepoKey, string | null>>({
    web: null,
    bot: null,
    tma: null,
  });

  const [viewStyle, setViewStyle] = useState<"full" | "compact">("full");

  const repoKeys = Object.keys(REPOSITORIES) as RepoKey[];

  // Fetch releases for a specific repository using your existing API structure
  const fetchReleasesForRepo = async (repoKey: RepoKey) => {
    try {
      setLoading((prev) => ({ ...prev, [repoKey]: true }));
      setError((prev) => ({ ...prev, [repoKey]: null }));

      // Use your existing API endpoint with repo parameter
      const response = await fetch(`/api/github/releases?repo=${repoKey}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch releases for ${REPOSITORIES[repoKey].displayName}`,
        );
      }

      const data: GitHubRelease[] = await response.json();

      setReleases((prev) => ({
        ...prev,
        [repoKey]: data,
      }));
    } catch (err) {
      console.error(
        `Error fetching releases for ${REPOSITORIES[repoKey].displayName}:`,
        err,
      );
      setError((prev) => ({
        ...prev,
        [repoKey]: `Failed to load ${REPOSITORIES[repoKey].displayName} releases`,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [repoKey]: false }));
    }
  };

  // Load releases for active repository
  useEffect(() => {
    // Only fetch if we don't have releases yet
    if (releases[activeRepo].length === 0 && !loading[activeRepo]) {
      fetchReleasesForRepo(activeRepo);
    }
  }, [activeRepo]);

  // Load initial repositories on mount
  useEffect(() => {
    // Pre-fetch the TMA repository as it's newly updated
    // (The active repo "web" will be fetched by the other useEffect)
    fetchReleasesForRepo("tma");
  }, []);

  const handleTabChange = (repoKey: RepoKey) => {
    setActiveRepo(repoKey);
  };

  const handleRetry = () => {
    fetchReleasesForRepo(activeRepo);
  };

  const currentRepo = REPOSITORIES[activeRepo];
  const currentReleases = releases[activeRepo];
  const isLoading = loading[activeRepo];
  const currentError = error[activeRepo];

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
              {/* Fixed height content container to prevent layout shift */}
              <div className="min-h-[calc(100vh-16rem)]">
                {/* Header */}
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-white">Release</span>
                    <span className="text-bitcoin ml-2">Notes</span>
                  </h1>
                  <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                    Stay up to date with the latest features and improvements
                    across all Bitcoin දීප projects.
                  </p>

                  {/* Repository Tabs — same motion-tabs style as Events */}
                  <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="w-full max-w-full overflow-x-auto pb-1 flex justify-center">
                      <Tabs
                        value={activeRepo}
                        onValueChange={(v) => handleTabChange(v as RepoKey)}
                      >
                        <TabsList
                          className="bg-zinc-900 border border-bitcoin/20 rounded-xl"
                          activeClassName="bg-bitcoin rounded-lg"
                        >
                          {repoKeys.map((repoKey) => (
                            <TabsTrigger
                              key={repoKey}
                              value={repoKey}
                              className="data-[state=active]:text-black text-gray-400 px-4 sm:px-5 rounded-lg whitespace-nowrap"
                            >
                              <span className="sm:hidden">
                                {REPOSITORIES[repoKey].name.replace(
                                  "Bitcoin Deepa ",
                                  "",
                                )}
                              </span>
                              <span className="hidden sm:inline">
                                {REPOSITORIES[repoKey].name}
                              </span>
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </div>

                    {/* View Style Toggle */}
                    <div className="flex items-center gap-1 bg-zinc-900/80 border border-zinc-800 rounded-lg p-1">
                      <button
                        onClick={() => setViewStyle("full")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          viewStyle === "full"
                            ? "bg-bitcoin text-black"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <AlignLeft className="h-3.5 w-3.5" />
                        Full Notes
                      </button>
                      <button
                        onClick={() => setViewStyle("compact")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          viewStyle === "compact"
                            ? "bg-bitcoin text-black"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <List className="h-3.5 w-3.5" />
                        Compact
                      </button>
                    </div>
                  </div>

                  {/* Current Repository Info */}
                  <div
                    key={activeRepo}
                    className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-[0.75rem] p-6 mb-8 transition-opacity duration-150"
                  >
                    <h2 className="text-xl font-semibold text-bitcoin mb-3">
                      {currentRepo.displayName}
                    </h2>
                    <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                      {currentRepo.description}
                    </p>
                    <Link href={currentRepo.githubUrl} target="_blank">
                      <Button
                        variant="outline"
                        className="border-bitcoin text-bitcoin hover:bg-bitcoin/10 bg-transparent"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        View on GitHub
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-[0.75rem] p-6 animate-pulse"
                      >
                        <div className="h-6 bg-zinc-700 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-zinc-700 rounded w-full mb-2"></div>
                        <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Error State */}
                {currentError && (
                  <div className="text-center py-12">
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-red-500/20 rounded-[0.75rem] p-8 max-w-md mx-auto">
                      <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">
                        Failed to Load Releases
                      </h3>
                      <p className="text-gray-400 mb-6">{currentError}</p>
                      <Button
                        onClick={handleRetry}
                        className="bg-bitcoin hover:bg-bitcoin-dark"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                      </Button>
                    </div>
                  </div>
                )}

                {/* Releases */}
                {!isLoading && !currentError && (
                  <div
                    key={activeRepo}
                    className="space-y-8 transition-opacity duration-150"
                  >
                    {currentReleases.map((release, index) => (
                      <div
                        key={release.id}
                        className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-[0.75rem] p-6 md:p-8 hover:border-bitcoin/30 transition-all"
                      >
                        {/* Release Header */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h2 className="text-2xl font-bold text-white tracking-tight">
                                {release.name || release.tag_name}
                              </h2>
                              <span className="px-2.5 py-0.5 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-mono font-medium border border-bitcoin/20">
                                {release.tag_name}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-400 font-medium">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-zinc-500" />
                                <time dateTime={release.published_at}>
                                  {formatDate(release.published_at)}
                                </time>
                              </div>
                              <div className="w-1 h-1 rounded-full bg-zinc-700 hidden md:block" />
                              <div className="flex items-center gap-1.5">
                                <User className="h-4 w-4 text-zinc-500" />
                                <span>{release.author.login}</span>
                              </div>
                            </div>
                          </div>
                          <Link
                            href={release.html_url}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-sm font-medium text-zinc-300 hover:text-white transition-colors border border-zinc-700/50 hover:border-zinc-600 shrink-0"
                          >
                            <Github className="h-4 w-4" />
                            <span>View Release</span>
                            <ExternalLink className="h-3 w-3 text-zinc-500" />
                          </Link>
                        </div>
                        {/* Release Notes */}
                        {release.body && viewStyle === "full" && (
                          <div
                            className="mb-2 prose prose-invert prose-sm md:prose-base max-w-none 
                              prose-a:text-bitcoin hover:prose-a:text-bitcoin-light prose-a:no-underline hover:prose-a:underline
                              prose-headings:text-zinc-100 prose-headings:font-semibold prose-headings:tracking-tight
                              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-800/50
                              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
                              prose-strong:text-zinc-200 prose-strong:font-semibold
                              prose-ul:my-4 prose-ul:list-none prose-ul:pl-0
                              prose-li:relative prose-li:pl-5 prose-li:my-1.5 prose-li:text-zinc-300
                              prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.6em] prose-li:before:h-1.5 prose-li:before:w-1.5 prose-li:before:rounded-full prose-li:before:bg-zinc-700
                              prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:my-4
                              prose-code:text-bitcoin prose-code:bg-bitcoin/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.85em] prose-code:before:content-none prose-code:after:content-none
                              prose-pre:bg-zinc-900/80 prose-pre:border prose-pre:border-zinc-800/50 prose-pre:rounded-xl
                              prose-blockquote:border-l-2 prose-blockquote:border-bitcoin/50 prose-blockquote:bg-bitcoin/5 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:rounded-r-lg prose-blockquote:text-zinc-400 prose-blockquote:not-italic"
                            dangerouslySetInnerHTML={{
                              __html: parseMarkdown(release.body),
                            }}
                          />
                        )}
                        {release.body && viewStyle === "compact" && (
                          <p className="mb-2 text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                            {release.body.replace(/[#*`>\[\]()]/g, "").trim()}
                          </p>
                        )}
                        {/* Downloads */}
                        {release.assets.length > 0 && (
                          <div className="border-t border-zinc-800/50 pt-6 mt-8">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
                              <Download className="h-3.5 w-3.5" />
                              Assets & Downloads
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {release.assets.map((asset) => (
                                <Link
                                  key={asset.id}
                                  href={asset.browser_download_url}
                                  className="group flex flex-col p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/50 hover:border-bitcoin/30 hover:bg-zinc-800/50 transition-all duration-200"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <span className="text-sm font-medium text-zinc-200 group-hover:text-white truncate pr-4">
                                      {asset.name}
                                    </span>
                                    <Download className="h-4 w-4 text-zinc-600 group-hover:text-bitcoin shrink-0 transition-colors" />
                                  </div>
                                  <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs font-mono text-zinc-500">
                                      {(asset.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                    <span className="text-xs font-medium text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded-md">
                                      {asset.download_count} DLs
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}{" "}
                      </div>
                    ))}

                    {currentReleases.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-gray-400">
                          No releases found for {currentRepo.displayName}.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>{" "}
              {/* Close fixed height container */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

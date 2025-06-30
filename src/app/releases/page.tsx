"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import {
  Download,
  Github,
  User,
  AlertCircle,
  RefreshCw,
} from "@/src/components/icons";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
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

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const repoKeys = Object.keys(REPOSITORIES) as RepoKey[];

  // Update hover indicator position (only when activeIndex changes)
  useEffect(() => {
    const currentElement = tabRefs.current[activeIndex];

    if (currentElement) {
      const { offsetLeft, offsetWidth } = currentElement;
      setHoverStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  // Update active index when repo changes with quick smooth transitions
  useEffect(() => {
    const newIndex = repoKeys.indexOf(activeRepo);
    setActiveIndex(newIndex);

    // Apply quick smooth transition effect on content change
    const contentElements = document.querySelectorAll(".transition-opacity");
    contentElements.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      setTimeout(() => {
        (el as HTMLElement).style.opacity = "1";
      }, 20); // Much faster fade-in
    });
  }, [activeRepo, repoKeys]);

  // Fetch releases for a specific repository using your existing API structure
  const fetchReleasesForRepo = async (repoKey: RepoKey) => {
    try {
      setLoading((prev) => ({ ...prev, [repoKey]: true }));
      setError((prev) => ({ ...prev, [repoKey]: null }));

      // Use your existing API endpoint with repo parameter
      const response = await fetch(`/api/github/releases?repo=${repoKey}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch releases for ${REPOSITORIES[repoKey].displayName}`
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
        err
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
    if (releases[activeRepo].length === 0) {
      fetchReleasesForRepo(activeRepo);
    }
  }, [activeRepo]);

  // Load initial repositories on mount
  useEffect(() => {
    // Fetch the initial repository (web)
    fetchReleasesForRepo("web");

    // Pre-fetch the TMA repository as it's newly updated
    fetchReleasesForRepo("tma");
  }, []);

  const handleTabChange = (repoKey: RepoKey) => {
    setActiveRepo(repoKey);
    const index = repoKeys.indexOf(repoKey);
    setActiveIndex(index);
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

                  {/* Compact Repository Tabs using ShadcnUI with magnetic effect */}
                  <div className="flex justify-center mb-8">
                    <Tabs
                      value={activeRepo}
                      onValueChange={(value) => {
                        // Quick fade out
                        const contentElements = document.querySelectorAll(
                          ".transition-opacity"
                        );
                        contentElements.forEach((el) => {
                          (el as HTMLElement).style.opacity = "0";
                        });

                        // Update state almost instantly
                        setTimeout(() => {
                          const repoKey = value as RepoKey;
                          setActiveRepo(repoKey);
                        }, 80); // Faster state update
                      }}
                      className="max-w-md w-full"
                    >
                      <TabsList className="grid grid-cols-3 bg-zinc-900/60 backdrop-blur-xl rounded-[0.75rem] border border-zinc-800/50 p-1 h-[48px] relative">
                        {/* Custom Magnetic Highlight */}
                        <div
                          className="absolute h-[40px] transition-all duration-300 ease-out bg-white/10 rounded-[0.75rem]"
                          style={{
                            ...hoverStyle,
                            opacity: 1,
                            top: "4px",
                          }}
                        />

                        {repoKeys.map((repoKey, index) => (
                          <div
                            key={repoKey}
                            ref={(el) => {
                              if (tabRefs.current) tabRefs.current[index] = el;
                            }}
                            className="relative"
                          >
                            <TabsTrigger
                              value={repoKey}
                              className="text-xs font-medium rounded-[0.75rem] py-2 transition-colors duration-300 h-[40px] w-full bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-bitcoin data-[state=inactive]:text-white/80 shadow-none data-[state=active]:shadow-none relative z-10"
                            >
                              {REPOSITORIES[repoKey].name}
                            </TabsTrigger>
                          </div>
                        ))}
                      </TabsList>
                    </Tabs>
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

"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback, useMemo, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface GhostAuthor {
  id: string;
  name: string;
  profile_image: string | null;
  slug: string;
}

interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  featured: boolean;
  published_at: string;
  updated_at: string;
  primary_tag?: {
    name: string;
    slug: string;
  } | null;
  primary_author: GhostAuthor;
  url: string;
  reading_time: number;
}

interface GhostApiResponse {
  posts: GhostPost[];
  meta: {
    pagination: {
      pages: number;
      total: number;
      page: number;
      limit: number;
      next: number | null;
      prev: number | null;
    };
  };
}

export default function BlogSection() {
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Memoizing the formatDate function
  const formatDate = useMemo(
    () => (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    },
    []
  );

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY;
      const apiUrl = process.env.NEXT_PUBLIC_GHOST_API_URL;
      const url = `${apiUrl}/ghost/api/content/posts/?key=${apiKey}&include=authors,tags&limit=6`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }

      const data: GhostApiResponse = await response.json();
      setPosts(data.posts);
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); // Only re-run the effect if fetchPosts changes

  const nextSlide = () => {
    if (currentSlide < posts.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    } else {
      setCurrentSlide(posts.length - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section id="blog" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bitcoin/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between mb-12"
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-white">Latest from the</span>
              <span className="text-bitcoin ml-2">Blog</span>
            </h2>
            <p className="text-gray-400 max-w-md">
              Explore insights and stories from the pearl of sathoshi
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="https://blog.bitcoindeepa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bitcoin hover:text-bitcoin-light transition-colors text-sm font-medium"
            >
              View all posts
            </Link>

            <div className="flex md:hidden items-center space-x-3">
              <button
                onClick={prevSlide}
                className="border border-bitcoin/20 text-bitcoin hover:bg-bitcoin/10 hover:border-bitcoin h-10 w-10 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </button>
              <div className="text-sm text-gray-400">
                {currentSlide + 1} / {Math.ceil(posts.length / 1)}
              </div>
              <button
                onClick={nextSlide}
                className="border border-bitcoin/20 text-bitcoin hover:bg-bitcoin/10 hover:border-bitcoin h-10 w-10 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-bitcoin/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-bitcoin rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-400">Loading blog posts...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red-500"
              >
                <path
                  d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              Unable to Load Blog Posts
            </h3>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-bitcoin/10 rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bitcoin/10 mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-bitcoin"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-white mb-3">
              No Blog Posts Found
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              We don't have any published blog posts at the moment. Check back
              soon for updates from the BitcoinDeepa community.
            </p>
          </div>
        ) : (
          <>
            <div
              className="md:hidden relative overflow-hidden"
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {posts.map((post) => (
                  <div key={post.id} className="w-full flex-shrink-0 px-2">
                    <BlogPostCard post={post} />
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(posts.length / 1) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? "bg-bitcoin w-6"
                          : "bg-zinc-700 hover:bg-zinc-600"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  )
                )}
              </div>
            </div>

            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function BlogPostCard({ post }: { post: GhostPost }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-[#121212] rounded-xl overflow-hidden border border-zinc-800 hover:border-bitcoin/30 transition-all duration-300 group"
    >
      <Link
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-[16/9] overflow-hidden"
      >
        {post.feature_image ? (
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-zinc-700"
            >
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
          </div>
        )}

        {/* {post.featured && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-bitcoin rounded-full flex items-center justify-center">
            <Star className="h-4 w-4 text-black" fill="black" />
          </div>
        )} */}
      </Link>

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-400">
            {post.primary_tag ? post.primary_tag.name : "Bitcoin"} •{" "}
            {formatDate(post.published_at)}
          </span>

          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>{post.reading_time ? post.reading_time : 0} min read</span>
          </div>
        </div>

        <Link
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-3"
        >
          <h3 className="text-xl font-bold text-white group-hover:text-bitcoin transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
          {post.excerpt || ""}
        </p>

        <div className="mt-auto flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800 mr-3 flex-shrink-0">
            {post.primary_author.profile_image ? (
              <Image
                src={post.primary_author.profile_image || "/placeholder.svg"}
                alt={post.primary_author.name}
                width={32}
                height={32}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-bitcoin/20 flex items-center justify-center text-bitcoin">
                {post.primary_author.name.charAt(0)}
              </div>
            )}
          </div>
          <span className="text-sm text-gray-300">
            {post.primary_author.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

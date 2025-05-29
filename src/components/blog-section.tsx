"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "../lib/utils";
import { AlertCircleIcon, EmptyFileIcon, EmptyImageIcon } from "./icons";

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

  useEffect(() => {
    const blogPosts = async () => {
      try {
        const response = await fetch("/api/blog/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        setError("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    };

    blogPosts();
  }, []);

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-between mb-12 md:flex-row"
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

          {posts.length > 0 && (
            <div className="flex items-center space-x-3">
              <Link
                href="https://blog.bitcoindeepa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bitcoin hover:text-bitcoin-light transition-colors text-sm font-medium mr-6"
              >
                View all posts
              </Link>

              <div className="flex md:hidden items-center space-x-3">
                <button
                  onClick={prevSlide}
                  className="border border-bitcoin/20 text-bitcoin hover:bg-bitcoin/10 hover:border-bitcoin size-10 rounded-full flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="size-5" />
                  <span className="sr-only">Previous</span>
                </button>
                <div className="text-sm text-gray-400">
                  {currentSlide + 1} / {Math.ceil(posts.length / 1)}
                </div>
                <button
                  onClick={nextSlide}
                  className="border border-bitcoin/20 text-bitcoin hover:bg-bitcoin/10 hover:border-bitcoin size-10 rounded-full flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="size-5" />
                  <span className="sr-only">Next</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex flex-col h-full bg-zinc-900/50 backdrop-blur-sm border border-bitcoin/10 rounded-xl overflow-hidden"
              >
                <div className="w-full aspect-[16/9] bg-zinc-800" />
                <div className="p-5 space-y-4">
                  <div className="h-4 bg-zinc-700 rounded w-3/4" />
                  <div className="h-3 bg-zinc-700 rounded w-1/2" />
                  <div className="h-3 bg-zinc-700 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-full bg-red-500/10 mb-4">
              <AlertCircleIcon />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              Unable to Load Blog Posts
            </h3>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-bitcoin/10 rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-bitcoin/10 mb-4">
              <EmptyFileIcon />
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
                      className={`size-2 rounded-full transition-all duration-300 ${
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

            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="size-full bg-zinc-800 flex items-center justify-center">
            <EmptyImageIcon />
          </div>
        )}
      </Link>

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-400">
            <span className="text-bitcoin font-semibold">
              {post.primary_tag ? post.primary_tag.name : "Bitcoin"}
            </span>{" "}
            • {formatDate(post.published_at)}
          </span>

          <div className="flex items-center text-xs text-gray-500">
            <Clock className="size-3 mr-1" />
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
          <div className="size-8 rounded-full overflow-hidden bg-zinc-800 mr-3 flex-shrink-0">
            {post.primary_author.profile_image ? (
              <Image
                src={post.primary_author.profile_image || "/placeholder.svg"}
                alt={post.primary_author.name}
                width={32}
                height={32}
                className="object-cover"
              />
            ) : (
              <div className="size-full bg-bitcoin/20 flex items-center justify-center text-bitcoin">
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

"use client";

import { useGetBlogs } from "@/hooks/useGetBlogs";
import Link from "next/link";
import Image from 'next/image'
import { useTranslations } from "next-intl";
import { getStrapiMedia } from "@/libs/utils";

export default function Home() {
  const t = useTranslations();
  const { data: blogsList, isLoading: isBlogsLoading } = useGetBlogs();

  return (
    <main
      id="main-content"
      className="w-full flex-auto"
      role="main"
      aria-label="Blog posts"
    >
      {/* Page Header Section */}
      <header className="mx-auto max-w-4xl px-[24px] lg:px-[32px] mt-36 sm:mt-32 lg:mt-40">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div
            style={{ transform: "none", opacity: 1 }}
            className="animate-fade-in"
            data-animate="opacity: 1; transform: none;"
          >
            <h1 className="mb-6">
              <span
                className="block font-display text-base font-semibold text-dark"
                aria-label="Current section"
              >
                Blog
              </span>
              <span className="sr-only"> - </span>
              <span
                className="mt-6 block max-w-5xl font-display text-5xl font-bold tracking-tight text-dark [text-wrap:balance] sm:text-6xl"
                id="page-title"
              >
                {t("Blog.title")}
              </span>
            </h1>
            <div
              className="mt-6 max-w-4xl text-xl text-dark"
              role="doc-subtitle"
              aria-describedby="page-title"
            >
              <p>{t("Blog.description")}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Posts Section */}
      <section
        className="mx-auto max-w-4xl px-[24px] lg:px-[32px] mt-24 sm:mt-32 lg:mt-40"
        aria-labelledby="blog-posts-heading"
      >
        <h2 id="blog-posts-heading" className="sr-only">
          Recent Blog Posts
        </h2>

        <div className="mx-auto max-w-2xl lg:max-w-none">
          {isBlogsLoading ? (
            <div
              className="flex justify-center items-center py-12"
              role="status"
              aria-live="polite"
              aria-label="Loading blog posts"
            >
              <p className="text-gray-600 font-medium">
                <span aria-hidden="true">Loading blogs...</span>
                <span className="sr-only">Please wait while blog posts are being loaded</span>
              </p>
            </div>
          ) : (
            <div className="space-y-24 lg:space-y-32">
              {blogsList?.data?.length === 0 ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="text-center py-12"
                >
                  <p className="text-gray-600 font-medium">No blog posts found.</p>
                </div>
              ) : (
                blogsList?.data?.map((blog, index) => (
                  <article
                    key={blog.slug}
                    style={{ opacity: 1, transform: "none" }}
                    aria-labelledby={`blog-title-${blog.slug}`}
                    aria-describedby={`blog-description-${blog.slug}`}
                    className="relative"
                  >
                    <div className="pt-16 relative before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                      <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                        <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                          <header>
                            <h3
                              id={`blog-title-${blog.slug}`}
                              className="font-display font-stretch-125% text-2xl font-bold text-dark"
                            >
                              <Link
                                href={`/blog/${blog.slug}`}
                                className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                                aria-describedby={`blog-meta-${blog.slug}`}
                              >
                                {blog.title}
                              </Link>
                            </h3>
                          </header>

                          {/* Blog Metadata */}
                          <aside
                            id={`blog-meta-${blog.slug}`}
                            className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4"
                            aria-label={`Blog post metadata for ${blog.title}`}
                          >
                            <dl>
                              <dt className="sr-only">Published date</dt>
                              <dd className="absolute left-0 top-0 text-sm text-dark lg:static">
                                <time
                                  dateTime={blog.publishedAt}
                                  aria-label={`Published on ${new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                  })}`}
                                >
                                  {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                  })}
                                </time>
                              </dd>

                              <dt className="sr-only">Author information</dt>
                              <dd className="mt-6 flex gap-x-4">
                                <div
                                  className="flex-none overflow-hidden rounded-xl bg-neutral-100"
                                  role="img"
                                  aria-label={`Profile picture of ${blog.author.fullName || 'Unknown author'}`}
                                >
                                  <Image
                                    width={48}
                                    height={48}
                                    className="h-12 w-12 object-cover"
                                    src={getStrapiMedia(blog.author.image.url)}
                                    alt={`${blog.author.fullName || 'Author'} profile picture`}
                                    loading={index < 2 ? "eager" : "lazy"}
                                  />
                                </div>
                                <div className="text-sm text-dark">
                                  <div
                                    className="font-semibold"
                                    aria-label="Author name"
                                  >
                                    {blog.author.fullName || 'Unknown Author'}
                                  </div>
                                  <div
                                    className="text-gray-600"
                                    aria-label="Author bio"
                                  >
                                    {blog.author.bio || "No bio available"}
                                  </div>
                                </div>
                              </dd>
                            </dl>
                          </aside>

                          {/* Blog Description */}
                          <p
                            id={`blog-description-${blog.slug}`}
                            className="mt-6 max-w-2xl text-base text-dark"
                            aria-label="Blog post summary"
                          >
                            {blog.description}
                          </p>

                          {/* Read More Link */}
                          <div className="mt-8">
                            <Link
                              href={`/blog/${blog.slug}`}
                              className="inline-flex rounded-full px-4 py-2 text-md font-extrabold transition bg-dark text-white hover:bg-dark/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              aria-label={`Read more about ${blog.title}`}
                            >
                              <span className="relative top-px">
                                {t("Blog.readMore")}
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
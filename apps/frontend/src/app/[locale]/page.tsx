/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetBlogs } from "@/hooks/useGetBlogs";
import Link from "next/link";
import Image from 'next/image'
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  const { data: blogsList, isLoading: isBlogsLoading } = useGetBlogs();
  return (

    <main id="main-content" className="w-full flex-auto">
      <div className="mx-auto max-w-4xl px-[24px] lg:px-[32px] mt-36 sm:mt-32 lg:mt-40">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div style={{ transform: "none", opacity: 1 }} className="animate-fade-in" data-animate="opacity: 1; transform: none;">
            <h1>
              <span className="block font-display text-base font-semibold text-dark">Blog</span>
              <span className="sr-only"> - </span>
              <span className="mt-6 block max-w-5xl font-display text-5xl font-bold tracking-tight text-dark [text-wrap:balance] sm:text-6xl">{t("Blog.title")}</span>
            </h1>
            <div className="mt-6 max-w-4xl text-xl text-dark"><p>{t("Blog.description")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-[24px] lg:px-[32px] mt-24 sm:mt-32 lg:mt-40">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="space-y-24 lg:space-y-32">
            {isBlogsLoading ? (
              <div className="flex justify-center items-center py-12">
                <p className="text-gray-600 font-medium">Loading blogs...</p>
              </div>
            ) : (blogsList?.data?.map((blog) => (
              <div style={{ opacity: 1, transform: "none" }} key={blog.slug}>
                <article>
                  <div className="pt-16 relative before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                    <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                      <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                        <h2 className="font-display font-stretch-125% text-2xl font-bold text-dark">
                          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                        </h2>
                        <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                          <dt className="sr-only">Published</dt>
                          <dd className="absolute left-0 top-0 text-sm text-dark lg:static">
                            <time dateTime={blog.publishedAt}>{new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                          </dd><dt className="sr-only">Author</dt>
                          <dd className="mt-6 flex gap-x-4">
                            <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                              {/* <img alt={`${blog.author.fullName ?? '-'} profile picture`} loading="lazy" width="1024" height="1024" decoding="async" data-nimg="1" className="h-12 w-12 object-cover" style={{ color: "transparent" }} src={`http://localhost:1337${blog.featuredImage.url as string}`}>
                                </img> */}
                              <Image width={48} height={48} className="h-12 object-cover" src={blog.author.image.url} alt={blog.title} />
                            </div>
                            <div className="text-sm text-dark">
                              <div className="font-semibold">{blog.author.fullName ?? '-'}</div>
                              <div>{blog.author.bio ?? "-"}</div>
                            </div>
                          </dd>
                        </dl>
                        <p className="mt-6 max-w-2xl text-base text-dark">{blog.description}</p>
                        <a className="mt-8 inline-flex rounded-full px-4 py-2 text-md font-extrabold transition bg-dark text-white hover:bg-dark/90" aria-label={`${blog.title}`} href={`/blog/${blog.slug}`}>
                          <span className="relative top-px">{t("Blog.readMore")}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )))}


          </div>
        </div>

      </div>
    </main >

  );
}

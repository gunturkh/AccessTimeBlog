/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetBlogBySlug } from "@/hooks/useGetBlogBySlug";
import { useParams } from "next/navigation";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getStrapiMedia } from "@/libs/utils";
import Link from "next/link";
import { useGetBlogs } from "@/hooks/useGetBlogs";
import { useTranslations } from "next-intl";

const BlogDetails = () => {
    const params = useParams();
    const t = useTranslations();
    const { slug } = params;

    const { data: blogDetails, isLoading: isBlogsLoading } = useGetBlogBySlug(
        slug as string
    );
    const { data: blogLists, isLoading: isBlogsListLoading } = useGetBlogs();

    if (isBlogsLoading) {
        return (
            <main
                id="main-content"
                className="w-full flex-auto"
                role="main"
                aria-label="Loading blog post"
            >
                <div
                    className="flex justify-center items-center min-h-[50vh]"
                    role="status"
                    aria-live="polite"
                    aria-label="Loading blog post content"
                >
                    <div className="text-center">
                        <p className="text-gray-600 font-medium text-lg">
                            <span aria-hidden="true">Loading blog post...</span>
                            <span className="sr-only">
                                Please wait while the blog post content is being loaded
                            </span>
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    if (!blogDetails) {
        return (
            <main
                id="main-content"
                className="w-full flex-auto"
                role="main"
                aria-label="Blog post not found"
            >
                <div
                    className="flex justify-center items-center min-h-[50vh]"
                    role="status"
                    aria-live="polite"
                >
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            Blog Post Not Found
                        </h1>
                        <p className="text-gray-600">
                            The requested blog post could not be found.
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    // Format publication date for screen readers
    const formattedDate = new Date(
        blogDetails.publishedAt || ""
    ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const authorName = blogDetails.author?.fullName || "Unknown Author";
    const authorBio = blogDetails.author?.bio || "";

    // Filter out current blog from related articles
    const relatedBlogs =
        blogLists?.data?.filter((blog) => blog.slug !== slug) || [];

    return (
        <main
            id="main-content"
            className="w-full flex-auto"
            role="main"
            aria-labelledby="article-title"
        >
            <article
                className="mx-auto max-w-4xl px-[24px] lg:px-[32px] mt-36 sm:mt-32 lg:mt-40"
                itemScope
                itemType="https://schema.org/BlogPosting"
                aria-labelledby="article-title"
                aria-describedby="article-meta"
            >
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div style={{ opacity: 1, transform: "none" }}>
                        <header className="mx-auto flex max-w-5xl flex-col text-center">
                            <h1
                                id="article-title"
                                className="mt-6 font-display text-3xl xs:text-5xl font-bold tracking-tight text-dark [text-wrap:balance] sm:text-6xl"
                                itemProp="headline"
                            >
                                {blogDetails.title}
                            </h1>

                            <div
                                id="article-meta"
                                className="mt-4"
                                role="complementary"
                                aria-label="Article metadata"
                            >
                                <time
                                    dateTime={blogDetails.publishedAt}
                                    className="order-first text-md font-bold text-dark block"
                                    itemProp="datePublished"
                                    aria-label={`Published on ${formattedDate}`}
                                >
                                    {formattedDate}
                                </time>

                                <div
                                    className="mt-6 text-md font-extrabold text-dark"
                                    itemScope
                                    itemType="https://schema.org/Person"
                                    itemProp="author"
                                    aria-label="Author information"
                                >
                                    <span itemProp="name" aria-label="Author name">
                                        {authorName}
                                    </span>
                                    {authorBio && (
                                        <>
                                            <span aria-hidden="true">, </span>
                                            <span
                                                itemProp="description"
                                                aria-label="Author bio"
                                                className="font-normal"
                                            >
                                                {authorBio}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </header>
                    </div>

                    <div
                        className="[&>*]:mx-auto text-dark [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0 mt-16 sm:mt-24 lg:mt-32"
                        role="main"
                        aria-label="Article content"
                    >
                        {blogDetails.featuredImage?.url && (
                            <figure
                                className="mt-8"
                                role="img"
                                aria-labelledby="featured-image-caption"
                            >
                                <Image
                                    width={1024}
                                    height={1024}
                                    className="h-[300px] w-full object-cover rounded-lg"
                                    src={getStrapiMedia(blogDetails.featuredImage.url)}
                                    alt={
                                        blogDetails.featuredImage.alternativeText ||
                                        `Featured image for ${blogDetails.title}`
                                    }
                                    itemProp="image"
                                    priority
                                />
                                <figcaption id="featured-image-caption" className="sr-only">
                                    Featured image for article: {blogDetails.title}
                                </figcaption>
                            </figure>
                        )}

                        <div
                            className="prose prose-lg max-w-none"
                            itemProp="articleBody"
                            role="article"
                            aria-label="Article content"
                        >
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    h1(props) {
                                        return (
                                            <h2
                                                className="text-4xl font-extrabold my-8 scroll-mt-20"
                                                id={`heading-${props.children?.toString().toLowerCase().replace(/\s+/g, "-")}`}
                                                tabIndex={-1}
                                                {...props}
                                            />
                                        );
                                    },
                                    h2(props) {
                                        return (
                                            <h3
                                                className="text-3xl font-extrabold my-6 scroll-mt-20"
                                                id={`heading-${props.children?.toString().toLowerCase().replace(/\s+/g, "-")}`}
                                                tabIndex={-1}
                                                {...props}
                                            />
                                        );
                                    },
                                    h3(props) {
                                        return (
                                            <h4
                                                className="text-2xl font-bold my-4 scroll-mt-20"
                                                id={`heading-${props.children?.toString().toLowerCase().replace(/\s+/g, "-")}`}
                                                tabIndex={-1}
                                                {...props}
                                            />
                                        );
                                    },
                                    strong(props) {
                                        return (
                                            <strong className="text-dark font-extrabold" {...props} />
                                        );
                                    },
                                    b(props) {
                                        return (
                                            <strong className="text-dark font-extrabold" {...props} />
                                        );
                                    },
                                    em(props) {
                                        return <em className="text-dark italic" {...props} />;
                                    },
                                    blockquote(props) {
                                        return (
                                            <blockquote
                                                className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-6 bg-gray-50 py-4 rounded-r"
                                                role="note"
                                                aria-label="Quote"
                                                {...props}
                                            >
                                                {props.children}
                                            </blockquote>
                                        );
                                    },
                                    p(props) {
                                        return (
                                            <p className="my-4 leading-relaxed" {...props}>
                                                {props.children}
                                            </p>
                                        );
                                    },
                                    ul(props) {
                                        return (
                                            <ul
                                                className="list-disc list-inside my-4 space-y-2 ml-4"
                                                role="list"
                                                {...props}
                                            >
                                                {props.children}
                                            </ul>
                                        );
                                    },
                                    ol(props) {
                                        return (
                                            <ol
                                                className="list-decimal list-inside my-4 space-y-2 ml-4"
                                                role="list"
                                                {...props}
                                            >
                                                {props.children}
                                            </ol>
                                        );
                                    },
                                    li(props) {
                                        return (
                                            <li className="my-1" role="listitem" {...props}>
                                                {props.children}
                                            </li>
                                        );
                                    },
                                    a(props) {
                                        return (
                                            <a
                                                className="text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                                                target={
                                                    props.href?.startsWith("http") ? "_blank" : undefined
                                                }
                                                rel={
                                                    props.href?.startsWith("http")
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                                aria-label={
                                                    props.href?.startsWith("http")
                                                        ? `${props.children} (opens in new tab)`
                                                        : undefined
                                                }
                                                {...props}
                                            >
                                                {props.children}
                                            </a>
                                        );
                                    },
                                    img(props) {
                                        return (
                                            <figure className="my-8">
                                                <img
                                                    className="w-full h-auto rounded-lg"
                                                    loading="lazy"
                                                    {...props}
                                                    alt={props.alt || "Image"}
                                                />
                                                {props.alt && (
                                                    <figcaption className="text-sm text-gray-600 mt-2 text-center italic">
                                                        {props.alt}
                                                    </figcaption>
                                                )}
                                            </figure>
                                        );
                                    },
                                    code(props) {
                                        const { children, className } = props;
                                        const isInline = !className;

                                        if (isInline) {
                                            return (
                                                <code
                                                    className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            );
                                        }

                                        return (
                                            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                                                <code
                                                    className="text-sm font-mono"
                                                    role="code"
                                                    aria-label="Code block"
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            </pre>
                                        );
                                    },
                                    table(props) {
                                        return (
                                            <div className="overflow-x-auto my-6">
                                                <table
                                                    className="min-w-full border-collapse border border-gray-300"
                                                    role="table"
                                                    {...props}
                                                >
                                                    {props.children}
                                                </table>
                                            </div>
                                        );
                                    },
                                    th(props) {
                                        return (
                                            <th
                                                className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left"
                                                role="columnheader"
                                                scope="col"
                                                {...props}
                                            >
                                                {props.children}
                                            </th>
                                        );
                                    },
                                    td(props) {
                                        return (
                                            <td
                                                className="border border-gray-300 px-4 py-2"
                                                role="cell"
                                                {...props}
                                            >
                                                {props.children}
                                            </td>
                                        );
                                    },
                                }}
                            >
                                {blogDetails.content || "No content available."}
                            </Markdown>
                        </div>
                    </div>
                </div>
            </article>

            {/* More Articles Section */}
            <section
                className="relative pt-24 sm:pt-32 lg:pt-40 mt-24 sm:mt-32 lg:mt-40"
                aria-labelledby="more-articles-heading"
            >
                <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b via-50% from-lightGray">
                    <svg
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full fill-neutral-50/50 stroke-dark/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
                    >
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#:R1kvffanba:)"
                            strokeWidth="0"
                        />
                        <svg x="50%" y="-270" strokeWidth="0" className="overflow-visible">
                            <path
                                transform="translate(64 160)"
                                d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
                            />
                            <path
                                transform="translate(128 320)"
                                d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
                            />
                            <path
                                transform="translate(288 480)"
                                d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
                            />
                            <path
                                transform="translate(512 320)"
                                d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
                            />
                            <path
                                transform="translate(544 640)"
                                d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
                            />
                            <path
                                transform="translate(320 800)"
                                d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
                            />
                        </svg>
                        <defs>
                            <pattern
                                id=":R1kvffanba:"
                                width="96"
                                height="480"
                                x="50%"
                                patternUnits="userSpaceOnUse"
                                patternTransform="translate(0 -270)"
                                fill="none"
                            >
                                <path d="M128 0 98.572 147.138A16 16 0 0 1 82.883 160H13.117a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-45.117 320H-116M64-160 34.572-12.862A16 16 0 0 1 18.883 0h-69.766a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-109.117 160H-180M192 160l-29.428 147.138A15.999 15.999 0 0 1 146.883 320H77.117a16 16 0 0 0-15.69 12.862L34.573 467.138A16 16 0 0 1 18.883 480H-52M-136 480h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1-18.883 320h69.766a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 109.117 160H192M-72 640h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 45.117 480h69.766a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A15.999 15.999 0 0 1 173.117 320H256M-200 320h58.883a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A16 16 0 0 1-82.883 160h69.766a16 16 0 0 0 15.69-12.862L29.427 12.862A16 16 0 0 1 45.117 0H128" />
                            </pattern>
                        </defs>
                    </svg>
                </div>

                <header className="mx-auto max-w-7xl px-[24px] lg:px-[32px]">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div
                            className="max-w-2xl"
                            style={{ opacity: 1, transform: "none" }}
                        >
                            <h2 id="more-articles-heading">
                                <span className="block font-display tracking-tight [text-wrap:balance] text-2xl font-bold text-dark">
                                    {t("Blog.moreArticles")}
                                </span>
                            </h2>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-7xl px-[24px] lg:px-[32px] mt-16">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        {isBlogsListLoading ? (
                            <div
                                className="flex justify-center items-center py-12"
                                role="status"
                                aria-live="polite"
                                aria-label="Loading more blog posts"
                            >
                                <p className="text-gray-600 font-medium">
                                    <span aria-hidden="true">{t("Blog.loading")}</span>
                                    <span className="sr-only">{t("Blog.pleaseWait")}</span>
                                </p>
                            </div>
                        ) : relatedBlogs.length === 0 ? (
                            <div
                                role="status"
                                aria-live="polite"
                                className="text-center py-12"
                                aria-label="No more blog posts available"
                            >
                                <p className="text-gray-600 font-medium">
                                    No more blog posts found.
                                    {t("Blog.noBlogFound")}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                                {relatedBlogs.slice(0, 6).map((blog) => (
                                    <div
                                        key={blog.slug}
                                        style={{ opacity: 1, transform: "none" }}
                                    >
                                        <article
                                            aria-labelledby={`related-blog-title-${blog.slug}`}
                                            aria-describedby={`related-blog-description-${blog.slug}`}
                                        >
                                            <div className="relative flex flex-col items-start pl-8 before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px">
                                                <header>
                                                    <time
                                                        dateTime={blog.publishedAt}
                                                        className="order-first text-sm text-dark block"
                                                        aria-label={`Published on ${new Date(
                                                            blog.publishedAt || ""
                                                        ).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}`}
                                                    >
                                                        {new Date(
                                                            blog.publishedAt || ""
                                                        ).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}
                                                    </time>
                                                    <h3
                                                        id={`related-blog-title-${blog.slug}`}
                                                        className="mt-6 text-base font-semibold text-dark"
                                                    >
                                                        <Link
                                                            href={`/blog/${blog.slug}`}
                                                            className="hover:underline font-extrabold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                                                        >
                                                            {blog.title}
                                                        </Link>
                                                    </h3>
                                                </header>

                                                <p
                                                    id={`related-blog-description-${blog.slug}`}
                                                    className="mt-2.5 text-base text-dark"
                                                >
                                                    {blog.description || "No description available."}
                                                </p>

                                                <Link
                                                    href={`/blog/${blog.slug}`}
                                                    className="mt-6 flex gap-x-3 text-base font-semibold text-dark transition hover:text-dark/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                                                    aria-label={`Read more about ${blog.title}`}
                                                >
                                                    <span>{t("Blog.readMore")}</span>
                                                    <svg
                                                        viewBox="0 0 24 6"
                                                        aria-hidden="true"
                                                        className="w-6 flex-none fill-current"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M24 3 18 .5v2H0v1h18v2L24 3Z"
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mx-auto max-w-7xl px-[24px] lg:px-[32px] mt-24 sm:mt-32 lg:mt-40">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div
                            className="-mx-6 bg-dark px-6 py-20 sm:mx-0 sm:rounded-4xl sm:py-32 md:px-12"
                            style={{ opacity: 1, transform: "none" }}
                        >
                            <div className="mx-auto max-w-4xl">
                                <div className="max-w-xl">
                                    <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
                                        {t("Blog.tellUs")}
                                    </h2>
                                    <p className="mt-2 text-lg font-medium text-white">
                                        {t("Blog.letsExplore")}
                                    </p>
                                    <div className="mt-6 flex">
                                        <a
                                            className="inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition bg-white text-dark hover:bg-neutral-200"
                                            href="/contact"
                                        >
                                            <span className="relative top-px">{t("Footer.contactUs")}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BlogDetails;

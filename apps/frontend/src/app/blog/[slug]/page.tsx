'use client'
import { useGetBlogBySlug } from "@/hooks/useGetBlogBySlug";
import { useParams } from 'next/navigation';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const BlogDetails = () => {
    const params = useParams();
    const { slug } = params;
    console.log("🚀 ~ BlogDetails ~ slug:", slug)

    const { data: blogDetails, isLoading: isBlogsLoading } = useGetBlogBySlug(slug as string);
    console.log("🚀 ~ BlogDetails ~ blogDetails:", blogDetails)

    if (isBlogsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main id="main-content" className="w-full flex-auto">
            <article className="mx-auto max-w-4xl px-[24px] lg:px-[32px] mt-24 sm:mt-32 lg:mt-40">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div style={{ opacity: 1, transform: "none" }}>
                        <header className="mx-auto flex max-w-5xl flex-col text-center">
                            <h1 className="mt-6 font-display text-3xl xs:text-5xl font-bold tracking-tight text-dark [text-wrap:balance] sm:text-6xl">
                                {blogDetails?.title}
                            </h1>
                            <time dateTime="2025-08-15" className="order-first text-sm text-dark">
                                {new Date(blogDetails?.publishedAt || "").toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                            <p className="mt-6 text-sm font-semibold text-dark">
                                {/* by Prasaja Mukti, Accessibility UX Writer */}
                                {`${blogDetails?.author?.fullName},` || ""} {blogDetails?.author?.bio ? ` ${blogDetails.author.bio}` : ""}
                            </p>
                        </header>
                    </div>
                    <div className="[&>*]:mx-auto text-dark [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0 mt-16 sm:mt-24 lg:mt-32">
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                h2(props) {
                                    return <h2 className="text-4xl font-extrabold my-8" {...props} />;
                                },
                                b(props) {
                                    return <strong className="text-dark font-extrabold" >{props.children}</strong>;
                                },
                                em(props) {
                                    return <em className="text-dark italic" {...props} />;
                                },
                                blockquote(props) {
                                    return (
                                        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700" {...props}>
                                            {props.children}
                                        </blockquote>
                                    );
                                },
                                p(props) {
                                    return (
                                        <p className="my-4" {...props}>
                                            {props.children}
                                        </p>
                                    );
                                }
                            }}
                        >
                            {blogDetails?.content || "No content available."}
                        </Markdown>
                    </div>
                </div>
            </article>
        </main>
    );
}

export default BlogDetails;
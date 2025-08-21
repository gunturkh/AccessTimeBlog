'use client'
import { useGetBlogBySlug } from "@/hooks/useGetBlogBySlug";
import { useParams } from 'next/navigation';

export default function BlogDetails() {
    const params = useParams();
    const { slug } = params;
    console.log("🚀 ~ BlogDetails ~ slug:", slug)
    const { data: blogsList, isLoading: isBlogsLoading } = useGetBlogBySlug(slug as string);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {isBlogsLoading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                blogsList?.data && (
                    <article className="prose lg:prose-xl">
                        <h1>{blogsList.data.title}</h1>
                        <img
                            src={`http://localhost:1337${blogsList.data.featuredImage.url}`}
                            alt={blogsList.data.title}
                            className="w-full h-auto rounded-lg mb-4"
                        />
                        <div dangerouslySetInnerHTML={{ __html: blogsList.data.content }} />
                    </article>
                )
            )}
        </div>

    )
};
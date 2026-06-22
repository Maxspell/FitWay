import { Metadata } from "next";
import { getAuthors } from "@/services/author.service";
import AuthorBox from "@/components/common/AuthorBox";

export const metadata: Metadata = {
  title: "FitWay Authors & Experts | Certified Fitness Professionals",
  description: "Meet the certified personal trainers, nutrition experts, and sports professionals who create and review FitWay's premium fitness content.",
  alternates: {
    canonical: "/authors",
  },
};

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <main className="min-h-screen bg-[#0F1720] text-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Our Experts</h1>
          <p className="text-xl text-gray-400">
            Meet the certified personal trainers, nutritionists, and health professionals who write, create, and review FitWay's evidence-based content.
          </p>
        </div>

        {authors.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No authors found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {authors.map((author) => (
              <AuthorBox key={author.documentId || author.id} author={author} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

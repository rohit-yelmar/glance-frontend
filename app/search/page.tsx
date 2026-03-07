"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { SearchResponse, SearchResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Loading from "./loading";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setIsLoading(false);
      return;
    }

    async function performSearch() {
      setIsLoading(true);
      setError(null);

      try {
        // const response = await fetch("http://localhost:8000/search", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     query,
        //     limit: 10,
        //   }),
        // });

        // if (!response.ok) {
        //   throw new Error("Search failed");
        // }
        await new Promise((resolve) => setTimeout(resolve, 4000));
        // const data: SearchResponse = await response.json();
        const dummyData: SearchResult[] = [
          {
            product_id: 17048614,
            name: "Khushal K Women Black Ethnic Motifs Printed Kurta with Palazzos & With Dupatta",
            price: 5099,
            image_url:
              "http://assets.myntassets.com/assets/images/17048614/2022/2/4/b0eb9426-adf2-4802-a6b3-5dbacbc5f2511643971561167KhushalKWomenBlackEthnicMotifsAngrakhaBeadsandStonesKurtawit7.jpg",
            confidence_score: 0.95,
          },
          {
            product_id: 16524740,
            name: "InWeave Women Orange Solid Kurta with Palazzos & Floral Print Dupatta",
            price: 5899,
            image_url:
              "http://assets.myntassets.com/assets/images/16524740/2021/12/29/17ab2ac8-2e60-422d-9d20-2527415932361640754214931-STRAPPY-SET-IN-ORANGE-WITH-ORGANZA-DUPATTA-5961640754214349-2.jpg",
            confidence_score: 0.88,
          },
          {
            product_id: 16331376,
            name: "Anubhutee Women Navy Blue Ethnic Motifs Embroidered Thread Work Kurta with Trousers & With Dupatta",
            price: 4899,
            image_url:
              "http://assets.myntassets.com/assets/images/16331376/2021/12/2/b8c4f90f-683c-48d2-b8ac-19891a87c0651638428628378KurtaSets1.jpg",
            confidence_score: 0.92,
          },
        ];
        setResults(dummyData);
        // setResults(data.results);
      } catch (err) {
        setError(
          "Unable to connect to search service. Please make sure the backend is running.",
        );
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    performSearch();
  }, [query]);

  if (!query) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Enter a search query to find products</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-black">Search Error</h2>
        <p className="text-gray-500 max-w-md mx-auto">{error}</p>
        <Link href="/">
          <Button className="rounded-full mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center mt-7 justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-black"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-black">Search Results</h1>
            <p className="text-gray-500 text-sm">
              {results.length} results for "
              <span className="font-medium text-black">{query}</span>"
            </p>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
          {results.map((result) => (
            <ProductCard
              key={result.product_id}
              product={result}
              confidenceScore={result.confidence_score}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-black">No results found</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any products matching "{query}". Try using
            different keywords or browse our featured products.
          </p>
          <Link href="/">
            <Button className="rounded-full mt-4 bg-black hover:bg-black/90">
              Browse All Products
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
            <div>
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-32 mt-2 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}

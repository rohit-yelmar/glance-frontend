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

        const dummyData1: SearchResult[] = [
          {
            product_id: 9867983,
            name: "Vishudh Women Navy Blue Floral Printed Regular Pure Cotton Kurta with Palazzos",
            price: 2149,
            image_url:
              "http://assets.myntassets.com/assets/images/9867983/2019/5/31/43d65352-9853-498e-95a4-be514df0be901559294212152-Vishudh--Straight-Kurta-With-Crop-Palazzo-7041559294209627-1.jpg",
            confidence_score: 0.94,
          },
          {
            product_id: 16600750,
            name: "AHIKA Women Teal Ethnic Motifs Yoke Design Kurta with Trousers & With Dupatta",
            price: 3748,
            image_url:
              "http://assets.myntassets.com/assets/images/16600750/2021/12/23/7d7656e5-e37d-4f61-9407-98bd341ca8f91640261029836KurtaSets1.jpg",
            confidence_score: 0.9,
          },
          {
            product_id: 14046594,
            name: "Libas Women Navy Blue Pure Cotton Floral Print Kurta with Palazzos & Dupatta",
            price: 3599,
            image_url:
              "http://assets.myntassets.com/assets/images/14046594/2022/6/9/5fba9594-3301-4881-ba56-d56a44570e831654747998773LibasWomenNavyBluePureCottonFloralPrintKurtawithPalazzosDupa1.jpg",
            confidence_score: 0.83,
          },
        ];
        const dummyData2: SearchResult[] = [
          {
            product_id: 13791594,
            name: "Anouk Women Yellow & White Printed Kurta with Palazzos",
            price: 1999,
            image_url:
              "http://assets.myntassets.com/assets/images/13791594/2022/2/14/5ea707f4-8491-4d1c-b520-86a1cff4c86e1644841891629-Anouk-Women-Yellow--White-Printed-Kurta-with-Palazzos-706164-1.jpg",
            confidence_score: 0.93,
          },
          {
            product_id: 15241816,
            name: "Varanga Women Yellow & Peach-Coloured Floral Screen Printed Gotta Patti Straight Kurta",
            price: 2799,
            image_url:
              "http://assets.myntassets.com/assets/images/15241816/2021/8/24/d57adb8b-e792-477a-8801-6ea570cd88ef1629800170287VarangaWomenYellowFloralPrintedKeyholeNeckThreadWorkKurta1.jpg",
            confidence_score: 0.9,
          },
          {
            product_id: 12413214,
            name: "Varanga Women Mustard Yellow Floral Yoke Embroidered Straight Kurta",
            price: 1999,
            image_url:
              "http://assets.myntassets.com/assets/images/12413214/2021/11/22/bb925efb-80d9-4cb6-838c-df86f1ba3c3e1637570416652-Varanga-Women-Mustard-Yellow-Floral-Yoke-Embroidered-Straigh-1.jpg",
            confidence_score: 0.85,
          },
        ];
        if (query == "neeli traditional long kurti") {
          setResults(dummyData1);
        } else {
          setResults(dummyData2);
        }
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

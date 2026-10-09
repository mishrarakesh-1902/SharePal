import { NextRequest, NextResponse } from "next/server";
import { filterAndSortProducts } from "../../../lib/products";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);
  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "default";

  const allFiltered = filterAndSortProducts({ category, q, sort });
  const total = allFiltered.length;

  const startIndex = (page - 1) * pageSize;
  const paginatedProducts = allFiltered.slice(0, startIndex + pageSize);
  const hasMore = startIndex + pageSize < total;

  return NextResponse.json({
    products: paginatedProducts,
    total,
    page,
    pageSize,
    hasMore,
    category,
    query: q,
    sort,
  });
}

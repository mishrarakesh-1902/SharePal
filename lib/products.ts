import { rawProductsData } from "../data/productsData";
import { Product } from "../types/product";

export function getRawProducts(): Product[] {
  return rawProductsData.products as Product[];
}

export function getDerivedCategory(product: Product): string {
  const name = product.name.toLowerCase();
  if (name.includes("racing wheel") || name.includes("wheel")) {
    return "racing-wheel";
  }
  if (name.includes("gta")) {
    return "gta-6";
  }
  if (name.includes("xbox")) {
    return "xbox-console";
  }
  if (name.includes("vr") || name.includes("oculus") || name.includes("quest")) {
    return "vr";
  }
  if (name.includes("projector") || name.includes("big screen")) {
    return "big-screen-gaming";
  }
  // Default for all other PS5 and games items
  return "ps5-console";
}

export function getOrderedProducts(): Product[] {
  const all = getRawProducts().map((p, idx) => ({
    ...p,
    category: getDerivedCategory(p),
    originalIndex: idx,
  }));

  // Define priority rules
  const getPriority = (item: Product): number => {
    const name = item.name.toLowerCase();

    // 1. PlayStation Portal Remote Player
    if (name.includes("playstation portal") || name.includes("remote player")) {
      return 1;
    }
    // 2. PS5 + FC27 + 1 Controller
    if (name.includes("fc27") && name.includes("1 controller")) {
      return 2;
    }
    // 3. PS5 + FC27 + 2 Controllers
    if (name.includes("fc27") && name.includes("2 controller")) {
      return 3;
    }
    // 4. PS5 + FC27 + 4 Controllers
    if (name.includes("fc27") && name.includes("4 controller")) {
      return 4;
    }
    // 5. PS5 + FC26 + 1 Controller
    if (name.includes("fc26") && name.includes("1 controller")) {
      return 5;
    }
    // 6. PS5 + FC26 + 2 Controllers
    if (name.includes("fc26") && name.includes("2 controller")) {
      return 6;
    }
    // 7. PS5 + FC26 + 4 Controllers
    if (name.includes("fc26") && name.includes("4 controller")) {
      return 7;
    }
    // 8. PS5 + Games (100+) + 1 Controller
    if (name.includes("ps5 + games (100+) + 1 controller") || (name.includes("100+") && name.includes("1 controller") && !name.includes("ea play"))) {
      return 8;
    }
    // 9. Trending items
    if (item.tag === "Trending") {
      return 9;
    }
    // 10. Rest
    return 10;
  };

  return [...all].sort((a, b) => {
    const pA = getPriority(a);
    const pB = getPriority(b);
    if (pA !== pB) {
      return pA - pB;
    }
    return (a.originalIndex ?? 0) - (b.originalIndex ?? 0);
  });
}

export function filterAndSortProducts({
  category = "all",
  q = "",
  sort = "default",
}: {
  category?: string;
  q?: string;
  sort?: string;
}): Product[] {
  let list = getOrderedProducts();

  // Category filter
  if (category && category !== "all") {
    if (category === "ps5-console") {
      // PS5 Console includes all PS5 items, games, and the Portal
      list = list.filter((p) => {
        const cat = getDerivedCategory(p);
        return cat === "ps5-console" || p.name.toLowerCase().includes("ps5") || p.name.toLowerCase().includes("playstation");
      });
    } else if (category === "racing-wheel") {
      list = list.filter((p) => getDerivedCategory(p) === "racing-wheel" || p.name.toLowerCase().includes("wheel"));
    } else if (category === "gta-6") {
      list = list.filter((p) => getDerivedCategory(p) === "gta-6" || p.name.toLowerCase().includes("gta"));
    } else if (category === "xbox-console") {
      list = list.filter((p) => getDerivedCategory(p) === "xbox-console" || p.name.toLowerCase().includes("xbox"));
    } else if (category === "vr") {
      list = list.filter((p) => getDerivedCategory(p) === "vr" || p.name.toLowerCase().includes("vr") || p.name.toLowerCase().includes("quest"));
    } else if (category === "big-screen-gaming") {
      list = list.filter((p) => getDerivedCategory(p) === "big-screen-gaming" || p.name.toLowerCase().includes("projector"));
    } else {
      list = list.filter((p) => getDerivedCategory(p) === category);
    }
  }

  // Search filter
  if (q.trim()) {
    const query = q.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.tag.toLowerCase().includes(query)
    );
  }

  // Sort
  if (sort === "popularity") {
    list = [...list].sort((a, b) => b.booked_count - a.booked_count);
  } else if (sort === "price-low") {
    list = [...list].sort((a, b) => a.per_day_rent - b.per_day_rent);
  } else if (sort === "price-high") {
    list = [...list].sort((a, b) => b.per_day_rent - a.per_day_rent);
  } else if (sort === "rating") {
    list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return list;
}

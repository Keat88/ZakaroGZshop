import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import localProducts from "../data/products.js";

const DataContext = createContext(null);
const API_URL = "https://fakestoreapi.noksha.dev/api/products";

const inferCategory = (name = "") => {
  const n = name.toLowerCase();
  if (/(phone|iphone|galaxy|pixel|ipad|tablet|fold)/.test(n)) return "Mobile";
  if (/(macbook|laptop|monitor|keyboard|mouse|computer|xps|rog)/.test(n)) return "Computing";
  if (/(headphone|airpods|speaker|jbl|audio|boombox)/.test(n)) return "Audio";
  if (/(camera|drone|gopro|watch|vr|quest|playstation|nintendo|switch|gaming)/.test(n)) return "Lifestyle";
  if (/(car|truck|bike|scooter|vespa|rivian|tesla|porsche|hyundai|audi|yamaha|rad|segway)/.test(n)) return "Mobility";
  return "Electronics";
};

const normalize = (item, index) => {
  const id = item?.id ?? item?.product_id ?? `local-${index}`;
  const priceRaw = typeof item?.price === "number" ? item.price : Number(String(item?.price ?? "").replace(/[^0-9.]/g, ""));
  const name = item?.name || item?.title || "Untitled Product";
  return {
    id: String(id),
    name,
    price: Number.isFinite(priceRaw) ? priceRaw : 0,
    image: item?.image || item?.img || item?.thumbnail || "",
    category: item?.category || item?.catagory || item?.type || inferCategory(name),
    brand: item?.brand || "ZharpRo",
    description: item?.description || "Premium technology crafted for modern living, balancing performance with timeless design.",
    status: item?.status || (item?.isNew ? "new" : ""),
    rating: Number(item?.rating?.rate ?? item?.rating ?? (4.5 + (index % 5) * 0.1)),
    reviews: Number(item?.rating?.count ?? item?.reviews ?? 24 + (index % 30)),
  };
};

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(() => localProducts.map(normalize));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL, { signal, timeout: 10000 });
      const list = Array.isArray(res.data?.data) ? res.data.data : Array.isArray(res.data) ? res.data : [];
      if (list.length) setProducts(list.map(normalize));
    } catch (err) {
      if (axios.isCancel?.(err) || err?.name === "CanceledError" || err?.code === "ERR_CANCELED") return;
      setError("Live catalog unavailable. Showing curated collection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => { await fetchProducts(controller.signal); };
    void load();
    return () => controller.abort();
  }, [fetchProducts]);

  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category).filter(Boolean))], [products]);
  const brands = useMemo(() => ["All", ...new Set(products.map((p) => p.brand).filter(Boolean))], [products]);

  const value = useMemo(() => ({ products, loading, error, categories, brands, fetchProducts }), [products, loading, error, categories, brands, fetchProducts]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

export default DataProvider;

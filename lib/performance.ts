"use client";

import { useEffect, useRef, useState } from "react";

const prefetchCache = new Set<string>();

export async function prefetchProduct(slug: string): Promise<void> {
  if (prefetchCache.has(slug)) return;
  prefetchCache.add(slug);

  try {
    await fetch(`/api/products/${slug}`, {
      method: "GET",
      priority: "low" as RequestPriority,
    });
  } catch {
    prefetchCache.delete(slug);
  }
}

type IntersectionOptions = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
};

export function useIntersectionObserver<T extends Element>(
  options: IntersectionOptions = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isIntersecting];
}

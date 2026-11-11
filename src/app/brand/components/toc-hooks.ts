"use client";

import * as React from "react";

/** Tracks which section is at the top of the viewport. */
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = React.useState(ids[0] ?? "");
  const entriesRef = React.useRef<Record<string, IntersectionObserverEntry>>({});

  React.useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entriesRef.current[entry.target.id] = entry;
        }

        const visible = ids.filter((id) => entriesRef.current[id]?.isIntersecting);
        if (visible.length > 0) {
          setActiveId(
            visible.reduce((top, id) =>
              entriesRef.current[id].boundingClientRect.top <
              entriesRef.current[top].boundingClientRect.top
                ? id
                : top,
            ),
          );
          return;
        }

        // Nothing in the band: pick the last section scrolled past.
        let active = ids[0];
        for (const id of ids) {
          const entry = entriesRef.current[id];
          if (entry && entry.boundingClientRect.top < 0) active = id;
          else break;
        }
        setActiveId(active);
      },
      { rootMargin: "-100px 0px -66% 0px", threshold: 0 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      entriesRef.current = {};
    };
  }, [ids]);

  return activeId;
}

export function scrollToSection(id: string, offset = -100) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: y, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  categoryLabels,
  projectCategories,
  projectEcosystem,
  projectTech,
  type Category,
  type Project,
} from "@/data/projects";
import {
  ecosystemLabels,
  layerLabels,
  tech,
  type Ecosystem,
  type Layer,
} from "@/data/tech";
import { cn } from "@/lib/utils";
import TechIcon from "./tech-icon";
import WorkCard from "./work-card";

const filterLayers: Layer[] = ["frontend", "backend", "database"];

const chip =
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors";
const chipIdle = "border-border bg-background hover:border-primary hover:text-primary";
const chipActive = "border-primary bg-primary text-primary-foreground";

const WorkGallery = ({ projects }: { projects: Project[] }) => {
  const [category, setCategory] = useState<Category | "all">("all");
  const [ecosystem, setEcosystem] = useState<Ecosystem | "all">("all");
  const [techFilter, setTechFilter] = useState<string | null>(null);

  // only offer tabs, ecosystems and chips that match at least one project
  const categories = useMemo(
    () =>
      (Object.keys(categoryLabels) as Category[])
        .map((c) => ({
          id: c,
          count: projects.filter((p) => projectCategories(p).includes(c)).length,
        }))
        .filter((c) => c.count > 0),
    [projects],
  );

  const ecosystems = useMemo(
    () =>
      (Object.keys(ecosystemLabels) as Ecosystem[])
        .map((e) => ({
          id: e,
          count: projects.filter((p) => projectEcosystem(p) === e).length,
        }))
        .filter((e) => e.count > 0),
    [projects],
  );

  const techGroups = useMemo(
    () =>
      filterLayers
        .map((layer) => {
          const counts = new Map<string, number>();
          for (const p of projects)
            for (const t of p.stack[layer] ?? [])
              if (tech[t]?.filterable) counts.set(t, (counts.get(t) ?? 0) + 1);
          return {
            layer,
            items: [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
          };
        })
        .filter((g) => g.items.length > 0),
    [projects],
  );

  const visible = projects.filter(
    (p) =>
      (category === "all" || projectCategories(p).includes(category)) &&
      (ecosystem === "all" || projectEcosystem(p) === ecosystem) &&
      (!techFilter || projectTech(p).includes(techFilter)),
  );

  const filtered = category !== "all" || ecosystem !== "all" || techFilter;
  const reset = () => {
    setCategory("all");
    setEcosystem("all");
    setTechFilter(null);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* category tabs */}
      <div className="-mx-4 overflow-x-auto px-4 pb-1">
        <div className="flex w-max gap-2">
          {[{ id: "all" as const, count: projects.length }, ...categories].map(
            ({ id, count }) => (
              <button
                key={id}
                onClick={() => setCategory(id)}
                className={cn(chip, category === id ? chipActive : chipIdle)}
              >
                {id === "all" ? "All" : categoryLabels[id]}
                <span className="opacity-70">{count}</span>
              </button>
            ),
          )}
        </div>
      </div>

      {/* ecosystem switch + tech chips grouped by layer */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
        {ecosystems.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-24 text-sm font-semibold text-muted-foreground">
              Ecosystem
            </span>
            <div className="inline-flex rounded-full border border-border p-1">
              {[{ id: "all" as const, count: projects.length }, ...ecosystems].map(
                ({ id, count }) => (
                  <button
                    key={id}
                    onClick={() => setEcosystem(id)}
                    className={cn(
                      "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                      ecosystem === id
                        ? "bg-primary text-primary-foreground"
                        : "hover:text-primary",
                    )}
                  >
                    {id === "all" ? "All" : ecosystemLabels[id]}{" "}
                    <span className="opacity-70">{count}</span>
                  </button>
                ),
              )}
            </div>
          </div>
        )}
        {techGroups.map(({ layer, items }) => (
          <div key={layer} className="flex flex-wrap items-center gap-2">
            <span className="w-24 text-sm font-semibold text-muted-foreground">
              {layerLabels[layer]}
            </span>
            {items.map(([name, count]) => {
              const active = techFilter === name;
              return (
                <button
                  key={name}
                  onClick={() => setTechFilter(active ? null : name)}
                  className={cn(chip, "py-1", active ? chipActive : chipIdle)}
                >
                  <TechIcon name={name} className="h-3.5 w-3.5" />
                  {name}
                  <span className="opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {visible.length} of {projects.length} projects
        </span>
        {filtered && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            <X className="h-4 w-4" /> Clear filters
          </button>
        )}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <WorkCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          No projects match these filters yet.{" "}
          <button onClick={reset} className="font-medium text-primary hover:underline">
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
};

export default WorkGallery;

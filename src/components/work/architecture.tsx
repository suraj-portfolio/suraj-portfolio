import { Fragment } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { layerLabels, type Layer } from "@/data/tech";
import TechPill from "./tech-pill";

const flow: Layer[] = ["frontend", "backend", "database"];

/**
 * Request flow built from the project's stack layers:
 * Client → API → Database, with third-party services and hosting beneath.
 */
const Architecture = ({ project }: { project: Project }) => {
  const steps = flow.filter((l) => project.stack[l]?.length);
  const extras = (["services", "infra"] as const).filter(
    (l) => project.stack[l]?.length,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        {steps.map((layer, i) => (
          <Fragment key={layer}>
            {i > 0 && (
              <div className="flex justify-center text-primary">
                <ArrowRight className="hidden h-6 w-6 md:block" />
                <ArrowDown className="h-6 w-6 md:hidden" />
              </div>
            )}
            <div className="flex-1 rounded-xl border-2 border-primary/40 bg-primary/5 p-4">
              <div className="mb-3 text-xs font-bold uppercase tracking-wide text-primary">
                {layerLabels[layer]}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack[layer]!.map((t) => (
                  <TechPill key={t} name={t} />
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      {extras.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2">
          {extras.map((layer) => (
            <div
              key={layer}
              className="rounded-xl border border-dashed border-border p-4"
            >
              <div className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {layerLabels[layer]}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack[layer]!.map((t) => (
                  <TechPill key={t} name={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Architecture;

import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { stackSummary, type Project } from "@/data/projects";
import TechIcon from "./tech-icon";

/** Compact "Next.js → Hono → Appwrite" architecture line. */
const StackLine = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap items-center gap-1.5 text-sm font-medium">
    {stackSummary(project).map((name, i) => (
      <Fragment key={name}>
        {i > 0 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />}
        <span className="inline-flex items-center gap-1">
          <TechIcon name={name} className="h-4 w-4" />
          {name}
        </span>
      </Fragment>
    ))}
  </div>
);

export default StackLine;

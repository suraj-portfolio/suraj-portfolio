import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { categoryLabels, type Project } from "@/data/projects";
import { getProjects } from "@/sanity/projects";
import { cn } from "@/lib/utils";
import Architecture from "./architecture";
import ProjectLinks from "./project-links";
import StackLine from "./stack-line";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="flex flex-col gap-4">
    <h2 className="text-2xl font-bold">{title}</h2>
    {children}
  </section>
);

/**
 * Full project write-up. Rendered as a page at /work/[slug], and inside the
 * modal when a project is opened from /work (intercepted route).
 */
const CaseStudy = async ({
  project,
  inModal = false,
}: {
  project: Project;
  inModal?: boolean;
}) => {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const hasExtras = project.dataModel || project.endpoints || project.challenges;

  return (
    <article className={cn(inModal ? "pb-16 pt-6" : "min-h-screen pb-24 pt-10")}>
      <div
        className={cn(
          "container mx-auto flex flex-col gap-12",
          inModal ? "max-w-7xl" : "max-w-5xl",
        )}
      >
        {!inModal && (
          <Link
            href="/work"
            className="inline-flex w-max items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>
        )}

        {/* In the modal on lg+ this is two columns: the media column (video,
            architecture) stays pinned on the left while the text scrolls.
            Otherwise both columns are `contents`, so their children stack in
            `order`: overview, video, architecture, features, extras. */}
        <div
          className={cn(
            "flex flex-col gap-12",
            inModal &&
              "lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start lg:gap-10",
          )}
        >
          <div
            className={cn(
              "contents",
              inModal && "lg:sticky lg:top-6 lg:flex lg:flex-col lg:gap-8",
            )}
          >
            {/* silent looping preview, like the cards */}
            <video
              src={project.videoUrl}
              poster={project.coverUrl}
              autoPlay
              muted
              loop
              playsInline
              className="order-2 aspect-video w-full rounded-2xl border border-border bg-muted shadow-xl"
            />

            <div className="order-3">
              <Section title="Architecture">
                <Architecture project={project} />
              </Section>
            </div>
          </div>

          <div
            className={cn("contents", inModal && "lg:flex lg:flex-col lg:gap-10")}
          >
            <header className="order-1 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold uppercase tracking-wide text-primary">
                  {categoryLabels[project.category]}
                </span>
                {project.tags?.map((t) => (
                  <span key={t} className="text-muted-foreground">
                    · {categoryLabels[t]}
                  </span>
                ))}
                <span className="text-muted-foreground">· {project.year}</span>
              </div>
              <h1 className="h2">{project.title}</h1>
              <p className="max-w-3xl text-lg text-muted-foreground">
                {project.description}
              </p>
              <StackLine project={project} />
              <div className="flex flex-wrap gap-1.5">
                {project.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-medium text-primary"
                  >
                    {h}
                  </span>
                ))}
              </div>
              <ProjectLinks project={project} />
            </header>

            <div className="order-4">
              <Section title="Key features">
                <ul
                  className={cn(
                    "grid gap-3 md:grid-cols-2",
                    inModal && "lg:grid-cols-1",
                  )}
                >
                  {project.features.map((f) => (
                    <li key={f} className="rounded-lg border border-border bg-card p-3">
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>
            </div>

            {hasExtras && (
              <div className="order-5 flex flex-col gap-12 lg:gap-10">
                {project.dataModel && (
                  <Section title="Data model">
                    <div className="grid gap-3 md:grid-cols-2">
                      {project.dataModel.map((m) => (
                        <div
                          key={m.name}
                          className="rounded-lg border border-border bg-card p-4"
                        >
                          <div className="font-mono font-semibold">{m.name}</div>
                          <div className="mt-1 font-mono text-sm text-muted-foreground">
                            {m.fields}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {project.endpoints && (
                  <Section title="API endpoints">
                    <div className="overflow-x-auto rounded-lg border border-border">
                      <table className="w-full text-sm">
                        <tbody>
                          {project.endpoints.map((e) => (
                            <tr
                              key={e.method + e.path}
                              className="border-b border-border last:border-0"
                            >
                              <td className="p-3 font-mono font-semibold text-primary">
                                {e.method}
                              </td>
                              <td className="p-3 font-mono">{e.path}</td>
                              <td className="p-3 text-muted-foreground">
                                {e.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Section>
                )}

                {project.challenges && (
                  <Section title="Challenges & learnings">
                    <ul className="list-disc space-y-2 pl-5">
                      {project.challenges.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </Section>
                )}
              </div>
            )}
          </div>
        </div>

        {/* prev / next; in the modal these replace the history entry so
            closing the modal still returns straight to /work */}
        <nav className="grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          <Link
            href={`/work/${prev.slug}`}
            replace={inModal}
            className="rounded-xl border border-border p-4 hover:border-primary"
          >
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <ArrowLeft className="h-4 w-4" /> Previous
            </div>
            <div className="font-semibold">{prev.title}</div>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            replace={inModal}
            className="rounded-xl border border-border p-4 text-right hover:border-primary"
          >
            <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
              Next <ArrowRight className="h-4 w-4" />
            </div>
            <div className="font-semibold">{next.title}</div>
          </Link>
        </nav>
      </div>
    </article>
  );
};

export default CaseStudy;

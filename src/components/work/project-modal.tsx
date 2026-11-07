"use client";

import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Maximize2, X } from "lucide-react";
import { DialogOverlay } from "@/components/ui/dialog";
import type { Project } from "@/data/projects";

/**
 * Full-page sheet for an intercepted /work/[slug] route. Closing goes back in
 * history, which returns to /work with its scroll position and filters intact.
 */
const ProjectModal = ({
  project,
  children,
}: {
  project: Pick<Project, "slug" | "title">;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && router.back()}>
      <DialogPrimitive.Portal>
        <DialogOverlay className="bg-black/70 backdrop-blur-sm" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-background shadow-2xl duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-8 data-[state=open]:fade-in-0 sm:inset-6 sm:rounded-2xl sm:border sm:border-border"
        >
          {/* toolbar */}
          <div className="flex items-center justify-between gap-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:px-6">
            <DialogPrimitive.Title className="truncate font-semibold">
              {project.title}
            </DialogPrimitive.Title>
            <div className="flex shrink-0 items-center gap-1">
              {/* plain <a>: a full load renders the standalone page, not the modal */}
              <a
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Maximize2 className="h-4 w-4" />
                <span className="hidden sm:inline">Open full page</span>
              </a>
              <DialogPrimitive.Close className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ProjectModal;

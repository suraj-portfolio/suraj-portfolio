/** `modal` is the @modal slot: a project opened from /work renders there. */
const WorkLayout = ({ children, modal }: LayoutProps<"/work">) => (
  <>
    {children}
    {modal}
  </>
);

export default WorkLayout;

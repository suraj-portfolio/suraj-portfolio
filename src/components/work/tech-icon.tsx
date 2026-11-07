import { createElement } from "react";
import { techIcon } from "@/data/tech";

/** Brand icon for a tech name; renders nothing for techs without one. */
const TechIcon = ({ name, className }: { name: string; className?: string }) => {
  const icon = techIcon(name);
  return icon ? createElement(icon, { className }) : null;
};

export default TechIcon;

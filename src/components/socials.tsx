"use client";

import { RiLinkedinFill, RiGithubFill } from "react-icons/ri";

import Link from "next/link";

const icons = [
  // {
  //   path: "/",
  //   name: <RiYoutubeFill />,
  // },
  {
    path: "https://www.linkedin.com/in/suraj-patil-5487719a/",
    name: <RiLinkedinFill />,
  },
  {
    path: "https://github.com/suraj1294",
    name: <RiGithubFill />,
  },
  // {
  //   path: "/",
  //   name: <RiFacebookFill />,
  // },
  // {
  //   path: "/",
  //   name: <RiInstagramFill />,
  // },
];

const Socials = ({
  containerStyles,
  iconsStyles,
}: {
  containerStyles: string;
  iconsStyles: string;
}) => {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, index) => {
        return (
          <Link href={icon.path} key={index}>
            <div className={`${iconsStyles}`}>{icon.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;

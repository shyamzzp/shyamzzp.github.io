import React from "react";
import skype from "./../../../src/img/skype.png";
import whatsapp from "./../../../src/img/whatsapp.png";
import linkedin from "./../../../src/img/linkedin.png";
import stackoverflow from "./../../../src/img/stack-overflow.png";
import github from "./../../../src/img/github.png";
import discord from "./../../../src/img/discord.svg";
import leetcode from "./../../../src/img/leetcode.svg";
import email from "./../../../src/img/email.svg";
import x from "./../../../src/img/x.svg";
import huggingface from "./../../../src/img/huggingface.svg";

const links = [
  {
    href: "https://join.skype.com/invite/vS8AjAHY3sZx",
    img: skype,
    label: "Skype",
  },
  {
    href: "https://api.whatsapp.com/send?phone=9501891381",
    img: whatsapp,
    label: "WhatsApp",
  },
  {
    href: "https://www.linkedin.com/in/shyamzzp/",
    img: linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/shyamzzp",
    img: github,
    label: "GitHub",
  },
  {
    href: "https://stackoverflow.com/users/5853122/shyamzzp",
    img: stackoverflow,
    label: "Stack Overflow",
  },
  {
    href: "https://discord.com/users/shyamzzp",
    img: discord,
    label: "Discord",
  },
  {
    href: "https://leetcode.com/u/shyamzzp/",
    img: leetcode,
    label: "LeetCode",
  },
  {
    href: "mailto:shyam22.co@gmail.com",
    img: email,
    label: "Email",
  },
  {
    href: "https://x.com/shyamzzp",
    img: x,
    label: "X",
  },
  {
    href: "https://huggingface.co/shyamzzp",
    img: huggingface,
    label: "Hugging Face",
  },
];

export default function SocialMedia() {
  return (
    <div className="social-media">
      <div className="social-media-icons">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
          >
            <img src={link.img} alt={link.label} width="25" />
            <span className="social-media-label">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

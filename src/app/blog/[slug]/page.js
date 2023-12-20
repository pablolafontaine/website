import styles from "../../blog.module.css";
import fs from "fs";
import matter from "gray-matter";

import rangeParser from "parse-numeric-range";
import SyntaxHighlighter from "../../../components/SyntaxHighlighter";

import Divider from "@mui/material/Divider";
export default async function Post({ params }) {
  const post = await getPost(params.slug);

  const { slug, frontmatter, content, caption, readLength } = post;
  return (
    <>
      <main>
        <div className="container relative mx-auto px-8 sm:px-32 md:px-48 lg:px-64 xl:px-96 pt-16 pb-8">
          <p className="text-4xl">{frontmatter.title}</p>
          <p className="mt-2 opacity-50">
            Pablo Lafontaine
            {" • "}
            {frontmatter.date}
            {" • "}
            {readLength} minute read
          </p>
          <Divider className="mt-2 w-75" />
        </div>

        <SyntaxHighlighter content={content} />
      </main>
    </>
  );
}

async function getPost(slug) {
  const fileName = fs.readFileSync(`src/components/posts/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);

  const caption = content
    .substr(0, content.indexOf("&nbsp;"))
    .replace(/\*/g, "");
  let readLength = (content.split(" ").length / 125).toFixed(0);
  if (readLength < 1) {
    readLength = 1;
  }

  return {
    slug,
    frontmatter,
    content,
    caption,
    readLength,
  };
}

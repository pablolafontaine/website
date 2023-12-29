import styles from "../../blog.module.css";
import { notFound } from "next/navigation";
import fs from "fs";
import SyntaxHighlighter from "../../../components/SyntaxHighlighter";
import Divider from "@mui/material/Divider";
import path from "path";
import matter from "gray-matter";

async function getPost(fileName) {

    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(path.join(process.cwd(), `/src/app/posts/${fileName}.md`));
    const { data: frontmatter, content } = matter(readFile);
    const caption = content.substr(0, 200).replace(/\*/g, "").concat("...");
    let readLength = (content.split(" ").length / 125).toFixed(0);
    if (readLength < 1) {
      readLength = 1;
    }
    return {
      slug,
      frontmatter,
      readLength,
      content,
      caption,
    };
}


export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  const { slug, frontmatter, readLength,content, caption } = post;
  const { title, date } = frontmatter;
  return(
	  <>
        <p className="text-4xl">{frontmatter.title}</p>
        <p className="mt-2 opacity-50">
          Pablo Lafontaine
          {" • "}
          {frontmatter.date}
          {" • "}
          {readLength} minute read
        </p>
        <Divider className="mt-2 mb-6 w-75" />
	<SyntaxHighlighter content={content} />
	  </>
  );
}


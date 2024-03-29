import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";

async function getPosts() {
  const files = fs.readdirSync(path.join(process.cwd(), `/src/app/posts/`));

  const posts = files.map((fileName) => {
    if (fileName.includes(".md")) {
      const slug = fileName.replace(".md", "");
      const readFile = fs.readFileSync(
        path.join(process.cwd(), `/src/app/posts/${fileName}`),
      );
      const { data: frontmatter, content } = matter(readFile);
      const caption = content
        .substring(0, 199)
        .replace(/\*/g, "")
        .concat("...");
      let readLength = (content.split(" ").length / 125).toFixed(0);
      if (readLength < 1) {
        readLength = 1;
      }
      return {
        slug,
        frontmatter,
        readLength,
        caption,
      };
    }
  });
  return posts;
}

export default async function Posts() {
  const posts = await getPosts();
  return (
    <>
      {posts.map((post) => {
        if (post != null) {
          const { slug, frontmatter } = post;
          const { title, date } = frontmatter;
          return (
            <div key={title}>
              <p className="inline text-sm text-gray-500 font-mono">
                {date} {" » "}
              </p>
              <Link href={`/blog/${slug}`}>{title}</Link>
            </div>
          );
        }
      })}
    </>
  );
}

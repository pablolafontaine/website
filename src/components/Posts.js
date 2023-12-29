import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

async function getPosts() {
  const files = fs.readdirSync("src/components/posts/");

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`src/components/posts/${fileName}`);
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
      caption,
    };
  });
  return posts;
}

export default async function Posts() {
  const posts = await getPosts();
  return (
    <>
      {posts.map((post) => {
        const { slug, frontmatter, readLength, caption } = post;
        const { title, date } = frontmatter;
        return (
          <div key={title}>
            <p className="inline text-sm text-gray-500 font-mono">
              {date} {" » "}
            </p>
            <Link href={`/blog/${slug}`}>{title}</Link>
          </div>
        );
      })}
    </>
  );
}

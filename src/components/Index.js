import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import fs from "fs";
import matter from "gray-matter";
import Divider from "@mui/material/Divider";
import styled from "styled-components";

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

export default async function Index() {
  const posts = await getPosts();
  return (
    <div className="flex min-h-screen flex-col items-center p-16 [&>*]:my-2">
      <p className="pb-8 font-bold"> Pablo Lafontaine </p>
      <p>
        {" "}
        <FontAwesomeIcon icon={faEnvelope} /> pablolafontaine1@gmail.com{" "}
      </p>
      <p>
        {" "}
        <FontAwesomeIcon icon={faGithub} /> pablolafontaine{" "}
      </p>
      <p>
        {" "}
        <FontAwesomeIcon icon={faLinkedin} /> pablo-lafontaine
      </p>
      <div className="w-96">
        <Divider />
      </div>
      {posts.map((post) => {
        const { slug, frontmatter, readLength, caption } = post;
        const { title, date } = frontmatter;
        return (
          <div key={title}>
            <p className="inline text-sm text-gray-500 font-mono">
              {date} {" » "}
            </p>
            <a href={`/blog/${slug}`}>{title}</a>
          </div>
        );
      })}
    </div>
  );
}

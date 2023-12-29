import styles from "../../blog.module.css";
import { notFound } from "next/navigation";

import Post from "../../../components/Post";

export default async function BlogPost({ params }) {
  return (
    <>
      <main>
        <Post name={params.slug} /> 
      </main>
    </>
  );
}


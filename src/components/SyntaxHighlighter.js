"use client";

import Giscus from "@giscus/react";
import { Prism } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import rangeParser from "parse-numeric-range";
import { useTheme } from "next-themes";

const Div = styled.div`
  blockquote {
    padding: 0.5em;
    margin-left: 10px;
    margin-top: 10px;
    border-left: 10px solid rgb(225, 225, 230);
    border-radius: 5px;
    background-color: rgb(240, 240, 245);
  }
  ,
  ol {
    padding-left: 1em;
    li::marker {
      font-size: 0.8em;
      color: rgba(0, 0, 0, 0.5);
      content: counter(list-item) "  ";
    }
  }
  ,
  ul {
    padding-left: 2.5em;
    li::marker {
      content: "• ";
    }
  }
  ,
  img {
    margin-bottom: 1em;
  }
  ,
  h1 {
    margin-top: 1em;
    font-weight: bold;
    font-size: 2em;
    line-height: 2em;
  }
  ,
  h2 {
    margin-top: 1em;
    font-weight: bold;
    font-size: 1.8em;
    line-height: 2em;
  }
  ,
  h3 {
    margin-top: 1em;
    font-weight: bold;
    font-size: 1.4em;
    line-height: 2em;
  }
  h4 {
    font-weight: bold;
    font-size: 1.2em;
    line-height: 2em;
  }
  code {
    padding: 0.25em;
    border-radius: 5px;
    background-color: rgb(230, 230, 235);

    font-size: 0.8em;
  }
  ,
  a {
    color: #4582ec;
  }
  a:link {
    text-decoration: none;
  }

  ,
  a:visited {
    text-decoration: none;
  }

  ,
  a:hover {
    text-decoration: underline;
  }

  ,
  a:active {
    text-decoration: none;
  }
`;

export default function SyntaxHighlighter({ content }) {
  const { theme } = useTheme();
  const bgColor = "rgb(240, 240, 245)";
  const syntaxTheme = oneLight;
  const MarkdownComponents = {
    code({ node, className, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const hasMeta = node?.data?.meta;
      const applyHighlights = (applyHighlights) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, "");
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
            : "0";
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data = highlight.includes(applyHighlights) ? "highlight" : null;
          return { data };
        } else {
          return {};
        }
      };
      return match ? (
        <Prism
          style={syntaxTheme}
          language={match[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={false}
          wrapLines={hasMeta ? true : false}
          useInlineStyles={true}
          lineProps={applyHighlights}
          customStyle={{
            fontSize: "0.8em",
            backgroundColor: bgColor,
          }}
          codeTagProps={{
            style: {
              padding: "0em",
              fontSize: "inherit",
              backgroundColor: "inherit",
            },
          }}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      );
    },
  };

  return (
    <Div>
      <ReactMarkdown components={MarkdownComponents}>{content}</ReactMarkdown>
      <Giscus
        id="comments"
        repo="pablolafontaine/website"
        repoId="R_kgDOK70mLA"
        category="Announcements"
        categoryId="DIC_kwDOK70mLM4Cb5N8"
        mapping="title"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme == "dark" ? "noborder_dark" : "noborder_light"}
        lang="en"
        loading="lazy"
        crossOrigin="anonymous"
        async
      />
    </Div>
  );
}

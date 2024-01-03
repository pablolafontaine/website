import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Divider from "@mui/material/Divider";
import styled from "styled-components";
import Posts from "../components/Posts";

export default async function Index() {
  return (
    <>
      <p className="text-4xl pb-2"> Pablo Lafontaine </p>
      <div className="inline text-sm font-mono italic">
        <a className="!text-gray-500" href="mailto:pablolafontaine1@gmail.com">
          email
        </a>{" "}
        <a className="!text-gray-500" href="https://github.com/pablolafontaine">
          github
        </a>{" "}
        <a
          className="!text-gray-500"
          href="https://linkedin.com/in/pablo-lafontaine"
        >
          linkedin
        </a>
      </div>
      <main className="py-2">
        <p>welcome to my site and blog! <br />
	  currently, i{"'"}m a 4th year computer science student. here, you can find blog posts where i{"'"}ll mainly focus on rust, golang, unix, vim, and projects i{"'"}m working on. i{"'"}ll also be using it to talk about other interests i have, such as video games, books, and general life stuff.<br />
	  previously, i{"'"}ve been a part of the mlh fellowship program; working with castle finance on their solana-powered web3 vaults. i{"'"}ve also worked as a teaching assistant at my university.</p>

      </main>
      <Divider className="py-2" />
      <p className="text-2xl pb-2 pt-2"> Posts </p>
      <Posts />
    </>
  );
}

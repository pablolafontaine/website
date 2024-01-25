import Posts from "../components/Posts";
import Song from "../components/Song";
import { Divider } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <p className="text-2xl pb-2 font-semibold"> Pablo Lafontaine </p>
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
        <p>
          welcome to my site and blog! <br />
          currently, i{"'"}m a 4th year computer science student. here, you can
          find blog posts where i{"'"}ll mainly focus on rust, golang, unix,
          vim, and projects i{"'"}m working on. i{"'"}ll also be using it to
          talk about other interests i have, such as video games, books, and
          general life stuff.
          <br />
          previously, i{"'"}ve been a part of the mlh fellowship program;
          working with castle finance on their solana-powered web3 vaults. i
          {"'"}ve also been a teaching assistant at my university.
        </p>
      </main>
      <div className="w-full mt-4">
        <Song />
      </div>
      <Divider className="pt-2" borderColor={"gray"} />
      <p className="text-2xl pb-2 pt-2 font-semibold"> Posts </p>
      <Posts />
    </>
  );
}

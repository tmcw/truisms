import Head from "next/head";
import Link from "next/link";
import truisms from "../truisms.json";

export default () => (
  <div>
    <Head>
      <title>Truisms</title>
    </Head>
    <div className="fw5 f1 pa3 ttu futura vh-100 v-mid w-100 flex justify-center items-center">
      <div>Truisms</div>
    </div>
    {truisms.map((tru, i) => (
      <Link key={i} href={`/truism?i=${i}`}>
        <a
          className={`db no-underline ph3 pv3 ttu f3 lh-title futura ${
            i % 2 ? "white bg-black" : "white bg-mid-gray"
          }`}
        >
          {tru}
        </a>
      </Link>
    ))}
  </div>
);

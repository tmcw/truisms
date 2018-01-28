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
        <div className="ph4 pv6 ttu f3 lh-title futura bt b--white">{tru}</div>
      </Link>
    ))}
  </div>
);

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Gallery · Privy Auth</title>
      </Head>

      <main className="flex flex-col min-h-screen relative min-w-screen bg-privy-light-blue p-10">
        <div className="flex flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-privurple">Gallery</h1>
          </div>
          <div className="flex gap-3 items-center justify-center">
            <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
              <a href="https://docs.privy.io" target="_blank" rel="noreferrer">
                Docs
              </a>
            </p>
            <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
              <Link href="/">Home</Link>
            </p>
          </div>
        </div>
        <div className="flex gap-10">
          <p className="mt-4">
            You can customize the Privy Modal to fit your websites design and logo, making users
            feel right at home.
          </p>
          <Image
            src="/arrow-down-right.png"
            alt="top down arrow, go check out the gallery!"
          />
              width="152px"
              height="106px"
        </div>
        <div className="flex -sm:flex-col justify-evenly gap-10 mt-10">
          <Image src="/decent.png" height="620px" width="360px" alt="Decent.xyz example" />
          <Image src="/lighthouse.png" height="619px" width="359px" alt="Lightouse.world example" />
          <Image
            src="/privy-example.png"
            height="620px"
            width="360px"
            alt="Privy console example"
          />
        </div>
      </main>
    </>
  );
}

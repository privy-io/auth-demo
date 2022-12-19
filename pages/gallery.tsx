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
        <div className="flex gap-10 pr-10">
          <p className="mt-4">
            You can customize the Privy Modal to fit your websites design and logo, making users
            feel right at home.
          </p>
          <div className="-sm:hidden">
            <Image
              src="/arrow-down-right.png"
              width="152px"
              height="106px"
              alt="top down arrow, go check out the gallery!"
            />
          </div>
        </div>
        <div className="flex -sm:flex-col justify-evenly gap-10 mt-10 -sm:max-w-[360px] max-w-full -sm:mx-auto mx-0">
          <Image
            src="/gallery_dollhouse.png"
            height="620px"
            width="360px"
            alt="Dollhouse example"
          />
          <Image src="/gallery_abbey.png" height="619px" width="359px" alt="Abbey Road example" />
          <Image
            src="/gallery_submarine.png"
            height="620px"
            width="360px"
            alt="Yellow Submarine example"
          />
        </div>
      </main>
    </>
  );
}

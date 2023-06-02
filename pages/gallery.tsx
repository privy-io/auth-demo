import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Gallery · Privy</title>
      </Head>

      <main className="min-w-screen relative flex min-h-screen flex-col bg-privy-light-blue p-10">
        <div className="flex flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Gallery</h1>
          </div>
          <div className="flex items-center justify-center gap-3">
            <p className="text-privurple underline hover:cursor-pointer hover:text-privurpleaccent">
              <a href="https://docs.privy.io" target="_blank" rel="noreferrer">
                Docs
              </a>
            </p>
            <p className="text-privurple underline hover:cursor-pointer hover:text-privurpleaccent">
              <Link href="/">Home</Link>
            </p>
          </div>
        </div>
        <div className="flex gap-10 pr-10">
          <p className="mt-4">
            You can customize the Privy Modal to fit your websites design and logo, making users
            feel right at home.
          </p>
          <div className="hidden lg:block">
            <Image
              src="/arrow-down-right.png"
              width={152}
              height={106}
              alt="top down arrow, go check out the gallery!"
            />
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[360px] flex-col justify-evenly gap-10 lg:mx-0 lg:max-w-full lg:flex-row">
          <Image src="/gallery_dollhouse.png" height={576} width={360} alt="Dollhouse example" />
          <Image src="/gallery_abbey.png" height={576} width={360} alt="Abbey Road example" />
          <Image
            src="/gallery_submarine.png"
            height={576}
            width={360}
            alt="Yellow Submarine example"
          />
        </div>
      </main>
    </>
  );
}

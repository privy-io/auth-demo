import Image from 'next/image';
import Head from 'next/head';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Gallery · Privy Auth</title>
      </Head>

      <main className="flex min-h-screen min-w-full bg-privy-light-blue justify-center p-10">
        <div className="flex flex-col">
          <h1 className="text-4xl font-semibold text-slate-800">Gallery</h1>
          <div className="flex gap-10">
            <p className="mt-4">
              You can customize the Privy Modal to fit your websites design and logo, making users
              feel right at home.
            </p>
            <Image
              src="/arrow-down-right.png"
              width="235px"
              height="106px"
              alt="top down arrow, go check out the gallery!"
            />
          </div>
          <div className="flex justify-evenly gap-10 mt-10">
            <Image src="/decent.png" height="620px" width="360px" alt="Decent.xyz example" />
            <Image
              src="/lighthouse.png"
              height="619px"
              width="359px"
              alt="Lightouse.world example"
            />
            <Image
              src="/privy-example.png"
              height="620px"
              width="360px"
              alt="Privy console example"
            />
          </div>
        </div>
      </main>
    </>
  );
}

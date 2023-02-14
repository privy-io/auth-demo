import BlobbyIcon from './blobby-icon';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-privy-light-blue text-xl">
      <div className="animate-wiggle">
        <BlobbyIcon size={42} />
      </div>
      <p className="text-slate-900">Loading...</p>
    </div>
  );
}

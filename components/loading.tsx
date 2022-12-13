import BlobbyIcon from './blobby-icon';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-xl bg-privy-light-blue">
      <div className="animate-wiggle">
        <BlobbyIcon size={42} />
      </div>
      <p className="text-gray-900">Loading...</p>
    </div>
  );
}

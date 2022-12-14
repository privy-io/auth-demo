type Props = {
  size?: number;
};

export default function BlobbyIconFull({size}: Props) {
  size = size || 96;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 15C2 7.74236 6.2449 2 12 2C17.7551 2 22 7.74236 22 15C22 16.3787 21.7198 17.5545 21.1606 18.5313C20.5991 19.512 19.792 20.2298 18.8388 20.744C16.9772 21.7484 14.511 22 12 22C9.48905 22 7.02283 21.7484 5.16123 20.744C4.20799 20.2298 3.40086 19.512 2.83942 18.5313C2.28022 17.5545 2 16.3787 2 15ZM11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10V14C9 14.5523 9.44772 15 10 15C10.5523 15 11 14.5523 11 14V10ZM15 10C15 9.44772 14.5523 9 14 9C13.4477 9 13 9.44772 13 10V14C13 14.5523 13.4477 15 14 15C14.5523 15 15 14.5523 15 14V10Z"
        fill="black"
      />
    </svg>
  );
}

type Props = {
  size?: number;
};

export default function BlobbyIcon({size}: Props) {
  size = size || 96;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 96 96`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48 16C31.2559 16 16 33.2661 16 60C16 64.4261 16.8939 67.6936 18.3004 70.1505C19.6981 72.5918 21.7416 74.4779 24.4434 75.9355C30.0264 78.9476 38.1616 80 48 80C57.8384 80 65.9736 78.9476 71.5566 75.9355C74.2584 74.4779 76.3019 72.5918 77.6996 70.1505C79.1061 67.6936 80 64.4261 80 60C80 33.2661 64.7441 16 48 16ZM8 60C8 30.9694 24.9796 8 48 8C71.0204 8 88 30.9694 88 60C88 65.515 86.8791 70.2181 84.6423 74.1252C82.3966 78.0478 79.168 80.9191 75.3551 82.9762C67.9087 86.9936 58.0438 88 48 88C37.9562 88 28.0913 86.9936 20.6449 82.9762C16.832 80.9191 13.6034 78.0478 11.3577 74.1252C9.12086 70.2181 8 65.515 8 60Z"
        fill="currentColor"
      />
      <path
        d="M40 36C42.2091 36 44 37.7909 44 40V56C44 58.2091 42.2091 60 40 60C37.7909 60 36 58.2091 36 56V40C36 37.7909 37.7909 36 40 36Z"
        fill="currentColor"
      />
      <path
        d="M56 36C58.2091 36 60 37.7909 60 40V56C60 58.2091 58.2091 60 56 60C53.7909 60 52 58.2091 52 56V40C52 37.7909 53.7909 36 56 36Z"
        fill="currentColor"
      />
    </svg>
  );
}

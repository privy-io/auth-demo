export default function TikTokIcon({
  className,
  height = 24,
  width = 24,
}: {
  className?: string;
  height?: number;
  width?: number;
}) {
  return (
    <svg viewBox="-1 -1 26 26" width={width} height={height}>
      className={className}
      <path
        fill="#26f4ee"
        d="M 16.179688 0 C 16.566406 3.300781 18.546875 5.628906 21.742188 5.832031 L 21.742188 8.964844 L 21.722656 8.964844 L 21.722656 6.308594 C 18.523438 6.101562 16.683594 4.132812 16.300781 0.832031 L 12.910156 0.832031 L 12.910156 14.714844 C 13.398438 20.964844 8.53125 21.152344 6.667969 18.78125 C 8.851562 20.148438 12.398438 19.261719 11.980469 13.882812 L 11.980469 0 Z M 7.078125 23.015625 C 5.164062 22.621094 3.421875 21.476562 2.398438 19.804688 C -0.0859375 15.742188 2.15625 9.117188 9.359375 8.4375 L 9.359375 12.347656 L 9.347656 12.351562 L 9.347656 9.414062 C 2.667969 10.480469 1.996094 17.652344 3.847656 20.636719 C 4.558594 21.789062 5.730469 22.597656 7.078125 23.015625 Z M 7.078125 23.015625 "
      />
      <path
        fill="#fb2c53"
        d="M 17.152344 0.835938 C 17.402344 2.988281 18.277344 4.820312 19.738281 5.894531 C 17.757812 5.128906 16.597656 3.378906 16.300781 0.835938 Z M 21.722656 6.773438 C 21.996094 6.828125 22.28125 6.867188 22.574219 6.886719 L 22.574219 10.597656 C 20.71875 10.78125 19.097656 10.167969 17.203125 9.03125 L 17.496094 15.386719 C 17.496094 17.433594 17.503906 18.371094 16.402344 20.257812 C 13.9375 24.484375 9.496094 24.820312 6.492188 22.804688 C 10.417969 24.425781 16.363281 22.460938 16.351562 15.386719 L 16.351562 8.449219 C 18.242188 9.589844 19.867188 10.199219 21.722656 10.015625 Z M 9.347656 9.453125 C 9.734375 9.371094 10.140625 9.3125 10.570312 9.269531 L 10.570312 13.183594 C 9.011719 13.441406 8.019531 13.917969 7.554688 14.804688 C 6.097656 17.59375 7.976562 19.808594 10.078125 20.140625 C 7.632812 20.546875 4.769531 18.070312 6.476562 14.804688 C 6.941406 13.917969 7.785156 13.441406 9.347656 13.183594 Z M 13.988281 0.832031 L 14.121094 0.832031 Z M 13.988281 0.832031 "
      />
      <path
        fill="currentColor"
        d="M 16.296875 0.832031 C 16.683594 4.132812 18.523438 6.101562 21.722656 6.308594 L 21.722656 10.015625 C 19.867188 10.199219 18.242188 9.589844 16.351562 8.449219 L 16.351562 15.386719 C 16.367188 24.4375 6.628906 25.125 3.847656 20.636719 C 1.996094 17.652344 2.667969 10.480469 9.347656 9.414062 L 9.347656 13.183594 C 7.785156 13.441406 6.941406 13.917969 6.476562 14.804688 C 3.613281 20.28125 13.601562 23.535156 12.910156 14.714844 L 12.910156 0.832031 Z M 16.296875 0.832031 "
      />
    </svg>
  );
}
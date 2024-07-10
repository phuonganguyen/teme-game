import Image from "next/image";

type Props = {
  width?: number;
  height?: number;
};

export const IconCopy = ({ width = 16, height = 16 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M6 11.9999C5.63333 11.9999 5.31955 11.8695 5.05867 11.6086C4.79778 11.3477 4.66711 11.0337 4.66667 10.6666V2.66659C4.66667 2.29992 4.79733 1.98614 5.05867 1.72525C5.32 1.46436 5.63378 1.3337 6 1.33325H12C12.3667 1.33325 12.6807 1.46392 12.942 1.72525C13.2033 1.98659 13.3338 2.30036 13.3333 2.66659V10.6666C13.3333 11.0333 13.2029 11.3473 12.942 11.6086C12.6811 11.8699 12.3671 12.0004 12 11.9999H6ZM6 10.6666H12V2.66659H6V10.6666ZM3.33333 14.6666C2.96667 14.6666 2.65289 14.5361 2.392 14.2753C2.13111 14.0144 2.00044 13.7004 2 13.3333V3.99992H3.33333V13.3333H10.6667V14.6666H3.33333Z"
      fill="white"
    />
  </svg>
);

export const IconArrow = ({ width = 16, height = 16 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 17"
    fill="none"
  >
    <path
      d="M8.39967 8.5L5.33301 5.43333L6.26634 4.5L10.2663 8.5L6.26634 12.5L5.33301 11.5667L8.39967 8.5Z"
      fill="#59D2F9"
    />
  </svg>
);

export const IconArrowUp = ({ width = 16, height = 16 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 17 17"
    fill="none"
  >
    <path
      d="M7.56795 12.9653V7.51533L5.16795 9.89867L4.23462 8.96533L8.23462 4.96533L12.2346 8.96533L11.3013 9.89867L8.90129 7.51533V12.9653H7.56795Z"
      fill="white"
    />
  </svg>
);

export const IconCalendar = ({ width = 32, height = 32 }: Props) => (
  <Image
    src={"/images/icons/calendar.png"}
    width={width}
    height={height}
    alt=""
  />
);

export const IconTelegram = ({ width = 32, height = 32 }: Props) => (
  <Image
    src={"/images/icons/Icon_TELE.png"}
    width={width}
    height={height}
    alt=""
  />
);

export const IconWeb = ({ width = 32, height = 32 }: Props) => (
  <Image
    src={"/images/icons/Icon_web.png"}
    width={width}
    height={height}
    alt=""
  />
);

export const IconX = ({ width = 32, height = 32 }: Props) => (
  <Image
    src={"/images/icons/Icon_X.png"}
    width={width}
    height={height}
    alt=""
  />
);

export const IconYoutube = ({ width = 32, height = 32 }: Props) => (
  <Image
    src={"/images/icons/Icon_Youtube.png"}
    width={width}
    height={height}
    alt=""
  />
);

export const IconFriends = ({ width = 32, height = 32 }: Props) => (
  <Image
    src={"/images/icons/friend.png"}
    width={width}
    height={height}
    alt=""
  />
);

export const IconCoin = ({ width = 40, height = 40 }: Props) => (
  <Image src={"/images/coins.png"} width={width} height={height} alt="" />
);

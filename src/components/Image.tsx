import type { FC } from "react";
import NextImage from "next/image";
import type { ImageProps } from "next/image";

const Image: FC<ImageProps> = ({ quality, ...props }) => (
  <NextImage {...props} quality={quality ?? 100} />
);

export default Image;

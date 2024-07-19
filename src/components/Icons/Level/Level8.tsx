import Image from '@/components/Image';

import { IconProps } from '../type';

export default function IconLevel8({ width = 80, height = 80 }: IconProps) {
  return (
    <Image
      src={"/icons/level8.png"}
      width={width}
      height={height}
      alt="level8"
    />
  );
}

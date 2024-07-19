import Image from '@/components/Image';

import { IconProps } from '../type';

export default function IconLevel7({ width = 80, height = 80 }: IconProps) {
  return (
    <Image
      src={"/icons/level7.png"}
      width={width}
      height={height}
      alt="level7"
    />
  );
}

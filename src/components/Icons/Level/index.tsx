import Image from '@/components/Image';

import { IconProps } from '../type';

type Props = {
  level: number;
} & IconProps;

export default function IconLevel({ level, width = 80, height = 80 }: Props) {
  return (
    <Image
      src={`/images/icons/level${level}.png`}
      width={width}
      height={height}
      alt="level"
    />
  );
}

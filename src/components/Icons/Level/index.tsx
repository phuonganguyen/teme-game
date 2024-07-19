import { IconProps } from '../type';
import IconLevel1 from './Level1';
import IconLevel2 from './Level2';
import IconLevel3 from './Level3';
import IconLevel4 from './Level4';
import IconLevel5 from './Level5';
import IconLevel6 from './Level6';
import IconLevel7 from './Level7';
import IconLevel8 from './Level8';
import IconLevel9 from './Level9';

type Props = {
  level: number;
} & IconProps;

export default function IconLevel({ level, width = 80, height = 80 }: Props) {
  switch (level) {
    case 1:
      return <IconLevel1 {...{ width, height }} />;
    case 2:
      return <IconLevel2 {...{ width, height }} />;
    case 3:
      return <IconLevel3 {...{ width, height }} />;
    case 4:
      return <IconLevel4 {...{ width, height }} />;
    case 5:
      return <IconLevel5 {...{ width, height }} />;
    case 6:
      return <IconLevel6 {...{ width, height }} />;
    case 7:
      return <IconLevel7 {...{ width, height }} />;
    case 8:
      return <IconLevel8 {...{ width, height }} />;
    case 9:
      return <IconLevel9 {...{ width, height }} />;
  }
}

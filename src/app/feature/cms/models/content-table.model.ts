import { OptionInterface } from '@core/interfaces';
import { TableValueType } from '@app/core/types';
import { ContentDataValueType } from '@core/enums';
import { Content } from './interfaces/content.interface';

export const ContentHeaders: OptionInterface<
  keyof Content.Table | 'action' | 'select'
>[] = [
  {
    name: 'Title',
    value: 'title'
  },
  {
    name: 'Image',
    value: 'image'
  },
  {
    name: 'Action',
    value: 'action'
  }
];

export const ContentUniqueTableValue: OptionInterface<TableValueType>[] = [
  {
    name: 'image',
    value: ContentDataValueType.IMAGE
  }
];

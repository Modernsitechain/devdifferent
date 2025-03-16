import { MediaInterface } from '@core/interfaces';

export namespace Content {
  export interface Base {
    _id: string;
    title: string;
    image: MediaInterface;
    createdAt?: string;
    __v?: number;
  }

  export interface Table {
    _id: string;
    title: string;
    image: string;
  }

  export interface FormContentCreate {
    title: string;
    image: MediaInterface;
  }

  export interface FormContentUpdate extends Base {}
  export interface FormContentDelete extends Base {}
}

import { MediaInterface } from '@core/interfaces';

export namespace Content {
  export interface Base {
    id: string;
    title: string;
    image: MediaInterface;
  }

  export interface FormContentCreate {
    title: string;
    image: MediaInterface;
  }

  export interface FormContentUpdate extends Base {}
  export interface FormContentDelete extends Base {}
  export interface Table extends Base {}
}

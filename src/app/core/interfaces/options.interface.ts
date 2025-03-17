import { IconName } from "@shared/components";

export interface OptionInterface<T = unknown> {
  name: string;
  value: T;
  translate?: boolean;
  country?: string;
  icon?: IconName;
}

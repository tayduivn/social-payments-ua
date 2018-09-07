import { WindowProvider } from './window-provider';

export const providers = [
  {
    provide: WindowProvider,
    useValue: window
  }
];

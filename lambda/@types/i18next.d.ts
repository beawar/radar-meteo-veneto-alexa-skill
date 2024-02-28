import 'i18next';
import { languageStrings } from '../src/i18n/localisation'
import { DefaultNamespace } from 'i18next';

declare module 'i18next' {
    interface CustomTypeOptions {
      resources: typeof languageStrings.it;
      returnsObject: true;
      namespace: DefaultNamespace;
    }
  }
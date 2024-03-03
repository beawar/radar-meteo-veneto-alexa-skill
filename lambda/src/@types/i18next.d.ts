import "i18next";
import type { I18N_NS_DEFAULT } from "../constants";
import type { languageStrings } from "../i18n/localisation";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      [I18N_NS_DEFAULT]: typeof languageStrings.it.translation;
    };
    // other
    returnObjects: true;
    returnNUll: false;
  }
}

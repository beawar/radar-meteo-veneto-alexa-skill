import type { RequestInterceptor } from "ask-sdk-core";
import { getLocale as getLocaleAsk } from "ask-sdk-core";
import * as i18n from "i18next";
import { languageStrings } from "../i18n/localisation";
// This request interceptor will bind a translation function 't' to the handlerInput
// Additionally it will handle picking a random value if instead of a string it receives an array
export const LocalisationRequestInterceptor: RequestInterceptor = {
  process(handlerInput): void {
    const getLocale = () => getLocaleAsk(handlerInput.requestEnvelope);
    void i18n.init({
      lng: getLocale(),
      resources: languageStrings,
      returnObjects: true,
    });
    function localise(...args: Parameters<i18n.TFunction>) {
      const value: string | string[] = i18n.t(...args);
      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)] ?? '';
      }
      return value;
    }
    handlerInput.t = localise;
    handlerInput.getLocale = getLocale;
  },
};

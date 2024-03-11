import type { ResponseInterceptor } from "ask-sdk-core";
import { LAST_SPEECH_ATTRIBUTE_KEY } from "../constants";
import type { ui } from "ask-sdk-model";

function getSpeechText(
  outputSpeech: ui.OutputSpeech | undefined,
): string | undefined {
  if (outputSpeech === undefined) {
    return undefined;
  }
  if (outputSpeech.type === "SSML") {
    return outputSpeech.ssml;
  }
  return outputSpeech.text;
}

export const LastSpeechResponseInterceptor: ResponseInterceptor = {
  process: (handlerInput, response): void => {
    const currentAttributes =
      handlerInput.attributesManager.getSessionAttributes();
    handlerInput.attributesManager.setSessionAttributes({
      ...currentAttributes,
      [LAST_SPEECH_ATTRIBUTE_KEY]: getSpeechText(response?.outputSpeech),
    });
  },
};

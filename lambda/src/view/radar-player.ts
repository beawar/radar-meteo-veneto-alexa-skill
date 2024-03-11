import type { HandlerInput } from "ask-sdk-core";
import { APL, ATTRIBUTION } from "../constants";
import { buildDirective, supportsAPL } from "./utils";

export function buildRadarPlayer(handlerInput: HandlerInput, images: string[]) {
  // Add APL directive to response
  if (supportsAPL(handlerInput)) {
    const imagesUrl = images.map((imageSrc) => ({
      url: imageSrc,
    }));

    handlerInput.responseBuilder.addDirective(
      buildDirective(APL.radarPlayer, {
        radarImagesData: {
          type: "object",
          properties: {
            images: imagesUrl,
            attributionName: ATTRIBUTION.name,
            attributionWebsite: ATTRIBUTION.website,
          },
        },
      }),
    );
  } else {
    handlerInput.responseBuilder.speak(
      handlerInput.t("UNSUPPORTED_DEVICE_MSG"),
    );
  }
}

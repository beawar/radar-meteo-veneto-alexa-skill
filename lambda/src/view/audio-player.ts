import type { HandlerInput } from "ask-sdk-core";
import { APL, LOGO_URL, PLAY_BEHAVIOR } from "../constants";
import { buildDirective, supportsAPL } from "./utils";

export interface AudioPlayerData {
  audioSources: string[];
  headerTitle: string;
  primaryText: string;
  secondaryText: string;
  logoSrc?: string;
}

export function buildAudioPlayer(
  handlerInput: HandlerInput,
  {
    audioSources,
    headerTitle,
    primaryText,
    secondaryText,
    logoSrc = LOGO_URL,
  }: AudioPlayerData,
) {
  if (audioSources[0]) {
    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder.addDirective(
        buildDirective(APL.audioPlayer, {
          audioPlayerData: {
            type: "object",
            properties: {
              audioControlType: "jump10",
              audioSources,
              backgroundImage: "",
              headerTitle,
              logoUrl: logoSrc,
              primaryText,
              secondaryText,
              sliderType: "determinate",
            },
          },
        }),
      );
    } else {
      handlerInput.responseBuilder.addAudioPlayerPlayDirective(
        PLAY_BEHAVIOR.replaceAll,
        audioSources[0],
        APL.audioPlayer.token,
        0,
        undefined,
        {
          title: primaryText,
          subtitle: secondaryText,
        },
      );
    }
  }
}

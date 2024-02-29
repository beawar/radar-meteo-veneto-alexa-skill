import { HandlerInput } from "ask-sdk-core";
import { APL, PLAY_BEHAVIOR } from "../constants";
import { buildDirective, supportsAPL } from "./utils";
import assert from "node:assert";

export type AudioPlayerData = {
  audioSources: string[];
  headerTitle: string;
  primaryText: string;
  secondaryText: string;
  coverImageSource?: string;
};

export function buildAudioPlayer(
  handlerInput: HandlerInput,
  { audioSources, headerTitle, primaryText, secondaryText, coverImageSource }: AudioPlayerData
) {
  if (audioSources) {
    assert(audioSources[0])
    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder.addDirective(
        buildDirective(APL.audioPlayer, {
          audioPlayerData: {
            type: "object",
            properties: {
              audioControlType: "jump10",
              audioSources,
              backgroundImage: "",
              coverImageSource,
              headerTitle,
              logoUrl: "https://www.arpa.veneto.it/logo_arpav.gif",
              primaryText,
              secondaryText,
              sliderType: "determinate",
            },
          },
        })
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
          ...(coverImageSource && { art: {
            sources: [{ url: coverImageSource}],
          }} || {})
        }
      );
    }
  }
}
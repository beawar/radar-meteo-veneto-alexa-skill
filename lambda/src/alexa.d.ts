import { HandlerInput } from 'ask-sdk-core';
import { TFunction } from 'i18next';

declare module 'ask-sdk-core' {
    interface HandlerInput {
        t: TFunction;
        getLocale(): string;
    }
}
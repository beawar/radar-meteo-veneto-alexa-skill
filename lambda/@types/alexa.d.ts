import 'ask-sdk-core';
import { TFunction } from 'i18next';

declare module 'ask-sdk-core' {
    interface HandlerInput {
        t(...args: Parameters<TFunction>): string;
        getLocale(): string;
    }
}
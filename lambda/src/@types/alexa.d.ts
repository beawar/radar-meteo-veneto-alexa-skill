import 'ask-sdk-core';
import type { TFunction } from 'i18next';

declare module 'ask-sdk-core' {
    interface HandlerInput {
        t(...args: Parameters<TFunction>): string;
        getLocale(): string;
    }
}
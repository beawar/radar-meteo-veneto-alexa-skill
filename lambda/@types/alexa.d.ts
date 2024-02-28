import 'ask-sdk-core';
import { WithT } from 'i18next';

declare module 'ask-sdk-core' {
    interface HandlerInput extends WithT {
        getLocale(): string;
    }
}
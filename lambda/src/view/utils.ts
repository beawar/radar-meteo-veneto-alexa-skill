import { HandlerInput } from "ask-sdk-core";
import { Directive, interfaces } from "ask-sdk-model";

function assertDirective(directive: unknown): asserts directive is Directive {
    if (typeof directive !== 'object' || !directive) {
        throw new Error('directive must be an object');
    }
    if (!('token' in directive)) {
        throw new Error('directive must have a token');
    }
    if (!('document' in directive)) {
        throw new Error('directive must have a document')
    }
}

export function buildDirective(directive: interfaces.alexa.presentation.apl.RenderDocumentDirective, datasources: Record<string, unknown>) {
    const result = {
        type: directive.type,
        document: directive.document,
        token: directive.token,
        datasources
    }
    assertDirective(result)
    return result;
}


export function supportsAPL(handlerInput: HandlerInput) {
    const supportedInterfaces =
      handlerInput.requestEnvelope.context.System.device?.supportedInterfaces;
    return !!supportedInterfaces?.["Alexa.Presentation.APL"];
  }
  
  export function supportsAPLA(handlerInput: HandlerInput) {
    return supportsAPL(handlerInput);
  }
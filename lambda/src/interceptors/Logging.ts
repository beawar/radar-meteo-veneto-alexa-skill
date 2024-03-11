import type { RequestInterceptor, ResponseInterceptor } from "ask-sdk-core";

// This request interceptor will log all incoming requests to this lambda
export const LoggingRequestInterceptor: RequestInterceptor = {
  process(handlerInput) {
    console.log(
      `Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`,
    );
  },
};

// This response interceptor will log all outgoing responses of this lambda
export const LoggingResponseInterceptor: ResponseInterceptor = {
  process(_handlerInput, response) {
    console.log(`Outgoing response: ${JSON.stringify(response)}`);
  },
};

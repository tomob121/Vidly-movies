import * as Sentry from '@sentry/react'
import { BrowserTracing } from "@sentry/tracing";


export function init() {
    // Sentry.init({
    //     dsn: "https://5de484c486a245b5837416321000921b@o1207059.ingest.sentry.io/4504289297235968",
    //     integrations: [new BrowserTracing()],

    //     // Set tracesSampleRate to 1.0 to capture 100%
    //     // of transactions for performance monitoring.
    //     // We recommend adjusting this value in production
    //     tracesSampleRate: 1.0,
    // });
}

export function log(error) {
    return console.log(error);
    return Sentry.captureException(error)
}
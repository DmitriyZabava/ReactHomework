import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://96ba5a1ee9e047ff867f3643be0553fe@o1424626.ingest.sentry.io/6772769",
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0
    });
}
function log(error) {
    Sentry.captureException(error);
}

const logger = { init, log };

export default logger;

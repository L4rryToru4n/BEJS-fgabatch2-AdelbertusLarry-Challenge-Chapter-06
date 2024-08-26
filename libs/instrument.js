const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

// Initializing Sentry
// Ensure to call this before requiring any other modules!
Sentry.init({
  dsn: "https://f3cd6d593bb42dbcd3a92babf0cbaaac@o4507843913449472.ingest.de.sentry.io/4507843962470480",
  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
  ],

  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
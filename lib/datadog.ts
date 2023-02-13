import {datadogRum} from '@datadog/browser-rum';
import type {User} from '@privy-io/react-auth';

export const initializeDatadog = () => {
  if (!process.env.NEXT_PUBLIC_DATADOG_APP_ID || !process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN) {
    console.log('Missing Datadog configuration - will not report');
    return;
  }

  // Check if already initialized
  if (datadogRum.getInternalContext()) {
    return;
  }

  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APP_ID!,
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN!,
    site: 'datadoghq.com',
    service: 'privy',
    env: 'production',
    version: process.env.VERCEL_GIT_COMMIT_SHA,
    sessionSampleRate: 100,
    trackResources: true,
    trackLongTasks: true,
    // As this is consumer-facing, we track as little as possible to protect
    // user privacy.
    trackUserInteractions: false,
    defaultPrivacyLevel: 'mask',
    sessionReplaySampleRate: 0,
  });
};

export const setDatadogUser = (user: User) => {
  datadogRum.setUser({
    id: user.id,
  });
};

export const clearDatadogUser = () => {
  datadogRum.clearUser();
};

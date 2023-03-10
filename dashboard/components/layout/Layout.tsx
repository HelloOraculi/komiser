import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import Banner from '../banner/Banner';
import useGithubStarBanner from '../banner/hooks/useGithubStarBanner';
import Button from '../button/Button';
import EmptyState from '../empty-state/EmptyState';
import ErrorState from '../error-state/ErrorState';
import Navbar from '../navbar/Navbar';
import GlobalAppContext from './context/GlobalAppContext';
import useGlobalStats from './hooks/useGlobalStats';
import useTelemetry from './hooks/useTelemetry';
import environment from '../../environments/environment';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const { displayBanner, dismissBanner, githubStars } = useGithubStarBanner();
  const { loading, data, error, hasNoAccounts, fetch } = useGlobalStats();
  const { telemetry } = useTelemetry();
  const router = useRouter();
  const canRender = !error && !hasNoAccounts;

  useEffect(() => {
    if (telemetry?.telemetry_enabled && environment.production) {
      Sentry.init({
        dsn: environment.SENTRY_URL,
        integrations: [new BrowserTracing()],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0
      });
    }
  }, [telemetry]);

  return (
    <GlobalAppContext.Provider
      value={{
        displayBanner,
        dismissBanner,
        loading,
        data,
        error,
        hasNoAccounts,
        fetch
      }}
    >
      <Banner githubStars={githubStars} />
      <Navbar />
      <main
        className={`relative ${
          displayBanner
            ? 'mt-[145px] min-h-[calc(100vh-145px)]'
            : 'mt-[73px] min-h-[calc(100vh-73px)]'
        } bg-black-100 p-6 pb-12 xl:px-8 2xl:px-24`}
      >
        {canRender && children}

        {hasNoAccounts && (
          <EmptyState
            title="We could not find a cloud account"
            message="It seems you have not connected a cloud account to Komiser. Connect one right now so you can start managing it from your dashboard"
            action={() => {
              router.push(
                'https://docs.komiser.io/docs/overview/introduction/getting-started/'
              );
            }}
            actionLabel="Guide to connect account"
            mascotPose="greetings"
          />
        )}

        {error && (
          <ErrorState
            title="Network request error"
            message="There was an error fetching the cloud accounts. Please refer to the logs for more info and try again."
            action={
              <Button size="lg" style="outline" onClick={() => router.reload()}>
                Refresh the page
              </Button>
            }
          />
        )}
      </main>
    </GlobalAppContext.Provider>
  );
}

export default Layout;

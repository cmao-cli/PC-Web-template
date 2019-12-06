import * as React from 'react';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'src/components/error-boundary';
import { RouteProps } from 'react-router-dom';

export const _lazy = (loadFunc:() => Promise<any>) => {
  const Component = lazy(loadFunc);
  return () => (
      <ErrorBoundary>
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>loading</div>}>
          <Component />
        </Suspense>
      </ErrorBoundary>
    );
};

/**
 * 全局路由表
 */
export let routes:RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: _lazy(() => import('./index/index')),
  },
  {
    component: _lazy(() => import('../components/page-not-found')),
  },
];
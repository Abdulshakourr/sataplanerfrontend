/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as PrivateIndexImport } from './routes/private/index'
import { Route as LearnIndexImport } from './routes/learn/index'
import { Route as isAuthenticatedAuthImport } from './routes/(isAuthenticated)/_auth'
import { Route as QrcodenewViewPlanIndexImport } from './routes/qrcodenew/view-plan/index'
import { Route as LearnProductivityIndexImport } from './routes/learn/productivity/index'
import { Route as LearnMotivationIndexImport } from './routes/learn/motivation/index'
import { Route as authSignUpIndexImport } from './routes/(auth)/sign-up/index'
import { Route as authSignInIndexImport } from './routes/(auth)/sign-in/index'
import { Route as isAuthenticatedAuthProfileIndexImport } from './routes/(isAuthenticated)/_auth/profile/index'
import { Route as isAuthenticatedAuthNewGoalIndexImport } from './routes/(isAuthenticated)/_auth/new-goal/index'
import { Route as isAuthenticatedAuthDashboardIndexImport } from './routes/(isAuthenticated)/_auth/dashboard/index'
import { Route as isAuthenticatedAuthCompletedgoalsIndexImport } from './routes/(isAuthenticated)/_auth/completedgoals/index'
import { Route as isAuthenticatedAuthAllgoalsIndexImport } from './routes/(isAuthenticated)/_auth/allgoals/index'
import { Route as isAuthenticatedAuthActivegoalsIndexImport } from './routes/(isAuthenticated)/_auth/activegoals/index'
import { Route as isAuthenticatedAuthEditEditIdImport } from './routes/(isAuthenticated)/_auth/edit/$editId'
import { Route as isAuthenticatedAuthDashboardGoalGoalIdImport } from './routes/(isAuthenticated)/_auth/dashboard/goal/$goalId'

// Create Virtual Routes

const isAuthenticatedImport = createFileRoute('/(isAuthenticated)')()

// Create/Update Routes

const isAuthenticatedRoute = isAuthenticatedImport.update({
  id: '/(isAuthenticated)',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PrivateIndexRoute = PrivateIndexImport.update({
  id: '/private/',
  path: '/private/',
  getParentRoute: () => rootRoute,
} as any)

const LearnIndexRoute = LearnIndexImport.update({
  id: '/learn/',
  path: '/learn/',
  getParentRoute: () => rootRoute,
} as any)

const isAuthenticatedAuthRoute = isAuthenticatedAuthImport.update({
  id: '/_auth',
  getParentRoute: () => isAuthenticatedRoute,
} as any)

const QrcodenewViewPlanIndexRoute = QrcodenewViewPlanIndexImport.update({
  id: '/qrcodenew/view-plan/',
  path: '/qrcodenew/view-plan/',
  getParentRoute: () => rootRoute,
} as any)

const LearnProductivityIndexRoute = LearnProductivityIndexImport.update({
  id: '/learn/productivity/',
  path: '/learn/productivity/',
  getParentRoute: () => rootRoute,
} as any)

const LearnMotivationIndexRoute = LearnMotivationIndexImport.update({
  id: '/learn/motivation/',
  path: '/learn/motivation/',
  getParentRoute: () => rootRoute,
} as any)

const authSignUpIndexRoute = authSignUpIndexImport.update({
  id: '/(auth)/sign-up/',
  path: '/sign-up/',
  getParentRoute: () => rootRoute,
} as any)

const authSignInIndexRoute = authSignInIndexImport.update({
  id: '/(auth)/sign-in/',
  path: '/sign-in/',
  getParentRoute: () => rootRoute,
} as any)

const isAuthenticatedAuthProfileIndexRoute =
  isAuthenticatedAuthProfileIndexImport.update({
    id: '/profile/',
    path: '/profile/',
    getParentRoute: () => isAuthenticatedAuthRoute,
  } as any)

const isAuthenticatedAuthNewGoalIndexRoute =
  isAuthenticatedAuthNewGoalIndexImport.update({
    id: '/new-goal/',
    path: '/new-goal/',
    getParentRoute: () => isAuthenticatedAuthRoute,
  } as any)

const isAuthenticatedAuthDashboardIndexRoute =
  isAuthenticatedAuthDashboardIndexImport.update({
    id: '/dashboard/',
    path: '/dashboard/',
    getParentRoute: () => isAuthenticatedAuthRoute,
  } as any)

const isAuthenticatedAuthCompletedgoalsIndexRoute =
  isAuthenticatedAuthCompletedgoalsIndexImport.update({
    id: '/completedgoals/',
    path: '/completedgoals/',
    getParentRoute: () => isAuthenticatedAuthRoute,
  } as any)

const isAuthenticatedAuthAllgoalsIndexRoute =
  isAuthenticatedAuthAllgoalsIndexImport.update({
    id: '/allgoals/',
    path: '/allgoals/',
    getParentRoute: () => isAuthenticatedAuthRoute,
  } as any)

const isAuthenticatedAuthActivegoalsIndexRoute =
  isAuthenticatedAuthActivegoalsIndexImport.update({
    id: '/activegoals/',
    path: '/activegoals/',
    getParentRoute: () => isAuthenticatedAuthRoute,
  } as any)

const isAuthenticatedAuthEditEditIdRoute =
  isAuthenticatedAuthEditEditIdImport.update({
    id: '/edit/$editId',
    path: '/edit/$editId',
    getParentRoute: () => isAuthenticatedAuthRoute,
  } as any)

const isAuthenticatedAuthDashboardGoalGoalIdRoute =
  isAuthenticatedAuthDashboardGoalGoalIdImport.update({
    id: '/dashboard/goal/$goalId',
    path: '/dashboard/goal/$goalId',
    getParentRoute: () => isAuthenticatedAuthRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/(isAuthenticated)': {
      id: '/(isAuthenticated)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof isAuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/(isAuthenticated)/_auth': {
      id: '/(isAuthenticated)/_auth'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof isAuthenticatedAuthImport
      parentRoute: typeof isAuthenticatedRoute
    }
    '/learn/': {
      id: '/learn/'
      path: '/learn'
      fullPath: '/learn'
      preLoaderRoute: typeof LearnIndexImport
      parentRoute: typeof rootRoute
    }
    '/private/': {
      id: '/private/'
      path: '/private'
      fullPath: '/private'
      preLoaderRoute: typeof PrivateIndexImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/sign-in/': {
      id: '/(auth)/sign-in/'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof authSignInIndexImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/sign-up/': {
      id: '/(auth)/sign-up/'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof authSignUpIndexImport
      parentRoute: typeof rootRoute
    }
    '/learn/motivation/': {
      id: '/learn/motivation/'
      path: '/learn/motivation'
      fullPath: '/learn/motivation'
      preLoaderRoute: typeof LearnMotivationIndexImport
      parentRoute: typeof rootRoute
    }
    '/learn/productivity/': {
      id: '/learn/productivity/'
      path: '/learn/productivity'
      fullPath: '/learn/productivity'
      preLoaderRoute: typeof LearnProductivityIndexImport
      parentRoute: typeof rootRoute
    }
    '/qrcodenew/view-plan/': {
      id: '/qrcodenew/view-plan/'
      path: '/qrcodenew/view-plan'
      fullPath: '/qrcodenew/view-plan'
      preLoaderRoute: typeof QrcodenewViewPlanIndexImport
      parentRoute: typeof rootRoute
    }
    '/(isAuthenticated)/_auth/edit/$editId': {
      id: '/(isAuthenticated)/_auth/edit/$editId'
      path: '/edit/$editId'
      fullPath: '/edit/$editId'
      preLoaderRoute: typeof isAuthenticatedAuthEditEditIdImport
      parentRoute: typeof isAuthenticatedAuthImport
    }
    '/(isAuthenticated)/_auth/activegoals/': {
      id: '/(isAuthenticated)/_auth/activegoals/'
      path: '/activegoals'
      fullPath: '/activegoals'
      preLoaderRoute: typeof isAuthenticatedAuthActivegoalsIndexImport
      parentRoute: typeof isAuthenticatedAuthImport
    }
    '/(isAuthenticated)/_auth/allgoals/': {
      id: '/(isAuthenticated)/_auth/allgoals/'
      path: '/allgoals'
      fullPath: '/allgoals'
      preLoaderRoute: typeof isAuthenticatedAuthAllgoalsIndexImport
      parentRoute: typeof isAuthenticatedAuthImport
    }
    '/(isAuthenticated)/_auth/completedgoals/': {
      id: '/(isAuthenticated)/_auth/completedgoals/'
      path: '/completedgoals'
      fullPath: '/completedgoals'
      preLoaderRoute: typeof isAuthenticatedAuthCompletedgoalsIndexImport
      parentRoute: typeof isAuthenticatedAuthImport
    }
    '/(isAuthenticated)/_auth/dashboard/': {
      id: '/(isAuthenticated)/_auth/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof isAuthenticatedAuthDashboardIndexImport
      parentRoute: typeof isAuthenticatedAuthImport
    }
    '/(isAuthenticated)/_auth/new-goal/': {
      id: '/(isAuthenticated)/_auth/new-goal/'
      path: '/new-goal'
      fullPath: '/new-goal'
      preLoaderRoute: typeof isAuthenticatedAuthNewGoalIndexImport
      parentRoute: typeof isAuthenticatedAuthImport
    }
    '/(isAuthenticated)/_auth/profile/': {
      id: '/(isAuthenticated)/_auth/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof isAuthenticatedAuthProfileIndexImport
      parentRoute: typeof isAuthenticatedAuthImport
    }
    '/(isAuthenticated)/_auth/dashboard/goal/$goalId': {
      id: '/(isAuthenticated)/_auth/dashboard/goal/$goalId'
      path: '/dashboard/goal/$goalId'
      fullPath: '/dashboard/goal/$goalId'
      preLoaderRoute: typeof isAuthenticatedAuthDashboardGoalGoalIdImport
      parentRoute: typeof isAuthenticatedAuthImport
    }
  }
}

// Create and export the route tree

interface isAuthenticatedAuthRouteChildren {
  isAuthenticatedAuthEditEditIdRoute: typeof isAuthenticatedAuthEditEditIdRoute
  isAuthenticatedAuthActivegoalsIndexRoute: typeof isAuthenticatedAuthActivegoalsIndexRoute
  isAuthenticatedAuthAllgoalsIndexRoute: typeof isAuthenticatedAuthAllgoalsIndexRoute
  isAuthenticatedAuthCompletedgoalsIndexRoute: typeof isAuthenticatedAuthCompletedgoalsIndexRoute
  isAuthenticatedAuthDashboardIndexRoute: typeof isAuthenticatedAuthDashboardIndexRoute
  isAuthenticatedAuthNewGoalIndexRoute: typeof isAuthenticatedAuthNewGoalIndexRoute
  isAuthenticatedAuthProfileIndexRoute: typeof isAuthenticatedAuthProfileIndexRoute
  isAuthenticatedAuthDashboardGoalGoalIdRoute: typeof isAuthenticatedAuthDashboardGoalGoalIdRoute
}

const isAuthenticatedAuthRouteChildren: isAuthenticatedAuthRouteChildren = {
  isAuthenticatedAuthEditEditIdRoute: isAuthenticatedAuthEditEditIdRoute,
  isAuthenticatedAuthActivegoalsIndexRoute:
    isAuthenticatedAuthActivegoalsIndexRoute,
  isAuthenticatedAuthAllgoalsIndexRoute: isAuthenticatedAuthAllgoalsIndexRoute,
  isAuthenticatedAuthCompletedgoalsIndexRoute:
    isAuthenticatedAuthCompletedgoalsIndexRoute,
  isAuthenticatedAuthDashboardIndexRoute:
    isAuthenticatedAuthDashboardIndexRoute,
  isAuthenticatedAuthNewGoalIndexRoute: isAuthenticatedAuthNewGoalIndexRoute,
  isAuthenticatedAuthProfileIndexRoute: isAuthenticatedAuthProfileIndexRoute,
  isAuthenticatedAuthDashboardGoalGoalIdRoute:
    isAuthenticatedAuthDashboardGoalGoalIdRoute,
}

const isAuthenticatedAuthRouteWithChildren =
  isAuthenticatedAuthRoute._addFileChildren(isAuthenticatedAuthRouteChildren)

interface isAuthenticatedRouteChildren {
  isAuthenticatedAuthRoute: typeof isAuthenticatedAuthRouteWithChildren
}

const isAuthenticatedRouteChildren: isAuthenticatedRouteChildren = {
  isAuthenticatedAuthRoute: isAuthenticatedAuthRouteWithChildren,
}

const isAuthenticatedRouteWithChildren = isAuthenticatedRoute._addFileChildren(
  isAuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof isAuthenticatedAuthRouteWithChildren
  '/learn': typeof LearnIndexRoute
  '/private': typeof PrivateIndexRoute
  '/sign-in': typeof authSignInIndexRoute
  '/sign-up': typeof authSignUpIndexRoute
  '/learn/motivation': typeof LearnMotivationIndexRoute
  '/learn/productivity': typeof LearnProductivityIndexRoute
  '/qrcodenew/view-plan': typeof QrcodenewViewPlanIndexRoute
  '/edit/$editId': typeof isAuthenticatedAuthEditEditIdRoute
  '/activegoals': typeof isAuthenticatedAuthActivegoalsIndexRoute
  '/allgoals': typeof isAuthenticatedAuthAllgoalsIndexRoute
  '/completedgoals': typeof isAuthenticatedAuthCompletedgoalsIndexRoute
  '/dashboard': typeof isAuthenticatedAuthDashboardIndexRoute
  '/new-goal': typeof isAuthenticatedAuthNewGoalIndexRoute
  '/profile': typeof isAuthenticatedAuthProfileIndexRoute
  '/dashboard/goal/$goalId': typeof isAuthenticatedAuthDashboardGoalGoalIdRoute
}

export interface FileRoutesByTo {
  '/': typeof isAuthenticatedAuthRouteWithChildren
  '/learn': typeof LearnIndexRoute
  '/private': typeof PrivateIndexRoute
  '/sign-in': typeof authSignInIndexRoute
  '/sign-up': typeof authSignUpIndexRoute
  '/learn/motivation': typeof LearnMotivationIndexRoute
  '/learn/productivity': typeof LearnProductivityIndexRoute
  '/qrcodenew/view-plan': typeof QrcodenewViewPlanIndexRoute
  '/edit/$editId': typeof isAuthenticatedAuthEditEditIdRoute
  '/activegoals': typeof isAuthenticatedAuthActivegoalsIndexRoute
  '/allgoals': typeof isAuthenticatedAuthAllgoalsIndexRoute
  '/completedgoals': typeof isAuthenticatedAuthCompletedgoalsIndexRoute
  '/dashboard': typeof isAuthenticatedAuthDashboardIndexRoute
  '/new-goal': typeof isAuthenticatedAuthNewGoalIndexRoute
  '/profile': typeof isAuthenticatedAuthProfileIndexRoute
  '/dashboard/goal/$goalId': typeof isAuthenticatedAuthDashboardGoalGoalIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/(isAuthenticated)': typeof isAuthenticatedRouteWithChildren
  '/(isAuthenticated)/_auth': typeof isAuthenticatedAuthRouteWithChildren
  '/learn/': typeof LearnIndexRoute
  '/private/': typeof PrivateIndexRoute
  '/(auth)/sign-in/': typeof authSignInIndexRoute
  '/(auth)/sign-up/': typeof authSignUpIndexRoute
  '/learn/motivation/': typeof LearnMotivationIndexRoute
  '/learn/productivity/': typeof LearnProductivityIndexRoute
  '/qrcodenew/view-plan/': typeof QrcodenewViewPlanIndexRoute
  '/(isAuthenticated)/_auth/edit/$editId': typeof isAuthenticatedAuthEditEditIdRoute
  '/(isAuthenticated)/_auth/activegoals/': typeof isAuthenticatedAuthActivegoalsIndexRoute
  '/(isAuthenticated)/_auth/allgoals/': typeof isAuthenticatedAuthAllgoalsIndexRoute
  '/(isAuthenticated)/_auth/completedgoals/': typeof isAuthenticatedAuthCompletedgoalsIndexRoute
  '/(isAuthenticated)/_auth/dashboard/': typeof isAuthenticatedAuthDashboardIndexRoute
  '/(isAuthenticated)/_auth/new-goal/': typeof isAuthenticatedAuthNewGoalIndexRoute
  '/(isAuthenticated)/_auth/profile/': typeof isAuthenticatedAuthProfileIndexRoute
  '/(isAuthenticated)/_auth/dashboard/goal/$goalId': typeof isAuthenticatedAuthDashboardGoalGoalIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/learn'
    | '/private'
    | '/sign-in'
    | '/sign-up'
    | '/learn/motivation'
    | '/learn/productivity'
    | '/qrcodenew/view-plan'
    | '/edit/$editId'
    | '/activegoals'
    | '/allgoals'
    | '/completedgoals'
    | '/dashboard'
    | '/new-goal'
    | '/profile'
    | '/dashboard/goal/$goalId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/learn'
    | '/private'
    | '/sign-in'
    | '/sign-up'
    | '/learn/motivation'
    | '/learn/productivity'
    | '/qrcodenew/view-plan'
    | '/edit/$editId'
    | '/activegoals'
    | '/allgoals'
    | '/completedgoals'
    | '/dashboard'
    | '/new-goal'
    | '/profile'
    | '/dashboard/goal/$goalId'
  id:
    | '__root__'
    | '/'
    | '/(isAuthenticated)'
    | '/(isAuthenticated)/_auth'
    | '/learn/'
    | '/private/'
    | '/(auth)/sign-in/'
    | '/(auth)/sign-up/'
    | '/learn/motivation/'
    | '/learn/productivity/'
    | '/qrcodenew/view-plan/'
    | '/(isAuthenticated)/_auth/edit/$editId'
    | '/(isAuthenticated)/_auth/activegoals/'
    | '/(isAuthenticated)/_auth/allgoals/'
    | '/(isAuthenticated)/_auth/completedgoals/'
    | '/(isAuthenticated)/_auth/dashboard/'
    | '/(isAuthenticated)/_auth/new-goal/'
    | '/(isAuthenticated)/_auth/profile/'
    | '/(isAuthenticated)/_auth/dashboard/goal/$goalId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  isAuthenticatedRoute: typeof isAuthenticatedRouteWithChildren
  LearnIndexRoute: typeof LearnIndexRoute
  PrivateIndexRoute: typeof PrivateIndexRoute
  authSignInIndexRoute: typeof authSignInIndexRoute
  authSignUpIndexRoute: typeof authSignUpIndexRoute
  LearnMotivationIndexRoute: typeof LearnMotivationIndexRoute
  LearnProductivityIndexRoute: typeof LearnProductivityIndexRoute
  QrcodenewViewPlanIndexRoute: typeof QrcodenewViewPlanIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  isAuthenticatedRoute: isAuthenticatedRouteWithChildren,
  LearnIndexRoute: LearnIndexRoute,
  PrivateIndexRoute: PrivateIndexRoute,
  authSignInIndexRoute: authSignInIndexRoute,
  authSignUpIndexRoute: authSignUpIndexRoute,
  LearnMotivationIndexRoute: LearnMotivationIndexRoute,
  LearnProductivityIndexRoute: LearnProductivityIndexRoute,
  QrcodenewViewPlanIndexRoute: QrcodenewViewPlanIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(isAuthenticated)",
        "/learn/",
        "/private/",
        "/(auth)/sign-in/",
        "/(auth)/sign-up/",
        "/learn/motivation/",
        "/learn/productivity/",
        "/qrcodenew/view-plan/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/(isAuthenticated)": {
      "filePath": "(isAuthenticated)",
      "children": [
        "/(isAuthenticated)/_auth"
      ]
    },
    "/(isAuthenticated)/_auth": {
      "filePath": "(isAuthenticated)/_auth.tsx",
      "parent": "/(isAuthenticated)",
      "children": [
        "/(isAuthenticated)/_auth/edit/$editId",
        "/(isAuthenticated)/_auth/activegoals/",
        "/(isAuthenticated)/_auth/allgoals/",
        "/(isAuthenticated)/_auth/completedgoals/",
        "/(isAuthenticated)/_auth/dashboard/",
        "/(isAuthenticated)/_auth/new-goal/",
        "/(isAuthenticated)/_auth/profile/",
        "/(isAuthenticated)/_auth/dashboard/goal/$goalId"
      ]
    },
    "/learn/": {
      "filePath": "learn/index.tsx"
    },
    "/private/": {
      "filePath": "private/index.tsx"
    },
    "/(auth)/sign-in/": {
      "filePath": "(auth)/sign-in/index.tsx"
    },
    "/(auth)/sign-up/": {
      "filePath": "(auth)/sign-up/index.tsx"
    },
    "/learn/motivation/": {
      "filePath": "learn/motivation/index.tsx"
    },
    "/learn/productivity/": {
      "filePath": "learn/productivity/index.tsx"
    },
    "/qrcodenew/view-plan/": {
      "filePath": "qrcodenew/view-plan/index.tsx"
    },
    "/(isAuthenticated)/_auth/edit/$editId": {
      "filePath": "(isAuthenticated)/_auth/edit/$editId.tsx",
      "parent": "/(isAuthenticated)/_auth"
    },
    "/(isAuthenticated)/_auth/activegoals/": {
      "filePath": "(isAuthenticated)/_auth/activegoals/index.tsx",
      "parent": "/(isAuthenticated)/_auth"
    },
    "/(isAuthenticated)/_auth/allgoals/": {
      "filePath": "(isAuthenticated)/_auth/allgoals/index.tsx",
      "parent": "/(isAuthenticated)/_auth"
    },
    "/(isAuthenticated)/_auth/completedgoals/": {
      "filePath": "(isAuthenticated)/_auth/completedgoals/index.tsx",
      "parent": "/(isAuthenticated)/_auth"
    },
    "/(isAuthenticated)/_auth/dashboard/": {
      "filePath": "(isAuthenticated)/_auth/dashboard/index.tsx",
      "parent": "/(isAuthenticated)/_auth"
    },
    "/(isAuthenticated)/_auth/new-goal/": {
      "filePath": "(isAuthenticated)/_auth/new-goal/index.tsx",
      "parent": "/(isAuthenticated)/_auth"
    },
    "/(isAuthenticated)/_auth/profile/": {
      "filePath": "(isAuthenticated)/_auth/profile/index.tsx",
      "parent": "/(isAuthenticated)/_auth"
    },
    "/(isAuthenticated)/_auth/dashboard/goal/$goalId": {
      "filePath": "(isAuthenticated)/_auth/dashboard/goal/$goalId.tsx",
      "parent": "/(isAuthenticated)/_auth"
    }
  }
}
ROUTE_MANIFEST_END */

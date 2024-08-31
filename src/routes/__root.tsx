import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router'
import React, {Suspense} from "react";
import {QueryClient} from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{queryClient: QueryClient}>()({
    component: Root,
})

function Root() {
    const TanStackRouterDevtools =
        process.env.NODE_ENV === 'production'
            ? () => null // Render nothing in production
            : React.lazy(() =>
                // Lazy load in development
                import('@tanstack/router-devtools').then((res) => ({
                    default: res.TanStackRouterDevtools,
                    // For Embedded Mode
                    // default: res.TanStackRouterDevtoolsPanel
                })),
            )
    return (
        <>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold nav-item">
                    Home
                </Link>
                <Link to="/auth" className="[&.active]:font-bold nav-item">
                    Auth
                </Link>
            </div>
            <hr className="nav"/>
            <Outlet/>
            <Suspense>
                <TanStackRouterDevtools/>
            </Suspense>
        </>
    );
}
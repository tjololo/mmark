import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router'
import React, {Suspense} from "react";
import {QueryClient} from "@tanstack/react-query";
import {Auth} from "../Auth/auth.tsx";

export const Route = createRootRouteWithContext<{queryClient: QueryClient}>()({
    component: Root
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
            </div>
            <hr className="nav"/>
            <Auth />
            <Outlet/>
            <Suspense>
                <TanStackRouterDevtools/>
            </Suspense>
        </>
    );
}
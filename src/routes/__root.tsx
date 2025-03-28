import { createRootRoute, Outlet } from "@tanstack/react-router";
/* import { TanStackRouterDevtools } from "@tanstack/router-devtools"; */

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]"> */}
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
      {/* </div> */}
    </>
  ),
});

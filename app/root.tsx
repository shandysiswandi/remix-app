import {
  type LayoutRouteProps,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import type { Route } from "./+types/root";
import "./app.css";

export const Layout = ({ children }: LayoutRouteProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="group/body scroll-smooth">
        <Toaster position="top-center" closeButton richColors />
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export const meta: Route.MetaFunction = () => {
  return [{ title: "BigBoss Application" }];
};

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (!isRouteErrorResponse(error)) {
    return <>500</>;
  }

  switch (error.status) {
    case 401:
      return <>401</>;

    case 403:
      return <>403</>;

    case 404:
      return <>404</>;

    default:
      return <>500</>;
  }
}

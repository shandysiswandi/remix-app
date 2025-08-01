import { Link, Outlet } from "react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { ThemeSwitch } from "~/components/theme-switch";
import { APP_NAME, appURL } from "~/lib/constant";

export default function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2">
          <Link to={appURL.root} className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {APP_NAME}
          </Link>

          <ThemeSwitch />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <img src="/auth.svg" alt="Image" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}

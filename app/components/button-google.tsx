import { Button } from "~/components/ui/button";

export function ButtonGoogle({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" className="flex w-full items-center justify-center gap-2" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
        <title>Google</title>
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 24c3.04 0 5.58-1.01 7.44-2.73l-3.57-2.77c-1.01.68-2.3.96-3.87.96-2.97 0-5.49-2-6.4-4.68H1.95v2.84C3.89 21.43 7.62 24 12 24z"
          fill="#34A853"
        />
        <path
          d="M5.6 14.71c-.22-.68-.35-1.4-.35-2.19s.13-1.51.35-2.19V7.49H1.95A11.98 11.98 0 0 0 0 12.5c0 1.96.46 3.8 1.25 5.47l4.35-3.26z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.63 0 3.06.56 4.21 1.64l3.15-3.15C17.58 1.36 15.04 0 12 0 7.62 0 3.89 2.57 1.95 6.36l4.44 3.46c.91-2.68 3.43-4.68 6.41-4.68z"
          fill="#EA4335"
        />
      </svg>
      <span>Continue with Google</span>
    </Button>
  );
}

import { useEffect } from "react";
import { Link, useFetcher, useNavigate } from "react-router";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { toast } from "sonner";
import { ButtonGoogle } from "~/components/button-google";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { InputError } from "~/components/ui/input-error";
import { Label } from "~/components/ui/label";
import { appURL } from "~/lib/constant";
import type { Route } from "./+types/route";
import { schema } from "./schema";

export const meta = (/*{}: Route.MetaArgs*/) => {
  return [{ title: "Login" }, { name: "description", content: "Welcome to YourApp!" }];
};

export const action = async ({ request }: Route.ActionArgs) => {
  const submission = parseWithZod(await request.formData(), {
    schema: schema,
  });

  if (submission.status !== "success") {
    return { lastResult: submission.reply(), success: false };
  }

  // call service to actual data login
  // save session

  return { lastResult: submission.reply(), success: true };
};

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate();

  const [form, { email, password }] = useForm({
    lastResult: fetcher.data?.lastResult,
    defaultValue: {
      email: "",
      password: "",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: schema });
    },
  });

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      toast.success("Login successful! Welcome back.");
      const timer = setTimeout(() => {
        navigate(appURL.dashboard);
      }, 2_000);

      return () => clearTimeout(timer);
    }
  }, [fetcher.state, fetcher.data, navigate]);

  const handleGoogle = async () => {
    toast.warning("Continue with Google is not implement yet.");
  };

  return (
    <>
      <fetcher.Form className="flex flex-col gap-6" method="POST" {...getFormProps(form)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-muted-foreground">Enter your email below to login to your account</p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor={email.id}>Email</Label>
            <Input
              {...getInputProps(email, { type: "email" })}
              placeholder="name@example.com"
              autoComplete="off"
            />
            <InputError id={email.id}>{email.errors}</InputError>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor={password.id}>Password</Label>
              <Link
                to={appURL.auth.forgotPassword}
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input {...getInputProps(password, { type: "password" })} placeholder="********" />
            <InputError id={password.id}>{password.errors}</InputError>
          </div>

          <Button type="submit" className="w-full" disabled={fetcher.state !== "idle"}>
            {fetcher.state !== "idle" ? "Logging in..." : "Login"}
          </Button>
        </div>
      </fetcher.Form>

      <div className="mt-6 flex flex-col gap-6">
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">or</span>
        </div>
        <ButtonGoogle onClick={handleGoogle} />

        <div className="text-center text-sm">
          <span>Don&apos;t have an account? </span>
          <Link to={appURL.auth.register} className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}

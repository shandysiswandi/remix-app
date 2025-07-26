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
  return [{ title: "Register" }, { name: "description", content: "Welcome to YourApp!" }];
};

export const action = async ({ request }: Route.ActionArgs) => {
  const submission = parseWithZod(await request.formData(), {
    schema: schema,
  });

  if (submission.status !== "success") {
    return { lastResult: submission.reply(), success: false };
  }

  // call service to actual data register
  // save session

  return { lastResult: submission.reply(), success: true };
};

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate();

  const [form, { name, email, password }] = useForm({
    lastResult: fetcher.data?.lastResult,
    defaultValue: {
      name: "",
      email: "",
      password: "",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: schema });
    },
  });

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      toast.success("Register successful!");
    }
  }, [fetcher.state, fetcher.data, navigate]);

  const handleGoogle = async () => {
    toast.warning("Continue with Google is not implement yet.");
  };

  return (
    <>
      <fetcher.Form className="flex flex-col gap-6" method="POST" {...getFormProps(form)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground">It's free and only takes a minute</p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor={name.id}>Email</Label>
            <Input {...getInputProps(name, { type: "text" })} placeholder="John Doe" autoComplete="off" />
            <InputError id={name.id}>{name.errors}</InputError>
          </div>

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
            <Label htmlFor={password.id}>Password</Label>
            <Input {...getInputProps(password, { type: "password" })} placeholder="********" />
            <InputError id={password.id}>{password.errors}</InputError>
          </div>

          <Button type="submit" className="w-full" disabled={fetcher.state !== "idle"}>
            {fetcher.state !== "idle" ? "Creating your account..." : "Create account"}
          </Button>
        </div>
      </fetcher.Form>

      <div className="mt-6 flex flex-col gap-6">
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">or</span>
        </div>
        <ButtonGoogle onClick={handleGoogle} />

        <div className="text-center text-sm">
          <span>Already have an account? </span>
          <Link to={appURL.auth.login} className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
}

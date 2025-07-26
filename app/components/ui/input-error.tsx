export const InputError = ({ id, children }: React.ComponentProps<"div">) => {
  return (
    <div id={id} className="text-xs font-medium text-destructive empty:hidden">
      {children}
    </div>
  );
};

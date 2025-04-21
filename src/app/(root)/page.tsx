import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="mx-auto mt-10 flex max-w-sm flex-col gap-3">
      <h1 className="text-center text-3xl font-semibold">Welcome</h1>
      <Button>Hello</Button>
    </div>
  );
};

export default page;

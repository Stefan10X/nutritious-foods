import { Spinner } from "flowbite-react";

interface Props {
  name: string;
}

const LoadingComponent = ({ name }: Props) => {
  return (
    <div className="relative bottom-32 flex min-h-screen items-center justify-center gap-3 text-3xl lg:text-4xl">
      <Spinner aria-label="Extra large spinner example" size="xl" />
      <div className="mt-[10px]">Loading {name}</div>
    </div>
  );
};

export default LoadingComponent;

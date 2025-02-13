import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div>
        <div>
          {" "}
          <h1 className="text-2xl font-bold text-indigo-400">
            Hello, and welcome
          </h1>
        </div>
      </div>
    </>
  );
}

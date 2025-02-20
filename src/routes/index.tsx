import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {


  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {" "}
          <div className="text-center mt-8">
            <div className="flex justify-center items-center mb-4">
              <h2 className="bg-gray-100 px-4 py-2 rounded-full text-purple-600 font-medium text-sm ">Transform Your Goals</h2>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold">
              Turn Your Dreams into <span className="text-purple-600"> Achievable Plans</span></h1>
            <p className="text-gray-500 text-sm sm:text-lg font-medium my-4 md:max-w-xl mx-auto">Track, share, and achieve your goals with our intuitive platform. Stay motivated and turn your aspirations into reality.</p>
            <div className="flex gap-4 justify-center">
              <Button size={"lg"} className="bg-purple-500 hover:bg-purple-600">Get Started</Button>
              <Button variant={"outline"} size={"lg"}>Learn More</Button>
            </div>
          </div>
          <div className="text-center mt-36">
            <h1 className="text-3xl my-4  font-bold ">Features that Empower You</h1>
            <p className="text-gray-400 max-w-md mx-auto">Everything you need to transform your goals into achievable milestones</p>
          </div>
        </div>
      </div>
    </>
  );
}

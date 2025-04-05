import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Youtube, Quote, Instagram, Music, Link as LinkIcon } from "lucide-react";
import { useCreateMotivation } from "@/api/hooks/hook";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"

// Define separate schemas for each type
const videoSchema = z.object({
  type: z.literal("video"),
  link: z.string().url("Please enter a valid URL"),
  quote: z.literal("").optional()
});

const quoteSchema = z.object({
  type: z.literal("quote"),
  quote: z.string().min(10, "Quote must be at least 10 characters"),
  link: z.literal("").optional()
});

const formSchema = z.discriminatedUnion("type", [
  videoSchema,
  quoteSchema
]);

type FormValues = z.infer<typeof formSchema>;

export default function MotivationForm({ goalId }: { goalId: string }) {
  const [activeTab, setActiveTab] = useState<"video" | "quote">("video");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "video",
      link: "",
      quote: ""
    }
  });

  const queryClient = useQueryClient();
  const { mutate: createMotivation, isPending } = useCreateMotivation(goalId);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submissionData = {
      link: data.type === "video" ? data.link : undefined,
      quote: data.type === "quote" ? data.quote : undefined
    };

    createMotivation(submissionData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["goals", "motivation", goalId] });
        reset();
        toast.success(
          data.type === "video"
            ? "Video link added successfully!"
            : "Quote added successfully!"
        );
      },
      onError: (error) => {
        toast.error(error.message || "Failed to add motivation");
      }
    });
  };

  const videoLink = watch("link");
  const currentType = watch("type");

  const getPlatformIcon = (link?: string) => {
    if (!link) return <LinkIcon className="h-5 w-5 text-gray-400" />;
    if (link.includes("youtube.com") || link.includes("youtu.be")) {
      return <Youtube className="h-5 w-5 text-red-500" />;
    }
    if (link.includes("instagram.com")) {
      return <Instagram className="h-5 w-5 text-pink-500" />;
    }
    if (link.includes("tiktok.com")) {
      return <Music className="h-5 w-5 text-black" />;
    }
    return <LinkIcon className="h-5 w-5 text-gray-400" />;
  };

  const handleTabChange = (value: string) => {
    if (value === "video" || value === "quote") {
      setActiveTab(value);
      setValue("type", value);
      // Clear the opposite field
      if (value === "video") {
        setValue("quote", "", { shouldValidate: true });
      } else {
        setValue("link", "", { shouldValidate: true });
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Motivation</h2>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-gray-50 p-1 rounded-lg h-12">
            <TabsTrigger
              value="video"
              className="gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <Youtube className="h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger
              value="quote"
              className="gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <Quote className="h-4 w-4" />
              Quote
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <input type="hidden" {...register("type")} />

            <TabsContent value="video" className="space-y-4 outline-none">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Link
                </label>
                <div className="relative">
                  <Input
                    {...register("link")}
                    placeholder="Paste YouTube, Instagram, or TikTok link"
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-lg pr-10 transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {getPlatformIcon(videoLink)}
                  </div>
                </div>
                {errors.link && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.link.message}
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="quote" className="space-y-4 outline-none">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inspiring Quote
                </label>
                <div className="relative">
                  <textarea
                    {...register("quote")}
                    placeholder="Enter a motivational quote (minimum 10 characters)..."
                    className="min-h-[120px] w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                  <Quote className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                {errors.quote && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.quote.message}
                  </p>
                )}
              </div>
            </TabsContent>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                className="h-11 px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
              >
                Clear
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 px-6 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all"
              >
                {isPending ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  `Add ${currentType === "video" ? "Video" : "Quote"}`
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </div>
  );
}



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Youtube, Quote, Instagram, Music } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { usecreateMotivation } from "@/api/hooks/hook";
import { useQueryClient } from "@tanstack/react-query";


const formSchema = z.object({
  link: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().url("Please enter a valid URL").optional()
  ),
  quote: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().min(10, "Quote must be at least 10 characters").optional()
  ),
}).refine(data => data.link || data.quote, {
  message: "Please provide either a video link or a quote",
});
type FormValues = z.infer<typeof formSchema>;

export default function MotivationForm({ planId }: { planId: string }) {
  const [activeTab, setActiveTab] = useState<"video" | "quote">("video");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const queryClient = useQueryClient()
  const { mutate, isPending, isError, data, error, isSuccess } = usecreateMotivation(planId)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { link, quote } = data
      // Simulate API call
      console.log("Submitting:", { ...data, planId });
      console.log("m", data, link)
      if (quote) {
        console.log("Quote", quote)
      }
      mutate(data)
      // Show success toast
      toast({
        title: "Motivation submitted successfully!",
        description: data.link
          ? "Your video link has been added."
          : "Your quote has been added.",
      });

      // Reset form
      setValue("link", "");
      setValue("quote", "");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit motivation. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isError) {
    console.log("E", error)
  }

  if (isSuccess) {

    queryClient.invalidateQueries({ queryKey: ["plans", "motivation"] })
    console.log("DAT", data)

  }

  const videoLink = watch("link");

  const getPlatformIcon = (link: string) => {
    if (link.includes("youtube.com") || link.includes("youtu.be")) {
      return <Youtube className="h-5 w-5" />;
    }
    if (link.includes("instagram.com")) {
      return <Instagram className="h-5 w-5" />;
    }
    if (link.includes("tiktok.com")) {
      return <Music className="h-5 w-5" />;
    }
    return null;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "video" | "quote")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="video" className="gap-2">
            <Youtube className="h-4 w-4" />
            Video
          </TabsTrigger>
          <TabsTrigger value="quote" className="gap-2">
            <Quote className="h-4 w-4" />
            Quote
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <TabsContent value="video" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Paste your YouTube, Instagram, or TikTok link
              </label>
              <div className="relative">
                <Input
                  {...register("link")}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="pr-10"
                />
                {videoLink && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {getPlatformIcon(videoLink)}
                  </div>
                )}
              </div>
              {errors.link && (
                <p className="text-sm text-destructive mt-1">
                  {errors.link.message}
                </p>
              )}


              {errors.root && (
                <p className="text-sm text-destructive mt-1">{errors.root.message}</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="quote" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Write your motivation quote
              </label>
              <Input
                {...register("quote")}
                placeholder="Enter your inspiring quote..."
              />
              {errors.quote && (
                <p className="text-sm text-destructive mt-1">
                  {errors.quote.message}
                </p>
              )}
            </div>
          </TabsContent>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setValue("link", "");
                setValue("quote", "");
              }}
            >
              Clear
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}

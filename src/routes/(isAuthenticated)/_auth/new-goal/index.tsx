import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/(isAuthenticated)/_auth/new-goal/")({
  component: GoalFormPage,
});

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Calendar, Target, Upload } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCreategoal } from "@/api/hooks/hook";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters.",
    })
    .max(50, {
      message: "Title must not exceed 50 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  due_date: z
    .date({
      required_error: "Due date is required.",
    })
    .refine((date) => date > new Date(), {
      message: "Due date must be in the future.",
    }),
});

export default function GoalFormPage() {
  const router = useRouter();
  const [cover_image, setCover_image] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const queryClient = useQueryClient()
  const onSucess = () => {
    queryClient.invalidateQueries({ queryKey: ["goals"] })
  }

  const { mutate, isPending, isSuccess, data, isError, error } = useCreategoal(onSucess)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!cover_image) return;

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('status', 'ACTIVE');
    formData.append('due_date', values.due_date.toISOString().split('T')[0]);

    // Critical Fix 1: Add file type explicitly like cURL does
    formData.append(
      'cover_image',
      new File([cover_image], cover_image.name, { type: 'image/png' }), // Explicit MIME type
      cover_image.name
    );

    mutate(formData)
  };

  if (isError) {
    console.log("ER", error)
    toast.error(error.message)
  }

  if (isSuccess) {
    console.log("ddd", data)
    toast.success(data.message)
    router.navigate({ to: "/dashboard/goal/$goalId", params: { goalId: data.goal_id } })
  }


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCover_image(file)
      const reader = new FileReader();
      console.log("fl", reader)
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-8"
    >
      {/* Header with back button */}
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="lg"
          className="text-primary hover:bg-primary/10 gap-2"
          onClick={() => router.navigate({ to: "/dashboard" })}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Button>
        <div className="ml-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Create New Goal
          </h1>
        </div>
      </div>

      <div className="bg-background rounded-xl shadow-sm border border-border p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Title field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-goal-600 font-semibold">Goal Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Master React in 3 months"
                      {...field}
                      className="h-12 text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-goal-600 font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What do you want to achieve? Why is this goal important to you?"
                      className="min-h-40 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date field */}
            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-goal-600 font-semibold">
                    Target Completion Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-12 pl-3 text-left font-normal text-base",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <Calendar className="mr-3 h-5 w-5" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select a target date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="border-0"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image Upload */}
            <div className="space-y-3">
              <Label className="text-goal-600 font-medium">Cover Image (Optional)</Label>
              <div className="relative group">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-xl p-6 text-center transition-colors",
                    previewImage
                      ? "border-primary/20"
                      : "border-border hover:border-primary/40",
                  )}
                >
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                        onClick={() => setPreviewImage(null)}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="p-4 rounded-full bg-primary/10">
                          <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Drag and drop an image here
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            or click to browse files (max 5MB)
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  <Input
                    id="cover-image"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                size="lg"
                className="px-8 py-6 text-base font-medium"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block"
                    >
                      <Target className="h-5 w-5" />
                    </motion.span>
                    Creating Goal...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Create Goal
                  </span>
                )}

              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}

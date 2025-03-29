import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { client } from "@/api/client/client";
import { useAuthStore } from "@/store/auth";

const formSchema = z.object({
    firstname: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastname: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    bio: z.string().max(500, {
        message: "Bio must not exceed 500 characters.",
    }),
});

export default function ProfileForm() {
    const { user, setUser } = useAuthStore();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: user?.first_name || "",
            lastname: user?.last_name || "",
            bio: user?.bio || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);

            // Log the payload for debugging
            console.log("Submitting profile update:", values);

            const updatedUser = await client.updateUserProfile({
                firstname: values.firstname,
                lastname: values.lastname,
                bio: values.bio
            });

            setUser(updatedUser);

            toast({
                title: "Success!",
                description: "Your profile has been updated.",
                variant: "default",
            });
        } catch (error: any) {
            console.error("Profile update error:", error);

            let errorMessage = "Failed to update profile";
            if (error.response) {
                // Handle different error statuses
                if (error.response.status === 401) {
                    errorMessage = "Please login again";
                } else if (error.response.data?.detail) {
                    errorMessage = error.response.data.detail;
                }
            }

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    } return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your first name"
                                        {...field}
                                        className="rounded-lg"
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your last name"
                                        {...field}
                                        className="rounded-lg"
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us about yourself..."
                                    className="rounded-lg min-h-[120px]"
                                    {...field}
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="rounded-lg px-6"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
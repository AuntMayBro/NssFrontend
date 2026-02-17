
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getRegistrationByEnrollment, getRegistrationByMobile } from "@/utils/registrationUtils";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    identifier: z.string().min(1, "Please enter your Mobile or Enrollment Number"),
});

export const StatusCheck = () => {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        setResult(null);
        try {
            // Try fetching by mobile first
            let data = await getRegistrationByMobile(values.identifier);

            // If not found, try by enrollment
            if (!data) {
                data = await getRegistrationByEnrollment(values.identifier);
            }

            if (data) {
                setResult(data);
                toast.success("Registration found!");
            } else {
                toast.error("No registration found with this detail.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to check status. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Check Registration Status</CardTitle>
                <CardDescription>
                    Enter your Mobile Number or Enrollment Number to find your NSS Registration ID.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mobile or Enrollment Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter number..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Check Status
                        </Button>
                    </form>
                </Form>

                {result && (
                    <div className="mt-6 p-4 bg-secondary/20 rounded-lg border border-secondary">
                        <h3 className="font-semibold text-lg text-primary mb-2">Registration Details Found</h3>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Name:</span> {result.studentName}</p>
                            <p><span className="font-medium">NSS ID:</span> {result.nssRegistrationNumber}</p>
                            <p><span className="font-medium">Enrollment:</span> {result.enrollmentNumber}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

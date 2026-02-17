
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { saveRegistration } from "@/utils/registrationUtils";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Validation Schema
const formSchema = z.object({
    studentName: z.string().min(2, "Name is required"),
    fathersName: z.string().min(2, "Father's Name is required"),
    mothersName: z.string().min(2, "Mother's Name is required"),
    dob: z.string().min(1, "Date of Birth is required"),
    gender: z.string().min(1, "Gender is required"),
    category: z.string().min(1, "Category is required"),
    branch: z.string().min(1, "Branch is required"),
    year: z.string().min(1, "Year is required"),
    enrollmentNumber: z.string().regex(/^DE\d{5}$/, "Enrollment Number must be in format DEYYXXX (e.g., DE23094)"),
    mobileNumber: z.string().length(10, "Mobile Number must be 10 digits"),
    collegeEmail: z.string().email("Invalid college email address"),
    personalEmail: z.string().email("Invalid personal email address"),
    bloodGroup: z.string().min(1, "Blood Group is required"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    certificate: z.string().min(1, "Certificate selection is required"),
});

export const RegistrationForm = () => {
    const [loading, setLoading] = useState(false);
    const [successId, setSuccessId] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentName: "",
            fathersName: "",
            mothersName: "",
            dob: "",
            gender: "",
            category: "",
            branch: "",
            year: "",
            enrollmentNumber: "",
            mobileNumber: "",
            collegeEmail: "",
            personalEmail: "",
            bloodGroup: "",
            address: "",
            certificate: "None",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const result = await saveRegistration(values as any);
            setSuccessId(result.nssRegistrationNumber);
            toast.success("Registration successful!");
            form.reset();
        } catch (error) {
            console.error(error);
            toast.error("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (successId) {
        return (
            <Card className="w-full max-w-2xl mx-auto border-green-500/50 bg-green-500/10">
                <CardHeader>
                    <CardTitle className="text-green-700">Registration Successful!</CardTitle>
                    <CardDescription>
                        You have been successfully registered as an NSS Volunteer.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-6 bg-background rounded-lg border text-center">
                        <p className="text-sm text-muted-foreground mb-1">Your NSS Registration Number</p>
                        <p className="text-3xl font-bold text-primary">{successId}</p>
                    </div>
                    <Button onClick={() => setSuccessId(null)} className="w-full">
                        Register Another Volunteer
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>NSS Volunteer Registration Form</CardTitle>
                <CardDescription>Please fill in all the details correctly.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Details */}
                            <FormField
                                control={form.control}
                                name="studentName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Student Name</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <FormControl><Input type="date" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fathersName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Father's Name</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="mothersName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mother's Name</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="GEN">GEN</SelectItem>
                                                <SelectItem value="OBC">OBC</SelectItem>
                                                <SelectItem value="SC">SC</SelectItem>
                                                <SelectItem value="ST">ST</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bloodGroup"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blood Group</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select Blood Group" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="A+">A+</SelectItem>
                                                <SelectItem value="A-">A-</SelectItem>
                                                <SelectItem value="B+">B+</SelectItem>
                                                <SelectItem value="B-">B-</SelectItem>
                                                <SelectItem value="AB+">AB+</SelectItem>
                                                <SelectItem value="AB-">AB-</SelectItem>
                                                <SelectItem value="O+">O+</SelectItem>
                                                <SelectItem value="O-">O-</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Academic Details */}
                            <FormField
                                control={form.control}
                                name="branch"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Branch</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select Branch" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="CS">CS</SelectItem>
                                                <SelectItem value="IT">IT</SelectItem>
                                                <SelectItem value="ETC">ETC</SelectItem>
                                                <SelectItem value="EI">EI</SelectItem>
                                                <SelectItem value="Mech">Mech</SelectItem>
                                                <SelectItem value="Civil">Civil</SelectItem>
                                                <SelectItem value="Computer Science and Business Studies">Computer Science and Business Studies</SelectItem>
                                                <SelectItem value="Bachelors of Design">Bachelors of Design</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select Year" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1st Year">1st Year</SelectItem>
                                                <SelectItem value="2nd Year">2nd Year</SelectItem>
                                                <SelectItem value="3rd Year">3rd Year</SelectItem>
                                                <SelectItem value="4th Year">4th Year</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="enrollmentNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enrollment Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                                placeholder="DE23094"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Contact Details */}
                            <FormField
                                control={form.control}
                                name="mobileNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mobile Number</FormLabel>
                                        <FormControl><Input type="tel" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="collegeEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>College Email ID</FormLabel>
                                        <FormControl><Input type="email" placeholder="username@ietdavv.edu.in" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="personalEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Personal Email ID</FormLabel>
                                        <FormControl><Input type="email" placeholder="example@gmail.com" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl><Textarea className="resize-none" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="certificate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Do you have A, B, or C certificate?</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><SelectValue placeholder="Select Certificate" /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="None">None</SelectItem>
                                                    <SelectItem value="A">A Certificate</SelectItem>
                                                    <SelectItem value="B">B Certificate</SelectItem>
                                                    <SelectItem value="C">C Certificate</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Registration
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

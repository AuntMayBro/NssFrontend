
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { isRegistrationOpen, REGISTRATION_OPEN_DATE, REGISTRATION_CLOSE_DATE } from "@/config/registrationConfig";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarX2 } from "lucide-react";

const RegistrationPage = () => {
    const isOpen = isRegistrationOpen();

    if (!isOpen) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <Card className="w-full max-w-md border-red-200 bg-red-50 dark:bg-red-900/10">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-fit mb-4">
                            <CalendarX2 className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </div>
                        <CardTitle className="text-red-700 dark:text-red-400">Registration Closed</CardTitle>
                        <CardDescription className="text-red-600/80 dark:text-red-400/80">
                            NSS Volunteer Registration is currently not accepting new entries.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-2 text-sm text-muted-foreground">
                        <p>
                            Registration was open from{" "}
                            <span className="font-medium text-foreground">
                                {format(REGISTRATION_OPEN_DATE, "PPP")}
                            </span>{" "}
                            to{" "}
                            <span className="font-medium text-foreground">
                                {format(REGISTRATION_CLOSE_DATE, "PPP")}
                            </span>.
                        </p>
                        <p>Please contact the NSS unit for further queries.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">NSS Volunteer Registration</h1>
                    <p className="text-muted-foreground">
                        Join the National Service Scheme and contribute to society.
                    </p>
                </div>
                <RegistrationForm />
            </div>
        </div>
    );
};

export default RegistrationPage;


import { StatusCheck } from "@/components/registration/StatusCheck";

const CheckRegistrationPage = () => {
    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Check Registration</h1>
                    <p className="text-muted-foreground">
                        Verify your NSS Volunteer status and get your ID.
                    </p>
                </div>
                <StatusCheck />
            </div>
        </div>
    );
};

export default CheckRegistrationPage;

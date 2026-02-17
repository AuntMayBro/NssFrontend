
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, UserPlus, Search } from "lucide-react";
import { ReactNode } from "react";

interface JoinNSSDialogProps {
    trigger: ReactNode;
}

export const JoinNSSDialog = ({ trigger }: JoinNSSDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Join National Service Scheme</DialogTitle>
                    <DialogDescription>
                        Choose an option to proceed with your volunteer journey.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <a
                        href="/registration"
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <UserPlus className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-foreground">New Registration</p>
                                <p className="text-sm text-muted-foreground">
                                    Register as a new volunteer
                                </p>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                        href="/check-registration"
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Search className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-foreground">
                                    Know Registration Number
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Find your existing ID
                                </p>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    );
};

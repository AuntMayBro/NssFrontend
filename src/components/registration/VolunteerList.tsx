
import { useState, useEffect, useMemo } from "react";
import { getVolunteersBySession, VolunteerData } from "@/utils/registrationUtils";
import { Copy, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CURRENT_SESSION } from "@/config/registrationConfig";
import { toast } from "sonner";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Button } from "../ui/button";

const VolunteerList = () => {
    const [session, setSession] = useState(CURRENT_SESSION);
    const [volunteers, setVolunteers] = useState<VolunteerData[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchVolunteers = async () => {
            setLoading(true);
            try {
                const data = await getVolunteersBySession(session);
                setVolunteers(data);
            } catch (error) {
                console.error("Failed to fetch volunteers:", error);
                toast.error("Failed to load volunteers.");
            } finally {
                setLoading(false);
            }
        };

        fetchVolunteers();
    }, [session]);

    const filteredVolunteers = useMemo(() => {
        return volunteers.filter((v) =>
            v.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.nssRegistrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.branch.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [volunteers, searchTerm]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <div className="container mx-auto px-4 py-24 flex-grow">
                <Card className="w-full shadow-lg">
                    <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-2xl font-heading text-nss-navy">NSS Volunteers List</CardTitle>
                            <CardDescription>
                                View registered volunteers for the selected session.
                            </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Select value={session} onValueChange={setSession}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Session" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from(new Set([CURRENT_SESSION, "2024-25", "2025-26"])).sort().reverse().map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search name, ID, branch..."
                                    className="pl-8 w-full sm:w-[250px]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-nss-navy" />
                            </div>
                        ) : filteredVolunteers.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                No volunteers found for this session.
                            </div>
                        ) : (
                            <div className="rounded-md border overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
                                        <tr>
                                            <th className="p-4">NSS ID</th>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Branch/Year</th>
                                            <th className="p-4 hidden md:table-cell">Contact</th>
                                            <th className="p-4 hidden lg:table-cell">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {filteredVolunteers.map((volunteer) => (
                                            <tr key={volunteer.nssRegistrationNumber} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4 font-mono font-medium text-nss-blue">
                                                    {volunteer.nssRegistrationNumber}
                                                </td>
                                                <td className="p-4 font-medium text-gray-900">
                                                    {volunteer.studentName}
                                                    <div className="text-xs text-gray-500 md:hidden">
                                                        {volunteer.enrollmentNumber}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-gray-600">
                                                    {volunteer.branch}
                                                    <span className="text-gray-400 mx-1">•</span>
                                                    {volunteer.year}
                                                </td>
                                                <td className="p-4 hidden md:table-cell text-gray-600">
                                                    {volunteer.mobileNumber}
                                                </td>
                                                <td className="p-4 hidden lg:table-cell text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <span className="truncate max-w-[200px]" title={volunteer.collegeEmail}>
                                                            {volunteer.collegeEmail}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() => copyToClipboard(volunteer.collegeEmail)}
                                                        >
                                                            <Copy className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <div className="mt-4 text-sm text-gray-500 text-right">
                            Total Volunteers: {filteredVolunteers.length}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default VolunteerList;

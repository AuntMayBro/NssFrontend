
import { client } from "@/lib/sanity";
import { getCurrentSession } from "@/config/registrationConfig";

export interface VolunteerData {
    _type: "volunteer";
    studentName: string;
    fathersName: string;
    mothersName: string;
    dob: string;
    gender: string;
    category: string;
    branch: string;
    year: string;
    enrollmentNumber: string;
    mobileNumber: string;
    collegeEmail: string;
    personalEmail: string;
    bloodGroup: string;
    address: string;
    certificate: string;
    nssRegistrationNumber?: string;
    registrationDate?: string;
    session?: string;
}

export const generateRegistrationId = async (gender: string, session: string): Promise<string> => {
    // Format: NSS/{session}/{GenderCode}/{Number}
    // Boys (Male) -> B -> Start 1001
    // Girls (Female) -> G -> Start 2001
    // Others -> O -> Start 3001

    let code = "O";
    let startNum = 3001;

    if (gender === "Male") {
        code = "B";
        startNum = 1001;
    } else if (gender === "Female") {
        code = "G";
        startNum = 2001;
    }

    // Prefix to search for in the database (e.g., "NSS/2024-25/B/")
    const prefix = `NSS/${session}/${code}/`;

    // Query to find the latest registration number with this prefix
    // We sort by nssRegistrationNumber descending to get the registered one with highest number
    const query = `*[_type == "volunteer" && nssRegistrationNumber match "${prefix}*"] | order(nssRegistrationNumber desc)[0]`;
    const lastVolunteer = await client.fetch(query);

    let nextNum = startNum;

    if (lastVolunteer && lastVolunteer.nssRegistrationNumber) {
        // Extract the number part: NSS/2024-25/B/1005 -> 1005
        const parts = lastVolunteer.nssRegistrationNumber.split("/");
        const lastNumStr = parts[parts.length - 1]; // Get the last segment
        const lastNum = parseInt(lastNumStr, 10);

        if (!isNaN(lastNum)) {
            nextNum = lastNum + 1;
        }
    }

    return `${prefix}${nextNum}`;
};

export const saveRegistration = async (data: Omit<VolunteerData, "_type">) => {
    try {
        await checkDuplicateRegistration(
            data.mobileNumber,
            data.enrollmentNumber,
            data.collegeEmail,
            data.personalEmail,
            getCurrentSession()
        );

        const nssRegistrationNumber = await generateRegistrationId(data.gender, getCurrentSession());

        const doc = {
            _type: "volunteer",
            ...data,
            nssRegistrationNumber,
            session: getCurrentSession(),
            registrationDate: new Date().toISOString(),
        };

        const result = await client.create(doc);
        return result;
    } catch (error) {
        console.error("Error saving registration:", error);
        throw error;
    }
};

export const getRegistrationByMobile = async (mobile: string) => {
    const query = `*[_type == "volunteer" && mobileNumber == $mobile][0]`;
    return await client.fetch(query, { mobile });
};

export const getRegistrationByEnrollment = async (enrollment: string) => {
    const query = `*[_type == "volunteer" && enrollmentNumber == $enrollment][0]`;
    return await client.fetch(query, { enrollment });
};

export const checkDuplicateRegistration = async (
    mobile: string,
    enrollment: string,
    collegeEmail: string,
    personalEmail: string,
    session: string
) => {
    const query = `*[_type == "volunteer" && session == $session && (
        mobileNumber == $mobile || 
        enrollmentNumber == $enrollment || 
        collegeEmail == $collegeEmail || 
        personalEmail == $personalEmail
    )][0]`;

    const params = { mobile, enrollment, collegeEmail, personalEmail, session };
    const result = await client.fetch(query, params);

    if (result) {
        if (result.mobileNumber === mobile) throw new Error(`Mobile number already registered for session ${session}.`);
        if (result.enrollmentNumber === enrollment) throw new Error(`Enrollment number already registered for session ${session}.`);
        if (result.collegeEmail === collegeEmail) throw new Error(`College email already registered for session ${session}.`);
        if (result.personalEmail === personalEmail) throw new Error(`Personal email already registered for session ${session}.`);
        throw new Error(`Duplicate registration found for session ${session}.`);
    }
};

export const getVolunteersBySession = async (session: string) => {
    // Orders by registration number (descending) so newest first, or ascending as preferred.
    // Assuming NSS-YYYY-XXXX format, sorting by nssRegistrationNumber works.
    const query = `*[_type == "volunteer" && session == $session] | order(nssRegistrationNumber asc)`;
    return await client.fetch(query, { session });
};

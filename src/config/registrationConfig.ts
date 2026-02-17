// Calculate session based on April-March cycle
export const getCurrentSession = (): string => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = Jan, 3 = April

    let startYear = currentYear;
    // If before April (0, 1, 2), it belongs to the previous academic start year
    if (currentMonth < 3) {
        startYear = currentYear - 1;
    }

    const endYear = startYear + 1;
    // Format: YYYY-YY (e.g., 2024-25)
    return `${startYear}-${endYear.toString().slice(-2)}`;
};

export const CURRENT_SESSION = getCurrentSession();

export const REGISTRATION_OPEN_DATE = new Date("2024-01-01T00:00:00");
export const REGISTRATION_CLOSE_DATE = new Date("2026-12-31T23:59:59");

export const isRegistrationOpen = (): boolean => {
    const now = new Date();
    return now >= REGISTRATION_OPEN_DATE && now <= REGISTRATION_CLOSE_DATE;
};

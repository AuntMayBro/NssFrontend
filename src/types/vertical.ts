export interface Vertical {
    _id: string;
    title: string;
    order: number;
    description?: string;
    currentHead?: {
        name: string;
        image: string;
        email?: string;
        linkedin?: string;
    };
}

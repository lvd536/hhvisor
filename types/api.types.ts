export interface IVacancyResponse {
    items: IVacancy[];
    clusters: ICluster[];
    found: number;
    pages: number;
    page: number;
    per_page: number;
    arguments: string | null | string[];
    fixes: string | null | string[];
    suggests: string | null | string[];
    alternate_url: string | null;
}

export type IAreasResponse = IArea[];

export interface IVacancy {
    id: string;
    premium: boolean;
    name: string;
    department: string;
    has_test: boolean;
    response_letter_required: boolean;
    area: {
        id: string;
        name: string;
        url: string;
    };
    salary: {
        from: number | null;
        to: number | null;
        currency: string;
        gross: boolean;
    };
    salary_range: {
        from: number | null;
        to: number | null;
        currency: string;
        gross: boolean;
    };
    mode: {
        id: string;
        name: string;
    };
    frequency: string | null;
    type: {
        id: string;
        name: string;
    };
    address: string | null;
    response_url: string | null;
    sort_point_distance: string | null;
    published_at: Date;
    created_at: Date;
    archived: boolean;
    apply_alternate_url: string;
    show_logo_in_search: boolean;
    show_contacts: boolean;
    url: string;
    alternate_url: string;
    relations: string[];
    employer: {
        id: string;
        name: string;
        url: string;
    };
    snippet: {
        requirement: string | null;
        responsibility: string | null;
    };
    contacts: null | string | string[];
    schedule: {
        id: string;
        name: string;
    };
    work_format: {
        id: string;
        name: string;
    }[];
    working_hours: {
        id: string;
        name: string;
    }[];
    work_schedule_by_days: {
        id: string;
        name: string;
    }[];
    accept_labor_contract: boolean;
    night_shifts: boolean;
    professional_roles: {
        id: string;
        name: string;
    }[];
    accept_incomplete_resumes: boolean;
    experience: {
        id: string;
        name: string;
    };
    employment: {
        id: string;
        name: string;
    };
    employment_form: {
        id: string;
        name: string;
    };
    internship: boolean;
    adv_response_url: string | null;
    is_adv_vacancy: boolean;
    adv_context: string | null;
}
export interface IArea {
    id: string;
    parent_id: string | null;
    name: string;
    utc_offset?: string;
    lat: number;
    lng: number;
    areas: IArea[];
}

interface ICluster {
    name: string;
    id:
        | "area"
        | "metro"
        | "industry"
        | "experience"
        | "label"
        | "professional_role"
        | "district"
        | "education"
        | "accept_temporary"
        | "employment_form"
        | "work_schedule_by_days"
        | "working_hours"
        | "work_format"
        | "salary_frequency"
        | "driver_license_types";
    items: { name: string; url: string; count: number }[];
}

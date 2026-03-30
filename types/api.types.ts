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
    employer: Employer;
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

export interface IDetailedVacancy extends Omit<IVacancy, "address"> {
    address: {
        city?: string | null;
        street?: string | null;
        building?: string | null;
        lat: number | null;
        lng: number | null;
        description?: string | null;
        raw?: string | null;
        metro?: IMetro;
        metro_stations?: IMetro[];
    };
    allow_messages: boolean;
    description?: string | null;
    key_skills: { name: string }[];
}

interface IMetro {
    station_name?: string | null;
    line_name?: string | null;
    station_id?: string | null;
    line_id?: string | null;
    lat: number | null;
    lng: number | null;
}

interface Employer {
    id: string;
    name: string;
    url: string;
    logo_urls?: {
        90?: string;
        240?: string;
        original?: string;
    };
}

export interface IDetailedEmployer extends Employer {
    accredited_it_employer: boolean;
    alternate_url: string;
    description: string | null;
    open_vacancies: number | null;
    trusted: boolean;
    is_identified_by_esia: boolean;
    industries: { id: string; name: string }[];
    site_url: string | null;
}

export type DictionaryItem = {
    id: string;
    name: string;
};

export type DictionaryItemWithUid = DictionaryItem & {
    uid: string;
};

export type DictionaryItemWithDuration = DictionaryItem & {
    duration: "PERMANENT" | "TEMPORARY";
};

export type CurrencyItem = {
    code: string;
    abbr: string;
    name: string;
    default: boolean;
    rate: number;
    in_use: boolean;
};

export type DriverLicenseTypeItem = {
    id: "A" | "B" | "C" | "D" | "E" | "BE" | "CE" | "DE" | "TM" | "TB";
};

export type DictionariesResponse = {
    resume_access_type: DictionaryItem[];
    vacancy_search_order: DictionaryItem[];
    vacancy_search_fields: DictionaryItem[];
    vacancy_search_employment_form: DictionaryItem[];
    gender: DictionaryItem[];
    preferred_contact_type: DictionaryItem[];
    travel_time: DictionaryItem[];
    relocation_type: DictionaryItem[];
    business_trip_readiness: DictionaryItem[];
    resume_contacts_site_type: DictionaryItem[];
    employer_type: DictionaryItem[];
    employer_relation: DictionaryItem[];
    negotiations_state: DictionaryItem[];
    applicant_negotiation_status: DictionaryItem[];
    negotiations_participant_type: DictionaryItem[];
    negotiations_order: DictionaryItem[];
    resume_moderation_note: DictionaryItem[];
    vacancy_relation: DictionaryItem[];
    resume_status: DictionaryItem[];
    resume_search_logic: DictionaryItem[];
    resume_search_fields: DictionaryItem[];
    messaging_status: DictionaryItem[];
    employer_active_vacancies_order: DictionaryItem[];
    employer_archived_vacancies_order: DictionaryItem[];
    employer_hidden_vacancies_order: DictionaryItem[];
    applicant_comments_order: DictionaryItem[];
    vacancy_not_prolonged_reason: DictionaryItem[];
    resume_hidden_fields: DictionaryItem[];
    phone_call_status: DictionaryItem[];
    linked_socials: DictionaryItem[];
    vacancy_label: DictionaryItem[];
    experience: DictionaryItem[];
    employment: DictionaryItem[];
    schedule: DictionaryItemWithUid[];
    education_level: DictionaryItem[];
    currency: CurrencyItem[];
    vacancy_billing_type: DictionaryItem[];
    applicant_comment_access_type: DictionaryItem[];
    vacancy_cluster: DictionaryItem[];
    driver_license_types: DriverLicenseTypeItem[];
    language_level: DictionaryItem[];
    working_days: DictionaryItem[];
    working_time_intervals: DictionaryItem[];
    working_time_modes: DictionaryItem[];
    vacancy_type: DictionaryItem[];
    job_search_statuses_applicant: DictionaryItem[];
    job_search_statuses_employer: DictionaryItem[];
    employment_form: DictionaryItemWithDuration[];
    work_format: DictionaryItem[];
    resume_employment_form: DictionaryItem[];
    resume_work_format: DictionaryItem[];
    working_hours: DictionaryItem[];
    fly_in_fly_out_duration: DictionaryItem[];
    work_schedule_by_days: DictionaryItem[];
    salary_range_mode: DictionaryItem[];
    salary_range_frequency: DictionaryItem[];
    age_restriction: DictionaryItem[];
    civil_law_contracts: DictionaryItem[];
    resume_search_label: DictionaryItem[];
    resume_search_relocation: DictionaryItem[];
    resume_search_order: DictionaryItem[];
    resume_search_experience_period: DictionaryItem[];
};

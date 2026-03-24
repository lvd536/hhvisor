import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPublishedAt(createdAt: Date | number) {
    const start = new Date(createdAt);
    const end = new Date();

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const diffInMs = end.getTime() - start.getTime();

    const hours = Math.floor(diffInMs / (1000 * 60 * 60)) % 24;

    let result = "Published ";
    if (years) result += `${years}y `;
    if (months) result += `${months}m `;
    if (days) result += `${days}d `;
    if (hours) result += hours > 0 ? `${hours}h ` : "few minutes";
    return `${result} ago`;
}
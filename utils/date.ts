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

export function getMonthDaysRanges() {
    const pad = (n: number) => String(n).padStart(2, "0");

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);

    const format = (d: Date) =>
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    return {
        from: format(start),
        to: format(end),
        daysInMonth: end.getDate(),
    };
}

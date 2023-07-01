import AgileDevelopment from "./agile-development.md";
import ZeroDayVulnerability from "./zero-day-vulnerability.md";
import NotAvailable from "./not-available.md";

export function getCorrespondingReadMe(reference: string) {
    switch (reference) {
        case 'agile-development':
            return AgileDevelopment
        case 'zero-day-vulnerability':
            return ZeroDayVulnerability
        default:
            return NotAvailable
    }
}
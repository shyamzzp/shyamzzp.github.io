import AgileDevelopment from "./agile-development.md";
import NotAvailable from "./not-available.md";

export function getCorrespondingReadMe(reference: string) {
    switch (reference) {
        case 'agile-development':
            return AgileDevelopment
        default:
            return NotAvailable
    }
}
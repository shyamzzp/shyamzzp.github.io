import AgileDevelopment from "./agile-development.md";
import GithubSite from "./github-site.md";
import ZeroDayVulnerability from "./zero-day-vulnerability.md";
import NotAvailable from "./not-available.md";

export function getGlossaryReadMe(reference: string) {
    switch (reference) {
        case 'agile-development':
            return AgileDevelopment
        case 'zero-day-vulnerability':
            return ZeroDayVulnerability
        default:
            return NotAvailable
    }
}

export function getBlogReadMe(reference: string) {
    switch (reference) {
        case 'github-site':
            return GithubSite
        case 'zero-day-vulnerability':
            return ZeroDayVulnerability
        default:
            return NotAvailable
    }
}
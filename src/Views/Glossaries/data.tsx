export const data = [
    { title: "Agile Development", reference: "agile-development" },
    { title: "API (Application Programming Interface)", reference: "api-application-programming-interface" },
    { title: "Algorithm", reference: "algorithm" },
    { title: "Bug", reference: "bug" },
    { title: "Continuous Integration/Continuous Delivery (CI/CD)", reference: "continuous-integration-continuous-delivery-ci-cd" },
    { title: "Debugging", reference: "debugging" },
    { title: "Dependency Injection", reference: "dependency-injection" },
    { title: "Framework", reference: "framework" },
    { title: "Git", reference: "git" },
    { title: "IDE (Integrated Development Environment)", reference: "ide-integrated-development-environment" },
    { title: "Object-Oriented Programming (OOP)", reference: "object-oriented-programming-oop" },
    { title: "Refactoring", reference: "refactoring" },
    { title: "Scrum", reference: "scrum" },
    { title: "Test-Driven Development (TDD)", reference: "test-driven-development-tdd" },
    { title: "UML (Unified Modeling Language)", reference: "uml-unified-modeling-language" },
    { title: "Version Control", reference: "version-control" },
    { title: "Waterfall Model", reference: "waterfall-model" },
    { title: "XML (eXtensible Markup Language)", reference: "xml-extensible-markup-language" },
    { title: "YAML (YAML Ain't Markup Language)", reference: "yaml-yaml-aint-markup-language" },
    { title: "Zero-day vulnerability", reference: "zero-day-vulnerability" },
];

export function SuffleData(data: any[]) {
    let i = data.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }
    return data;
}
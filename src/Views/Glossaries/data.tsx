export const data = [
    { title: "Agile Development", reference: "agile-development", level:GetRandomColor()},
    { title: "API (Application Programming Interface)", reference: "api-application-programming-interface", level:GetRandomColor() },
    { title: "Algorithm", reference: "algorithm", level:GetRandomColor() },
    { title: "Bug", reference: "bug", level:GetRandomColor() },
    { title: "Continuous Integration/Continuous Delivery (CI/CD)", reference: "continuous-integration-continuous-delivery-ci-cd", level:GetRandomColor() },
    { title: "Debugging", reference: "debugging", level:GetRandomColor() },
    { title: "Dependency Injection", reference: "dependency-injection", level:GetRandomColor() },
    { title: "Framework", reference: "framework", level:GetRandomColor() },
    { title: "Git", reference: "git", level:GetRandomColor() },
    { title: "IDE (Integrated Development Environment)", reference: "ide-integrated-development-environment", level:GetRandomColor() },
    { title: "Object-Oriented Programming (OOP)", reference: "object-oriented-programming-oop", level:GetRandomColor() },
    { title: "Refactoring", reference: "refactoring", level:GetRandomColor() },
    { title: "Scrum", reference: "scrum", level:GetRandomColor() },
    { title: "Test-Driven Development (TDD)", reference: "test-driven-development-tdd", level:GetRandomColor() },
    { title: "UML (Unified Modeling Language)", reference: "uml-unified-modeling-language", level:GetRandomColor() },
    { title: "Version Control", reference: "version-control", level:GetRandomColor() },
    { title: "Waterfall Model", reference: "waterfall-model", level:GetRandomColor() },
    { title: "XML (eXtensible Markup Language)", reference: "xml-extensible-markup-language", level:GetRandomColor() },
    { title: "YAML (YAML Ain't Markup Language)", reference: "yaml-yaml-aint-markup-language", level:GetRandomColor() },
    { title: "Zero-day vulnerability", reference: "zero-day-vulnerability", level:GetRandomColor() },
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

export function GetRandomColor() {
    const colors = [
        "rgb(255 45 85)",
        "rgb(45 181 93)",
        "rgb(255 184 0)",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
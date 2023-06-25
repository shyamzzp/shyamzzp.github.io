export const data = [
    { title: "Agile Development" },
    { title: "API (Application Programming Interface)" },
    { title: "Algorithm" },
    { title: "Bug" },
    { title: "Continuous Integration/Continuous Delivery (CI/CD)" },
    { title: "Debugging" },
    { title: "Dependency Injection" },
    { title: "Framework" },
    { title: "Git" },
    { title: "IDE (Integrated Development Environment)" },
    { title: "Object-Oriented Programming (OOP)" },
    { title: "Refactoring" },
    { title: "Scrum" },
    { title: "Test-Driven Development (TDD)" },
    { title: "UML (Unified Modeling Language)" },
    { title: "Version Control" },
    { title: "Waterfall Model" },
    { title: "XML (eXtensible Markup Language)" },
    { title: "YAML (YAML Ain't Markup Language)" },
    { title: "Zero-day vulnerability" },
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
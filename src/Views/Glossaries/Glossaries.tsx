import React from 'react'
import Glossary from '../../components/Glossary/Glossary'

export default function Glossaries() {
    return (
        <div>
            <p style={{ fontSize: '16px', color: '#4a4a4a', marginBottom: '20px', marginTop: '0' }}>Below is a deep dive into real-world scenarios where various technological solutions are implemented</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Glossary title="Agile Development" />
                <Glossary title="API (Application Programming Interface)" />
                <Glossary title="Algorithm" />
                <Glossary title="Bug" />
                <Glossary title="Continuous Integration/Continuous Delivery (CI/CD)" />
                <Glossary title="Debugging" />
                <Glossary title="Dependency Injection" />
                <Glossary title="Framework" />
                <Glossary title="Git" />
                <Glossary title="IDE (Integrated Development Environment)" />
                <Glossary title="Object-Oriented Programming (OOP)" />
                <Glossary title="Refactoring" />
                <Glossary title="Scrum" />
                <Glossary title="Test-Driven Development (TDD)" />
                <Glossary title="UML (Unified Modeling Language)" />
                <Glossary title="Version Control" />
                <Glossary title="Waterfall Model" />
                <Glossary title="XML (eXtensible Markup Language)" />
                <Glossary title="YAML (YAML Ain't Markup Language)" />
                <Glossary title="Zero-day vulnerability" />
            </div>
        </div>
    )
}
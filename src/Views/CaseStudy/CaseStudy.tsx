import React from 'react'
import CaseStudies from '../../components/CaseStudies/CaseStudies'

export default function CaseStudy() {
    return (
        <div style={{ width: '30%' }}>
            <p style={{ fontSize: '22px', color: '#4a4a4a', marginBottom: '0px', }}>🔍 Case Studies</p>
            <p style={{ fontSize: '16px', color: '#4a4a4a', marginBottom: '20px', marginTop: '0' }}>Below is a deep dive into real-world scenarios where various technological solutions are implemented</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <CaseStudies title="Netsuite" logo="netsuite" />
                <CaseStudies title="Zerodha" logo="zerodha" />
                <CaseStudies title="Git" logo="git" />
                <CaseStudies title="Pinterest" logo="pinterest" />
                <CaseStudies title="TailwindCSS" logo="tailwind" />
                <CaseStudies title="NextJS" logo="nextjs" />
                <CaseStudies title="NestJS" logo="nestjs" />
            </div>
        </div>
    )
}

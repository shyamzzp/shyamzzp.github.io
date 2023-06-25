import React from 'react'
import {SuffleData, data} from './data'
import Glossary from '../../components/Glossary/Glossary'

export default function Glossaries() {
    const suffledData = SuffleData(data);
    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                {suffledData.map((item, index) => (
                    <Glossary key={index} title={item.title} />
                ))}
            </div>
        </div>
    )
}
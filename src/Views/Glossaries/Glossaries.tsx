import React, { useEffect, useState } from 'react'
import {SuffleData, data} from './data'
import Glossary from '../../components/Glossary/Glossary'
import ReactMarkdown from 'react-markdown'
// import AgileDevelopmentMD from './agile-development.md'

export default function Glossaries() {
    const suffledData = SuffleData(data);
    // const [tosText, setTosText] = useState('')
    // useEffect(() => {
	// 	fetch(AgileDevelopmentMD).then(res => res.text()).then(text => setTosText(text))
	// })
    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                {suffledData.map((item, index) => (
                    <Glossary key={index} title={item.title} />
                ))}
            </div>
            {/*  */}
        </div>
    )
}
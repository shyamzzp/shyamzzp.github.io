import React from 'react'

function TitleDesc(props: any) {
    return (
        <>
            <p style={{ fontSize: '22px', color: '#4a4a4a', marginBottom: '0px', }}>{props.title}</p>
            <p style={{ fontSize: '16px', color: '#4a4a4a', marginBottom: '20px', marginTop: '0', maxWidth: '70%' }}>{props.desc}</p>
        </>)
} 

export default TitleDesc;
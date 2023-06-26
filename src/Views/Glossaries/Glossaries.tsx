import {SuffleData, data} from './data'
import Glossary from '../../components/Glossary/Glossary'

export default function Glossaries({setValue}:any) {
    const suffledData = SuffleData(data);
    const setReadMeFileContext = (data:string) => {
        setValue(data)
    }

    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }} >
                {suffledData.map((item, index) => (
                    <Glossary key={index} title={item.title} reference={item.reference} setReadMeFileContext={setReadMeFileContext}/>
                ))}
            </div>
        </div>
    )
}
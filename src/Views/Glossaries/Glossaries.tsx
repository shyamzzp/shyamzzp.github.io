import { createClient } from '@supabase/supabase-js'
import { SUPABASE_ENDPOINT, SUPABASE_PUBLIC_ANON_KEY } from '../../config'
import Glossary from '../../components/Glossary/Glossary'
import { useEffect, useState } from 'react'
import { Loader } from 'rsuite';
import { SuffleData } from './data'
const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_PUBLIC_ANON_KEY)

export default function Glossaries() {
    const [shuffledData, setShuffledData] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
                .from('Glossary')
                .select('*');
            if (error) {
                console.error(error);
            } else {
                setShuffledData(data);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }} >
                {SuffleData == null?<Loader size="md" content="Loading" style={{display:'flex', justifyContent:'center'}} />:null}
                {shuffledData.map((item) => (
                    <Glossary key={item.id} title={item.title} reference={item.reference} level={item.level} />
                ))}
            </div>
        </div>
    )
}
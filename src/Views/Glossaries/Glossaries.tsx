// import { SUPABASE_ENDPOINT, SUPABASE_PUBLIC_ANON_KEY } from '../../config'
import { useEffect, useState } from "react";
import { Loader } from "rsuite";
import Glossary from "../../components/Glossary/Glossary";
// const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_PUBLIC_ANON_KEY)

export default function Glossaries({ setValue }: any) {
  const [shuffledData, setShuffledData] = useState<any[]>([]);
  const setReadMeFileContext = (data: string) => {
    setValue(data);
  };
  useEffect(() => {
    setShuffledData([]);
    // async function fetchData() {
    //   const { data, error } = await supabase.from("Glossary").select("*");
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     setShuffledData(data);
    //   }
    // }
    // fetchData();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        {shuffledData.length === 0 ? (
          <Loader
            size="md"
            content="Fetching Data...."
            style={{ display: "flex", justifyContent: "center" }}
          />
        ) : null}
        {shuffledData.map((item) => (
          <Glossary
            key={item.id}
            title={item.title}
            reference={item.reference}
            level={item.level}
            setReadMeFileContext={setReadMeFileContext}
          />
        ))}
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { useState } from "react";
import { getVismiss } from "../../../Gets";

function VisMiss() {

  const [Vis, setVis] = useState(null)
  const [Mis, setMis] = useState(null)

  useEffect(() => {
    getVismiss().then(a => {
      setVis(a.data[0].vision)
      setMis(a.data[0].mission)
    })
  }, [])

  return (
    <div className="flex flex-col mt-10">
      <h3 className="text-teal-600">VISION & MISSION</h3>
      <h1 className="md:text-3xl text-2xl font-bold my-3">Do you know, <br />what's the PPI Sudan Vision and Mission?</h1>
      <div className="my-10">
        <h1 className="font-bold text-2xl">Vision</h1>
        {
          (Vis != null) && (<p className="mb-8 first-letter:ml-5 text-justify mt-10">{Vis}</p>)
        }
      </div>
      <hr />
      <div className="my-10">
        <h1 className="font-bold text-2xl">Mission</h1>
        <ul className="mt-8">
          {
            (Mis != null) && Mis.map((a, i) => {
              return (
                <li key={i} className="mb-4"><span className="font-bold mr-2">{i + 1}. </span>{a}</li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default VisMiss;
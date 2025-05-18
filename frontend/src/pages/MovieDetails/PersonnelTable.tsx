import { Personnel } from "models/Personnel";
import { useEffect, useState } from "react";
import get from "services/fetching/Get";
import { getPersonnelByMovieRequest } from "services/fetching/API";

export interface PersonnelTableProps {
  id?: string;
}

const separator = <div className="border-cinebhdarkred border-l-[1.5px] h-full"></div>

export default function PersonnelTable({ id }: PersonnelTableProps) {
  const [directors, setDirectors] = useState<Array<Personnel>>();
  const [writers, setWriters] = useState<Array<Personnel>>();
  const [cast, setCast] = useState<Array<Personnel>>();

  useEffect(() => {
    if(!id) return;

    get<Array<Personnel>>(getPersonnelByMovieRequest(id)).then((personnel) => {
      const resDirectors = personnel.filter((personnel) => personnel.role === "DIRECTOR");
      const resWriters = personnel.filter((personnel) => personnel.role === "WRITER");
      const resCast = personnel.filter((personnel) => personnel.role === "CAST");

      setDirectors(resDirectors);
      setWriters(resWriters);
      setCast(resCast);
    })
  }, [id])

  function getPersonnelString(personnel?: Array<Personnel>) {
    return (
      <div className="text-cinebhdarkgray">
        {personnel?.map((person, index) => {
          const isLast = index === personnel.length - 1;
          return person.name + (!isLast ? ", " : "");
        })}
      </div>
    );
  }

  function getCastTable(cast?: Array<Personnel>) {
    return cast?.map((actor) => {
      return(
        <div key={actor.id}>
          <div className="font-semibold text-cinebhdarkgray text-sm">
            {actor.name}
          </div>
          <div className="text-xs text-cinebhlightgray">
            {actor.actorRoleName}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 mb-4">
        <div className="text-cinebhlightgray">Director:</div>
        {getPersonnelString(directors)}
      </div>
      <div className="flex gap-2 mb-8">
        <div className="text-cinebhlightgray">Writers:</div>
        {getPersonnelString(writers)}
      </div>
      <div className="flex gap-2 items-center text-2xl font-bold text-cinebhlightgray mb-6">
        {separator}
        Cast
      </div>
      <div className="grid grid-cols-3 gap-x-24 gap-y-7">
        {getCastTable(cast)}
      </div>
    </div>
  )
}

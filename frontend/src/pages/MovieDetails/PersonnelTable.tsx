import { Personnel } from "models/Personnel";
import { useEffect, useState } from "react";
import get from "services/fetching/Get";
import { getPersonnelByMovieRequest } from "services/fetching/API";

export interface PersonnelTableProps {
  id: string;
}

const separator = (
  <div className="border-cinebhdarkred border-l-[1.5px] h-full"></div>
);

export default function PersonnelTable({ id }: PersonnelTableProps) {
  const [personnel, setPersonnel] = useState<Array<Personnel>>([]);
  const director = personnel.find((person) => person.role === "DIRECTOR");
  const writers = filterPersonnel(personnel, "WRITER");
  const cast = filterPersonnel(personnel, "CAST");

  useEffect(() => {
    get<Array<Personnel>>(getPersonnelByMovieRequest(id)).then((personnel) => {
      setPersonnel(personnel);
    });
  }, [id]);

  function filterPersonnel(personnel: Array<Personnel>, role: string) {
    return personnel.filter((person) => person.role === role);
  }

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

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 mb-4">
        <div className="text-cinebhlightgray">Director:</div>
        {director?.name}
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
        <CastTable cast={cast ?? []} />
      </div>
    </div>
  );
}

interface CastTableProps {
  cast: Array<Personnel>;
}

function CastTable({ cast }: CastTableProps) {
  return cast.map((actor) => {
    return (
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

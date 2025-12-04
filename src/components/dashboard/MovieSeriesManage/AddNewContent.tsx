import { useState } from "react";
import { SeasonsEpisodes } from "./SeasonsEpisodes";

export function AddNewContentApp() {
  const [seasons, setSeasons] = useState([
    {
      id: "1",
      number: 1,
      episodes: [
        {
          id: "1",
          title: "",
          duration: "",
          thumbnail: null,
          video: null,
          isSaved: false,
        },
      ],
      isExpanded: true,
    },
  ]);

  return (
    <div className="text-white">
      <div className="max-w-[1920px] mx-auto">
        <SeasonsEpisodes
          seasons={seasons}
          onChange={setSeasons}
          title="Seasons & Episodes"
        />
      </div>
    </div>
  );
}

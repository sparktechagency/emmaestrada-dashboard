import {
  Check,
  ChevronDown,
  ChevronUp,
  Edit2,
  Image as ImageIcon,
  Play,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

type SeasonsEpisodesProps = {
  seasons: any[];
  onChange: (nextSeasons: any[]) => void;
  title?: string;
};

export function SeasonsEpisodes({
  seasons,
  onChange,
  title = "Seasons & Episodes",
}: SeasonsEpisodesProps) {
  const addSeason = () => {
    const newSeasonNumber = seasons.length + 1;

    const next: any[] = [
      ...seasons,
      {
        id: Date.now().toString(),
        number: newSeasonNumber,
        episodes: [],
        isExpanded: true,
      },
    ];

    onChange(next);
  };

  const toggleSeason = (seasonId: string) => {
    const next = seasons.map((season) =>
      season.id === seasonId
        ? { ...season, isExpanded: !season.isExpanded }
        : season
    );
    onChange(next);
  };

  const addEpisode = (seasonId: string) => {
    const next = seasons.map((season) =>
      season.id === seasonId
        ? {
            ...season,
            isExpanded: true,
            episodes: [
              ...season.episodes,
              {
                id: Date.now().toString(),
                title: "",
                duration: "",
                thumbnail: null,
                video: null,
                isSaved: false,
              },
            ],
          }
        : season
    );
    onChange(next);
  };

  const deleteEpisode = (seasonId: string, episodeId: string) => {
    const next = seasons.map((season) =>
      season.id === seasonId
        ? {
            ...season,
            episodes: season.episodes.filter((ep:any) => ep.id !== episodeId),
          }
        : season
    );
    onChange(next);
  };

  const deleteSeason = (seasonId: string) => {
    const next = seasons.filter((s) => s.id !== seasonId);
    onChange(next);
  };

  const updateEpisode = (
    seasonId: string,
    episodeId: string,
    field: keyof any,
    value: string | File | null | boolean
  ) => {
    const next = seasons.map((season) =>
      season.id === seasonId
        ? {
            ...season,
            episodes: season.episodes.map((ep:any) =>
              ep.id === episodeId ? { ...ep, [field]: value } : ep
            ),
          }
        : season
    );
    onChange(next);
  };

  const saveEpisode = (seasonId: string, episodeId: string) => {
    updateEpisode(seasonId, episodeId, "isSaved", true);
  };

  const editEpisode = (seasonId: string, episodeId: string) => {
    updateEpisode(seasonId, episodeId, "isSaved", false);
  };

  return (
    <div className="bg-[#141314] rounded-[8px] p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[16px]">{title}</h2>
        <button
          onClick={addSeason}
          className="flex items-center gap-3 px-3 py-2 rounded-[8px] bg-gradient-to-br from-[#C49C10] to-[#CF9702] hover:opacity-90 transition-opacity"
        >
          <Plus size={16} className="text-white" />
          <span className="text-[14px]">Add Season</span>
        </button>
      </div>

      <div className="space-y-4">
        {seasons.map((season) => (
          <div
            key={season.id}
            className="bg-neutral-950 rounded-[8px] border border-neutral-700"
          >
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => toggleSeason(season.id)}
                className="flex items-center gap-3 flex-1"
              >
                {season.isExpanded ? (
                  <ChevronUp size={20} className="text-white" />
                ) : (
                  <ChevronDown size={20} className="text-white" />
                )}
                <span className="text-[16px]">Season {season?.number}</span>
                <span className="text-[16px] text-[#a1a1a1]">
                  ({season.episodes.length} episode
                  {season.episodes.length !== 1 ? "s" : ""})
                </span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => addEpisode(season.id)}
                  className="flex items-center gap-2 px-3 py-1 rounded-[8px] text-[#cf9702] hover:bg-[#cf9702]/10 transition-colors"
                >
                  <Plus size={16} />
                  <span className="text-[14px]">Add Episode</span>
                </button>
                <button
                  onClick={() => deleteSeason(season.id)}
                  className="p-2 rounded-[8px] text-[#FB2C36] hover:bg-[#FB2C36]/10 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {season.isExpanded && (
              <div className="border-t border-neutral-700">
                {season.episodes.length === 0 ? (
                  <div className="p-8 text-center text-[#6c757d]">
                    <p className="text-[14px]">
                      No episodes yet. Click "Add Episode" to get started.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {season.episodes.map((episode:any, index:any) => (
                      <div
                        key={episode.id}
                        className="bg-[#141314] rounded-[8px] p-4 border border-neutral-700"
                      >
                        {episode.isSaved ? (
                          <>
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-[18px]">
                                {episode.title || `Episode ${index + 1}`}
                              </h3>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    editEpisode(season.id, episode.id)
                                  }
                                  className="p-2 rounded-[8px] text-[#cf9702] hover:bg-[#cf9702]/10 transition-colors"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    deleteEpisode(season.id, episode.id)
                                  }
                                  className="p-2 rounded-[8px] text-[#FB2C36] hover:bg-[#FB2C36]/10 transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[#a1a1a1]">
                                  <Play size={16} />
                                  <span className="text-[14px]">
                                    Duration: {episode.duration || "Not set"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[#a1a1a1]">
                                  <ImageIcon size={16} />
                                  <span className="text-[14px]">
                                    Thumbnail:{" "}
                                    {episode.thumbnail
                                      ? episode.thumbnail.name
                                      : "Not uploaded"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[#a1a1a1]">
                                  <Play size={16} />
                                  <span className="text-[14px]">
                                    Video:{" "}
                                    {episode.video
                                      ? episode.video.name
                                      : "Not uploaded"}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-end">
                                <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2 flex items-center gap-2">
                                  <Check
                                    size={16}
                                    className="text-green-500"
                                  />
                                  <span className="text-[14px] text-green-500">
                                    Episode Saved
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-[16px]">
                                Episode {index + 1}
                              </h3>
                              <button
                                onClick={() =>
                                  deleteEpisode(season.id, episode.id)
                                }
                                className="p-2 rounded-[8px] text-[#FB2C36] hover:bg-[#FB2C36]/10 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[14px] mb-2">
                                    Episode Title
                                  </label>
                                  <input
                                    type="text"
                                    value={episode.title}
                                    onChange={(e) =>
                                      updateEpisode(
                                        season.id,
                                        episode.id,
                                        "title",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter episode title"
                                    className="w-full bg-neutral-950 border border-neutral-700 rounded-[8px] px-3 py-3 text-[14px] text-white placeholder:text-[#717182]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[14px] mb-2">
                                    Duration
                                  </label>
                                  <input
                                    type="text"
                                    value={episode.duration}
                                    onChange={(e) =>
                                      updateEpisode(
                                        season.id,
                                        episode.id,
                                        "duration",
                                        e.target.value
                                      )
                                    }
                                    placeholder="e.g., 49m"
                                    className="w-full bg-neutral-950 border border-neutral-700 rounded-[8px] px-3 py-3 text-[14px] text-white placeholder:text-[#a1a1a1]"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[14px] mb-2">
                                    Episode Thumbnail
                                  </label>
                                  <div className="bg-neutral-950 border border-neutral-700 rounded-[12px] h-[78px] flex flex-col items-center justify-center cursor-pointer hover:border-neutral-600 transition-colors relative">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file =
                                          e.target.files?.[0] || null;
                                        updateEpisode(
                                          season.id,
                                          episode.id,
                                          "thumbnail",
                                          file
                                        );
                                      }}
                                      className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="size-[20px] mb-1">
                                      <Upload className="!text-white" />
                                    </div>
                                    <p className="text-[14px] text-[#6c757d] px-2 text-center truncate max-w-full">
                                      {episode.thumbnail
                                        ? episode.thumbnail.name
                                        : "Upload thumbnail"}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-[14px] mb-2">
                                    Episode Video File
                                  </label>
                                  <div className="bg-neutral-950 border border-neutral-700 rounded-[8px] h-[78px] flex flex-col items-center justify-center cursor-pointer hover:border-neutral-600 transition-colors relative">
                                    <input
                                      type="file"
                                      accept="video/*"
                                      onChange={(e) => {
                                        const file =
                                          e.target.files?.[0] || null;
                                        updateEpisode(
                                          season.id,
                                          episode.id,
                                          "video",
                                          file
                                        );
                                      }}
                                      className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="size-[20px] mb-1">
                                      <Upload className="!text-white" />
                                    </div>
                                    <p className="text-[14px] text-[#6c757d] px-2 text-center truncate max-w-full">
                                      {episode.video
                                        ? episode.video.name
                                        : "Upload episode video"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end pt-2">
                                <button
                                  onClick={() =>
                                    saveEpisode(season.id, episode.id)
                                  }
                                  disabled={
                                    !episode.title || !episode.duration
                                  }
                                  className="flex items-center gap-2 px-6 py-2 rounded-[8px] bg-gradient-to-br from-[#C49C10] to-[#CF9702] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Check size={16} />
                                  <span className="text-[14px]">
                                    Save Episode
                                  </span>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {seasons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6c757d] mb-4">No seasons added yet</p>
            <button
              onClick={addSeason}
              className="flex items-center gap-3 px-4 py-2 rounded-[8px] bg-gradient-to-br from-[#C49C10] to-[#CF9702] hover:opacity-90 transition-opacity mx-auto"
            >
              <Plus size={16} className="text-white" />
              <span className="text-[14px]">Add Your First Season</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

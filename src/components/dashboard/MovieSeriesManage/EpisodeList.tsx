import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

interface Episode {
  id: number;
  title: string;
  duration: string;
  thumbnail?: string | File | null;
  videoFile?: string | File | null;
}

interface Season {
  id: number;
  name: string;
  episodes: Episode[];
}

interface EpisodeListProps {
  season: Season; // single season
  onEdit: (seasonId: number, episodeId: number) => void;
  onDelete: (seasonId: number, episodeId: number) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  season,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper} sx={{ background: "#1e1e1e", mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#bfbfbf" }}>Episode</TableCell>
            <TableCell sx={{ color: "#bfbfbf" }}>Title</TableCell>
            <TableCell sx={{ color: "#bfbfbf" }}>Duration</TableCell>
            <TableCell sx={{ color: "#bfbfbf" }}>Thumbnail</TableCell>
            <TableCell sx={{ color: "#bfbfbf" }}>Video</TableCell>
            <TableCell sx={{ color: "#bfbfbf" }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {season.episodes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ color: "#aaa" }}>
                No Episodes Found
              </TableCell>
            </TableRow>
          ) : (
            season.episodes.map((episode, index) => (
              <TableRow key={episode.id}>
                <TableCell sx={{ color: "#ddd" }}>
                  Episode {index + 1}
                </TableCell>

                <TableCell sx={{ color: "#ddd" }}>
                  {episode.title || "Untitled"}
                </TableCell>

                <TableCell sx={{ color: "#ddd" }}>
                  {episode.duration || "--"}
                </TableCell>

                <TableCell>
                  {episode.thumbnail ? (
                    <Avatar
                      src={
                        typeof episode.thumbnail === "string"
                          ? episode.thumbnail
                          : URL.createObjectURL(episode.thumbnail)
                      }
                      variant="rounded"
                      sx={{ width: 56, height: 40 }}
                    />
                  ) : (
                    <Typography variant="caption" color="gray">
                      No thumbnail
                    </Typography>
                  )}
                </TableCell>

                <TableCell sx={{ color: "#bbb" }}>
                  {episode.videoFile
                    ? typeof episode.videoFile === "string"
                      ? episode.videoFile.slice(0, 25) + "..."
                      : episode.videoFile.name
                    : "No video"}
                </TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => onEdit(season.id, episode.id)}
                    sx={{ color: "skyblue" }}
                  >
                    <Edit />
                  </IconButton>

                  <IconButton
                    onClick={() => onDelete(season.id, episode.id)}
                    sx={{ color: "red" }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EpisodeList;

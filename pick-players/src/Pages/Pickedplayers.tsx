import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";
import type { Player } from "./Picklist";

const Pickedplayers: React.FC = () => {
  const location = useLocation();
  const data = location.state as Player[];
  const selectedPlayers = Object.values(data).flat();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Picked Players</h2>
      {selectedPlayers && selectedPlayers.length > 0 ? (
        <Grid container spacing={2}>
          {selectedPlayers.map((player) => (
            <Grid size ={{xs:12,md:4}}  key={player.player_id}>
              <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <Avatar
                  src={player.team_logo}
                  alt={player.team_name}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{player.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {player.role} | {player.team_name}
                  </Typography>
                  <Typography variant="body2">
                    Credit: {player.event_player_credit}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No players selected</p>
      )}
    </div>
  );
};

export default Pickedplayers;

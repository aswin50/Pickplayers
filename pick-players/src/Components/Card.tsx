import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import type { Player } from "../Pages/Picklist";
import { showToast } from "./snackbar";


type RoleSelected = {
    wicketKeepers: Player[];
    batsmen: Player[];
    bowlers: Player[];
    allRounders: Player[];
};

type CardProps = {
    title: string;
    players: Player[];
    role: keyof RoleSelected;
    onSelect: (role: keyof RoleSelected, selected: Player[]) => void;
};

const PlayerCard: React.FC<CardProps> = ({ title, players, onSelect, role }) => {
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

    //   const [fullcount,setfullcount] = useState<number>(0)
    //  let count = 0
    const togglePlayer = (player: Player) => {
        setSelectedPlayers((prev) => {
            let updated: Player[];

            const wicketKeeper = prev.filter(
                (p) => p.role === "Wicket-Keeper"
            );
            const batsman = prev.filter(
                (p) => p.role === "Batsman"
            );
            const bowler = prev.filter(
                (p) => p.role === "Bowler"
            );
            const allrounder = prev.filter(
                (p) => p.role === "All-Rounder"
            );
            //   setfullcount(fullcount+wicketKeepers.length+batsman.length+bowler.length+allrounder.length)

            if (prev.some((p) => p.player_id === player.player_id)) {

                updated = prev.filter((p) => p.player_id !== player.player_id);
            } else {

                if (wicketKeeper.length !== 0 || allrounder.length !== 0 || bowler.length !== 0 || batsman.length !== 0) {
                    if (player.role === "Wicket-Keeper") {
                        if (wicketKeeper.length >= 5) {
                            showToast("You can select a maximum of 5 Wicket Keepers", "error");
                            return prev;
                        }
                    }
                    else if (player.role === "All-Rounder") {
                        if (allrounder.length >= 4) {
                            showToast("You can select a maximum of 4 allrounder", "error");
                            return prev;
                        }
                    }
                    else if (player.role === "Batsman") {
                        if (batsman.length >= 7) {
                            showToast("You can select a maximum of 7 batsman", "error");
                            return prev;
                        }
                    }
                    else if (player.role === "Bowler") {
                        if (bowler.length >= 7) {
                            showToast("You can select a maximum of 7 Bowler", "error");
                            return prev;
                        }
                    }
                }


                updated = [...prev, player];
            }
            onSelect(role, updated);
            //   onSelect(updated);
            return updated;
        });
    };

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
                },
            }}
        >
            <CardContent>
                {/* Card Title */}
                <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        borderBottom: "2px solid",
                        pb: 1,
                        mb: 2,
                    }}
                >
                    {title}
                </Typography>

                {/* Player List */}
                <List disablePadding>
                    {players.map((player, index) => {
                        const isSelected = selectedPlayers.some(
                            (p) => p.player_id === player.player_id
                        );

                        return (
                            <React.Fragment key={player.player_id}>
                                <ListItem
                                    button
                                    onClick={() => togglePlayer(player)}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        py: 1,
                                        px: 1.5,
                                        borderRadius: 1,
                                        backgroundColor: isSelected ? "primary.light" : "transparent",
                                        color: isSelected ? "white" : "inherit",
                                        "&:hover": {
                                            backgroundColor: isSelected
                                                ? "primary.main"
                                                : "action.hover",
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={player.name}
                                        primaryTypographyProps={{
                                            fontWeight: isSelected ? 700 : 500,
                                        }}
                                    />
                                   
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: isSelected ? 700 : 400 }}
                                    >
                                        {player.event_player_credit}
                                    </Typography>
                                </ListItem>
                                {index < players.length - 1 && <Divider />}
                            </React.Fragment>
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    );
};

export default PlayerCard;

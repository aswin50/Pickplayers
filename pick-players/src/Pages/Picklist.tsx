import React, { useEffect, useState } from 'react';
import { Grid, Button } from "@mui/material";
import players from "../Data/player.json"
import PlayerCard from '../Components/Card';
import { showToast, ToastContainer } from '../Components/snackbar';
import { useNavigate } from 'react-router-dom';

type PicklistProps = {

};
type RoleSelected = {
    wicketKeepers: Player[];
    batsmen: Player[];
    bowlers: Player[];
    allRounders: Player[];
};

export interface Player {
    id: number;
    player_id: string;
    name: string;
    role: string;
    country: string;
    short_name: string;
    team_name: string;
    team_logo: string;
    team_short_name: string;
    event_total_points: number;
    event_player_credit: number;
    team_id: number;
    is_playing: boolean;
    player_stats_available: boolean;
}

export interface GroupedPlayers {
    batsmen: Player[];
    WicketKeepers: Player[];
    Bowlers: Player[];
    Allrounders: Player[];
}

export interface count {
    wicketkeepercount: number, batsmancount: number, bowlercount: number, allroundercount: number, totalplayers: number
}



const Picklist: React.FC<PicklistProps> = () => {
    const [groupedPlayers, setGroupedPlayers] = useState<GroupedPlayers>({
        batsmen: [],
        WicketKeepers: [],
        Bowlers: [],
        Allrounders: [],
    });


    const [roleSelected, setRoleSelected] = useState<RoleSelected>({
        wicketKeepers: [],
        batsmen: [],
        bowlers: [],
        allRounders: [],
    });
    const navigate = useNavigate()

    const handleRoleUpdate = (role: keyof RoleSelected, players: Player[]) => {
        setRoleSelected((prev) => ({
            ...prev,
            [role]: players,
        }));
    };



    useEffect(() => {
        const response: GroupedPlayers = players.reduce<GroupedPlayers>(
            (acc, curr) => {
                if (curr?.role === "Bowler") {
                    acc.Bowlers.push(curr);
                } else if (curr?.role === "All-Rounder") {
                    acc.Allrounders.push(curr);
                } else if (curr?.role === "Batsman") {
                    acc.batsmen.push(curr);
                } else if (curr?.role === "Wicket-Keeper") {
                    acc.WicketKeepers.push(curr);
                }
                return acc;
            },
            { batsmen: [], WicketKeepers: [], Bowlers: [], Allrounders: [] }
        );

        setGroupedPlayers(response);
    }, []);


    const handleproceed = () => {
        const sum =
            roleSelected.wicketKeepers.length +
            roleSelected.batsmen.length +
            roleSelected.bowlers.length +
            roleSelected.allRounders.length;
        const selectedPlayers = Object.values(roleSelected).flat();
        const credits = selectedPlayers.reduce((acc, curr) => {
            return acc + curr.event_player_credit;
        }, 0);

        const teamCount = selectedPlayers.reduce<Record<string, number>>((acc, curr) => {
            acc[curr.team_name] = (acc[curr.team_name] || 0) + 1;
            return acc;
        }, {});

        const isValid = Object.values(teamCount).every((count) => count <= 7);

        if (sum === 0) {
            showToast("Please Select the players", "error")
        }
        else if ((roleSelected.wicketKeepers.length < 1)) {
            showToast("Atleast there should be one wicket keeper", "error")
        }
        else if ((roleSelected.batsmen.length < 3)) {
            showToast("atleast there should be three batsman", "error")
        }
        else if ((roleSelected.bowlers.length < 3)) {
            showToast("atleast there should be three bowler", "error")
        }
        else if (sum > 11) {
            showToast(`${sum} players are selected but Only 11 players are allowed`, "error")
        }
        else if (!isValid) {
            showToast("Maximum 7 players from the same team", "error")
        }
        else if (credits > 100) {
            showToast("The team must be selected within 100 credits.", "error")
        }

        else {
            navigate('/PickedPlayers', { state: roleSelected })
        }
    }
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid size={{ sm: 12, md: 6 }}>< h2 style={{ display: "flex", justifyContent: "center" }}>Pick Players</h2></Grid>
            <Grid size={{ sm: 12, md: 0 }}></Grid>
            <Grid size={{ sm: 12, md: 6 }}>

                <PlayerCard
                    title='Pick 1-5 Wicket Keepers'
                    players={groupedPlayers.WicketKeepers}
                    onSelect={handleRoleUpdate}
                    role="wicketKeepers"

                />

            </Grid>
            <Grid size={{ sm: 12, md: 0 }}></Grid>
            <Grid size={{ sm: 12, md: 6 }}>

                <PlayerCard
                    title='Pick 0-4 All Rounders'
                    players={groupedPlayers.Allrounders}
                    onSelect={handleRoleUpdate}
                    role="allRounders"

                />

            </Grid>
            <Grid size={{ sm: 12, md: 0 }}></Grid>
            <Grid size={{ sm: 12, md: 6 }}>

                <PlayerCard
                    title='Pick 3-7 Batsmen'
                    players={groupedPlayers.batsmen}
                    onSelect={handleRoleUpdate}
                    role="batsmen"


                />

            </Grid>
            <Grid size={{ sm: 12, md: 0 }}></Grid>
            <Grid size={{ sm: 12, md: 6 }}>

                <PlayerCard
                    title='Pick 3-7 Bowlers'
                    players={groupedPlayers.Bowlers}
                    onSelect={handleRoleUpdate}
                    role="bowlers"

                />

            </Grid>
            <Grid size={{ sm: 12, md: 0 }}></Grid>
            <Grid size={{ sm: 12, md: 6 }}
                sx={{
                    display: "flex", justifyContent: "center"
                }}
            >
                <Button variant='contained' style={{ width: "30vh" }} onClick={handleproceed}>
                    Proceed
                </Button>
            </Grid>
            <ToastContainer />
        </Grid>

    )
}
export default Picklist;
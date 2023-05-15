import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import Team from '../models/Team';

const postTeam = (req: Request, res: Response, next: NextFunction) => {
    const {name} = req.body;
    const team = new Team({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return team
        .save()
        .then((team) => res.status(201).json({team}))
        .catch((error) => res.status(500).json({error}));
};
const getTeamById = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;
    return Team.findById(teamId)
        .then((team) => (team ? res.status(200).json({team}) : res.status(404).json({message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};
const getTeams = (req: Request, res: Response, next: NextFunction) => {
    return Team.find()
        .then((teams) => res.status(200).json({teams}))
        .catch((error) => res.status(500).json({error}));
};
const updateTeam = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;
    Team.findById(teamId).then((team) => {
        if (team) {
            team.set(req.body);
            return team
                .save()
                .then((team) => res.status(201).json({team}))
                .catch((error) => res.status(500).json({error}));
        } else {
            res.status(404).json({message: 'Not found'});
        }
    });
};
const deleteTeam = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;
    return Team.findByIdAndDelete(teamId).then((team) => (team ? res.status(200).json({message: 'deleted successfully'}) : res.status(404).json({message: 'Not found'})));
};

export default {postTeam, getTeams, getTeamById, updateTeam, deleteTeam};

import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import Player from '../models/Player';

const postPlayer = (req: Request, res: Response, next: NextFunction) => {
    const {name, team} = req.body;
    const player = new Player({
        _id: new mongoose.Types.ObjectId(),
        name,
        team
    });

    return player
        .save()
        .then((player) => res.status(201).json({player}))
        .catch((error) => res.status(500).json({error}));
};

const getPlayerById = (req: Request, res: Response, next: NextFunction) => {
    const playerId = req.params.playerId;
    return Player.findById(playerId)
        .populate('team')
        .select('-__v')
        .then((player) => (player ? res.status(200).json({player}) : res.status(404).json({message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};
const getPlayers = (req: Request, res: Response, next: NextFunction) => {
    return Player.find()
        .populate('team')
        .select('-__v')
        .then((players) => res.status(200).json({players}))
        .catch((error) => res.status(500).json({error}));
};
const updatePlayer = (req: Request, res: Response, next: NextFunction) => {
    const playerId = req.params.playerId;
    Player.findById(playerId).then((player) => {
        if (player) {
            player.set(req.body);
            return player
                .save()
                .then((player) => res.status(201).json({player}))
                .catch((error) => res.status(500).json({error}));
        } else {
            res.status(404).json({message: 'Not found'});
        }
    });
};
const deletePlayer = (req: Request, res: Response, next: NextFunction) => {
    const playerId = req.params.playerId;
    return Player.findByIdAndDelete(playerId).then((player) => (player ? res.status(200).json({message: 'deleted successfully'}) : res.status(404).json({message: 'Not found'})));
};

export default {postPlayer, getPlayers, getPlayerById, updatePlayer, deletePlayer};

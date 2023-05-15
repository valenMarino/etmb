import mongoose, {Document, Schema} from 'mongoose';

export interface IPlayer {
    name: string;
    team: string;
}

export interface IPlayerModel extends IPlayer, Document {}

const PlayerSchema: Schema = new Schema(
    {
        name: {type: String, require: true},
        team: {type: Schema.Types.ObjectId, require: true, ref: 'Team'}
    },
    {
        timestamps: true,
        versionKey: true
    }
);

export default mongoose.model<IPlayerModel>('Player', PlayerSchema);

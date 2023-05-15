import mongoose, {Document, Schema} from 'mongoose';

export interface ITeam {
    name: string;
}

export interface ITeamModel extends ITeam, Document {}

const TeamSchema: Schema = new Schema(
    {
        name: {type: String, require: true}
    },
    {versionKey: false}
);

export default mongoose.model<ITeamModel>('Team', TeamSchema);

import express from 'express';
import controller from '../controllers/TeamController';
const router = express.Router();

router.post('/', controller.postTeam);
router.get('/:teamId', controller.getTeamById);
router.get('/', controller.getTeams);
router.patch('/:teamId', controller.updateTeam);
router.delete('/:teamId', controller.deleteTeam);

export = router;

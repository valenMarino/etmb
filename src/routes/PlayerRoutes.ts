import express from 'express';
import controller from '../controllers/PlayerController';
const router = express.Router();

router.post('/', controller.postPlayer);
router.get('/:playerId', controller.getPlayerById);
router.get('/', controller.getPlayers);
router.patch('/:playerId', controller.updatePlayer);
router.delete('/:playerId', controller.deletePlayer);

export = router;

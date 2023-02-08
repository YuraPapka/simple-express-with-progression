import {Router} from 'express';
import {getContext} from './context';

const router = Router();

router.post('/input', async (req, res) => {
    const ctx = await getContext();

    if (!req.body) {
        return res.status(400);
    }

    const ticket = await ctx.ticket.create(req.body);

    return res.json({ticket: ticket.number})
});

router.get('/output', async (req, res) => {
    const ticketId: any = req.query.ticket;
    console.log('ticketId', ticketId);

    if (typeof ticketId !== 'string') {
        return res.status(400).json({message: "ticket in url is required."});
    }

    const ctx = await getContext();

    const ticket = await ctx.ticket.getResult(ticketId);

    if (!ticket) {
        return res.status(404).json({message: "no ticket in BD."});
    } else if (!ticket.result) {
        return res.json({message: "try one more time later."})
    } else {
        return res.json({"number series": ticket.result});
    }
});

router.get('/inprogress', async (_req, res) => {
    const ctx = await getContext();

    const list = await ctx.ticket.getInProgress();

    res.json({list});
});

export default router;

'use server';

import { NextResponse } from 'next/server';
import { sendBlinkMessage } from './sendMessage';
import { stakeNFT } from './stakeNFT';
import { unstakeNFT } from './unstakeNFT';

export async function POST(req: Request) {
    const { action } = await req.json();

    switch (action) {
        case 'sendMessage':
            return sendBlinkMessage(req);
        case 'stake':
            return stakeNFT(req);
        case 'unstake':
            return unstakeNFT(req);
        default:
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
}

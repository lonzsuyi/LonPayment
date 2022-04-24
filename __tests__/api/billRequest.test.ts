import React from 'react';
import axios from 'axios';

import { getBillPage } from '../../src/api/billRequest';

describe('Test Bill api request', () => {

    it('get BillPage api', async () => {
        expect.assertions(1);
        let mockFn = jest.fn();
        await mockGetBillPage(mockFn)
        expect(mockFn).toBeCalled();

        async function mockGetBillPage(callback: any) {
            const data = await getBillPage({ currentPage: 1, pageSzie: 10 });
            callback(data);
        }
    })
})
import { createRealmContext } from '@realm/react';
import { Bill } from './Bill'

export const LonPaymentRealmContext = createRealmContext({
    schema: [Bill],
});


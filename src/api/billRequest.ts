import { stringify } from 'qs';
import httpRequest from '../utils/httpRequest';
import { ResponseResult } from '../types/httpTypes';
import Global from '../constants/Global';
import { GetBillsPageParms, BillsPageProps } from '../types/billTypes';
import { AxiosResponse } from 'axios';

// Get bill page list
export async function getBillPage(prams: GetBillsPageParms): Promise<ResponseResult<BillsPageProps>> {
    const url = `${Global.API.PREFIX}/bill?${stringify(prams, { skipNulls: true })}`;
    return httpRequest.get<ResponseResult<BillsPageProps>>(url).then((res: AxiosResponse<ResponseResult<BillsPageProps>, any>) => {
        return res.data;
    }).catch((err: ResponseResult) => {
        return err;
    })
}
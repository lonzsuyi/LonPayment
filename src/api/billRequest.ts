import { stringify } from 'qs';
import httpRequest from '../utils/httpRequest';
import { ResponseResult } from '../types/httpTypes';
import Global from '../constants/Global';
import { GetBillsPageParms, BillsPageProps, BillItemProps } from '../types/billTypes';
import { AxiosResponse } from 'axios';

// Get bill page list
export async function getBillPage(prams: GetBillsPageParms): Promise<ResponseResult<BillsPageProps>> {
    const url = `${Global.API.PREFIX}/bills?${stringify(prams, { skipNulls: true })}`;
    return httpRequest.get<ResponseResult<BillsPageProps>>(url).then((res: AxiosResponse<ResponseResult<BillsPageProps>, any>) => {


        // Note: Because you can't simulate JSON parameters, you have to code to simulate paging
        res.data.data.currentPage = prams.currentPage;
        const list: Array<BillItemProps> = [];
        const total: number = prams.currentPage * prams.pageSzie > res.data.data.total ? res.data.data.total : prams.currentPage * prams.pageSzie;
        for (let i = (prams.currentPage - 1) * prams.pageSzie; i < total; i++) {
            list.push(res.data.data.list[i]);
        }
        res.data.data.list = list;

        return res.data;
    }).catch((err: ResponseResult) => {
        return err;
    })
}
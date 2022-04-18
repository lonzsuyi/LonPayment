import React, { ReactNode, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, Image, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { RootDrawerScreenProps } from '../types/rootTypes';

import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';

import { GetBillsPageParms, BillsPageProps, BillItemProps, BillStatusEnum } from '../types/billTypes';
import { ResponseResult } from '../types/httpTypes';
import { getBillPage } from '../api/billRequest';

export default function MyBillScreen({ navigation }: RootDrawerScreenProps<'MyBill'>) {

    // Get Api data
    const [currentPage, setCurrentPage] = useState(1);
    const pageSzie = 10;
    const [billData, setBillData] = useState([]);
    const _getBillPage = async (params: GetBillsPageParms) => {
        const data: ResponseResult<BillsPageProps> = await getBillPage(params);
        if (data.code === 200) {

        }
    }

    // refresh
    const [isRefreshing, setIsRefreshing] = useState(false);
    const onRefresh = () => {

    }
    // Scroll end loading
    const scrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        let offsetY = event.nativeEvent.contentOffset.y;
        let contentSizeHeight = event.nativeEvent.contentSize.height; //scrollView contentSize
        let oriageScrollHeight = event.nativeEvent.layoutMeasurement.height;
        if (offsetY + oriageScrollHeight >= contentSizeHeight) {
            // fetchMyPointsPage(currentPage + 1);
        }
    }

    /** Render */
    const BillContentRender = (items: Array<BillItemProps>) => {
        const rowCount = 2;
        let rows: Array<ReactNode> = [];

        for (let i: number = 0; i < items.length; i += rowCount) {
            let cols: Array<ReactNode> = [];
            let colCount: number = i == items.length - 1 ? items.length % rowCount : rowCount;
            for (let j = 0; j < colCount; j++) {
                cols.push(
                    <BillItemRender key={j} item={items[i + j]} />
                );
            }
            rows.push(
                <View key={i} style={styles.billItemRow}>
                    {cols}
                </View>
            );
        }

        return (
            <View style={styles.billConent}>
                {rows}
            </View>
        );
    }
    const BillItemRender = ({ item }: { item: BillItemProps }) => {
        return (
            <View>
                <View></View>
                <View>
                    <Text>Water Bill</Text>
                </View>
                <View>
                    <Text>2022 March 10:</Text>
                    <Text>$185</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <View><Text>Pay Now</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    /**
     * Init screen
     */
    useEffect(() => {
        _getBillPage({ currentPage: currentPage, pageSzie: pageSzie })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.billScroll} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={() => onRefresh()}
                />
            }
                onMomentumScrollEnd={scrollEnd}
            >

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    billScroll: {

    },
    billConent: {

    },
    billItemRow: {

    }
})
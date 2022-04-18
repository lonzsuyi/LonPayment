import React, { ReactNode, useCallback, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, Image, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';

import { RootDrawerScreenProps } from '../types/rootTypes';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';

import { GetBillsPageParms, BillsPageProps, BillItemProps, BillStatusEnum } from '../types/billTypes';
import { ResponseResult } from '../types/httpTypes';
import { getBillPage } from '../api/billRequest';

export default function MyBillScreen({ navigation }: RootDrawerScreenProps<'MyBill'>) {

    // Get Api data
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSzie: number = 10;
    const [billsData, setBillsData] = useState<Array<BillItemProps>>([]);
    const _getBillPage = async (params: GetBillsPageParms) => {
        const data: ResponseResult<BillsPageProps> = await getBillPage(params);
        if (data.code === 200) {
            setBillsData(data.data.list);
            console.log(data.data.list)
        }
    }

    // refresh
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
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
        const itemWidth = Layout.window.width / 2
        let rows: Array<ReactNode> = [];

        for (let i: number = 0; i < items.length; i += rowCount) {
            let cols: Array<ReactNode> = [];
            let colCount: number = i == items.length - 1 ? items.length % rowCount : rowCount;
            for (let j = 0; j < colCount; j++) {
                cols.push(
                    <BillItem key={j} item={items[i + j]} width={itemWidth} />
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
    const BillItem = ({ item, width }: { item: BillItemProps, width: number }) => {
        const imageWidth = width * 0.8

        return (
            <View style={{ ...styles.billItem, width: width }}>
                <View style={styles.itemImagePanel}>
                    <AutoHeightImage width={imageWidth} source={{ uri: 'https://www.wikihow.com/images/thumb/1/15/Write-a-Bill-for-Payment-Step-1-Version-4.jpg/v4-460px-Write-a-Bill-for-Payment-Step-1-Version-4.jpg.webp' }} />
                </View>
                <View>
                    <Text fontType="comfortaa">{`${dayjs(item.date).format('MMM DD, YYYY')}`}</Text>
                </View>
                <View>
                    <Text>{item.amount}</Text>
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
    // Switch screen to bill request refresh once each time
    useFocusEffect(useCallback(() => {
        _getBillPage({ currentPage: currentPage, pageSzie: pageSzie })
    }, []));

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
                {
                    BillContentRender(billsData)
                }
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
        marginVertical: 15
    },
    billConent: {

    },
    billItemRow: {
        flexDirection: 'row'
    },
    billItem: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    itemImagePanel: {

    },
    itemImage: {
        borderRadius: 5,
        resizeMode: 'cover'
    }
})
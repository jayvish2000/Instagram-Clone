import { View, ActivityIndicator } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import styles from '../../../styles/ReelStyles'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import firestore from '@react-native-firebase/firestore';
import ReelCard from '../ReelCard';

const ReelScreen = ({ navigation }) => {
    const [currindex, setIndex] = useState(0)
    const [reels, setReels] = useState([])
    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null)

    const onChangeIndex = ({ index }) => {
        setIndex(index)
    }

    useEffect(() => {
        if (!!videoRef.current) {
            videoRef.current.seek(0)
        }
    }, [currindex])

    const fetchReels = async () => {
        try {
            const list = [];

            await firestore()
                .collection('reels')
                .orderBy('reelTime', 'desc')
                .get()
                .then(querySnapshot => {

                    querySnapshot.forEach(doc => {
                        const {
                            userId,
                            email,
                            text,
                            reelImg,
                            reelTime,
                            likesbyusers,
                            reelvideo
                        } = doc.data();
                        list.push({
                            id: doc.id,
                            userId,
                            email,
                            reelTime,
                            text,
                            reelvideo,
                            reelImg,
                            likesbyusers
                        });
                    });
                })
            setReels(list);

            if (loading) {
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchReels()
    }, [])

    return (
        <View style={styles.container}>
            {loading ? (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex:1
                    }}>
                    <ActivityIndicator size={35} color="#ADD8E6" />
                </View>
            ) : (
                <SwiperFlatList
                    vertical
                    data={reels}
                    onRefresh={() => fetchReels()}
                    refreshing={loading}
                    renderItem={({ item, index }) => <ReelCard item={item} currindex={currindex} index={index} />}
                    onChangeIndex={onChangeIndex}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    )
}

export default ReelScreen
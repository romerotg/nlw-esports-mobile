import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';
import { GameParams } from '../../@types/navigation';

import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

export function Game() {
    const [ads, setAds] = useState<DuoCardProps[]>([]);

    const route = useRoute();
    const game = route.params as GameParams;

    const navigation = useNavigation();

    useEffect(() => {
        fetch(`http://192.168.1.4:3333/games/${game.id}/ads`)
        .then(response => response.json())
        .then(data => setAds(data));
    }, []);

    function handleGoBack() {
        navigation.goBack();
    }

    function handleConnect() {
        console.log('on connect!!')
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />

                    <View style={styles.right} />
                </View>

                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />

                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />

                <FlatList
                    data={ads}
                    keyExtractor={item => item.id}
                    renderItem ={({ item }) => {
                        return (
                            <DuoCard
                                data={item}
                                onConnect={handleConnect}
                            />
                        );
                    }}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={styles.contentList}
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>
        </Background>
    );
}
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchSeries } from "@/services/api";
import SeriesCard from "@/components/SeriesCard";
import TrendingCard from "@/components/TrendingCard";
import { getTrendingContent } from "@/services/appwrite";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingSeries,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingContent);

  const {
    data: series,
    loading: seriesLoading,
    error: seriesError,
  } = useFetch(() => fetchSeries({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Text className="font-bold text-white text-6xl">MUBO</Text>
        <Image source={icons.play} className="w-12 h-15 mt-5 mb-5 mx-auto" />
        {seriesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : seriesError || trendingError ? (
          <Text>Error: {seriesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />
            {trendingSeries && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Trending Content
                </Text>
              </View>
            )}
            <>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
                className="mn-4 mt-3"
                data={trendingSeries}
                renderItem={({ item, index }) => (
                  <TrendingCard Serie={item} index={index} />
                )}
                keyExtractor={(item) => item.serie_id.toString()}
              />

              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Content
              </Text>

              <FlatList
                data={series}
                renderItem={({ item }) => <SeriesCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={4}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

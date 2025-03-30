import SeriesCard from "@/components/SeriesCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchSeries } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(" ");

  const {
    data: series,
    loading,
    error,
    refetch: loadSeries,
    reset,
  } = useFetch(() => fetchSeries({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadSeries();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (series?.length > 0 && series?.[0]) {
      updateSearchCount(searchQuery, series[0]);
    }
  }, [series]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={series}
        renderItem={({ item }) => <SeriesCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.play} className="w-12 h-100" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search your favorite series or movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {!series && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
            {!loading && !error && searchQuery.trim() && series?.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500 text-2xl">
                {searchQuery.trim() ? "No content found" : "Search for content"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;

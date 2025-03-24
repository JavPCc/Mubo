import SeriesCard from "@/components/SeriesCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchSeries } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import { SearchBar } from "react-native-screens";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(" ");

  const {
    data: series,
    loading,
    error,
  } = useFetch(() => fetchSeries({ query: "" }), false);

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
          marginVertical: 17,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar placeholder="Search your favorite series or movies..." />
            </View>
            {series && (
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
      />
    </View>
  );
};

export default Search;

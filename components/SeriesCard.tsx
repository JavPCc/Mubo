import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const SeriesCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  adult,
}: Serie) => {
  return (
    <Link href={`/series/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          {Array.from({ length: Math.round(vote_average / 2) }).map(
            (_, index) => (
              <Image key={index} source={icons.star} className="size-4" />
            )
          )}
        </View>
        <View className="flex-row items-center justify-end">
          <Text className="text-xs font-medium text-light-300 uppercase">
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text> */}
        </View>
        <View className="flex-row items-center justify-end">
          <Text className="text-xs font-medium text-light-300">
            {adult ? +18 : "Not adult"}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SeriesCard;

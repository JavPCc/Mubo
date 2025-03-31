import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchSerieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface SerieInfoProps {
  label: string;
  value?: string | number | null;
}

const SerieInfo = ({ label, value }: SerieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-300 font-normal text-sm">{label}</Text>
    <Text className="text-light-200 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const SeriesDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: serie, loading } = useFetch(() =>
    fetchSerieDetails(id as string)
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${serie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5 text-white">
          <Text className="text-white font-bold text-xl">{serie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {serie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">
              {serie?.runtime}m {/*m stands for minute*/}
            </Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(serie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({serie?.vote_count} votes)
            </Text>
          </View>
          <SerieInfo label="OverView: " value={serie?.overview} />
          <SerieInfo
            label="Genre: "
            value={serie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />
          <View className="flex flex-row justify-around w-1/2">
            <SerieInfo
              label="Budget"
              value={`$${serie?.budget / 1_000_000} million`}
            />
            <SerieInfo
              label="Revenue"
              value={`$${Math.round(serie?.revenue) / 1_000_000}`}
            />
          </View>
          <SerieInfo
            label="Production Companies"
            value={
              serie?.production_companies.map((c) => c.name).join(" - ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50 "
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeriesDetails;

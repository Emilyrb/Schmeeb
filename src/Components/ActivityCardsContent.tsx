import { useEffect, useState } from "react";
import { fetchActivities, FetchActivityDTO } from "../api/fetchActivities";
import { ActivityCard } from "./ActivityCard";

const initData: FetchActivityDTO[] = [];

export function ActivityCardsContent() {
  const [ activityCardsData, setActivityCardsData ] = useState(initData);
  
  useEffect(() => {
    fetchActivities(setActivityCardsData);
  }, [])

  if (activityCardsData.length !== 0) {
    return (
      activityCardsData.map(function(activity, key) {
        return <ActivityCard activity={activity} key={key} />;
      })
    );
  }

  return <>Loading</>;
};
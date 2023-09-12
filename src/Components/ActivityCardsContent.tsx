import { useEffect, useState } from "react";
import { fetchActivities, FetchActivityDTO } from "../api/fetchActivities";
import { ActivityCard } from "./ActivityCard";

const initData: FetchActivityDTO[] = [];

interface Props {
  setAddExpenseDialog: React.Dispatch<React.SetStateAction<null | FetchActivityDTO>>;
}
export function ActivityCardsContent(props: Props) {
  const { setAddExpenseDialog } = props;
  const [ activityCardsData, setActivityCardsData ] = useState(initData);

  useEffect(() => {
    fetchActivities(setActivityCardsData);
  }, [])

  if (activityCardsData.length !== 0) {
    return (
      activityCardsData.map(function(activity, key) {
        return <ActivityCard activity={activity} key={key} setAddExpenseDialog={setAddExpenseDialog} />;
      })
    );
  }

  return <>Loading</>;
};
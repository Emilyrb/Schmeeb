import { collection, query, getDocs, QueryDocumentSnapshot, DocumentData } from '@firebase/firestore';
import { firestore } from '../firebase_setup/firebase';

export interface FetchActivityDTO {
  id: string;
  data: ActivityDTO;
}

export interface ActivityDTO {
  title: string;
  description?: string;
  members: string[];
}

function setActivityData(doc: QueryDocumentSnapshot<DocumentData, DocumentData>){
  return ({
    id: doc.id,
    data: {
      title: doc.data().title,
      members: doc.data().members,
      description: doc.data().description
    }
  });
}

export async function fetchActivities(setActivityCardsData: React.Dispatch<React.SetStateAction<FetchActivityDTO[]>>) {
  const activitiesQuery = query(collection(firestore, "Activity"));
  const activitiesSnapshot = await getDocs(activitiesQuery);
  const activities = activitiesSnapshot.docs.map((doc) => setActivityData(doc));
  setActivityCardsData(activities);
};

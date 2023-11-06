import { collection, query, getDocs, QueryDocumentSnapshot, DocumentData } from '@firebase/firestore';
import { firestore } from '../firebase_setup/firebase';

export interface FetchExpenseDTO {
  id: string;
  data: ExpenseDTO;
}

interface ExpenseDTO {
  activityId: string,
  itemName: string,
  price: number,
  paidBy: string,
  split: Map<string, number>,
}

function setExpenseData(doc: QueryDocumentSnapshot<DocumentData, DocumentData>){
  console.log('setExpenseData', doc);
  return ({
    id: doc.id,
    data: {
      activityId: doc.data().activityId,
      itemName: doc.data().itemName,
      price: doc.data().price,
      paidBy: doc.data().paidBy,
      split: doc.data().split,
    }
  });
}

export async function fetchExpenses(setExpensesList: React.Dispatch<React.SetStateAction<FetchExpenseDTO[]>>, activityId: string) {
  const expensesQuery = query(collection(firestore, "Activity", activityId, "Expense"));
  const expensesSnapshot = await getDocs(expensesQuery);
  const expenses = expensesSnapshot.docs.map((doc) => setExpenseData(doc));
  console.log('expenses', expenses);
  setExpensesList(expenses);
};

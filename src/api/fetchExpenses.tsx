import { collection, query, getDocs, QueryDocumentSnapshot, DocumentData } from '@firebase/firestore';
import { firestore } from '../firebase_setup/firebase';

export interface FetchExpenseDTO {
  id: string;
  data: ExpenseDTO;
}

export interface ExpenseDTO {
  itemName: string,
  price: number,
  paidBy: string,
  split: { [key: string]: number },
}

function setExpenseData(doc: QueryDocumentSnapshot<DocumentData, DocumentData>){
  return ({
    id: doc.id,
    data: {
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
  setExpensesList(expenses);
};

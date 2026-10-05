import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { SearchParamsGuard } from '../component/SearchParamsGuard';
import { SavingsCalculatorPage } from './saving-calculator/SavingsCalculatorPage';
import { savingsCalculatorTabSchema } from './saving-calculator/schema/savingsCalculatorTabSchema';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SearchParamsGuard validators={{ tab: value => savingsCalculatorTabSchema.safeParse(value).success }}>
        <SavingsCalculatorPage />
      </SearchParamsGuard>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace={true} />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}

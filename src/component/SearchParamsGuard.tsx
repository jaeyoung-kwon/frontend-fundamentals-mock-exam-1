import type { ReactNode } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';

interface SearchParamsGuardProps {
  children: ReactNode;
  validators: Record<string, (value: string) => boolean>;
}

export const SearchParamsGuard = ({ children, validators }: SearchParamsGuardProps) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const invalidKeys = Object.entries(validators)
    .filter(([key, validate]) => searchParams.getAll(key).some(value => !validate(value)))
    .map(([key]) => key);

  if (invalidKeys.length === 0) {
    return <>{children}</>;
  }

  const correctedSearchParams = new URLSearchParams(searchParams);
  invalidKeys.forEach(key => correctedSearchParams.delete(key));

  return (
    <Navigate
      to={{ pathname: location.pathname, search: correctedSearchParams.toString(), hash: location.hash }}
      state={location.state}
      replace
    />
  );
};

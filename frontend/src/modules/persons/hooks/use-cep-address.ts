import { useEffect, useState } from 'react';

import { isValidCEP } from '@brazilian-utils/brazilian-utils';

import { useCEPQuery } from '../../../queries/cep.queries.js';
import type { CEP } from '../../../types/cep.js';

interface UseCEPAddressOptions {
  cep: string;
  duration?: number;
}

interface UseCEPAddressReturn {
  data?: CEP;
  loading: boolean;
}

function useCEPAddress(options: UseCEPAddressOptions): UseCEPAddressReturn {
  const {
    cep,
    duration = 300,
  } = options;

  const [debouncedCEP, setDebouncedCEP] = useState('');


  useEffect(() => {
    if (!isValidCEP(cep)) {
      return;
    }

    const timeout = setTimeout(() => {
      setDebouncedCEP(cep);
    }, duration);

    return () => clearTimeout(timeout);
  }, [cep, duration]);

  const { data, isLoading, isFetching } = useCEPQuery(debouncedCEP, {
    enabled: Boolean(debouncedCEP),
  });

  return {
    data,
    loading: isLoading || isFetching,
  };
}

export {
  useCEPAddress,
};

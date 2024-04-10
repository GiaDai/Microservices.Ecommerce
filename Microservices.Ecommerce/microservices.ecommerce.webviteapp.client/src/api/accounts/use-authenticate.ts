import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '@api/common/client';

import type { AuthenRequest, AuthenResponse } from '@api/accounts/types';

export const useAuthenticate = createMutation< AuthenResponse,AuthenRequest, AxiosError>({
    mutationFn: async (variables) =>
        client({
          url: '/account/authenticate',
          method: 'POST',
          data: variables,
        }).then((response) => response.data),
});

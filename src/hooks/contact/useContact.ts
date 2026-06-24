import { useMutation, useQueryClient } from '@tanstack/react-query';
import { endpoints, handleAPI } from '@/apis';
import { CreateContactDTO } from '@/types/portfolio';
import { useErrorHandler } from '../use-error-handler';

const CreateContact = async (newContact: CreateContactDTO) => {
  const response = await handleAPI(
    `${endpoints.cms.contacts.list}`,
    'POST',
    newContact
  );
  return response;
};

const useCreateContact = () => {
  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useErrorHandler();

  return useMutation({
    mutationFn: async (newContact: CreateContactDTO) => {
      return CreateContact(newContact);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contact'] });
      handleSuccess(response, 'Contact information submitted successfully.');
    },
    onError: (error) => {
      handleError(error);
    },
  });
};
export { useCreateContact };

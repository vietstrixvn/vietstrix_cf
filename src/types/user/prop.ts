import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { UserListData } from './responses';
import z from 'zod';
import { CreateUserFormSchema } from './dto';

export interface UserTableProps {
  users: UserListData[];
  isLoading: boolean;
  isError: boolean;
}

export interface CreateUserProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<z.infer<typeof CreateUserFormSchema>>;
  setValue: (name: any, value: any) => void;
  errors: FieldErrors<z.infer<typeof CreateUserFormSchema>>;
  isPending: boolean;
}

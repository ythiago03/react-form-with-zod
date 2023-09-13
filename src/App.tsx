import { FC } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './App.css';

interface FormData {
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  password: string,
  confirmPassword: string,
}

const App: FC = () => {

  const schema = z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    age: z.number().min(18),
    password: z.string().min(4).max(25),
    confirmPassword: z.string().min(4).max(25),
  })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First Name:
          <input type="text" {...register('firstName')} />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </label>
        <label>
          Last Name:
          <input type="text" {...register('lastName')} />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </label>
        <label>
          Email:
          <input type="email" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label>
          Age:
          <input type="number" {...register('age', {valueAsNumber: true})} />
          {errors.age && <span>{errors.age.message}</span>}
        </label>
        <label>
          Password:
          <input type="password" {...register('password')} />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
        <label>
          Confirm Password:
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default App;

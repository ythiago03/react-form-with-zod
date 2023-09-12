import { FC } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './App.css';

const App: FC = () => {

  const schema = z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    age: z.number().min(18),
    password: z.string().min(4).max(25),
    confirmPassword: z.string().min(4).max(25),
  })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Password do not match',
      path: ['confirmPassword']
    });

  const {register, handleSubmit} = useForm({resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First Name:
          <input type="text" {...register('firstName')} />
        </label>
        <label>
          Last Name:
          <input type="text" {...register('lastName')} />
        </label>
        <label>
          Email:
          <input type="email" {...register('email')} />
        </label>
        <label>
          Age:
          <input type="number" {...register('age', {valueAsNumber: true})} />
        </label>
        <label>
          Password:
          <input type="password" {...register('password')} />
        </label>
        <label>
          Confirm Password:
          <input type="password" {...register('confirmPassword')} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default App;

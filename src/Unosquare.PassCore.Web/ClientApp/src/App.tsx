import z from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import Header from './components/header';
import { fetchRequest } from './utils/fetch-request';
import { toast } from 'sonner';


const changePasswordSchema = z.object({
  username: z.string().email({ message: 'Enter a valid email address' })
    .refine(v => v.endsWith('@nitap.ac.in'), { message: 'Email must be @nitap.ac.in' }),
  currentPassword: z.string().min(1, 'Enter the Password'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters long')
}).refine(d => d.newPassword === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

type FormValues = z.infer<typeof changePasswordSchema>;

function App() {
  const form = useForm<FormValues>({
    defaultValues: {
      username: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = changePasswordSchema.safeParse(data);
    if (!result.success) {
      const firstErrorMessages = result.error.issues.map(issue => issue.message).join(', ');
      toast.error(firstErrorMessages);
      return;
    }

    const payload = {
      Username: data.username,
      CurrentPassword: data.currentPassword,
      NewPassword: data.newPassword,
      NewPasswordVerify: data.confirmPassword,
      Recaptcha: ''
    };

    try {
      const { ok, status, data: response } = await fetchRequest('api/password', 'POST', JSON.stringify(payload));
      if (!ok) {
        if (response && response.errors && response.errors.length) {
          const msg = response.errors.map((e: any) => e.Code ?? e.Error ?? e.Message ?? JSON.stringify(e)).join(', ');
          toast.error(msg || 'Password change failed');
        } else {
          toast.error(`Request failed (${status})`);
        }
        return;
      }
      toast.success('Password changed successfully');
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error('Unexpected error. See console.');
    }
  });
  return (
    <>
      <Header />
      <Card className="w-full max-w-md mx-auto mt-10 p-6">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem className='mb-2'>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your username" />
                    </FormControl>
                    <FormDescription>
                      For username CS23Bxx then use cs23Bxx@nitap.ac.in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="currentPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Enter your current password" />
                    </FormControl>
                    <FormDescription>
                      Please enter your current password to confirm your identity.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="newPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Enter your new password" />
                    </FormControl>
                    <FormDescription>
                      Please enter a new password that is at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Confirm your new password" />
                    </FormControl>
                    <FormDescription>
                      Please confirm your new password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-4"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card >
    </>
  );
}

export default App;

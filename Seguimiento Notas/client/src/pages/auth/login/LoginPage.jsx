import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import { useAuthStore, useForm } from "../../../hooks";

const loginFormFields = {
  loginUser: "",
  loginPass: "",
}

export const LoginPage = () => {

  const { startLogin } = useAuthStore();
  const { loginUser, loginPass, onInputChange: onLoginInputChange } = useForm(loginFormFields);

  const loginSubmit = event => {
    event.preventDefault();
    startLogin({ user: loginUser, pass: loginPass });
  };

  return (
    <div className="grid justify-center items-center h-screen bg-gray-400">
      <form onSubmit={loginSubmit}>
        <Card className="w-96">
          <CardHeader variant="gradient" color="red" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              Login
            </Typography>
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            <Input label="Usuario" size="lg" color="red" type="text" name={"loginUser"} value={loginUser} onChange={onLoginInputChange} />
            <Input label="Password" size="lg" color="red" type="password" name={"loginPass"} value={loginPass} onChange={onLoginInputChange} />
            <div className="-ml-2.5">
              <Checkbox label="Recuerdame" color="red" />
            </div>
          </CardBody>

          <CardFooter className="pt-0">
            <Button variant="gradient" color="red" fullWidth type="submit">
              Iniciar
            </Button>
          </CardFooter>
        </Card>

      </form>
    </div>
  )

}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginSchema, loginSchemaType } from "@/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { RegisterSchema, registerSchemaType } from "@/schema/registerSchema";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/hooks/signup";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react"
import { login } from "@/hooks/login";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";

const Auth = () => {
    const navigate = useNavigate();
    const { setUserInfo } = useAuthStore();

    const loginForm = useForm<loginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const registerForm = useForm<registerSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    //Signup
    const mutationSignup = useMutation({
        mutationFn: signup,
        onSuccess: (response) => {
            setUserInfo(response.data.user)
            toast.success("Cadastro realizado com sucesso")
            navigate("/profile");

        },
        onError: (error: any) => {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    })

    const onSubmitSignup = (values: registerSchemaType) => {
        mutationSignup.mutate(values);
    }

    //Login
    const mutationLogin = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            if (response.status === 201 && response.data.user.id) {
                setUserInfo(response.data.user)
                if (response.data.user.profileSetup) {
                    navigate("/chat");
                }
                else {
                    navigate("/profile")
                }
            }
            toast.success("Login realizado com sucesso", {className: "bg-orange-500 text-white"});
        },
        onError: (error: any) => {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    })

    const onSubmitLogin = (values: loginSchemaType) => {
        mutationLogin.mutate(values);
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center overflow-y-auto">
            <div className="2xl:gap-10 bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[80vw] 2xl:w-[80vw] lg:min-h-[80vh] lg:max-h-[95vh] rounded-3xl xl:grid xl:grid-cols-2 2xl:grid-cols-2 ">

                <div className="flex flex-col gap-8 items-center justify-center xl:ml-14 2xl:ml-8">

                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center">
                            <h1 className="flex font-bold md:text-6xl xl:text-4xl 2xl:text-6xl">Bem Vindo</h1>
                            <img src="./victory.svg" alt="" className="h-[100px] xl:h-[80px] 2xl:h-[100px]" />
                        </div>
                        <p className="font-medium text-center">
                            Faça login, para começar com o melhor aplicativo de bate-papo
                        </p>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <Tabs defaultValue="login" className="flex flex-col items-center justify-center">
                            <TabsList className="md:w-[600px] xl:w-[500px] 2xl:w-[650px] gap-2">
                                <TabsTrigger
                                    className="w-[50%] data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=active]:border-b-orange-500 text-black text-opacity-90 border-b-2 p-3 transition-all duration-300"
                                    value="login">
                                    Login
                                </TabsTrigger>
                                <TabsTrigger
                                    className="w-[50%] data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=active]:border-b-orange-500 text-black text-opacity-90 border-b-2 p-3 transition-all duration-300"
                                    value="signup">Cadastro</TabsTrigger>
                            </TabsList>
                            <TabsContent className="w-full mt-10" value="login">
                                <Form {...loginForm}>
                                    <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-8">
                                        <FormField
                                            control={loginForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" className="py-5" placeholder="Digite seu email" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={loginForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Senha</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" className="py-5" placeholder="Digite sua senha" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button disabled={mutationLogin.isPending} className="w-full bg-orange-500 hover:bg-orange-600 h-10" type="submit">{mutationLogin.isPending ? <LoaderCircle className="animate-spin" /> : "Iniciar Sessão"}</Button>
                                    </form>
                                </Form>
                            </TabsContent>

                            <TabsContent className="w-full mt-8 xl:mt-5 2xl:mt-8" value="signup">
                                <Form {...registerForm}>
                                    <form onSubmit={registerForm.handleSubmit(onSubmitSignup)} className="xl:space-y-5 2xl:space-y-8 space-y-8 mb-5">
                                        <FormField
                                            control={registerForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" className="py-2" placeholder="Digite seu email" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={registerForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Senha</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" className="py-2" placeholder="Digite sua senha" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={registerForm.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirmar senha</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" className="py-2" placeholder="Confirme a senha" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button disabled={mutationSignup.isPending} className="w-full bg-orange-500 hover:bg-orange-600 h-10" type="submit">{mutationSignup.isPending ? <LoaderCircle className="animate-spin" /> : "Cadastrar"}</Button>
                                    </form>
                                </Form>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <div className="2xl:block xl:block hidden w-full h-full">
                    <div className="flex items-center justify-end h-full">
                    <img className="rounded-3xl xl:w-[390px] 2xl:w-[600px] h-full " src="/img_login.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
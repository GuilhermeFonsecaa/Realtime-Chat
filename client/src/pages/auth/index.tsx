import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginSchema, loginSchemaType } from "@/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { Button } from "@/components/ui/button";

const Auth = () => {

    const loginForm = useForm<loginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmitLogin = (values: loginSchemaType) => {

    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-[80vw] h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">

                <div className="flex flex-col gap-10 items-center justify-center">

                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center">
                            <h1 className="flex text-5xl font-bold md:text-6xl">Bem Vindo</h1>
                            <img src="./victory.svg" alt="" className="h-[100px]" />
                        </div>
                        <p className="font-medium text-center">
                            Faça login, para começar com o melhor aplicativo de bate-papo
                        </p>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <Tabs defaultValue="login" className="flex flex-col items-center justify-center">
                            <TabsList className="w-[600px] gap-2">
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
                                        <Button className="w-full bg-orange-500 h-10" type="submit">Iniciar sessão</Button>
                                    </form>
                                </Form>
                            </TabsContent>

                            <TabsContent className="w-full mt-10" value="signup">
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
                                       <Button className="w-full bg-orange-500 h-10" type="submit">Cadastrar</Button>
                                    </form>
                                </Form>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Auth;
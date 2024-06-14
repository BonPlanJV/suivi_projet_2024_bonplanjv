import { useEffect, useState } from "react"
import { getUserByID, updateEmail } from "../firebase/database"
import { useNotification } from "../core/notificationContext";

export default function SettingSecurity() {
    const userID = sessionStorage.getItem("userID")
    const { showNotification } = useNotification();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [emailConfirm, setEmailConfirm] = useState(null);
    const [passwordEmail, setPasswordEmail] = useState(null);

    useEffect(() => {
        getUserByID(userID).then(data => setUser(data))
        console.log(user);
    })

    return (
        <section className="w-full animate-[selection_0.5s_ease-in-out] ml-10">
            <div className="flex flex-col space-y-5">
                <div className="w-full">
                    <h1 className="font-semibold">Account security</h1>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                </div>
                <div className="w-full flex space-x-5">
                    <div className="w-full pr-5 border-r border-neutral-700 space-y-5">
                        <h1 className="font-semibold">Change your Email</h1>
                        <div className="flex flex-col space-y-5">
                            <input
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                placeholder="New email"
                                className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2"
                                type="email" />
                            <input
                                onChange={(e) => setEmailConfirm(e.currentTarget.value)}
                                placeholder="Confirm email"
                                className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2" type="email" />
                            <input
                                onChange={(e) => setPasswordEmail(e.currentTarget.value)}
                                placeholder="Your current password"
                                className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2" type="password"/>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <button onClick={() => updateEmail({ userID, currentEmail: user.email, email, emailConfirm, password: passwordEmail, showNotification})} className="h-[50px] font-semibold rounded bg-bpjv w-[30%]" type="button">Submit</button>
                        </div>
                    </div>
                    <div className="w-full space-y-5">
                        <h1 className="font-semibold">Change your Password</h1>
                        <div className="flex flex-col space-y-5">
                            <input placeholder="New password"
                                className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2" type="text" />
                            <input placeholder="Confirm password" className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2" type="text"   />
                            <input placeholder="Your current password" className="w-full h-[50px] rounded-md bg-neutral-900 border-2 border-neutral-600 p-2" type="text"   />
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <button onClick={null} className="h-[50px] font-semibold rounded bg-bpjv w-[30%]" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
                <div className="pt-10 space-y-5">
                    <h1 className="font-semibold">Two factor authentication</h1>
                    <div className="w-full h-[20vh] rounded-xl bg-neutral-700 flex flex-col justify-center items-center space-y-5">
                        <p className="text-md text-white">Get codes with your favorite authentication mobile application to secure your account</p>
                        <button onClick={null} className="h-[50px] font-semibold rounded bg-bpjv w-[20%]" type="submit">Enable</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
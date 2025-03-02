"use client";
import Spinner from "@/component/spinner";
import buttonLogo from "@/images/logoButton.png";
import Image from "next/image";
import axios from "axios";
import { auth, provider, signInWithPopup } from "@/component/firebase";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const handleLogIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken1 = await result.user.getIdToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STORAGE_API_URL}/api/users/google`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken1}`,
          },
        }
      );
      localStorage.setItem("No.de_token", response.data.token);

      if (response.status === 200) {
        router.push("/onboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen w-screen ">
        <Spinner width={300} height={300} left={30} />
        <Spinner width={300} height={300} left={50} top={50} />

        <div className="flex relative gap-8 p-4 justify-center border-2 shadow-xl shadow-[#262626] rounded-xl border-black  items-center flex-col h-96 w-96 bg-white">
          <div className="font-tripSans font-bold text-2xl">
            Hello! We were expecting you.
          </div>
          <div className="font-tripSansMono gap-2 flex items-center text-xl justify-center">
            <div>Join</div>
            <div>
              <Image alt="logo" width={80} height={80} src={buttonLogo} />
            </div>
            <div>using</div>
          </div>
          <div>
            <button
              onClick={handleLogIn}
              className="w-48 h-36 gap-3 rounded-2xl border-2 border-b-8 border-black flex items-center justify-center flex-col"
            >
              <div>
                <Image
                  alt="google logo"
                  width={40}
                  height={40}
                  src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                />
              </div>
              <div className="font-tripSans font-bold text-xl">Google</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

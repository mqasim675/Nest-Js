import Link from "next/link";
import Login from "./components/templates/login";
export default function Home() {
  return (
    <>
      Qasim
      <Link href={"/components/organisms/header"}>navbar</Link>
      <Link href={"/templates/signup"}>signup</Link>
      <Login />
    </>
  );
}

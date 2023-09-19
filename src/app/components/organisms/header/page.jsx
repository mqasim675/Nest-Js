import PostList from "../../molecules/urldata/urldata";
// import SignUp from "../../templates/signup"

function Home() {
  return (
    <div>
      {/* <SignUp /> */}
      <PostList />
      <h1 className="text-4xl text-center mt-8">Welcome to My Next.js App</h1>
    </div>
  );
}

export default Home;

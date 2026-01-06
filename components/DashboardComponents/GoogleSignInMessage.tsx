
export default function GoogleSignInMessage() {
  return (
    <div className="my-9">
      <h1 className="text-5xl text-lime-500 mb-5">
        Congrats! You have signed in with Google!
      </h1>
      <p className="text-2xl text-amber-500">
        You will not see Data because this is a demo, The backend OAuth token
        endpoint is not yet implemented.
      </p>
    </div>
  );
}

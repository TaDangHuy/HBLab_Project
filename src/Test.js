import { GoogleLogin, GoogleLogout } from "react-google-login";

export default function Test() {
  //   const responseGoogle = (response) => {
  //     console.log(response);
  //   };

  const onSuccess = (res) => {
    console.log(res.profileObj);
  };
  const onFailure = (res) => {
    console.log(res);
  };
  return (
    <div className="Test">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* <GoogleLogin
        clientId="217054306305-6832pf85gjes9kkhvr56sedtcsdv3gtc.apps.googleusercontent.com"
        // render={(renderProps) => (
        //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
        //     GoogleLogin
        //   </button>
        // )}
        buttonText="login"
        onSuccess={(res) => {
          console.log(res.profileObj);
        }}
        onFailure={(res) => {
          console.log(res);
        }}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      /> */}

      <GoogleLogin
        clientId="217054306305-6832pf85gjes9kkhvr56sedtcsdv3gtc.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />

      {/* <GoogleLogout
        clientId="217054306305-6832pf85gjes9kkhvr56sedtcsdv3gtc.apps.googleusercontent.com"
        buttonText="logout"
        onLogoutSuccess={() => {
          console.log("oke");
        }}
      /> */}
    </div>
  );
}

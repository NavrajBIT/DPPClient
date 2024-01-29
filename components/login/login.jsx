import Page from "@/subcomponents/containers/page";
import Loginform from "@/subcomponents/forms/loginform/loginform";

const Login = () => {
  return (
    <Page
      innerStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loginform />
    </Page>
  );
};

export default Login;

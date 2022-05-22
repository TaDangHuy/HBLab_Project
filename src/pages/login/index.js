import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useThemes } from "./style";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";
import { useDispatch } from "react-redux";
import { postEmail, postEmailGoogle } from "../../redux/actions/login";
import Message from "../../components/Message";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBrowserHistory } from "history";
import { TITLE_LOGIN } from "../../constants/listTitle";

const refreshTokenSetup = (res) => {
  // Timing to renew access token
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log("newAuthRes:", newAuthRes);
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    localStorage.setItem("authToken", newAuthRes.id_token);

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
};

const Login = () => {
  const dispatch = useDispatch();
  const classes = useThemes();
  const history = createBrowserHistory({ forceRefresh: true });

  const [infoMessage, setInfoMessage] = useState({
    isOpen: false,
    message: "",
    status: "",
  });
  const [isLoading, setLoading] = useState(null);

  useEffect(() => {
    document.title = TITLE_LOGIN;
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("No email format!")
        .required("Email cannot be blank!"),
      password: Yup.string()
        .min(6, "Must have at least 6 characters!")
        .required("Password cannot be blank!"),
    }),
    onSubmit: (values) => {
      const value = {
        email: values.email,
        password: values.password,
      };
      setLoading(true);
      dispatch(
        postEmail(
          value,
          (message) => onSuccess(message),
          (message) => onError(message)
        )
      );
    },
  });

  const responseGoogle = (response) => {
    const token = response.accessToken;
    console.log("response: " + token);
    dispatch(
      postEmailGoogle(
        { access_token: token },
        (message) => onSuccess(message),
        (message) => onError(message)
      )
    );

    refreshTokenSetup(response);
  };

  const onFailure = (res) => {
    console.log("on Failure");
  };

  const handleClose = () => {
    setInfoMessage({ isOpen: false });
  };

  const onSuccess = (message) => {
    setInfoMessage({
      isOpen: true,
      status: "success",
      message: message,
    });
    history.push("/");
  };

  const onError = (message) => {
    setInfoMessage({
      isOpen: true,
      status: "error",
      message: message,
    });
    setLoading(false);
  };
  const forgotPassword = () => {};

  return (
    <Grid className={classes.root} container>
      <Grid item xs={6} className={classes.loginLeft}>
        <LoginLeft />
      </Grid>
      <Grid item xs={6} className={classes.rightPadding}>
        <LoginRight
          onFailure={onFailure}
          onSuccess={responseGoogle}
          onSubmit={formik.handleSubmit}
          valueEmail={formik.values.email}
          valuePassword={formik.values.password}
          onChangeEmail={formik.handleChange}
          onChangePassword={formik.handleChange}
          isLoading={isLoading}
          errorEmail={formik.errors.email}
          errorPassword={formik.errors.password}
          touchedEmail={formik.touched.email}
          touchedPassword={formik.touched.password}
          forgotPassword={forgotPassword}
        />
      </Grid>
      <Message
        open={infoMessage.isOpen}
        handleClose={handleClose}
        title={infoMessage.message}
        status={infoMessage.status}
      />
    </Grid>
  );
};

export default Login;

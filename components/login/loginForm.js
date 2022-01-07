import { useRef } from "react";
import styles from "../../styles/login.module.css";
import Link from "next/link";
import InputEmail from "./InputEmail";
import InputPassword from "./InputPassword";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function LoginForm() {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const rememberMeRef = useRef();

  function formSubmit(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passInputRef.current.value;
    const rememberMe = rememberMeRef.current.checked;

    //validation of email and password
    const passwordLength = password.length > 5 && password.length < 60;
    const regexValidateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regexValidateEmail) && passwordLength) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }
  return (
    <form className={styles.formFlex} onSubmit={(e) => formSubmit(e)}>
      <InputEmail setRef={emailInputRef} inputId={"signInFormInputEml"} />
      <InputPassword setRef={passInputRef} inputId={"signInFormInputPas"} />
      <div className={styles.btnContain}>
        <button className={`netflixBtn ${styles.submitBtn}`} type="submit">
          Sign In
        </button>
      </div>
      <div className={styles.inputFoot}>
        <div className={styles.checkBoxContain}>
          <input
            className={styles.checkRememberInput}
            ref={rememberMeRef}
            type="checkbox"
            name="checkRemember"
            id="checkRemember"
          />
          <label className={styles.checkRememberLabel} htmlFor="checkRemember">
            Remember me
          </label>
        </div>
        <Link href="/">
          <a className={styles.helpLink}>Need Help?</a>
        </Link>
      </div>
    </form>
  );
}

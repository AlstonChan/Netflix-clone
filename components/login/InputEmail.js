import styles from "../../styles/emailPassInput.module.css";

import { useState, useEffect } from "react";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";

export default function Input({
  setRef,
  inputId,
  mode,
  useLocalStorageData,
  label,
  warnings,
}) {
  //Placeholder for input, move up when focus or a value is enter
  //move down when blur, but only if value is ''
  const [emailInputLabelClass, setEmailInputLabelClass] = useState(
    styles.inputBoxLabel
  );

  //Set warning about user email input and toggle the warning presence
  const [emailInput, setEmailInput] = useState({
    class: mode === "dark" ? styles.darkInputBox : styles.lightInputBox,
    warnings: "",
  });

  //Ensure that upon page refresh, email input will be cleared
  //and reset the state of emailInputLabelClass
  useEffect(() => {
    setRef.current.value = "";
    handleInputClick({ type: "blur" });
    if (useLocalStorageData && typeof setRef != undefined) {
      const val = sessionStorage.getItem("user");
      if (val) {
        const decrypted = aes
          .decrypt(val, process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE)
          .toString(CryptoJS.enc.Utf8);
        setRef.current.value = decrypted;
        const e = { type: "focus" };
        handleInputClick(e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkEmailInput(val) {
    const valLength = val?.length ?? 0;
    const regexValidateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (valLength == 0) return;
    if (valLength <= 4) {
      setEmailInput({
        class:
          mode === "dark"
            ? `${styles.darkInputBox} ${styles.inputBoxWarnBorder}`
            : `${styles.lightInputBox} ${styles.inputBoxWarnBorderSign}`,
        warnings: warnings || "Email is required!",
      });
    } else if (!val.match(regexValidateEmail)) {
      setEmailInput({
        class:
          mode === "dark"
            ? `${styles.darkInputBox} ${styles.inputBoxWarnBorder}`
            : `${styles.lightInputBox} ${styles.inputBoxWarnBorderSign}`,
        warnings: "Please enter a valid email address",
      });
    } else {
      setEmailInput({
        class: mode === "dark" ? styles.darkInputBox : styles.lightInputBox,
        warnings: "",
      });
    }
  }

  function handleInputClick(e) {
    const val = setRef.current._valueTracker.getValue();
    if (e.type === "change") {
      checkEmailInput(val);
    } else if (e.type === "focus") {
      setEmailInputLabelClass(
        `${styles.inputBoxLabel} ${styles.inputBoxLabelMove}`
      );
    } else if (val !== "") {
      return;
    } else if (e.type === "blur") {
      setEmailInputLabelClass(`${styles.inputBoxLabel}`);
    }
  }

  return (
    <div className={styles.inputContainAll}>
      <div className={styles.inputContain}>
        <input
          type="email"
          name="emailInput"
          autoComplete="true"
          dir="lft"
          tabIndex={0}
          maxLength="50"
          id={inputId}
          className={emailInput.class}
          ref={setRef}
          onFocus={(e) => handleInputClick(e)}
          onBlur={(e) => handleInputClick(e)}
          onChange={(e) => handleInputClick(e)}
        />
        <label htmlFor={inputId} className={emailInputLabelClass}>
          {label || "Email"}
        </label>
      </div>
      <p
        className={
          mode === "dark" ? styles.inputBoxWarn : styles.inputBoxWarnSign
        }
      >
        {emailInput.warnings}
      </p>
    </div>
  );
}

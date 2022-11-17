import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./App.css";

function App() {
  const [password, setpassword] = useState("");
  const [eyevisible, seteyevisible] = useState(true);
  const passwordField = useRef(null);
  const copyalert = useRef(null);
  const toggleEye = () => {
    seteyevisible((current) => !current);
    if (passwordField.current.type === "password") {
      passwordField.current.type = "text";
    } else {
      passwordField.current.type = "password";
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let passwordLength = Math.floor(Math.random() * 5) + 7;
    let uppercharacters = [];
    let numbercharacters = [];
    let specialcharacters = [];
    let generatedPassword = "";
    let lowercasechars = "abcdefghijklmnopqrstuvwxyz";
    let uppercasechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numberchars = "0123456789";
    let specialchars = "!#$%&*+-/=?@_";
    const choices = document.querySelectorAll("input:checked");
    for (let choice of choices) {
      if (choice.id === "islong") {
        passwordLength = Math.floor(Math.random() * 5) + 12;
      }
    }
    for (let choice of choices) {
      if (choice.id === "containsuppercase") {
        let numberofchars = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numberofchars; i++) {
          let elem;
          do {
            elem = Math.floor(Math.random() * passwordLength);
          } while (
            numbercharacters.includes(elem) ||
            specialcharacters.includes(elem)
          );
          uppercharacters.push(elem);
        }
      } else if (choice.id === "containsnbr") {
        let numberofchars = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numberofchars; i++) {
          let elem;
          do {
            elem = Math.floor(Math.random() * passwordLength);
          } while (
            uppercharacters.includes(elem) ||
            specialcharacters.includes(elem)
          );
          numbercharacters.push(elem);
        }
      } else if (choice.id === "containssp") {
        let numberofchars = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numberofchars; i++) {
          let elem;
          do {
            elem = Math.floor(Math.random() * passwordLength);
          } while (
            numbercharacters.includes(elem) ||
            uppercharacters.includes(elem)
          );
          specialcharacters.push(elem);
        }
      }
    }
    for (let index = 0; index < passwordLength; index++) {
      if (numbercharacters.includes(index)) {
        generatedPassword += numberchars.charAt(
          Math.floor(Math.random() * numberchars.length)
        );
      } else if (uppercharacters.includes(index)) {
        generatedPassword += uppercasechars.charAt(
          Math.floor(Math.random() * uppercasechars.length)
        );
      } else if (specialcharacters.includes(index)) {
        generatedPassword += specialchars.charAt(
          Math.floor(Math.random() * specialchars.length)
        );
      } else {
        generatedPassword += lowercasechars.charAt(
          Math.floor(Math.random() * lowercasechars.length)
        );
      }
    }
    setpassword(generatedPassword);
  };
  const copy = () => {
    navigator.clipboard.writeText(passwordField.current.value);
    copyalert.current.style.display = "flex";
    setTimeout(() => {
      copyalert.current.style.display = "none";
    }, 2000);
  };
  return (
    <div>
      <h1>Generate a safe password!</h1>
      <form method="POST" className="form" onSubmit={onSubmit}>
        <label htmlFor="password" style={{ fontSize: "large" }}>
          Your password is:
        </label>
        <div>
          <input
            ref={passwordField}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={() => {}}
          />
          {eyevisible ? (
            <button type="button" onClick={toggleEye}>
              <AiFillEye />
            </button>
          ) : (
            <button type="button" onClick={toggleEye}>
              <AiFillEyeInvisible />
            </button>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            name="containsuppercase"
            id="containsuppercase"
          />
          <label htmlFor="containsuppercase">
            contains uppercase caracters
          </label>
        </div>
        <div>
          <input type="checkbox" name="containsnbr" id="containsnbr" />
          <label htmlFor="containsnbr">contains numbers</label>
        </div>
        <div>
          <input type="checkbox" name="containssp" id="containssp" />
          <label htmlFor="containssp">contains special caracters</label>
        </div>
        <div>
          <input type="checkbox" name="islong" id="islong" />
          <label htmlFor="islong">long password</label>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <button type="submit">Generate</button>
          <button type="button" onClick={copy}>
            Copy
          </button>
        </div>
      </form>
      <div className="copy-flex" ref={copyalert}>
        <div className="copy-alert">Copied to clipboard!</div>
      </div>
    </div>
  );
}

export default App;

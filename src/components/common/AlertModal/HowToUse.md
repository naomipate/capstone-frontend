## How to use Alert component

1. You import the component to the page that you want to render it on (import Alert from "file path here")
2. You create a state that toggles a boolean value e.g const [show, setShow] = useState(false)
3. Render the component on the page in relation to the show State we created

```js client
{
  show && <Alert message={"Successfull Signup"} />;
}
```

Component uses props to take in a message

4. Apply a timeout in the respective area that you want to trigger the alert

```js client
setShow(true);
setTimeout(() => {
  setShow(false);
  navigate("/login");
}, 3000);
```

This is an example that was used for the signup page. The state is toggled to true when there's a successful login and the alert is made visible for 3 seconds before toggling back off and moving on to the next page.

Any further reference on how to use can come from the live example provided in Signup.js

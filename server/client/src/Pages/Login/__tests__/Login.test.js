import { render, screen, fireEvent } from "../../../Global/Utils/test";
import Login from "../Login";
import axiosClient from "../../../Global/Api/axiosConfig";
import API_ENDPOINTS from "../../../Global/Api/api-endpoints";

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  post: jest.fn().mockReturnValue("Success"),
  get: jest.fn(),
}));

describe("Login tests", () => {
  let axiosClientPostSpy;

  beforeEach(() => {
    axiosClientPostSpy = jest.spyOn(axiosClient, "post");
  });

  afterEach(() => {
    jest.clearAllMocks();
    axiosClient.post.mockRestore();
  });

  test("Should allow user to type the username", () => {
    render(<Login />);
    const loginInput = screen.getByRole("textbox", { name: "email" });
    const requiredError = screen.queryByText("Required Field");
    expect(requiredError).not.toBeInTheDocument();
    fireEvent.change(loginInput, { target: { value: "testing@gmail.com" } });
    expect(loginInput.value).toBe("testing@gmail.com");
  });

  test("Should toggle required field error for email and password", () => {
    render(<Login />);
    //Gather elements
    const loginInput = screen.getByRole("textbox", { name: "email" });
    const passwordInput = screen.getByPlaceholderText("Password");

    //Expect no Required Field Errors to be on the page
    expect(screen.queryAllByText("Required Field").length).not.toBe(2);

    //Create a Required Field error by changing the values of the email and password
    fireEvent.change(loginInput, { target: { value: "test" } });
    fireEvent.change(loginInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    //The values of the email and password fields should be empty
    expect(loginInput.value).toBe("");
    expect(passwordInput.value).toBe("");

    //There should be two Required field errors on the page now
    expect(screen.queryAllByText("Required Field").length).toBe(2);

    //Removing all the errors by entering values in the input fields.
    fireEvent.change(loginInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });

    //There should be no Required field errors on the page now
    expect(screen.queryAllByText("Required Field").length).not.toBe(2);
  });

  test("Should login when both email and password exist", () => {
    render(<Login />);
    const loginInput = screen.getByRole("textbox", { name: "email" });
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.click(loginButton); // no email and password exists so login dispatch wont be fired
    expect(axiosClientPostSpy).toBeCalledTimes(0);

    fireEvent.change(loginInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(loginButton); // Email and password exist so it will call the apilogin
    expect(axiosClientPostSpy).toBeCalledWith(API_ENDPOINTS.AUTH.POST_LOGIN, {
      email: "test@gmail.com",
      password: "testPassword",
    });
  });
});

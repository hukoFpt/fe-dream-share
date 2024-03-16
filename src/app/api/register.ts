import axios from "axios";

export async function register(
  email: string,
  password: string,
  phonenumber: string,
  address: string
) {
  try {
    const response = await fetch(
      "https://65cd13f5dd519126b8401401.mockapi.io/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phonenumber, address }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful", data);
    } else {
      console.error(
        "An error occurred while trying to register:",
        response.statusText
      );
    }
  } catch (error) {
    throw error;
  }
}

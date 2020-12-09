import React from 'react';

export default function NPSForm() {
  return (
    <form
      action="https://docs.google.com/forms/u/2/d/e/1FAIpQLSdWNUWznfwuOhZHibxEBz3DKZ4IJ-JCuGnOOM3Yx1j5U2Qfrg/formResponse"
      method="POST"
      id="mG61Hd"
    >
      <p>
        <label>
          From 1-10, how likely are you to recommend Huddle to a friend? (1 being not likely, 10 being very likely)
        </label>
        <input type="text" required name="entry.2146081126" id="first" placeholder="Enter a number 1 through 10." />
      </p>
      <p className="last-name">
        <label>Can you briefly explain why you chose that answer?</label>
        <input type="text" required name="entry.560041652" id="first" placeholder="Give a brief explanation here." />
      </p>
      <img src="../../img/thankyou.jpeg" alt="Thank you"></img>
      <p>Thanks for your help, have a great day!</p>
      <p>- Armaan, Andy, Vicky, and Albert :)</p>
      <p>
        <input id="submit" type="submit" value="Submit" />
      </p>
    </form>
  );
}

import { useState } from "react";

export default function Contact() {
  const [message, setMessage] = useState("");

  return (
    <section className="contact-page">
      <h1>Contact Me</h1>
      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <p>Your Message:</p>
      <p className="message-preview">{message}</p>
    </section>
  );
}

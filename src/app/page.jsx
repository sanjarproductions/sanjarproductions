import "./globals.css";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import { FaCircle } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="container page">
        <h1 className="page-title">home</h1>
        <Nav />
        <div className="main">
          <p className="desc">Hey, My name is <span>Sanjar</span>, I'm a Frontend Developer and the founder of Kivi Studio.
            I enjoy working with React.js, Next.js, and Tailwind CSS, building sleek and modern web applications.</p>

          <div className="line-home"></div>

          <div className="contacts links">
            <h2>Connect with me</h2>
            <ul>
              {/* <li>Twitter<a href="https://x.com/sanjarprod">@sanjarprod</a></li> */}
              <li><FaCircle className="link-circle"/> Link<a href="#">@sanjarproductions</a></li>
              <li><FaCircle className="link-circle"/> Link<a href="#">@sanjarproductions</a></li>
              <li><FaCircle className="link-circle"/> Email<a href="mailto:sanjarkama26@gmail.com">sanjarkama26@gmail.com</a></li>
              <li><FaCircle className="link-circle"/> Email<a href="mailto:sanjarkama26@gmail.com">sanjarkama26@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

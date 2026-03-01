import "./globals.css";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import { FaCircle } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <div className="container page">
        <Nav />
        <h1 className="page-title">home</h1>
        <div className="main">
          <p className="desc">On a mission to turn dreams into <span>reality</span>. Learning from the best, I'm documenting my path to success.</p>

          <div className="line-home"></div>

          <div className="contacts links">
            <h2>Connect with me</h2>
            <ul>
              {/* <li>Twitter<a href="https://x.com/sanjarprod">@sanjarprod</a></li> */}
              <li><FaCircle className="link-circle" /> Instagram<a href="https://www.instagram.com/sanjarproductions">@sanjarproductions</a></li>
              <li><FaCircle className="link-circle" /> Agency<a href="https://www.kivistudio.uz">kivistudio</a></li>
              <li><FaCircle className="link-circle" /> Discord<a href="https://discord.gg/7WSrsCfGFm">@sanjarproductions</a></li>
              <li><FaCircle className="link-circle" /> Email<a href="mailto:sanjarkama26@gmail.com">sanjarkama26@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

import {
  YoutubeOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#151515" }}>
      <div className="top-footer">
        <div className="container">
          <div className="row">
            <div className="menu">
              <div className="col">
                <div className="menu_footer">
                  <h3 className="title_menu">Custom Service</h3>
                  <ul className="list">
                    <li className="list-item">
                      <Link href={"/"} title="Shipping info">
                        Shipping info
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link href={"/"} title="Refunds & returns">
                        Refunds &amp; returns
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link href={"/"} title="Terms & conditions">
                        Terms &amp; conditions
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link href={"/login"} title="My account">
                        My account
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="menu_footer">
                  <h3 className="title_menu">Information</h3>
                  <ul className=" list">
                    <li className="list-item">
                      <Link href={"/blog"} title="Our blog">
                        Our blog
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link href={"/"} title="About Us">
                        About Us
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link href={"/"} title="Contact Us">
                        Contact Us
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link href={"/"} title="FAQs">
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="center">
              <div className="footer-center">
                <div className="logosvg" style={{ maxWidth: 180 }}>
                  <Link href={"/"}>
                    <img src="/kartw.svg" alt="" />
                  </Link>
                </div>
                <div className="list-icon">
                  <Link href={"/"} target="_blank">
                    <FacebookOutlined className="social-item" />
                  </Link>
                  <Link href={"/"} target="_blank">
                    <YoutubeOutlined className="social-item" />
                  </Link>
                  <Link href={"/"} target="_blank">
                    <InstagramOutlined className="social-item" />
                  </Link>
                  <Link href={"/"} target="_blank">
                    <TwitterOutlined className="social-item" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="newsletter">
              <div className="left">
                <h3 className="title_menu">Instagram</h3>
                <div className="instagram-wrap">
                  <div className="picture">
                    <Link href={"https://www.instagram.com/"} target="_blank">
                      <img src="/products/instagram1.jpg" alt="instagram" />
                    </Link>
                  </div>
                  <div className="picture">
                    <Link
                      href={"https://www.instagram.com/"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/products/instagram2.jpg" alt="instagram" />
                    </Link>
                  </div>
                  <div className="picture">
                    <Link
                      href={"https://www.instagram.com/"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/products/instagram3.jpg" alt="instagram" />
                    </Link>
                  </div>
                  <div className="picture">
                    <Link
                      href={"https://www.instagram.com/"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/products/instagram4.jpg" alt="instagram" />
                    </Link>
                  </div>
                  <div className="picture">
                    <Link
                      href={"https://www.instagram.com/"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/products/instagram5.jpg" alt="instagram" />
                    </Link>
                  </div>
                  <div className="picture">
                    <Link
                      href={"https://www.instagram.com/"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/products/instagram6.jpg" alt="instagram" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="text-copyright">
              <p>© Copyright 2023 | Powered by Thanh Nguyen.</p>
            </div>
            <div className="payment">
              <img src="/products/payment.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

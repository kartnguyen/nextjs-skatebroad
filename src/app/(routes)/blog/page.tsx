import { Breadcrumb } from "antd";
import Link from "next/link";

const Blog = () => {
  return (
    <section>
      <div className="breadcrumb">
        <h1 className="breadcrumb-title">News</h1>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link href="/">Home</Link>,
            },
            {
              title: "News",
            },
          ]}
        />
      </div>
      <div className="container">
        <div className="blog-page">
          <div className="content-blog-page">
            <div className="item">
              <div className="blog_grid">
                <div className="post-thumb">
                  <img src="/products/blog_1_1024x1024.jpg" alt="" />
                  <div className="single-post-date">
                    <p className="date">23</p>
                    <span className="month">Jul</span>
                  </div>
                </div>
                <div className="post-info">
                  <h4 className="blog-title">News</h4>
                  <h3 className="post-title">
                    <Link href={"/blog"} title="Training During Ramadan">
                      Training During Ramadan
                    </Link>
                  </h3>
                  <p className="desc">
                    In mattis scelerisque magna, ut tincidunt ex. Quisque nibh
                    urna, pretium in tristique in, bibendum sed libero.
                    Pellentesque mauris nunc, pr...
                  </p>
                  <Link href={"/blog"} className="btn_readmore">
                    <span>Read more </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="blog_grid">
                <div className="post-thumb">
                  <img src="/products/blog_2_1024x1024.jpg" alt="" />
                  <div className="single-post-date">
                    <p className="date">23</p>
                    <span className="month">Jul</span>
                  </div>
                </div>
                <div className="post-info">
                  <h4 className="blog-title">News</h4>
                  <h3 className="post-title">
                    <Link href={"/blog"} title="Collagen And White Tissue">
                      Collagen And White Tissue
                    </Link>
                  </h3>
                  <p className="desc">
                    In mattis scelerisque magna, ut tincidunt ex. Quisque nibh
                    urna, pretium in tristique in, bibendum sed libero.
                    Pellentesque mauris nunc, pr...
                  </p>
                  <Link href={"/blog"} className="btn_readmore">
                    <span>Read more </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="blog_grid">
                <div className="post-thumb">
                  <img src="/products/blog_3_1024x1024.jpg" alt="" />
                  <div className="single-post-date">
                    <p className="date">23</p>
                    <span className="month">Jul</span>
                  </div>
                </div>
                <div className="post-info">
                  <h4 className="blog-title">News</h4>
                  <h3 className="post-title">
                    <Link href={"/blog"} title="What's The Best Time To  Gym?">
                      What&apos;s The Best Time To Gym?
                    </Link>
                  </h3>
                  <p className="desc">
                    In mattis scelerisque magna, ut tincidunt ex. Quisque nibh
                    urna, pretium in tristique in, bibendum sed libero.
                    Pellentesque mauris nunc, pr...
                  </p>
                  <Link className="btn_readmore" href={"/blog"}>
                    <span>Read more </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="blog_grid">
                <div className="post-thumb">
                  <img src="/products/blog_4_1024x1024.jpg" alt="" />
                  <div className="single-post-date">
                    <p className="date">23</p>
                    <span className="month">Jul</span>
                  </div>
                </div>
                <div className="post-info">
                  <h4 className="blog-title">News</h4>
                  <h3 className="post-title">
                    <Link href={"/blog"} title="Post Format Video Blogs">
                      Post Format Video Blogs
                    </Link>
                  </h3>
                  <p className="desc">
                    Nunc aliquet, justo non commodo congue, velit sem pulvinar
                    enim, ac bibendum mi mi eget libero. Maecenas ac viverra
                    enim, et laoreet lacus....
                  </p>
                  <Link href={"/blog"} className="btn_readmore">
                    <span>Read more </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="blog_grid">
                <div className="post-thumb">
                  <img src="/products/blog_5_1024x1024.jpg" alt="" />
                  <div className="single-post-date">
                    <p className="date">23</p>
                    <span className="month">Jul</span>
                  </div>
                </div>
                <div className="post-info">
                  <h4 className="blog-title">News</h4>
                  <h3 className="post-title">
                    <Link href={"/blog"} title="Post Format Gallery Blogs">
                      Post Format Gallery Blogs
                    </Link>
                  </h3>
                  <p className="desc">
                    Nunc aliquet, justo non commodo congue, velit sem pulvinar
                    enim, ac bibendum mi mi eget libero. Maecenas ac viverra
                    enim, et laoreet lacus....
                  </p>
                  <Link href={"/blog"} className="btn_readmore">
                    <span>Read more </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="blog_grid">
                <div className="post-thumb">
                  <img src="/products/blog_6_1024x1024.jpg" alt="" />
                  <div className="single-post-date">
                    <p className="date">23</p>
                    <span className="month">Jul</span>
                  </div>
                </div>
                <div className="post-info">
                  <h4 className="blog-title">News</h4>
                  <h3 className="post-title">
                    <Link href={"/blog"} title="Post Format Audio Blogs">
                      Post Format Audio Blogs
                    </Link>
                  </h3>
                  <p className="desc">
                    Nunc aliquet, justo non commodo congue, velit sem pulvinar
                    enim, ac bibendum mi mi eget libero. Maecenas ac viverra
                    enim, et laoreet lacus....
                  </p>
                  <Link href={"/blog"} className="btn_readmore">
                    <span>Read more </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;

import Layout from "@/src/layout/Layout";
import { sliderProps } from "@/src/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Runestone3D = dynamic(() => import("@/src/components/Runestone3D"), {
  ssr: false,
});
// const Counter = dynamic(() => import("@/src/components/Counter"), {
//   ssr: false,
// });

const IndexSingle = () => {
  return (
    <Layout singleMenu dark>
      {/* Hero Section Start */}
      <section
        id="home"
        className="hero-area pt-100 rpt-65 pb-100 rpb-65 rel z-1"
        style={{ height: "100vh" }}
      >
        <div
          className="container hero-container"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "85vh",
          }}
        >
          <div className="col-lg-12">
            <div className="hero-content wow fadeInLeft delay-0-2s">
              <h1>
                <span>Merlin</span> <br />
                <i className="theme-color runestone-h1">RUNESTONE</i>
              </h1>
            </div>
          </div>
          <div className="col-lg-12 mt-20 mb-20 early-access">
            <div className="theme-btn style-two wow fadeInLeft delay-0-2s early-access-btn">
              <div className="menu-sidebar">
                <Link
                  href={"#"}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("body")
                      .classList.add("side-content-visible");
                  }}
                >
                  EARLY ACCESS
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-fluid">
          <div className="hero-bottom-image">
            <div className="hero-social">
              <a href="#" target="_blank">
                <i className="fa-regular fa-envelope" /> <span>Email</span>
              </a>
              <a href="#" target="_blank">
                <i className="fa-regular fa-paper-plane" />{" "}
                <span>Telegram</span>
              </a>
              <a href="#" target="_blank">
                <i className="fab fa-x-twitter" /> <span>Twitter</span>
              </a>
            </div>
          </div>
        </div> */}
        {/* <div className="hero-bg">
          <img src="assets/images/hero/hero-bg.png" alt="lines" />
        </div> */}
      </section>
      {/* Hero Section End */}
      <div className="runestone-container">
        <Runestone3D />
      </div>
      {/* About Us Area start */}
      <section id="about" className="about-area pt-100 rpt-100 rel z-3">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-5 col-lg-4">
              <div className="about-image rmb-45 wow fadeInUp delay-0-2s floating-up">
                <img src="assets/images/about/bitcoin.png" alt="Bitcoin" />
              </div>
            </div>
            <div className="col-xl-7 col-lg-8">
              <div className="about-content wow fadeInUp delay-0-4s">
                <div className="section-title mb-40">
                  <span className="sub-title mb-15">Chapter 1</span>
                  <h2>RUNEROCK - The Origins</h2>
                </div>
                <div className="content">
                  <Swiper
                    {...sliderProps.testimonialsActiveSwiper}
                    className="testimonials-active"
                  >
                    <SwiperSlide className="testimonial-item">
                      <div className="author-speech">
                        <p>
                          Once upon a time, there was a prince named Merlin who
                          lived in the magical kingdom — Merlin Chain.{" "}
                          <span className="page">1</span>
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="testimonial-item">
                      <div className="author-speech">
                        <p>
                          From the time he was little, Merlin was fascinated by
                          something called RUNESTONE. He dreamed of collecting
                          every single one in the world.{" "}
                          <span className="page">2</span>
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="testimonial-item">
                      <div className="author-speech">
                        <p>
                          When Merlin grew up, he decided it was time to start
                          his journey. He wanted to travel the world and find as
                          many RUNESTONEs as he could.{" "}
                          <span className="page">3</span>
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="testimonial-item">
                      <div className="author-speech">
                        <p>
                          His first stop? The nearby kingdom — Ethereum, where
                          he hoped to discover ancient stones perfect for
                          crafting his own RUNESTONEs.{" "}
                          <span className="page">4</span>
                        </p>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="testimonial-item">
                      <div className="author-speech">
                        <p>
                          With excitement in his heart, Merlin embarked on his
                          journey, and met Ether Rock{" "}
                          <span className="page">5</span>
                        </p>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                  {/* <p>
                    Merlin RUNESTONE is a unique NFT collection of 111
                    RUNESTONEs across 5 themes, 5 styles, and 3 characters. It
                    features 11 ultra-rare 1/1 editions, blending ancient magic
                    with digital artistry for an enchanting blockchain
                    experience.
                  </p> */}
                  <Link
                    legacyBehavior
                    href="https://medium.com/@merlin.runestone.xyz/chapter-1-runerock-the-origins-bebde2ee8676"
                    target="_blank"
                  >
                    <a className="theme-btn style-two me-4 mt-20">
                      Learn More <i className="fa fa-arrow-right" />
                    </a>
                  </Link>
                  <a legacyBehavior>
                    <a className="theme-btn style-two me-4 mt-20 coming-soon">
                      <p style={{ margin: 0 }}>GET RUNEROCK</p>
                      <p
                        className="coming-soon-p"
                        style={{ margin: 0, display: "none" }}
                      >
                        COMING SOON
                      </p>
                      <i className="fa fa-arrow-right" />
                    </a>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Us Area end */}
      {/* Headline area start */}
      <div className="headline-area rel z-0">
        <div className="container-fluid">
          <div className="headline-text marquee">
            <span>
              <span>Merlin</span> RUNESTONE
            </span>
          </div>
        </div>
      </div>
      {/* Headline Area end */}
      {/* FAQs start */}
      <section id="faq" className="what-we-do-area pt-90 rpt-80 rel z-1">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-6 what-we-do">
              <div className="what-we-do-image mb-55 wow fadeInRight delay-0-2s floating-down">
                <img
                  src="assets/images/faqs/merlin-main-pic.jpg"
                  alt="What We Do"
                  style={{
                    maxHeight: "80vh",
                  }}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 what-we-do">
              <div className="what-we-do-content mb-55">
                <div className="section-title mb-60 wow fadeInUp delay-0-2s">
                  <span className="sub-title mb-15">Why Merlin RUNESTONE?</span>
                  <h2>All RUNESTONEs Belong to Merlin</h2>
                </div>
                <div className="what-we-do-item wow fadeInUp delay-0-3s">
                  <div className="number">
                    <span>01</span>
                  </div>
                  <div className="content">
                    <h5>Should I Get One?</h5>
                    <p>
                      Definitely! Only 111 available. Get one NOW or FOMO
                      latter.
                    </p>
                  </div>
                </div>
                <div className="what-we-do-item wow fadeInUp delay-0-5s">
                  <div className="number">
                    <span>02</span>
                  </div>
                  <div className="content">
                    <h5>What's the Utility?</h5>
                    <p>
                      Owning a RUNESTONE grants you Merlin’s magic, prestige,
                      and mythical benefits.
                    </p>
                  </div>
                </div>
                <div className="what-we-do-item wow fadeInUp delay-0-7s">
                  <div className="number">
                    <span>03</span>
                  </div>
                  <div className="content">
                    <h5>Roadmap?</h5>
                    <p>
                      PFP, Gaming, Token Airdrops, IDO... Exciting possibilities
                      await! Details to be revealed post sell-out. Stay tuned!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What We Do end */}
      {/* Statistics Area start */}
      {/* <div className="statistics-area pt-75 rpt-45 rel z-1">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-2 col-lg-3 col-6">
              <div className="counter-item counter-text-wrap wow fadeInUp delay-0-2s">
                <i className="fal fa-check-circle" />
                <Counter end={25} />
                <span className="counter-title">Years Of Experience</span>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-6">
              <div className="counter-item counter-text-wrap wow fadeInUp delay-0-3s">
                <i className="fal fa-check-circle" />
                <Counter end={3} extraClass={"k"} />
                <span className="counter-title">Project’s Complete</span>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-6">
              <div className="counter-item counter-text-wrap wow fadeInUp delay-0-4s">
                <i className="fal fa-check-circle" />
                <Counter end={48} />
                <span className="counter-title">Professionals Team Member</span>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-6">
              <div className="counter-item counter-text-wrap wow fadeInUp delay-0-5s">
                <i className="fal fa-check-circle" />
                <Counter end={92} />
                <span className="counter-title">Awards Winning</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Statistics Area end */}
      {/* Service Style Three start */}
      <section
        id="how-to-get-runestone"
        className="service-three-area pt-100 rpt-70 rel z-1"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-20">How to Get RUNESTONE ?</span>
                <h2>
                  Just follow the instructions.
                  <br />
                  It's simple !
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="service-three-item wow fadeInUp delay-0-2s">
                <div className="title-icon">
                  <h5>Join Early Access</h5>
                  <img
                    src="assets/images/services/icon1.png"
                    alt="Icon"
                    style={{ height: "100px" }}
                  />
                </div>
                <div className="content">
                  <p>Join early to become an OG in the Merlin RUNESSTONE.</p>
                  <p>
                    Enjoy minting privileges, giveaways, and bonus airdrops!
                  </p>
                  <div
                    legacyBehavior
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector("body")
                        .classList.add("side-content-visible");
                    }}
                  >
                    <a className="read-more style-two">
                      <span>JOIN NOW</span> <i className="fa fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="service-three-item wow fadeInDown delay-0-2s">
                <div className="title-icon">
                  <h5>Bid for RUNESTONE</h5>
                  <img
                    src="assets/images/services/icon2.png"
                    alt="Icon"
                    style={{ height: "100px" }}
                  />
                </div>
                <div className="content">
                  <p>
                    Join us every two days for official auctions starting at
                    ZERO!
                  </p>
                  <p>
                    Fall in love with a RUNESTONE? Place the highedt bid and
                    claim your magic.
                  </p>
                  {/* <Link legacyBehavior href="#">
                    <a className="read-more style-two">
                      <span>BID NOW</span> <i className="fa fa-arrow-right" />
                    </a>
                  </Link> */}
                  <a className="read-more style-two">
                    <span>COMING SOON</span> <i className="fa fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="service-three-item wow fadeInUp delay-0-2s">
                <div className="title-icon">
                  <h5>RAID on X</h5>
                  <img
                    src="assets/images/services/icon3.png"
                    alt="Icon"
                    style={{ height: "100px" }}
                  />
                </div>
                <div className="content">
                  <p>Weekly giveaways for our raiders of Merlin RUNESTONE!</p>
                  <p>The more you RAID, the higher your chance to win!</p>
                  {/* <Link legacyBehavior href="#">
                    <a className="read-more style-two">
                      <span>RAID NOW</span> <i className="fa fa-arrow-right" />
                    </a>
                  </Link> */}
                  <a className="read-more style-two">
                    <span>COMING SOON</span> <i className="fa fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="service-three-item wow fadeInDown delay-0-2s">
                <div className="title-icon">
                  <h5>Buy from Market</h5>
                  <img
                    src="assets/images/services/icon4.png"
                    alt="Icon"
                    style={{ height: "100px" }}
                  />
                </div>
                <div className="content">
                  <p>Missed out on a favorite Runestone?</p>
                  <p>No worries! Snag it from the NFT marketplace.</p>
                  <p>The earlier, the better!</p>
                  {/* <Link legacyBehavior href="#">
                    <a className="read-more style-two">
                      <span>BUY NOW</span> <i className="fa fa-arrow-right" />
                    </a>
                  </Link> */}
                  <a className="read-more style-two">
                    <span>COMING SOON</span> <i className="fa fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Service Style Three end */}
      {/* Headline area start */}
      <div className="headline-area pt-65 rpt-60 rel z-0">
        <div className="container-fluid">
          <div className="headline-text marquee">
            <span>
              <span>Go Get Your </span>RUNESTONE <span>Go Get Your </span>
              RUNESTONE{" "}
            </span>
          </div>
        </div>
      </div>
      {/* Headline Area end */}
      {/* Project Timeline Area start */}
      {/* <section
        id="projects"
        className="project-timeline-area pt-90 rpt-75 rel z-1"
      >
        <div className="container container-1290">
          <div className="row justify-content-between align-items-center pb-25">
            <div className="col-xl-6 col-lg-8">
              <div className="section-title mb-30 wow fadeInLeft delay-0-2s">
                <span className="sub-title mb-15">Recent Works Gallery</span>
                <h2>Lat’s Look Our Recent Project Gallery</h2>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link legacyBehavior href="/projects">
                <a className="theme-btn mb-25 wow fadeInRight delay-0-2s">
                  View More Projects <i className="far fa-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
          <div className="project-timeline wow fadeInUp delay-0-2s">
            <div className="content">
              <span className="serial-number">01</span>
              <h4>
                <Link legacyBehavior href="/project-details">
                  <a>Business Task Management Dashboard Design</a>
                </Link>
              </h4>
            </div>
            <div className="image">
              <img
                src="assets/images/projects/project-timeline1.jpg"
                alt="Project TimeLine Image"
              />
            </div>
            <div className="right-btn">
              <Link legacyBehavior href="/project-details">
                <a className="details-btn">
                  <i className="fal fa-long-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
          <div className="project-timeline wow fadeInUp delay-0-2s">
            <div className="content">
              <span className="serial-number">02</span>
              <h4>
                <Link legacyBehavior href="/project-details">
                  <a>PSD, Figma &amp; XD to HTML Design &amp; Development</a>
                </Link>
              </h4>
            </div>
            <div className="image">
              <img
                src="assets/images/projects/project-timeline2.jpg"
                alt="Project TimeLine Image"
              />
            </div>
            <div className="right-btn">
              <Link legacyBehavior href="/project-details">
                <a className="details-btn">
                  <i className="fal fa-long-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
          <div className="project-timeline wow fadeInUp delay-0-2s">
            <div className="content">
              <span className="serial-number">03</span>
              <h4>
                <Link legacyBehavior href="/project-details">
                  <a>Mobile Application Design &amp; Development</a>
                </Link>
              </h4>
            </div>
            <div className="image">
              <img
                src="assets/images/projects/project-timeline3.jpg"
                alt="Project TimeLine Image"
              />
            </div>
            <div className="right-btn">
              <Link legacyBehavior href="/project-details">
                <a className="details-btn">
                  <i className="fal fa-long-arrow-right" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section> */}
      {/* Project Timeline Area end */}
      {/* Team Area start */}
      {/* <section id="team" className="team-area pt-70 rpt-40">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="section-title text-center mb-55 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-20">Team Members</span>
                <h2>Meet Our Professionals Team</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 justify-content-center">
            <div className="col">
              <div className="team-member wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="assets/images/team/member1.jpg" alt="Team Member" />
                </div>
                <div className="content">
                  <h4>Patrick V. Schroeder</h4>
                  <span>UI/UX Designer</span>
                  <Link legacyBehavior href="/team-details">
                    <a className="read-more">
                      <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                </div>
                <div className="btn-social">
                  <Link legacyBehavior href="/team-details">
                    <a className="read-more">
                      <span>View Details</span>{" "}
                      <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                  <div className="social-style-two">
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="team-member wow fadeInUp delay-0-3s">
                <div className="image">
                  <img src="assets/images/team/member2.jpg" alt="Team Member" />
                </div>
                <div className="content">
                  <h4>Michael A. Braun</h4>
                  <span>UI/UX Designer</span>
                  <Link legacyBehavior href="/team-details">
                    <a className="read-more">
                      <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                </div>
                <div className="btn-social">
                  <Link legacyBehavior href="/team-details">
                    <a className="read-more">
                      <span>View Details</span>{" "}
                      <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                  <div className="social-style-two">
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="team-member wow fadeInUp delay-0-4s">
                <div className="image">
                  <img src="assets/images/team/member3.jpg" alt="Team Member" />
                </div>
                <div className="content">
                  <h4>James V. Decastro</h4>
                  <span>Senior Marketer</span>
                  <Link legacyBehavior href="/team-details">
                    <a className="read-more">
                      <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                </div>
                <div className="btn-social">
                  <Link legacyBehavior href="/team-details">
                    <a className="read-more">
                      <span>View Details</span>{" "}
                      <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                  <div className="social-style-two">
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="team-member wow fadeInUp delay-0-5s">
                <div className="image">
                  <img src="assets/images/team/member4.jpg" alt="Team Member" />
                </div>
                <div className="content">
                  <h4>Troy V. Richardson</h4>
                  <span>Web Designer</span>
                  <Link legacyBehavior href="/team-details">
                    <a className="read-more">
                      <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                </div>
                <div className="btn-social">
                  <Link legacyBehavior href="/team-details">
                    <a className="read-more">
                      <span>View Details</span>{" "}
                      <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                  <div className="social-style-two">
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="team-member wow fadeInUp delay-0-6s">
                <div className="image">
                  <img src="assets/images/team/member5.jpg" alt="Team Member" />
                </div>
                <div className="content">
                  <h4>Michael A. Braun</h4>
                  <span>Apps Designer</span>
                  <Link legacyBehavior href="/team-details">
                    <a className="read-more">
                      <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                </div>
                <div className="btn-social">
                  <Link legacyBehavior href="/team-details">
                    <a className="read-more">
                      <span>View Details</span>{" "}
                      <i className="far fa-arrow-right" />
                    </a>
                  </Link>
                  <div className="social-style-two">
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Team Area end */}
      {/* Headline area start */}
      <div className="headline-area pt-65 rpt-55 rel z-0">
        <div className="container-fluid">
          <div className="headline-text marquee">
            <span>
              <span>Before </span> TO LATE!! <span>Before </span> TO LATE!!{" "}
            </span>
          </div>
        </div>
      </div>
      {/* Headline Area end */}
      {/* Blog Style Two start */}
      {/* <section id="news" className="blog-area-two pt-125 rpt-100 pb-70 rpb-40">
        <div className="container container-1290">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-20">Blog &amp; News</span>
                <h2>Read Our Latest News &amp; Blog Get Every Updates</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="blog-item wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="assets/images/blog/blog1.jpg" alt="Blog" />
                </div>
                <ul className="blog-meta">
                  <li>
                    <i className="far fa-calendar-alt" />
                    <a href="#">February 18, 2023</a>
                  </li>
                  <li>
                    <i className="far fa-comments" />
                    <a href="#">Comment (5)</a>
                  </li>
                </ul>
                <hr />
                <h4>
                  <Link legacyBehavior href="/blog-details">
                    <a>Voice Skills For Google Assistant And Amazon Alexa</a>
                  </Link>
                </h4>
                <Link legacyBehavior href="/blog-details">
                  <a className="read-more">
                    Read More <i className="far fa-arrow-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="blog-item wow fadeInUp delay-0-4s">
                <div className="image">
                  <img src="assets/images/blog/blog2.jpg" alt="Blog" />
                </div>
                <ul className="blog-meta">
                  <li>
                    <i className="far fa-calendar-alt" />
                    <a href="#">February 18, 2023</a>
                  </li>
                  <li>
                    <i className="far fa-comments" />
                    <a href="#">Comment (5)</a>
                  </li>
                </ul>
                <hr />
                <h4>
                  <Link legacyBehavior href="/blog-details">
                    <a>
                      Inclusive Design And Accessibility Stream Heydon Pickering
                    </a>
                  </Link>
                </h4>
                <Link legacyBehavior href="/blog-details">
                  <a className="read-more">
                    Read More <i className="far fa-arrow-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="blog-item wow fadeInUp delay-0-6s">
                <div className="image">
                  <img src="assets/images/blog/blog3.jpg" alt="Blog" />
                </div>
                <ul className="blog-meta">
                  <li>
                    <i className="far fa-calendar-alt" />
                    <a href="#">February 18, 2023</a>
                  </li>
                  <li>
                    <i className="far fa-comments" />
                    <a href="#">Comment (5)</a>
                  </li>
                </ul>
                <hr />
                <h4>
                  <Link legacyBehavior href="/blog-details">
                    <a>
                      Creating Online Environments The Work Well For Older Users
                    </a>
                  </Link>
                </h4>
                <Link legacyBehavior href="/blog-details">
                  <a className="read-more">
                    Read More <i className="far fa-arrow-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Blog Style Two end */}
      {/* footer area start */}
    </Layout>
  );
};
export default IndexSingle;

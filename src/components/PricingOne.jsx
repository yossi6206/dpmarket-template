import Link from "next/link";

const PricingOne = () => {
  return (
    <section className="pricing padding-y-120 position-relative z-index-1">
      <img
        src="assets/images/shapes/element1.png"
        alt=""
        className="element one"
      />
      <img
        src="assets/images/gradients/pricing-gradient-bg.png"
        alt=""
        className="bg--gradient"
      />
      <div className="container container-two">
        <div className="section-heading style-left style-flex flx-between align-items-end gap-3">
          <div className="section-heading__inner w-lg">
            <h3 className="section-heading__title">תוכניות המחירים שלנו</h3>
            <p className="section-heading__desc">
              בכל חודש אנו בוחרים עבורכם את המוצרים הטובים ביותר. התבניות והעיצובים המובילים של החודש הגיעו, נבחרו על ידי מומחי התוכן שלנו.
            </p>
          </div>
          <div className="pricing-tabs">
            <ul
              className="nav tab-gradient nav-pills mb-0"
              id="pills-tab-pricing"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link pill active"
                  id="pills-חודשי-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-חודשי"
                  type="button"
                  role="tab"
                  aria-controls="pills-חודשי"
                  aria-selected="true"
                >
                  חודשי
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link pill"
                  id="pills-שנתי-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-שנתי"
                  type="button"
                  role="tab"
                  aria-controls="pills-שנתי"
                  aria-selected="false"
                >
                  שנתי
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content" id="pills-tab-pricingContent">
          <div
            className="tab-pane fade show active"
            id="pills-חודשי"
            role="tabpanel"
            aria-labelledby="pills-חודשי-tab"
            tabIndex={0}
          >
            <div className="row gy-4">
              <div className="col-lg-4 col-sm-6">
                <div className="pricing-item box-shadow-lg hover-bg-main">
                  <img
                    src="assets/images/gradients/price-hover-bg.png"
                    alt=""
                    className="hover-bg"
                  />
                  <div className="pricing-item__top">
                    <div className="flx-between flex-nowrap">
                      <span className="pricing-item__icon">
                        <img src="assets/images/icons/price-icon1.svg" alt="" />
                      </span>
                      <span className="popular-badge d-none" />
                    </div>
                    <h5 className="pricing-item__title mb-0 mt-2">
                      תוכנית בסיסית
                    </h5>
                  </div>
                  <div className="pricing-item__content">
                    <h3 className="pricing-item__price mb-2">
                      $1599.00
                      <span className="text font-14 text-body font-body fw-400">
                        /לחודש
                      </span>
                    </h3>
                    <p className="pricing-item__desc">
                      שירותים חיוניים להתחלת המסע שלך
                    </p>
                    <Link scroll={false}
                      href="#"
                      className="btn btn-outline-light btn-lg pill w-100"
                    >
                      התחל עכשיו
                    </Link>
                  </div>
                  <div className="pricing-item__lists">
                    <ul className="text-list">
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        עד 30 משתמשים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        שיתוף פעולה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול פרויקטים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תיקים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תהליכים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול זרימת עבודה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול צוות
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="pricing-item box-shadow-lg hover-bg-main">
                  <img
                    src="assets/images/gradients/price-hover-bg.png"
                    alt=""
                    className="hover-bg"
                  />
                  <div className="pricing-item__top">
                    <div className="flx-between flex-nowrap">
                      <span className="pricing-item__icon">
                        <img src="assets/images/icons/price-icon2.svg" alt="" />
                      </span>
                      <span className="popular-badge">הכי פופולרי</span>
                    </div>
                    <h5 className="pricing-item__title mb-0 mt-2">
                      תוכנית סטנדרטית
                    </h5>
                  </div>
                  <div className="pricing-item__content">
                    <h3 className="pricing-item__price mb-2">
                      $1799.00
                      <span className="text font-14 text-body font-body fw-400">
                        /לחודש
                      </span>
                    </h3>
                    <p className="pricing-item__desc">
                      שירותים חיוניים להתחלת המסע שלך
                    </p>
                    <Link scroll={false}
                      href="#"
                      className="btn btn-outline-light btn-lg pill w-100"
                    >
                      התחל עכשיו
                    </Link>
                  </div>
                  <div className="pricing-item__lists">
                    <ul className="text-list">
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        עד 30 משתמשים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        שיתוף פעולה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול פרויקטים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תיקים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תהליכים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול זרימת עבודה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול צוות
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="pricing-item box-shadow-lg hover-bg-main">
                  <img
                    src="assets/images/gradients/price-hover-bg.png"
                    alt=""
                    className="hover-bg"
                  />
                  <div className="pricing-item__top">
                    <div className="flx-between flex-nowrap">
                      <span className="pricing-item__icon">
                        <img src="assets/images/icons/price-icon3.svg" alt="" />
                      </span>
                      <span className="popular-badge d-none" />
                    </div>
                    <h5 className="pricing-item__title mb-0 mt-2">
                      תוכנית פרימיום
                    </h5>
                  </div>
                  <div className="pricing-item__content">
                    <h3 className="pricing-item__price mb-2">
                      $1999.00
                      <span className="text font-14 text-body font-body fw-400">
                        /לחודש
                      </span>
                    </h3>
                    <p className="pricing-item__desc">
                      שירותים חיוניים להתחלת המסע שלך
                    </p>
                    <Link scroll={false}
                      href="#"
                      className="btn btn-outline-light btn-lg pill w-100"
                    >
                      התחל עכשיו
                    </Link>
                  </div>
                  <div className="pricing-item__lists">
                    <ul className="text-list">
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        עד 30 משתמשים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        שיתוף פעולה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול פרויקטים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תיקים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תהליכים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול זרימת עבודה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול צוות
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-שנתי"
            role="tabpanel"
            aria-labelledby="pills-שנתי-tab"
            tabIndex={0}
          >
            <div className="row gy-4">
              <div className="col-lg-4 col-sm-6">
                <div className="pricing-item box-shadow-lg hover-bg-main">
                  <img
                    src="assets/images/gradients/price-hover-bg.png"
                    alt=""
                    className="hover-bg"
                  />
                  <div className="pricing-item__top">
                    <div className="flx-between flex-nowrap">
                      <span className="pricing-item__icon">
                        <img src="assets/images/icons/price-icon1.svg" alt="" />
                      </span>
                      <span className="popular-badge d-none" />
                    </div>
                    <h5 className="pricing-item__title mb-0 mt-2">
                      תוכנית בסיסית
                    </h5>
                  </div>
                  <div className="pricing-item__content">
                    <h3 className="pricing-item__price mb-2">
                      $1599.00
                      <span className="text font-14 text-body font-body fw-400">
                        /לחודש
                      </span>
                    </h3>
                    <p className="pricing-item__desc">
                      שירותים חיוניים להתחלת המסע שלך
                    </p>
                    <Link scroll={false}
                      href="#"
                      className="btn btn-outline-light btn-lg pill w-100"
                    >
                      התחל עכשיו
                    </Link>
                  </div>
                  <div className="pricing-item__lists">
                    <ul className="text-list">
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        עד 30 משתמשים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        שיתוף פעולה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול פרויקטים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תיקים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תהליכים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול זרימת עבודה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול צוות
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="pricing-item box-shadow-lg hover-bg-main">
                  <img
                    src="assets/images/gradients/price-hover-bg.png"
                    alt=""
                    className="hover-bg"
                  />
                  <div className="pricing-item__top">
                    <div className="flx-between flex-nowrap">
                      <span className="pricing-item__icon">
                        <img src="assets/images/icons/price-icon2.svg" alt="" />
                      </span>
                      <span className="popular-badge">הכי פופולרי</span>
                    </div>
                    <h5 className="pricing-item__title mb-0 mt-2">
                      תוכנית סטנדרטית
                    </h5>
                  </div>
                  <div className="pricing-item__content">
                    <h3 className="pricing-item__price mb-2">
                      $1799.00
                      <span className="text font-14 text-body font-body fw-400">
                        /לחודש
                      </span>
                    </h3>
                    <p className="pricing-item__desc">
                      שירותים חיוניים להתחלת המסע שלך
                    </p>
                    <Link scroll={false}
                      href="#"
                      className="btn btn-outline-light btn-lg pill w-100"
                    >
                      התחל עכשיו
                    </Link>
                  </div>
                  <div className="pricing-item__lists">
                    <ul className="text-list">
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        עד 30 משתמשים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        שיתוף פעולה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול פרויקטים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תיקים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תהליכים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול זרימת עבודה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול צוות
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="pricing-item box-shadow-lg hover-bg-main">
                  <img
                    src="assets/images/gradients/price-hover-bg.png"
                    alt=""
                    className="hover-bg"
                  />
                  <div className="pricing-item__top">
                    <div className="flx-between flex-nowrap">
                      <span className="pricing-item__icon">
                        <img src="assets/images/icons/price-icon3.svg" alt="" />
                      </span>
                      <span className="popular-badge d-none" />
                    </div>
                    <h5 className="pricing-item__title mb-0 mt-2">
                      תוכנית פרימיום
                    </h5>
                  </div>
                  <div className="pricing-item__content">
                    <h3 className="pricing-item__price mb-2">
                      $1999.00
                      <span className="text font-14 text-body font-body fw-400">
                        /לחודש
                      </span>
                    </h3>
                    <p className="pricing-item__desc">
                      שירותים חיוניים להתחלת המסע שלך
                    </p>
                    <Link scroll={false}
                      href="#"
                      className="btn btn-outline-light btn-lg pill w-100"
                    >
                      התחל עכשיו
                    </Link>
                  </div>
                  <div className="pricing-item__lists">
                    <ul className="text-list">
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        עד 30 משתמשים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        שיתוף פעולה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול פרויקטים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תיקים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול תהליכים
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול זרימת עבודה
                      </li>
                      <li className="text-list__item text-heading">
                        <span className="icon">
                          <i className="fas fa-check" />
                        </span>
                        ניהול צוות
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingOne;

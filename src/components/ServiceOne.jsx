import Link from "next/link";

const ServiceOne = () => {
  return (
    <section className="service padding-y-120 position-relative z-index-1 overflow-hidden">
      <img
        src="assets/images/shapes/curve-pattern3.png"
        alt=""
        className="position-absolute end-0 top-0 z-index--1"
      />
      <img
        src="assets/images/shapes/element1.png"
        alt=""
        className="element two"
      />
      <div className="container container-two">
        <div className="section-heading style-left style-flex flx-between align-items-end gap-3">
          <div className="section-heading__inner w-lg">
            <h3 className="section-heading__title">השירותים הטובים שלנו</h3>
            <p className="section-heading__desc">
              בכל חודש אנו בוחרים עבורכם את המוצרים הטובים ביותר. התבניות והעיצובים 
              המובילים של החודש הגיעו, נבחרו על ידי מומחי התוכן שלנו.
            </p>
          </div>
          <Link scroll={false} href="#" className="btn btn-main btn-lg pill">
            צפה בכל השירותים
          </Link>
        </div>
        <div className="row gy-4">
          <div className="col-lg-4 col-sm-6 col-xs-6">
            <div className="service-item hover-bg-main">
              <img
                src="assets/images/gradients/service-hover-bg.png"
                alt=""
                className="hover-bg white-version"
              />
              <img
                src="assets/images/gradients/service-hover-bg-dark.png"
                alt=""
                className="hover-bg dark-version"
              />
              <span className="service-item__icon">
                <img src="assets/images/icons/service-icon1.svg" alt="" />
              </span>
              <h5 className="service-item__title my-3">
                עיצוב ופיתוח אתרים
              </h5>
              <p className="service-item__desc">
                אנו עוזרים לחברות לתקשר עם לקוחות בצורה יעילה ואפקטיבית יותר. 
                תמיכה בשירות לקוחות ברמה הגבוהה ביותר.
              </p>
              <Link scroll={false} href="#" className="btn-simple">
                קרא עוד
                <span className="icon">
                  <i className="las la-arrow-left" />
                </span>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-xs-6">
            <div className="service-item hover-bg-main">
              <img
                src="assets/images/gradients/service-hover-bg.png"
                alt=""
                className="hover-bg white-version"
              />
              <img
                src="assets/images/gradients/service-hover-bg-dark.png"
                alt=""
                className="hover-bg dark-version"
              />
              <span className="service-item__icon">
                <img src="assets/images/icons/service-icon2.svg" alt="" />
              </span>
              <h5 className="service-item__title my-3">
                פיתוח מערכות ניהול
              </h5>
              <p className="service-item__desc">
                אנו עוזרים לחברות לתקשר עם לקוחות בצורה יעילה ואפקטיבית יותר. 
                תמיכה בשירות לקוחות ברמה הגבוהה ביותר.
              </p>
              <Link scroll={false} href="#" className="btn-simple">
                קרא עוד
                <span className="icon">
                  <i className="las la-arrow-left" />
                </span>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-xs-6">
            <div className="service-item hover-bg-main">
              <img
                src="assets/images/gradients/service-hover-bg.png"
                alt=""
                className="hover-bg white-version"
              />
              <img
                src="assets/images/gradients/service-hover-bg-dark.png"
                alt=""
                className="hover-bg dark-version"
              />
              <span className="service-item__icon">
                <img src="assets/images/icons/service-icon3.svg" alt="" />
              </span>
              <h5 className="service-item__title my-3">
                שיווק דיגיטלי ועריכת וידאו
              </h5>
              <p className="service-item__desc">
                אנו עוזרים לחברות לתקשר עם לקוחות בצורה יעילה ואפקטיבית יותר. 
                תמיכה בשירות לקוחות ברמה הגבוהה ביותר.
              </p>
              <Link scroll={false} href="#" className="btn-simple">
                קרא עוד
                <span className="icon">
                  <i className="las la-arrow-left" />
                </span>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-xs-6">
            <div className="service-item hover-bg-main">
              <img
                src="assets/images/gradients/service-hover-bg.png"
                alt=""
                className="hover-bg white-version"
              />
              <img
                src="assets/images/gradients/service-hover-bg-dark.png"
                alt=""
                className="hover-bg dark-version"
              />
              <span className="service-item__icon">
                <img src="assets/images/icons/service-icon4.svg" alt="" />
              </span>
              <h5 className="service-item__title my-3">
                עיצוב גרפי ו-UI/UX
              </h5>
              <p className="service-item__desc">
                אנו עוזרים לחברות לתקשר עם לקוחות בצורה יעילה ואפקטיבית יותר. 
                תמיכה בשירות לקוחות ברמה הגבוהה ביותר.
              </p>
              <Link scroll={false} href="#" className="btn-simple">
                קרא עוד
                <span className="icon">
                  <i className="las la-arrow-left" />
                </span>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-xs-6">
            <div className="service-item hover-bg-main">
              <img
                src="assets/images/gradients/service-hover-bg.png"
                alt=""
                className="hover-bg white-version"
              />
              <img
                src="assets/images/gradients/service-hover-bg-dark.png"
                alt=""
                className="hover-bg dark-version"
              />
              <span className="service-item__icon">
                <img src="assets/images/icons/service-icon5.svg" alt="" />
              </span>
              <h5 className="service-item__title my-3">
                פיתוח בלוקצ'יין וקריפטו
              </h5>
              <p className="service-item__desc">
                אנו עוזרים לחברות לתקשר עם לקוחות בצורה יעילה ואפקטיבית יותר. 
                תמיכה בשירות לקוחות ברמה הגבוהה ביותר.
              </p>
              <Link scroll={false} href="#" className="btn-simple">
                קרא עוד
                <span className="icon">
                  <i className="las la-arrow-left" />
                </span>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 col-xs-6">
            <div className="service-item hover-bg-main">
              <img
                src="assets/images/gradients/service-hover-bg.png"
                alt=""
                className="hover-bg white-version"
              />
              <img
                src="assets/images/gradients/service-hover-bg-dark.png"
                alt=""
                className="hover-bg dark-version"
              />
              <span className="service-item__icon">
                <img src="assets/images/icons/service-icon6.svg" alt="" />
              </span>
              <h5 className="service-item__title my-3">
                יצירת תוכן וקידום אתרים
              </h5>
              <p className="service-item__desc">
                אנו עוזרים לחברות לתקשר עם לקוחות בצורה יעילה ואפקטיבית יותר. 
                תמיכה בשירות לקוחות ברמה הגבוהה ביותר.
              </p>
              <Link scroll={false} href="#" className="btn-simple">
                קרא עוד
                <span className="icon">
                  <i className="las la-arrow-left" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOne;

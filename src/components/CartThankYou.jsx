import Link from "next/link";

const CartThankYou = () => {
    return (
        <section className="cart-thank section-bg padding-y-120 position-relative z-index-1 overflow-hidden">
        <img
          src="assets/images/gradients/thank-you-gradient.png"
          alt=""
          className="bg--gradient"
        />
        <div className="container container-two">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <div className="cart-thank__content text-center">
                <h2 className="cart-thank__title mb-48">
                  תודה על הרכישה שלך!!
                </h2>
                <div className="cart-thank__img">
                  <img src="assets/images/thumbs/thank-evenelope.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="padding-t-120">
            <div className="cart-thank__box">
              <div className="row gy-4">
                <div className="col-lg-6">
                  <div className="thank-card">
                    <h5 className="thank-card__title mb-3">פרטי הזמנה</h5>
                    <ul className="list-text">
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500 font-heading fw-700 font-18">
                          מס׳ הזמנה
                        </span>
                        <span className="text text-heading fw-500">#658907</span>
                      </li>
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">סטטוס הזמנה</span>
                        <span className="text">אושר</span>
                      </li>
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">
                          אמצעי תשלום:
                        </span>
                        <span className="text">כרטיס אשראי</span>
                      </li>
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">תאריך:</span>
                        <span className="text">01/02/2026</span>
                      </li>
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">סכום ביניים:</span>
                        <span className="text">₪958</span>
                      </li>
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">סה״כ</span>
                        <span className="text">₪1,014</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="thank-card">
                    <h5 className="thank-card__title mb-3">
                      המוצרים שרכשת
                    </h5>
                    <ul className="list-text">
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500 font-heading fw-700 font-18">
                          שם
                        </span>
                        <span className="text text-heading fw-500">מחיר</span>
                      </li>
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">
                          דף נחיתה SaaS
                        </span>
                        <span className="text">₪103</span>
                      </li>
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">
                          לוח בקרה לניהול פרויקטים{" "}
                        </span>
                        <span className="text">₪103</span>
                      </li>
                      <li className="list-text__item flx-align flex-nowrap">
                        <span className="text text-heading fw-500">
                          תבנית סוכנות ייעוץ
                        </span>
                        <span className="text">₪103</span>
                      </li>
                    </ul>
                    <div className="thank-card__thumb mt-64 mb-3">
                      <img src="assets/images/thumbs/rating-img.png" alt="" />
                    </div>
                    <div className="flx-between gap-2">
                      <p className="text">אנא אל תשכח לדרג</p>
                      <Link scroll={false}
                        href="/"
                        className="btn btn-main flx-align gap-2 pill"
                      >
                        חזרה לדף הבית
                        <span className="icon line-height-1 font-20">
                          <i className="las la-arrow-left" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    );
}

export default CartThankYou;

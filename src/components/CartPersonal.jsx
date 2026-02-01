import Link from "next/link";

const CartPersonal = () => {
    return (
        <section className="cart-personal padding-y-120">
        <div className="container container-two">
          <div className="row gy-5">
            <div className="col-lg-8 pe-sm-5">
              <div className="cart-personal__content">
                <h5 className="cart-personal__title mb-32">פרטים אישיים</h5>
                <form action="#">
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="form-label font-18 mb-2 fw-500 font-heading"
                    >
                      כתובת אימייל <span className="text-danger">*</span>{" "}
                    </label>
                    <span className="text d-block mb-2">
                      נשלח את אישור הרכישה לכתובת זו.
                    </span>
                    <input
                      type="email"
                      className="common-input"
                      id="email"
                      placeholder="כתובת אימייל"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="form-label font-18 mb-2 fw-500 font-heading"
                    >
                      שם פרטי <span className="text-danger">*</span>{" "}
                    </label>
                    <span className="text d-block mb-2">
                      נשתמש בזה כדי להתאים אישית את חוויית החשבון שלך.
                    </span>
                    <input
                      type="text"
                      className="common-input"
                      id="name"
                      placeholder="שם פרטי"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastName"
                      className="form-label font-18 mb-2 fw-500 font-heading"
                    >
                      שם משפחה <span className="text-danger">*</span>{" "}
                    </label>
                    <span className="text d-block mb-2">
                      נשתמש בזה כדי להתאים אישית את חוויית החשבון שלך.
                    </span>
                    <input
                      type="text"
                      className="common-input"
                      id="lastName"
                      placeholder="שם משפחה"
                    />
                  </div>
                  <div className="mt-32 mb-32">
                    <div className="common-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="agree"
                      />
                      <label className="form-check-label mb-0" htmlFor="agree">
                        מסכים לתנאי השימוש
                      </label>
                    </div>
                    <div className="common-check mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="privacy"
                      />
                      <label className="form-check-label mb-0" htmlFor="privacy">
                        מסכים למדיניות הפרטיות
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <form action="#" className="apply-coupon flx-align gap-3">
                <input
                  type="text"
                  className="common-input common-input--md w-auto pill"
                  placeholder="קוד קופון"
                />
                <button
                  type="submit"
                  className="btn btn-main btn-md py-3 px-sm-5 px-4 flx-align gap-2 pill fw-300"
                >
                  {" "}
                  החל
                </button>
              </form>
              <div className="cart-content__bottom flx-between gap-2">
                <Link scroll={false}
                  href="/cart"
                  className="btn btn-outline-light flx-align gap-2 pill btn-lg"
                >
                  <span className="icon line-height-1 font-20">
                    <i className="las la-arrow-right" />
                  </span>
                  חזרה
                </Link>
                <Link scroll={false}
                  href="/cart-payment"
                  className="btn btn-main flx-align gap-2 pill btn-lg"
                >
                  המשך לתשלום
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="order-summary">
                <h5 className="order-summary__title mb-32">סיכום הזמנה</h5>
                <ul className="billing-list">
                  <li className="billing-list__item flx-between">
                    <span className="text text-heading fw-500">יש לך 3 פריטים</span>
                    <span className="amount text-heading fw-500">₪958</span>
                  </li>
                  <li className="billing-list__item flx-between">
                    <span className="text text-heading fw-500">הנחה</span>
                    <span className="amount text-body">₪0</span>
                  </li>
                  <li className="billing-list__item flx-between">
                    <span className="text text-heading fw-500">דמי טיפול</span>
                    <span className="amount text-body">₪55</span>
                  </li>
                  <li className="billing-list__item flx-between">
                    <span className="text text-heading fw-500">סכום ביניים</span>
                    <span className="amount text-body">₪55</span>
                  </li>
                  <li className="billing-list__item flx-between">
                    <span className="text text-heading font-20 fw-500 font-heading">
                      סה״כ
                    </span>
                    <span className="amount text-heading font-20 fw-500 font-heading">
                      ₪1,014
                    </span>
                  </li>
                </ul>
                <button
                  type="submit"
                  className="btn btn-outline-light pill btn-lg w-100 mt-32"
                >
                  <span className="icon icon-left">
                    <img
                      src="assets/images/icons/cart-reverse.svg"
                      alt=""
                      className="white-version"
                    />
                    <img
                      src="assets/images/icons/cart-white.svg"
                      alt=""
                      className="dark-version"
                    />
                  </span>
                  רכישה עכשיו
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    );
}

export default CartPersonal;

import Link from "next/link";

const BecomeSellerTwo = () => {
  return (
    <section className="seller-two position-relative z-index-1 overflow-hidden">
      <img
        src="assets/images/shapes/spider-net.png"
        alt=""
        className="spider-net position-absolute bottom-0 end-0 z-index--1 white-version"
      />
      <img
        src="assets/images/shapes/spider-net.png"
        alt=""
        className="spider-net position-absolute bottom-0 end-0 z-index--1 dark-version"
      />
      <div className="container container-two">
        <div className="row gy-4">
          <div className="col-lg-6">
            <div className="seller-item position-relative z-index-1">
              <img
                src="assets/images/shapes/seller-bg.png"
                className="position-absolute start-0 top-0 z-index--1"
                alt=""
              />
              <h3 className="seller-item__title">הפכו למוכרים</h3>
              <p className="seller-item__desc fw-500 text-heading">
                מוכרים מקבלים 75% ממחיר הפריט למוצרים שנמכרים באופן בלעדי
                ו-50% למוצרים שנמכרים שלא באופן בלעדי. ראו מידע מפורט
                על מבנה העמלות בשוק.
              </p>
              <Link scroll={false}
                href="/register"
                className="btn btn-static-outline-black btn-xl pill fw-600"
              >
                צור חשבון מוכר
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="seller-item bg-three position-relative z-index-1">
              <img
                src="assets/images/shapes/seller-bg-three.png"
                className="position-absolute start-0 top-0 z-index--1"
                alt=""
              />
              <h3 className="seller-item__title">הרוויחו עד 40% עמלה</h3>
              <p className="seller-item__desc fw-500 text-heading">
                השוק שלנו הוא השוק היצירתי הגדול בעולם, שמוכר מיליוני
                נכסים דיגיטליים כל שנה. עם 30% עמלת שותפים, להרוויח כסף
                מעולם לא היה קל יותר!
              </p>
              <Link scroll={false}
                href="/register"
                className="btn btn-static-outline-black btn-xl pill fw-600"
              >
                קבל יותר עמלה
              </Link>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="support-two position-relative z-index-1 padding-t-60">
              <div className="row align-items-center">
                <div className="col-lg-3 col-sm-7">
                  <div className="support-content ps-0">
                    <h3 className="support-content__titleee mb-3">
                      תמיכה 24/7
                    </h3>
                    <p className="support-content__descc mb-3 font-19">
                      רוצים לדבר? שלחו לנו הודעה
                    </p>
                    <Link scroll={false}
                      href="mailto:info@dpmarket.co.il"
                      className="btn btn-main btn-lg fw-300 pill"
                    >
                      info@dpmarket.co.il
                    </Link>
                  </div>
                </div>
                <div className="col-lg-5 d-lg-block d-none">
                  <div className="arrow-img h-100 d-flex align-items-end">
                    <img
                      src="assets/images/shapes/arrow-shape-two.png"
                      alt=""
                      className="white-version"
                    />
                    <img
                      src="assets/images/shapes/arrow-shape-two-white.png"
                      alt=""
                      className="dark-version"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-5 d-sm-block d-none">
                  <div className="support-thumb text-center">
                    <img src="assets/images/thumbs/support-img2.png" alt="" />
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

export default BecomeSellerTwo;

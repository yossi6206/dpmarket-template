import Link from "next/link";

const DashboardStatement = () => {
  return (
    <div className="dashboard-body__content">
    {/* ========================= Statement section start =========================== */}
    <div className="row gy-4">
      <div className="col-lg-6">
        <div className="statement-item card common-card border border-gray-five">
          <div className="card-body">
            <div className="statement-item__header">
              <h6 className="statement-item__title">סה"כ רווחים</h6>
            </div>
            <ul className="statement-list">
              <li className="statement-list__item text-center">
                <span className="statement-list__text font-13">הכספים שלי</span>
                <h6 className="statement-list__amount mb-0 mt-1 fw-600">$0.00</h6>
              </li>
              <li className="statement-list__item text-center">
                <span className="statement-list__text font-13">רווחים</span>
                <h6 className="statement-list__amount mb-0 mt-1 fw-600">$0.00</h6>
              </li>
              <li className="statement-list__item text-center">
                <span className="statement-list__text font-13">מס שנוכה</span>
                <h6 className="statement-list__amount mb-0 mt-1 fw-600">$0.00</h6>
              </li>
              <li className="statement-list__item text-center">
                <span className="statement-list__text font-13">עמלות</span>
                <h6 className="statement-list__amount mb-0 mt-1 fw-600">$0.00</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="statement-item card common-card border border-gray-five">
          <div className="card-body">
            <div className="statement-item__header">
              <h6 className="statement-item__title">רווחים חודשיים</h6>
            </div>
            <ul className="statement-list">
              <li className="statement-list__item text-center">
                <span className="statement-list__text font-13">הכספים שלי</span>
                <h6 className="statement-list__amount mb-0 mt-1 fw-600">$0.00</h6>
              </li>
              <li className="statement-list__item text-center">
                <span className="statement-list__text font-13">רווחים</span>
                <h6 className="statement-list__amount mb-0 mt-1 fw-600">$0.00</h6>
              </li>
              <li className="statement-list__item text-center">
                <span className="statement-list__text font-13">מס שנוכה</span>
                <h6 className="statement-list__amount mb-0 mt-1 fw-600">$0.00</h6>
              </li>
              <li className="statement-list__item text-center">
                <span className="statement-list__text font-13">עמלות</span>
                <h6 className="statement-list__amount mb-0 mt-1 fw-600">$0.00</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card common-card border border-gray-five">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table text-body mt--24">
                <thead>
                  <tr>
                    <th>תאריך</th>
                    <th>מזהה הזמנה</th>
                    <th>סוג</th>
                    <th>מחיר</th>
                    <th>פרטים</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="תאריך">2022-12-31 03:36 AM</td>
                    <td data-label="מזהה הזמנה">#DR54745425478 </td>
                    <td data-label="סוג"> וורדפרס</td>
                    <td data-label="מחיר"> 59.00 USD</td>
                    <td data-label="פרטים">
                      <Link scroll={false} href="#" className="btn btn-main">
                        <i className="far fa-eye" />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td data-label="תאריך">2022-12-31 03:36 AM</td>
                    <td data-label="מזהה הזמנה">#DR54745425478 </td>
                    <td data-label="סוג"> וורדפרס</td>
                    <td data-label="מחיר"> 59.00 USD</td>
                    <td data-label="פרטים">
                      <Link scroll={false} href="#" className="btn btn-main">
                        <i className="far fa-eye" />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td data-label="תאריך">2022-12-31 03:36 AM</td>
                    <td data-label="מזהה הזמנה">#DR54745425478 </td>
                    <td data-label="סוג"> וורדפרס</td>
                    <td data-label="מחיר"> 59.00 USD</td>
                    <td data-label="פרטים">
                      <Link scroll={false} href="#" className="btn btn-main">
                        <i className="far fa-eye" />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td data-label="תאריך">2022-12-31 03:36 AM</td>
                    <td data-label="מזהה הזמנה">#DR54745425478 </td>
                    <td data-label="סוג"> וורדפרס</td>
                    <td data-label="מחיר"> 59.00 USD</td>
                    <td data-label="פרטים">
                      <Link scroll={false} href="#" className="btn btn-main">
                        <i className="far fa-eye" />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td data-label="תאריך">2022-12-31 03:36 AM</td>
                    <td data-label="מזהה הזמנה">#DR54745425478 </td>
                    <td data-label="סוג"> וורדפרס</td>
                    <td data-label="מחיר"> 59.00 USD</td>
                    <td data-label="פרטים">
                      <Link scroll={false} href="#" className="btn btn-main">
                        <i className="far fa-eye" />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td data-label="תאריך">2022-12-31 03:36 AM</td>
                    <td data-label="מזהה הזמנה">#DR54745425478 </td>
                    <td data-label="סוג"> וורדפרס</td>
                    <td data-label="מחיר"> 59.00 USD</td>
                    <td data-label="פרטים">
                      <Link scroll={false} href="#" className="btn btn-main">
                        <i className="far fa-eye" />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td data-label="תאריך">2022-12-31 03:36 AM</td>
                    <td data-label="מזהה הזמנה">#DR54745425478 </td>
                    <td data-label="סוג"> וורדפרס</td>
                    <td data-label="מחיר"> 59.00 USD</td>
                    <td data-label="פרטים">
                      <Link scroll={false} href="#" className="btn btn-main">
                        <i className="far fa-eye" />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td data-label="תאריך">2022-12-31 03:36 AM</td>
                    <td data-label="מזהה הזמנה">#DR54745425478 </td>
                    <td data-label="סוג"> וורדפרס</td>
                    <td data-label="מחיר"> 59.00 USD</td>
                    <td data-label="פרטים">
                      <Link scroll={false} href="#" className="btn btn-main">
                        <i className="far fa-eye" />
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td data-label="תאריך">2022-12-31 03:36 AM</td>
                    <td data-label="מזהה הזמנה">#DR54745425478 </td>
                    <td data-label="סוג"> וורדפרס</td>
                    <td data-label="מחיר"> 59.00 USD</td>
                    <td data-label="פרטים">
                      <Link scroll={false} href="#" className="btn btn-main">
                        <i className="far fa-eye" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flx-between gap-2">
                <div className="paginate-content flx-align flex-nowrap gap-3">
                  <select className="select common-input py-2 px-3 w-auto" defaultValue={1}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                  <span className="paginate-content__text fs-14">
                    Showing 1 - 10 of 100
                  </span>
                </div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination common-pagination mt-0">
                    <li className="page-item">
                      <Link scroll={false} className="page-link" href="#">
                        1
                      </Link>
                    </li>
                    <li className="page-item active">
                      <Link scroll={false} className="page-link" href="#">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link scroll={false} className="page-link" href="#">
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link scroll={false} className="page-link" href="#">
                        4
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link scroll={false}
                        className="page-link flx-align gap-2 flex-nowrap"
                        href="#"
                      >
                        Next
                        <span className="icon line-height-1 font-20">
                          <i className="las la-arrow-right" />
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* ========================= Statement section End =========================== */}
  </div>
  
  );
}

export default DashboardStatement;
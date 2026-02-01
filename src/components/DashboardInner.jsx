

'use client'
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DashboardInner = () => {

    let series = [{
        name: 'סדרה 1',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'סדרה 2',
        data: [11, 32, 45, 32, 34, 52, 41]
    }]
    let options = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    }
    return (
        <div className="dashboard-body__content">
            {/* welcome balance Content Start */}
            <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
                <div className="welcome-balance__left">
                    <h4 className="welcome-balance__title mb-0">ברוך הבא! מיכאל</h4>
                </div>
                <div className="welcome-balance__right flx-align gap-2">
                    <span className="welcome-balance__text fw-500 text-heading">
                        יתרה זמינה:
                    </span>
                    <h4 className="welcome-balance__balance mb-0">₪2,150.00</h4>
                </div>
            </div>
            {/* welcome balance Content End */}
            <div className="dashboard-body__item-wrapper">
                {/* dashboard body Item Start */}
                <div className="dashboard-body__item">
                    <div className="row gy-4">
                        <div className="col-xl-3 col-sm-6">
                            <div className="dashboard-widget">
                                <img
                                    src="assets/images/shapes/widget-shape1.png"
                                    alt=""
                                    className="dashboard-widget__shape one"
                                />
                                <img
                                    src="assets/images/shapes/widget-shape2.png"
                                    alt=""
                                    className="dashboard-widget__shape two"
                                />
                                <span className="dashboard-widget__icon">
                                    <img
                                        src="assets/images/icons/dashboard-widget-icon1.svg"
                                        alt=""
                                    />
                                </span>
                                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                                    <div>
                                        <h4 className="dashboard-widget__number mb-1 mt-3">2M+</h4>
                                        <span className="dashboard-widget__text font-14">
                                            סה״כ מוצרים
                                        </span>
                                    </div>
                                    <img src="assets/images/icons/chart-icon.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="dashboard-widget">
                                <img
                                    src="assets/images/shapes/widget-shape1.png"
                                    alt=""
                                    className="dashboard-widget__shape one"
                                />
                                <img
                                    src="assets/images/shapes/widget-shape2.png"
                                    alt=""
                                    className="dashboard-widget__shape two"
                                />
                                <span className="dashboard-widget__icon">
                                    <img
                                        src="assets/images/icons/dashboard-widget-icon2.svg"
                                        alt=""
                                    />
                                </span>
                                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                                    <div>
                                        <h4 className="dashboard-widget__number mb-1 mt-3">
                                            ₪19,570
                                        </h4>
                                        <span className="dashboard-widget__text font-14">
                                            סה״כ הכנסות
                                        </span>
                                    </div>
                                    <img src="assets/images/icons/chart-icon.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="dashboard-widget">
                                <img
                                    src="assets/images/shapes/widget-shape1.png"
                                    alt=""
                                    className="dashboard-widget__shape one"
                                />
                                <img
                                    src="assets/images/shapes/widget-shape2.png"
                                    alt=""
                                    className="dashboard-widget__shape two"
                                />
                                <span className="dashboard-widget__icon">
                                    <img
                                        src="assets/images/icons/dashboard-widget-icon3.svg"
                                        alt=""
                                    />
                                </span>
                                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                                    <div>
                                        <h4 className="dashboard-widget__number mb-1 mt-3">5,248</h4>
                                        <span className="dashboard-widget__text font-14">
                                            סה״כ הורדות
                                        </span>
                                    </div>
                                    <img src="assets/images/icons/chart-icon.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="dashboard-widget">
                                <img
                                    src="assets/images/shapes/widget-shape1.png"
                                    alt=""
                                    className="dashboard-widget__shape one"
                                />
                                <img
                                    src="assets/images/shapes/widget-shape2.png"
                                    alt=""
                                    className="dashboard-widget__shape two"
                                />
                                <span className="dashboard-widget__icon">
                                    <img
                                        src="assets/images/icons/dashboard-widget-icon4.svg"
                                        alt=""
                                    />
                                </span>
                                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                                    <div>
                                        <h4 className="dashboard-widget__number mb-1 mt-3">2,589</h4>
                                        <span className="dashboard-widget__text font-14">
                                            סה״כ מכירות
                                        </span>
                                    </div>
                                    <img src="assets/images/icons/chart-icon.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* dashboard body Item End */}
                {/* dashboard body Item Start */}
                <div className="dashboard-body__item">
                    <div className="row gy-4">
                        <div className="col-xl-8">
                            <div className="dashboard-card">
                                <div className="dashboard-card__header flx-between gap-2">
                                    <h6 className="dashboard-card__title mb-0">היסטוריית מכירות</h6>
                                    <div className="select-has-icon d-inline-block">
                                        <select className="select common-input select-sm" defaultValue={1}>
                                            <option value={1}>חודשי</option>
                                            <option value={2}>יומי</option>
                                            <option value={3}>שנתי</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="dashboard-card__chart">
                                    <Chart options={options} series={series} type="area" height={"500"} width={"100%"} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="dashboard-card">
                                <div className="dashboard-card__header">
                                    <h6 className="dashboard-card__title mb-0">מדינות מובילות</h6>
                                </div>
                                <ul className="country-list">
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag1.png" alt="" />
                                            </span>
                                            <span className="country-list__name">ארצות הברית</span>
                                        </div>
                                        <span className="country-list__amount">₪215</span>
                                    </li>
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag2.png" alt="" />
                                            </span>
                                            <span className="country-list__name">מקסיקו</span>
                                        </div>
                                        <span className="country-list__amount">₪255</span>
                                    </li>
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag3.png" alt="" />
                                            </span>
                                            <span className="country-list__name">ברזיל</span>
                                        </div>
                                        <span className="country-list__amount">₪444</span>
                                    </li>
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag4.png" alt="" />
                                            </span>
                                            <span className="country-list__name">קנדה</span>
                                        </div>
                                        <span className="country-list__amount">₪92</span>
                                    </li>
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag5.png" alt="" />
                                            </span>
                                            <span className="country-list__name">אירלנד</span>
                                        </div>
                                        <span className="country-list__amount">₪315</span>
                                    </li>
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag6.png" alt="" />
                                            </span>
                                            <span className="country-list__name">ניו זילנד</span>
                                        </div>
                                        <span className="country-list__amount">₪366</span>
                                    </li>
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag7.png" alt="" />
                                            </span>
                                            <span className="country-list__name">ספרד</span>
                                        </div>
                                        <span className="country-list__amount">₪329</span>
                                    </li>
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag8.png" alt="" />
                                            </span>
                                            <span className="country-list__name">טורקיה</span>
                                        </div>
                                        <span className="country-list__amount">₪266</span>
                                    </li>
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag9.png" alt="" />
                                            </span>
                                            <span className="country-list__name">איטליה</span>
                                        </div>
                                        <span className="country-list__amount">₪1,720</span>
                                    </li>
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag10.png" alt="" />
                                            </span>
                                            <span className="country-list__name">ארגנטינה</span>
                                        </div>
                                        <span className="country-list__amount">₪166</span>
                                    </li>
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag11.png" alt="" />
                                            </span>
                                            <span className="country-list__name">גרמניה</span>
                                        </div>
                                        <span className="country-list__amount">₪155</span>
                                    </li>
                                    <li className="country-list__item flx-between gap-2">
                                        <div className="country-list__content flx-align gap-2">
                                            <span className="country-list__flag">
                                                <img src="assets/images/thumbs/flag12.png" alt="" />
                                            </span>
                                            <span className="country-list__name">צרפת</span>
                                        </div>
                                        <span className="country-list__amount">₪329</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* dashboard body Item End */}
                {/* dashboard body Item Start */}
                <div className="dashboard-body__item">
                    <div className="table-responsive">
                        <table className="table style-two">
                            <thead>
                                <tr>
                                    <th>תאריך</th>
                                    <th>מכירות פריטים</th>
                                    <th>הכנסה</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>שבת, 10</td>
                                    <td>2</td>
                                    <td>₪329</td>
                                </tr>
                                <tr>
                                    <td>ראשון, 11</td>
                                    <td>3</td>
                                    <td>₪555</td>
                                </tr>
                                <tr>
                                    <td>שני, 12</td>
                                    <td>2</td>
                                    <td>₪55</td>
                                </tr>
                                <tr>
                                    <td>שלישי, 15</td>
                                    <td>2</td>
                                    <td>₪92</td>
                                </tr>
                                <tr>
                                    <td>רביעי, 16</td>
                                    <td>5</td>
                                    <td>₪74</td>
                                </tr>
                                <tr>
                                    <td>חמישי, 17</td>
                                    <td>3</td>
                                    <td>₪129</td>
                                </tr>
                                <tr>
                                    <td>רביעי, 18</td>
                                    <td>1</td>
                                    <td>₪55</td>
                                </tr>
                                <tr>
                                    <td>חמישי, 20</td>
                                    <td>5</td>
                                    <td>₪81</td>
                                </tr>
                                <tr>
                                    <td>רביעי, 22</td>
                                    <td>8</td>
                                    <td>₪37</td>
                                </tr>
                                <tr>
                                    <td>שלישי, 23</td>
                                    <td>6</td>
                                    <td>₪462</td>
                                </tr>
                                <tr>
                                    <td>רביעי, 24</td>
                                    <td>3</td>
                                    <td>₪55</td>
                                </tr>
                                <tr>
                                    <td>שלישי, 23</td>
                                    <td>9</td>
                                    <td>₪55</td>
                                </tr>
                                <tr>
                                    <td>רביעי, 24</td>
                                    <td>5</td>
                                    <td>₪85</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* dashboard body Item End */}
            </div>
        </div>
    );
}

export default DashboardInner;

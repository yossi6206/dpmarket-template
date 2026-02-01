const DashboardRefund = () => {
  return (
    <div className="dashboard-body__content">
      <div className="row gy-4">
        <div className="col-lg-8">
          <div className="refund-feedback">
            <h5 className="refund-feedback__title">
              בקשות החזר כספי עבור פריטים שמכרת
            </h5>
            <p className="refund-feedback__desc">
              אין בקשות החזר כספי פתוחות כרגע.
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="profile-sidebar">
            <div className="profile-sidebar__item">
              <h6 className="title font-body">Open Request</h6>
              <div className="select-has-icon">
                <select className="common-input" defaultValue={1}>
                  <option value={1}>בקשות פתוחות</option>
                  <option value={1}>בקשות פתוחות</option>
                  <option value={1}>בקשות פתוחות</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default DashboardRefund;
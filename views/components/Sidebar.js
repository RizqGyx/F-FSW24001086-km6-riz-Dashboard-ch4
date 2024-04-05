export const Sidebar = () => {
  return `
      <!-- Sidebar Content -->
      <div
        class="side-nav px-0 d-flex flex-column align-items-center pt-3 min-vh-100 col-4"
      >
        <a
          href="/"
          class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none justify-content-center mx-auto"
        >
          <img src="../images/icon.png" alt="Home" class="sideimg-home" />
        </a>
        <ul
          class="nav nav-pills d-flex flex-column mb-sm-auto mb-0 align-items-center py-1"
          id="menu"
        >
          <li class="nav-item w-100">
            <a
              href="#"
              class="nav-link align-middle px-0 d-flex flex-column justify-content-center align-items-center w-100"
            >
              <img
                src="../images/nav-dashboard.png"
                alt="Dashboard"
                class="nav-img"
              />
              <span class="ms-1 d-none d-sm-inline text-light"
                >Dashboard</span
              >
            </a>
          </li>
          <li class="nav-item w-100">
            <a
              href="#"
              class="nav-link px-0 align-middle d-flex flex-column justify-content-center align-items-center side-main-clicked w-100 rounded-0"
            >
              <img
                src="../images/nav-cars.png"
                alt="Cars"
                class="nav-img"
              />
              <span class="ms-1 d-none d-sm-inline text-light"
                >Cars</span
              ></a
            >
          </li>
        </ul>
      </div>
      <div class="col-8 py-3 px-0">
        <img src="../images/logo.png" alt="Logo" class="logo" />
        <div class="side-list py-4 pt-5">
          <h6 class="p-2 fw-bold side-sub-unclicked">CARS</h6>
          <h6 class="p-2 side-sub-clicked fw-bold">List Car</h6>
        </div>
      </div>`;
};

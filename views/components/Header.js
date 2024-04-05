export const Header = () => {
  return `<!-- Header Content -->
    <div
      class="menu-toogle d-flex flex-column justify-content-between px-3"
    >
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="right-header">
      <form class="d-flex" role="search" action="/cars" method="GET">
        <input
          class="form-control rounded-0 search-input"
          type="search"
          name="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="search-btn btn rounded-0 fw-bold" type="submit">
          Search
        </button>
      </form>
      <a
        class="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="../images/user.png"
          alt="User Profile"
          class="image-user"
        />
        Muhammad Rizki
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">My Profile</a></li>
        <li><a class="dropdown-item" href="#">FAQ</a></li>
        <li><a class="dropdown-item" href="#">Report Problem</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Log Out</a></li>
      </ul>
    </div>`;
};

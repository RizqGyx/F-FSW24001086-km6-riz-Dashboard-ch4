import { Header } from "../components/Header.js";
import { Sidebar } from "../components/Sidebar.js";

window.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const header = document.getElementById("header");

  sidebar.innerHTML += Sidebar();
  header.innerHTML += Header();
});

import express from "express";
import path from "path";

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use("/", serveStatic("home", "home"));
viewsRouter.use("/register", serveStatic("register", "register"));
viewsRouter.use("/login", serveStatic("login", "login"));
viewsRouter.use(
  "/admin-product",
  serveStatic("admin-product", "admin-product")
);
viewsRouter.use("/admin-order", serveStatic("admin-order", "admin-order"));
viewsRouter.use(
  "/admin-category",
  serveStatic("admin-category", "admin-category")
);
viewsRouter.use("/admin-user", serveStatic("admin-user", "admin-user"));
viewsRouter.use("/cart", serveStatic("cart", "cart"));
viewsRouter.use("/order", serveStatic("order", "order"));
viewsRouter.use("/mypage", serveStatic("mypage", "mypage"));
viewsRouter.use("/account/orders", serveStatic("user-order", "user-order"));
viewsRouter.use(
  "/mypage/mypage-userInfo",
  serveStatic("/mypage/mypage-userInfo", "mypage-userInfo")
);
viewsRouter.use("/product/:code", serveStatic("product", "product"));
viewsRouter.use("/order/complete", serveStatic("/order/complete", "complete"));
viewsRouter.use(
  "/mypage/mypage-userDelete",
  serveStatic("/mypage/mypage-userDelete", "mypage-userDelete")
);
viewsRouter.use(
  "/admin-product-delup",
  serveStatic("admin-product-delup", "admin-product-delup")
);
// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use("/", serveStatic(""));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource1, resource2) {
  const resourcePath = path.join(__dirname, `../views/${resource1}`);
  const option = { index: `${resource2}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };

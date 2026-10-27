# Assignment_code.md — Code chi tiết 31 issue LaptopStore (theo thứ tự ưu tiên & phụ thuộc)

> **Đi kèm:** `Assignment_readme.md` (đề bài, 31 issue) · `Assignment_guide.md` (quy trình GitHub) · đề gốc `Exercise27_Axios/Exercise27_MoRong.md`
> **Nhóm:** **A** (Leader) · **B** (Catalog) · **C** (Commerce)
> **Stack:** React + Vite · react-bootstrap 2 + bootstrap 5 · react-router-dom **6** · axios 1 · json-server **0.17.4** · concurrently

Tài liệu này cho **code đầy đủ của từng issue**, sắp theo **thứ tự merge** (issue nào phải có trước thì đứng trước). Mỗi issue ghi rõ: người làm, nhánh, cần merge trước, các commit và **toàn bộ nội dung từng file**.

## Cách dùng tài liệu

| Ký hiệu | Nghĩa |
|---|---|
| 📄 **`đường/dẫn/file`** | **Tạo mới hoặc thay TOÀN BỘ** nội dung file bằng khối code ngay dưới |
| 🧩 **Bản tạm** | File tạm để issue khác chạy được trước; issue ghi trong ngoặc sẽ **thay toàn bộ** file này |
| **Commit k/n** | Thứ tự commit trong issue (mỗi commit kèm `-m "Refs #n"`) |
| ✅ Kiểm tra | Cách tự kiểm thử trước khi push / mở PR |

**Nguyên tắc chống xung đột:** file nhiều người cần (`AppNavbar`, `CartContext`, `useAddToCart`, `SearchSuggest`) được tạo **bản tạm** sớm với đúng tên hàm/prop cuối cùng. Issue sau chỉ cần **thay toàn bộ file đó**, không phải sửa file của người khác.

> ✅ Toàn bộ code trong tài liệu đã được ghép thử thành project hoàn chỉnh (React 19 + Vite 8): `npm run build` thành công ở cả 3 mốc (hết Sprint 1, hết Sprint 2, bản cuối); hook `pre-push` không báo vi phạm; chạy thử tự động các luồng chính (đăng nhập & quay lại trang cũ, thêm giỏ, đánh giá, thanh toán, hủy đơn hoàn kho, chặn quyền admin, sửa nhanh tồn kho bằng PATCH, xoá hàng loạt, 404, màn hình 375px) không có lỗi Console.
>
> 🔁 **Sau mỗi lần test có ghi dữ liệu:** `npm run reset-db` rồi chạy lại `npm start` (xem lưu ý ở #2), và không commit `db.json` đã bị ghi.

---

## Mục lục

- [1. Thứ tự thực hiện](#1-thứ-tự-thực-hiện)
- [2. Mục lục theo thành viên](#2-mục-lục-theo-thành-viên)
- [3. Cấu trúc thư mục cuối cùng](#3-cấu-trúc-thư-mục-cuối-cùng)
- [Sprint 0 — Foundation](#sprint-0--foundation): #1 → #7
- [Sprint 1 — Core UI & Auth](#sprint-1--core-ui--auth): #9 → #8 → #12 → #11 → #13 → #10 → #14 → #15
- [Sprint 2 — Catalog & Detail](#sprint-2--catalog--detail): #18 → #16 → #17 → #19 → #20 → #21
- [Sprint 3 — Cart, Order & Admin](#sprint-3--cart-order--admin): #22 → #23 → #24 → #25 · #26 → #29 · #27 · #28
- [Sprint 4 — Test & Release v1.0.0](#sprint-4--test--release-v100): #30 → #31

---

## 1. Thứ tự thực hiện

Mỗi cột là một người, đọc từ trên xuống. Ô cùng hàng làm **song song**. Mũi tên `⇠` = phải chờ issue đó merge.

| Đợt | A (Leader) | B (Catalog) | C (Commerce) |
|---|---|---|---|
| **S0-1** | #1 Templates · #2 Setup | (review #1) | (review #2) |
| **S0-2** | #5 axiosClient | #4 format utils | #3 Seed data |
| **S0-3** | (review #3, #7) | #6 laptop/catalog/review api ⇠ #5 | #7 cart/order api ⇠ #5 |
| **S1-1** | #9 Routes & layouts | #11 Common components ⇠ #4 | #12 Toast & ConfirmModal |
| **S1-2** | #8 Login ⇠ #5, #9 · #13 Hooks ⇠ #5 | (review #9, #13) | (review #8) |
| **S1-3** | #10 ProtectedRoute ⇠ #8, #9, #12 | #14 Navbar ⇠ #8, #9, #12 · #15 LaptopCard ⇠ #11, #14 | (review #10, #14) |
| **S2-1** | #18 LaptopFilter ⇠ #6 | #16 Home ⇠ #6, #13, #15 | *(có thể bắt đầu sớm #22)* |
| **S2-2** | #19 Search suggest ⇠ #13, #14 | #17 List ⇠ #13, #15, #18 | |
| **S2-3** | (review #17, #20) | #20 Detail ⇠ #6, #13, #15 · #21 Review ⇠ #20 | (review #16, #19, #21) |
| **S3-1** | #26 Admin laptops ⇠ #10, #13 | (review #23, #25, #28) | #22 CartContext ⇠ #7, #8, #15 |
| **S3-2** | #29 Bulk delete ⇠ #26 | | #23 Cart page ⇠ #12, #22 · #27 Laptop form ⇠ #10 |
| **S3-3** | (review #22, #24, #27) | | #24 Checkout ⇠ #23 · #25 Orders ⇠ #24 · #28 Admin orders ⇠ #10 |
| **S4** | `release/1.0.0`, tag `v1.0.0` | #30 README | #31 Test report & video |

**Độ ưu tiên trong mỗi người:** làm issue `priority: high` trước (chặn người khác), rồi `medium`, cuối cùng `low`. A phải merge **#5, #9, #13** sớm nhất vì gần như mọi issue đều cần.

---

## 2. Mục lục theo thành viên

| Người | Issue theo thứ tự làm |
|---|---|
| **A** | [#1](#1--repo-templates--codeowners-a) → [#2](#2--project-setup--configuration-a) → [#5](#5--axiosclient--interceptors-a) → [#9](#9--routes-layouts--404-a) → [#8](#8--fake-login--authcontext-a) → [#13](#13--useaxios--usedebounce-a) → [#10](#10--protectedroute-a) → [#18](#18--laptopfilter-a) → [#19](#19--navbar-search-suggestions-a) → [#26](#26--admin-laptop-table-a) → [#29](#29--bulk-delete-a) → release |
| **B** | [#4](#4--format-utils-b) → [#6](#6--laptop-catalog--review-services-b) → [#11](#11--common-components-b) → [#14](#14--appnavbar--footer-b) → [#15](#15--laptopcard--laptopgrid-b) → [#16](#16--home-page-b) → [#17](#17--laptop-list-b) → [#20](#20--laptop-detail-b) → [#21](#21--review-list--form-b) → [#30](#30--readme-b) |
| **C** | [#3](#3--seed-data-c) → [#7](#7--cart--order-services-c) → [#12](#12--toastcontext--confirmmodal-c) → [#22](#22--cartcontext-c) → [#23](#23--cart-page-c) → [#24](#24--checkout-c) → [#25](#25--my-orders-c) → [#27](#27--admin-laptop-form-c) → [#28](#28--admin-orders-c) → [#31](#31--test-report--video-c) |

---

## 3. Cấu trúc thư mục cuối cùng

```
laptop-store/
├── .github/ (#1)            ├── .githooks/pre-push (#1)     ├── .env.example (#1)
├── db.json, db.backup.json (#3)    ├── scripts/reset-db.js (#2)
├── public/no-image.svg (#11)       ├── index.html (#2)
├── README.md (#30)                 ├── docs/TEST_REPORT.md (#31)
└── src/
    ├── main.jsx (#2 → #9 → #8 → #12 → #14)      ├── App.jsx (#2 → #9 → #10)      ├── index.css (#2)
    ├── api/
    │   ├── axiosClient.js (#5)   ├── authApi.js (#8)
    │   ├── laptopApi.js, catalogApi.js, reviewApi.js (#6)
    │   └── cartApi.js, orderApi.js (#7)
    ├── hooks/
    │   ├── usePageTitle.js (#9)  ├── useAxios.js, useDebounce.js (#13)  ├── useFlashMessage.js (#10)
    │   └── useAddToCart.js (🧩 #15 → #22)
    ├── contexts/
    │   ├── AuthContext.jsx (#8)  ├── ToastContext.jsx (#12)  └── CartContext.jsx (🧩 #14 → #22)
    ├── utils/
    │   ├── format.js (#4)  ├── image.js (#11)  └── orderStatus.js (#25)
    ├── components/
    │   ├── layout/  MainLayout, AdminLayout (#9 → #10) · AppNavbar, Footer (🧩 #9 → #14)
    │   │            SearchSuggest (🧩 #14 → #19) · ComingSoon (#9)
    │   ├── common/  Loading, ErrorAlert, EmptyState, Price, StarRating, AppPagination (#11)
    │   │            ConfirmModal (#12) · ProtectedRoute (#10)
    │   └── laptop/  LaptopCardSkeleton (#11) · LaptopCard, LaptopGrid (#15) · LaptopFilter (#18)
    │                ReviewList, ReviewForm (#21) · LaptopForm (#27)
    └── pages/
        ├── NotFoundPage (#9) · LoginPage (#8) · HomePage (#16) · LaptopListPage (#17)
        ├── LaptopDetailPage (#20 → #21) · CartPage (#23) · CheckoutPage (#24) · OrderListPage (#25)
        └── admin/ AdminLaptopPage (#26 → #29) · AdminLaptopFormPage (#27) · AdminOrderPage (#28)
```

---

# Sprint 0 — Foundation

## #1 — Repo templates & CODEOWNERS (A)

| 👤 A · 👀 B | Nhánh `chore/1-repo-templates` · Cần merge trước: commit khởi tạo Vite (Bước 2 của guide) |
|---|---|

Toàn bộ nội dung 7 file (`feature_request.md`, `bug_report.md`, `pull_request_template.md`, `CODEOWNERS`, `.env.example`, `.gitignore`, `.githooks/pre-push`) và 3 commit nằm ở **`Assignment_guide.md` — mục #1.2**. Sau khi merge, **cả nhóm**:

```bash
git switch develop && git pull
git config core.hooksPath .githooks
cp .env.example .env
```

---

## #2 — Project setup & configuration (A)

| 👤 A · 👀 C | Nhánh `feature/2-project-setup` · Cần merge trước: #1 |
|---|---|

**Commit 1/4 — `chore(deps): add axios, react-bootstrap, router and json-server`**

```bash
npm install axios react-bootstrap bootstrap react-router-dom@6
npm install -D -E json-server@0.17.4
npm install -D concurrently
```

> `react-router-dom@6`: bản mới nhất là 7 — bài dùng v6. `-E json-server@0.17.4`: ghi đúng `"0.17.4"` (không có `^`); bản 1.x beta không có `_expand`, `_embed`, `X-Total-Count`.

**Commit 2/4 — `chore(config): add json-server scripts and sample db`**

Thêm vào mục `scripts` trong **`package.json`** (giữ nguyên các script Vite đã sinh như `dev`, `build`, `preview`, `lint`):

```json
"server": "json-server db.json --port 3001 --delay 500",
"server:watch": "json-server --watch db.json --port 3001 --delay 500",
"start": "concurrently -k -n API,WEB -c cyan,magenta \"npm run server\" \"npm run dev\"",
"reset-db": "node scripts/reset-db.js"
```

> ⚠️ **Vì sao `server` không dùng `--watch`?** Với `--watch`, json-server **tự khởi động lại** mỗi khi `db.json` thay đổi. Khi thanh toán (#24) hoặc xoá hàng loạt (#29) có nhiều request ghi dồn dập, server restart giữa chừng → request sau bị từ chối, giao diện báo "Không kết nối được máy chủ". Bỏ `--watch` thì json-server **vẫn lưu** mọi thay đổi vào `db.json`, chỉ không tự đọc lại khi bạn sửa file bằng tay. Vì vậy sau `npm run reset-db` (hoặc sửa tay `db.json`) phải **dừng và chạy lại `npm start`**. Muốn sửa tay dữ liệu liên tục thì dùng `npm run server:watch`.

📄 **`scripts/reset-db.js`**

```js
// Khôi phục db.json về dữ liệu gốc: npm run reset-db
import { copyFileSync } from 'node:fs';

copyFileSync(new URL('../db.backup.json', import.meta.url), new URL('../db.json', import.meta.url));
console.log('✔ Đã khôi phục db.json từ db.backup.json');
```

`db.json` và `db.backup.json` tạm thời: chép **dữ liệu mẫu mục 0.4 của đề** (4 laptop). C thay bằng dữ liệu đầy đủ ở #3.

**Commit 3/4 — `chore(setup): import bootstrap and clean vite boilerplate`**

Xoá `src/App.css`, `src/assets/react.svg`, `public/vite.svg`. Trong `index.html`: đổi `<title>` thành `LaptopStore`, xoá dòng `<link rel="icon" ...vite.svg>`.

📄 **`src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

📄 **`src/App.jsx`**

```jsx
import { Container } from 'react-bootstrap';

export default function App() {
  return (
    <Container className="py-5">
      <h1 className="fw-bold">💻 LaptopStore</h1>
      <p className="text-secondary">Dự án đang được khởi tạo.</p>
    </Container>
  );
}
```

📄 **`src/index.css`** — CSS dùng chung cho cả dự án (tạo một lần để không ai phải sửa sau):

```css
body {
  background-color: #f6f7f9;
}

/* Tên sản phẩm tối đa 2 dòng */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.5em;
}

.laptop-card {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.laptop-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.12) !important;
}

.laptop-card-img {
  aspect-ratio: 3 / 2;
  object-fit: cover;
  width: 100%;
}

.home-banner {
  min-height: 260px;
}

/* Ô tìm kiếm gợi ý trên Navbar */
.search-wrapper {
  max-width: 460px;
}
.search-suggest-list {
  top: 100%;
  left: 0;
  z-index: 1050;
  margin-top: 2px;
}

/* Bộ lọc dính khi cuộn (desktop) – chừa chỗ cho Navbar */
.filter-sticky {
  top: 76px;
  z-index: 1;
}

@media (max-width: 991.98px) {
  .search-wrapper {
    max-width: none;
  }
}
```

**Commit 4/4 — `chore(setup): add required folder structure`**

```bash
for d in src/api src/hooks src/contexts src/utils src/pages/admin \
         src/components/layout src/components/common src/components/laptop docs; do
  mkdir -p "$d" && touch "$d/.gitkeep"
done
```

✅ **Kiểm tra:** `npm start` → `http://localhost:3001/laptops` có JSON, `http://localhost:5173` hiện "LaptopStore" với style Bootstrap · `npm run build` pass · `npm run reset-db` rồi chạy lại `npm start` → dữ liệu về như cũ.

---

## #3 — Seed data (C)

| 👤 C · 👀 A | Nhánh `chore/3-seed-data` · Cần merge trước: #2 |
|---|---|

**Commit 1/3** `chore(seed): add brands, categories and users` · **2/3** `chore(seed): add 16 laptops with varied price and stock` (đây có 20) · **3/3** `chore(seed): add reviews and sync db backup`

Dữ liệu đủ cho mọi kịch bản: 20 laptop (có `stock: 0` → #4; `stock < 5` → #3, #10, #13, #16, #18, #20; có/không `salePrice`; RAM 8/16/32/64; giá 11 → 80 triệu), 12 review (user 2 **chưa** đánh giá laptop #4, #8, #11, #13, #15, #17, #18, #20 → dùng để test #21).

📄 **`db.json`** (và chép y hệt sang **`db.backup.json`**)

```json
{
  "users": [
    {"id": 1, "email": "admin@laptopstore.vn", "password": "123456", "fullName": "Quản trị viên", "role": "admin"},
    {"id": 2, "email": "khach@laptopstore.vn", "password": "123456", "fullName": "Nguyễn Văn An", "role": "customer"}
  ],
  "brands": [
    {"id": 1, "name": "Dell"},
    {"id": 2, "name": "Apple"},
    {"id": 3, "name": "Asus"},
    {"id": 4, "name": "Lenovo"},
    {"id": 5, "name": "HP"},
    {"id": 6, "name": "Acer"}
  ],
  "categories": [
    {"id": 1, "name": "Văn phòng"},
    {"id": 2, "name": "Gaming"},
    {"id": 3, "name": "Đồ họa – Kỹ thuật"},
    {"id": 4, "name": "Mỏng nhẹ"}
  ],
  "laptops": [
    {"id": 1, "name": "Dell XPS 13 9340", "brandId": 1, "categoryId": 4, "price": 42990000, "salePrice": 39990000, "cpu": "Intel Core Ultra 7 155H", "ram": 16, "storage": 512, "screen": "13.4 inch FHD+ 120Hz", "gpu": "Intel Arc Graphics", "weight": 1.19, "stock": 8, "sold": 120, "rating": 4.7, "image": "https://placehold.co/600x400/e9ecef/212529?text=Dell+XPS+13+9340", "description": "Laptop mỏng nhẹ cao cấp, vỏ nhôm nguyên khối, pin 12 giờ.", "createdAt": "2026-08-01T08:00:00Z"},
    {"id": 2, "name": "MacBook Air M3 13 inch", "brandId": 2, "categoryId": 4, "price": 27990000, "salePrice": null, "cpu": "Apple M3 8 nhân", "ram": 8, "storage": 256, "screen": "13.6 inch Liquid Retina", "gpu": "GPU 8 nhân", "weight": 1.24, "stock": 15, "sold": 340, "rating": 4.8, "image": "https://placehold.co/600x400/e9ecef/212529?text=MacBook+Air+M3+13+inch", "description": "Thiết kế không quạt, êm tuyệt đối, pin 18 giờ.", "createdAt": "2026-07-15T08:00:00Z"},
    {"id": 3, "name": "Asus ROG Strix G16", "brandId": 3, "categoryId": 2, "price": 45990000, "salePrice": 41490000, "cpu": "Intel Core i9-14900HX", "ram": 32, "storage": 1024, "screen": "16 inch QHD+ 240Hz", "gpu": "NVIDIA RTX 4070 8GB", "weight": 2.5, "stock": 3, "sold": 75, "rating": 4.6, "image": "https://placehold.co/600x400/e9ecef/212529?text=Asus+ROG+Strix+G16", "description": "Laptop gaming hiệu năng cao, tản nhiệt kim loại lỏng.", "createdAt": "2026-09-05T08:00:00Z"},
    {"id": 4, "name": "Lenovo ThinkPad E14 Gen 5", "brandId": 4, "categoryId": 1, "price": 18990000, "salePrice": 17490000, "cpu": "AMD Ryzen 5 7530U", "ram": 16, "storage": 512, "screen": "14 inch WUXGA IPS", "gpu": "AMD Radeon Graphics", "weight": 1.41, "stock": 0, "sold": 210, "rating": 4.4, "image": "https://placehold.co/600x400/e9ecef/212529?text=Lenovo+ThinkPad+E14+Gen+5", "description": "Bàn phím tốt nhất phân khúc, bền bỉ chuẩn doanh nghiệp.", "createdAt": "2026-06-20T08:00:00Z"},
    {"id": 5, "name": "HP Pavilion 15 eg3000", "brandId": 5, "categoryId": 1, "price": 16490000, "salePrice": 14990000, "cpu": "Intel Core i5-1335U", "ram": 8, "storage": 512, "screen": "15.6 inch FHD IPS", "gpu": "Intel Iris Xe", "weight": 1.75, "stock": 20, "sold": 180, "rating": 4.3, "image": "https://placehold.co/600x400/e9ecef/212529?text=HP+Pavilion+15+eg3000", "description": "Laptop văn phòng màn hình lớn, loa B&O sống động.", "createdAt": "2026-05-10T08:00:00Z"},
    {"id": 6, "name": "Acer Nitro V 15", "brandId": 6, "categoryId": 2, "price": 22990000, "salePrice": 19990000, "cpu": "Intel Core i5-13420H", "ram": 16, "storage": 512, "screen": "15.6 inch FHD 144Hz", "gpu": "NVIDIA RTX 4050 6GB", "weight": 2.1, "stock": 12, "sold": 260, "rating": 4.4, "image": "https://placehold.co/600x400/e9ecef/212529?text=Acer+Nitro+V+15", "description": "Laptop gaming giá tốt cho sinh viên.", "createdAt": "2026-08-20T08:00:00Z"},
    {"id": 7, "name": "MacBook Pro 14 M3 Pro", "brandId": 2, "categoryId": 3, "price": 49990000, "salePrice": 47990000, "cpu": "Apple M3 Pro 11 nhân", "ram": 16, "storage": 512, "screen": "14.2 inch Liquid Retina XDR", "gpu": "GPU 14 nhân", "weight": 1.61, "stock": 6, "sold": 95, "rating": 4.9, "image": "https://placehold.co/600x400/e9ecef/212529?text=MacBook+Pro+14+M3+Pro", "description": "Màn hình XDR 120Hz, hiệu năng mạnh cho dựng phim, đồ họa.", "createdAt": "2026-09-12T08:00:00Z"},
    {"id": 8, "name": "Dell Inspiron 14 5440", "brandId": 1, "categoryId": 1, "price": 17990000, "salePrice": null, "cpu": "Intel Core 5 120U", "ram": 16, "storage": 512, "screen": "14 inch FHD+", "gpu": "Intel Graphics", "weight": 1.54, "stock": 18, "sold": 150, "rating": 4.2, "image": "https://placehold.co/600x400/e9ecef/212529?text=Dell+Inspiron+14+5440", "description": "Thiết kế gọn gàng, cổng kết nối đầy đủ.", "createdAt": "2026-04-02T08:00:00Z"},
    {"id": 9, "name": "Asus Zenbook 14 OLED UX3405", "brandId": 3, "categoryId": 4, "price": 26990000, "salePrice": 24490000, "cpu": "Intel Core Ultra 5 125H", "ram": 16, "storage": 512, "screen": "14 inch 3K OLED 120Hz", "gpu": "Intel Arc Graphics", "weight": 1.2, "stock": 10, "sold": 130, "rating": 4.6, "image": "https://placehold.co/600x400/e9ecef/212529?text=Asus+Zenbook+14+OLED+UX3405", "description": "Màn hình OLED rực rỡ, chuẩn quân đội MIL-STD.", "createdAt": "2026-09-25T08:00:00Z"},
    {"id": 10, "name": "Lenovo Legion 5 Pro", "brandId": 4, "categoryId": 2, "price": 38990000, "salePrice": 35990000, "cpu": "AMD Ryzen 7 7745HX", "ram": 32, "storage": 1024, "screen": "16 inch WQXGA 240Hz", "gpu": "NVIDIA RTX 4060 8GB", "weight": 2.4, "stock": 4, "sold": 88, "rating": 4.7, "image": "https://placehold.co/600x400/e9ecef/212529?text=Lenovo+Legion+5+Pro", "description": "Tản nhiệt Legion Coldfront, bàn phím RGB.", "createdAt": "2026-07-30T08:00:00Z"},
    {"id": 11, "name": "HP Envy x360 14", "brandId": 5, "categoryId": 4, "price": 24990000, "salePrice": null, "cpu": "AMD Ryzen 7 8840HS", "ram": 16, "storage": 1024, "screen": "14 inch 2.8K OLED cảm ứng", "gpu": "AMD Radeon 780M", "weight": 1.4, "stock": 7, "sold": 64, "rating": 4.5, "image": "https://placehold.co/600x400/e9ecef/212529?text=HP+Envy+x360+14", "description": "Gập xoay 360 độ, hỗ trợ bút cảm ứng.", "createdAt": "2026-10-01T08:00:00Z"},
    {"id": 12, "name": "Acer Swift Go 14", "brandId": 6, "categoryId": 4, "price": 19990000, "salePrice": 18490000, "cpu": "Intel Core Ultra 5 125H", "ram": 16, "storage": 512, "screen": "14 inch 2.8K OLED", "gpu": "Intel Arc Graphics", "weight": 1.32, "stock": 14, "sold": 72, "rating": 4.3, "image": "https://placehold.co/600x400/e9ecef/212529?text=Acer+Swift+Go+14", "description": "Mỏng nhẹ, có Copilot key, pin cả ngày.", "createdAt": "2026-08-28T08:00:00Z"},
    {"id": 13, "name": "Dell Precision 5680", "brandId": 1, "categoryId": 3, "price": 79990000, "salePrice": null, "cpu": "Intel Core i9-13900H", "ram": 64, "storage": 2048, "screen": "16 inch UHD+ OLED", "gpu": "NVIDIA RTX 3500 Ada 12GB", "weight": 2.0, "stock": 2, "sold": 15, "rating": 4.8, "image": "https://placehold.co/600x400/e9ecef/212529?text=Dell+Precision+5680", "description": "Máy trạm di động cho kỹ sư, kiến trúc sư.", "createdAt": "2026-03-18T08:00:00Z"},
    {"id": 14, "name": "Asus Vivobook 15 X1504", "brandId": 3, "categoryId": 1, "price": 12990000, "salePrice": 11490000, "cpu": "Intel Core i3-1315U", "ram": 8, "storage": 256, "screen": "15.6 inch FHD", "gpu": "Intel UHD Graphics", "weight": 1.7, "stock": 30, "sold": 400, "rating": 4.1, "image": "https://placehold.co/600x400/e9ecef/212529?text=Asus+Vivobook+15+X1504", "description": "Lựa chọn tiết kiệm cho học tập và văn phòng.", "createdAt": "2026-02-14T08:00:00Z"},
    {"id": 15, "name": "Lenovo Yoga Slim 7 14", "brandId": 4, "categoryId": 4, "price": 25990000, "salePrice": 23990000, "cpu": "AMD Ryzen 7 8840S", "ram": 32, "storage": 1024, "screen": "14.5 inch 3K 120Hz", "gpu": "AMD Radeon 780M", "weight": 1.39, "stock": 9, "sold": 58, "rating": 4.6, "image": "https://placehold.co/600x400/e9ecef/212529?text=Lenovo+Yoga+Slim+7+14", "description": "Vỏ nhôm sang trọng, RAM 32GB hiếm có trong phân khúc.", "createdAt": "2026-09-30T08:00:00Z"},
    {"id": 16, "name": "HP Omen 16", "brandId": 5, "categoryId": 2, "price": 42990000, "salePrice": 39490000, "cpu": "Intel Core i7-14700HX", "ram": 32, "storage": 1024, "screen": "16.1 inch QHD 240Hz", "gpu": "NVIDIA RTX 4070 8GB", "weight": 2.4, "stock": 5, "sold": 46, "rating": 4.5, "image": "https://placehold.co/600x400/e9ecef/212529?text=HP+Omen+16", "description": "Gaming cao cấp với hệ thống tản nhiệt Tempest.", "createdAt": "2026-08-08T08:00:00Z"},
    {"id": 17, "name": "Acer Aspire 7 A715", "brandId": 6, "categoryId": 1, "price": 15990000, "salePrice": null, "cpu": "AMD Ryzen 5 7535HS", "ram": 8, "storage": 512, "screen": "15.6 inch FHD 144Hz", "gpu": "NVIDIA RTX 2050 4GB", "weight": 2.1, "stock": 16, "sold": 190, "rating": 4.2, "image": "https://placehold.co/600x400/e9ecef/212529?text=Acer+Aspire+7+A715", "description": "Vừa học tập vừa chơi game nhẹ.", "createdAt": "2026-05-25T08:00:00Z"},
    {"id": 18, "name": "Asus ProArt Studiobook 16", "brandId": 3, "categoryId": 3, "price": 62990000, "salePrice": 58990000, "cpu": "Intel Core i9-13980HX", "ram": 64, "storage": 2048, "screen": "16 inch 3.2K OLED", "gpu": "NVIDIA RTX 4070 8GB", "weight": 2.4, "stock": 3, "sold": 22, "rating": 4.7, "image": "https://placehold.co/600x400/e9ecef/212529?text=Asus+ProArt+Studiobook+16", "description": "Núm xoay Asus Dial cho dân sáng tạo nội dung.", "createdAt": "2026-06-11T08:00:00Z"},
    {"id": 19, "name": "Lenovo ThinkPad X1 Carbon Gen 12", "brandId": 4, "categoryId": 4, "price": 48990000, "salePrice": 45990000, "cpu": "Intel Core Ultra 7 165U", "ram": 32, "storage": 1024, "screen": "14 inch 2.8K OLED", "gpu": "Intel Graphics", "weight": 1.09, "stock": 6, "sold": 40, "rating": 4.8, "image": "https://placehold.co/600x400/e9ecef/212529?text=Lenovo+ThinkPad+X1+Carbon+Gen+12", "description": "Siêu nhẹ 1.09kg, biểu tượng laptop doanh nhân.", "createdAt": "2026-10-05T08:00:00Z"},
    {"id": 20, "name": "HP ZBook Firefly 14 G11", "brandId": 5, "categoryId": 3, "price": 39990000, "salePrice": null, "cpu": "Intel Core Ultra 7 155H", "ram": 32, "storage": 1024, "screen": "14 inch WUXGA", "gpu": "NVIDIA RTX A500 4GB", "weight": 1.45, "stock": 4, "sold": 18, "rating": 4.4, "image": "https://placehold.co/600x400/e9ecef/212529?text=HP+ZBook+Firefly+14+G11", "description": "Máy trạm mỏng nhẹ đạt chứng nhận ISV.", "createdAt": "2026-07-07T08:00:00Z"}
  ],
  "reviews": [
    {"id": 1, "laptopId": 1, "userId": 2, "userName": "Nguyễn Văn An", "rating": 5, "comment": "Máy đẹp, màn hình sắc nét.", "createdAt": "2026-09-11T10:00:00Z"},
    {"id": 2, "laptopId": 3, "userId": 2, "userName": "Nguyễn Văn An", "rating": 4, "comment": "Chơi game mượt nhưng hơi nóng.", "createdAt": "2026-09-12T10:00:00Z"},
    {"id": 3, "laptopId": 2, "userId": 2, "userName": "Nguyễn Văn An", "rating": 5, "comment": "Pin rất trâu, dùng cả ngày không cần sạc.", "createdAt": "2026-09-13T10:00:00Z"},
    {"id": 4, "laptopId": 7, "userId": 2, "userName": "Nguyễn Văn An", "rating": 5, "comment": "Dựng video 4K rất mượt.", "createdAt": "2026-09-14T10:00:00Z"},
    {"id": 5, "laptopId": 6, "userId": 2, "userName": "Nguyễn Văn An", "rating": 4, "comment": "Giá tốt, cấu hình ổn trong tầm tiền.", "createdAt": "2026-09-15T10:00:00Z"},
    {"id": 6, "laptopId": 9, "userId": 2, "userName": "Nguyễn Văn An", "rating": 5, "comment": "Màn OLED quá đẹp.", "createdAt": "2026-09-16T10:00:00Z"},
    {"id": 7, "laptopId": 10, "userId": 2, "userName": "Nguyễn Văn An", "rating": 4, "comment": "Hiệu năng mạnh, quạt hơi ồn khi tải nặng.", "createdAt": "2026-09-17T10:00:00Z"},
    {"id": 8, "laptopId": 14, "userId": 2, "userName": "Nguyễn Văn An", "rating": 4, "comment": "Đủ dùng cho học tập.", "createdAt": "2026-09-18T10:00:00Z"},
    {"id": 9, "laptopId": 19, "userId": 2, "userName": "Nguyễn Văn An", "rating": 5, "comment": "Nhẹ, bàn phím gõ sướng.", "createdAt": "2026-09-19T10:00:00Z"},
    {"id": 10, "laptopId": 5, "userId": 2, "userName": "Nguyễn Văn An", "rating": 4, "comment": "Loa hay, màn hình lớn dễ nhìn.", "createdAt": "2026-09-20T10:00:00Z"},
    {"id": 11, "laptopId": 12, "userId": 2, "userName": "Nguyễn Văn An", "rating": 4, "comment": "Thiết kế đẹp, mỏng.", "createdAt": "2026-09-21T10:00:00Z"},
    {"id": 12, "laptopId": 16, "userId": 2, "userName": "Nguyễn Văn An", "rating": 5, "comment": "Tản nhiệt tốt, chơi game lâu không nóng.", "createdAt": "2026-09-22T10:00:00Z"}
  ],
  "cartItems": [],
  "orders": []
}
```

```bash
cp db.json db.backup.json
```

✅ **Kiểm tra** (bảng 0.5 của đề): `/laptops?_page=1&_limit=8` (header `X-Total-Count: 20`) · `/laptops?brandId=3` · `/laptops?price_gte=15000000&price_lte=30000000` · `/laptops?q=rog` · `/laptops/1?_expand=brand&_expand=category` · `/laptops/1?_embed=reviews` · `/laptops?categoryId=4&id_ne=1&_limit=4`.

---

## #4 — Format utils (B)

| 👤 B · 👀 C | Nhánh `feature/4-format-utils` · Cần merge trước: #2 |
|---|---|

**Commit 1/2** `feat(utils): add formatPrice and formatDate` · **2/2** `feat(utils): add selling price and discount helpers`

📄 **`src/utils/format.js`**

```js
const priceFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

/** formatPrice(39990000) → "39.990.000 ₫" ; null/undefined → '' */
export const formatPrice = (value) => {
  if (value === null || value === undefined || value === '') return '';
  return priceFormatter.format(Number(value) || 0);
};

/** formatDate('2026-09-10T10:00:00Z') → "10/09/2026" */
export const formatDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

/** formatDateTime → "10/09/2026 17:00" */
export const formatDateTime = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/** BR-03: có giảm giá hợp lệ khi 0 < salePrice < price */
export const hasSale = (laptop) =>
  Boolean(laptop?.salePrice) && laptop.salePrice > 0 && laptop.salePrice < laptop.price;

/** BR-03: giá bán thực tế = salePrice nếu có, ngược lại price */
export const getSellingPrice = (laptop) => (hasSale(laptop) ? laptop.salePrice : laptop?.price ?? 0);

/** BR-03: % giảm, làm tròn. 42.990.000 → 39.990.000 = 7 */
export const getDiscountPercent = (laptop) =>
  hasSale(laptop) ? Math.round(((laptop.price - laptop.salePrice) / laptop.price) * 100) : 0;
```

✅ **Kiểm tra:** tạm thêm vào `App.jsx` rồi xoá:
```js
console.log(formatPrice(39990000), formatDate('2026-09-10T10:00:00Z'), formatPrice(null));
// "39.990.000 ₫"  "10/09/2026"  ""
```

---

## #5 — axiosClient & interceptors (A)

| 👤 A · 👀 B | Nhánh `feature/5-axios-client` · Cần merge trước: #2 |
|---|---|

**Commit 1/3** `feat(api): create axios instance from env config` · **2/3** `feat(api): attach token and measure time in request interceptor` · **3/3** `feat(api): normalize error messages and keep cancel errors`

📄 **`src/api/axiosClient.js`**

```js
import axios from 'axios';

/**
 * B1. axios instance dùng chung cho toàn bộ ứng dụng.
 * Đổi server chỉ cần sửa file .env (VITE_API_URL).
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 8000,
  headers: { 'Content-Type': 'application/json' },
  // Mảng trong params được gửi dạng `_expand=brand&_expand=category`
  // (mặc định axios gửi `_expand[]=brand...` – json-server 0.17 không hiểu).
  paramsSerializer: { indexes: null },
});

/* ----------------------------------------------------------------
 * B2. Request interceptor: gắn token, ghi thời điểm bắt đầu, log
 * -------------------------------------------------------------- */
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.metadata = { start: performance.now() };

  if (import.meta.env.DEV) {
    console.log(`[API] ${config.method.toUpperCase()} ${config.url}`, config.params ?? '');
  }
  return config;
});

const getDuration = (config) =>
  config?.metadata ? Math.round(performance.now() - config.metadata.start) : 0;

/* ----------------------------------------------------------------
 * B3 + B4. Response interceptor
 * -------------------------------------------------------------- */
const STATUS_MESSAGES = {
  400: 'Dữ liệu gửi lên không hợp lệ',
  401: 'Phiên đăng nhập đã hết hạn',
  403: 'Bạn không có quyền thực hiện thao tác này',
  404: 'Không tìm thấy dữ liệu',
};

axiosClient.interceptors.response.use(
  // B3. Thành công: trả về NGUYÊN response (trang danh sách cần đọc header x-total-count)
  (response) => {
    response.duration = getDuration(response.config);
    if (import.meta.env.DEV) {
      console.log(
        `[API] ${response.status} ${response.config.method.toUpperCase()} ${response.config.url} – ${response.duration}ms`
      );
    }
    return response;
  },

  // B4. Lỗi: chuẩn hóa thành { status, message } tiếng Việt
  (error) => {
    // Lỗi hủy request phải giữ NGUYÊN để component nhận ra bằng isCancel()
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const status = error.response?.status ?? null;
    let message;

    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      message = 'Yêu cầu quá thời gian, vui lòng thử lại';
    } else if (!error.response) {
      message = 'Không kết nối được máy chủ. Kiểm tra json-server đã chạy chưa?';
    } else if (status >= 500) {
      message = 'Máy chủ đang gặp sự cố';
    } else {
      message = STATUS_MESSAGES[status] ?? `Có lỗi xảy ra (mã ${status})`;
    }

    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // AuthContext (#8) lắng nghe sự kiện này để cập nhật giao diện
      window.dispatchEvent(new Event('auth:logout'));
    }

    if (import.meta.env.DEV) {
      console.warn(`[API] Lỗi ${status ?? ''} ${error.config?.url ?? ''} – ${message}`);
    }

    return Promise.reject({ status, message });
  }
);

/** Export lại để component không phải import axios trực tiếp (TECH-01) */
export const isCancel = axios.isCancel;

/** Lấy câu thông báo từ một lỗi bất kỳ */
export const getErrorMessage = (err) => err?.message || 'Có lỗi xảy ra, vui lòng thử lại';

export default axiosClient;
```

✅ **Kiểm tra** — tạm thêm vào `App.jsx` (xoá trước khi commit):
```jsx
import { useEffect } from 'react';
import axiosClient from './api/axiosClient';
// trong App():
useEffect(() => {
  const test = async () => {
    try {
      const res = await axiosClient.get('/laptops/9999');
      console.log(res.data);
    } catch (err) {
      console.log(err); // { status: 404, message: 'Không tìm thấy dữ liệu' }
    }
  };
  test();
}, []);
```
Đổi `/laptops/9999` → `/laptops` thấy log `[API] 200 GET /laptops – 5xxms`; tắt json-server thấy "Không kết nối được máy chủ...".

---

## #6 — Laptop, catalog & review services (B)

| 👤 B · 👀 C | Nhánh `feature/6-laptop-catalog-review-api` · Cần merge trước: #5 |
|---|---|

**Commit 1/3** `feat(api): add laptop service with paging total` · **2/3** `feat(api): add catalog service` · **3/3** `feat(api): add review service`

📄 **`src/api/laptopApi.js`**

```js
import axiosClient from './axiosClient';

export const PAGE_SIZE = 8;

/** Giá trị `sort` trên URL → `_sort`, `_order` của json-server (F3) */
export const SORT_OPTIONS = {
  newest: { label: 'Mới nhất', _sort: 'createdAt', _order: 'desc' },
  price_asc: { label: 'Giá tăng dần', _sort: 'price', _order: 'asc' },
  price_desc: { label: 'Giá giảm dần', _sort: 'price', _order: 'desc' },
  bestseller: { label: 'Bán chạy', _sort: 'sold', _order: 'desc' },
};

/**
 * Chuyển bộ lọc trên URL thành params của json-server.
 *   { brandId: '3', priceMin: '20000000', sort: 'price_asc', page: '2' }
 *   → { brandId: '3', price_gte: '20000000', _sort: 'price', _order: 'asc', _page: 2, _limit: 8 }
 */
export function buildLaptopParams(filters, limit = PAGE_SIZE) {
  const { brandId, categoryId, priceMin, priceMax, ramMin, q, sort, page } = filters;
  const sortOption = SORT_OPTIONS[sort] ?? SORT_OPTIONS.newest;

  const params = {
    _sort: sortOption._sort,
    _order: sortOption._order,
    _page: Number(page) || 1,
    _limit: limit,
  };
  if (brandId) params.brandId = brandId;
  if (categoryId) params.categoryId = categoryId;
  if (priceMin) params.price_gte = priceMin;
  if (priceMax) params.price_lte = priceMax;
  if (ramMin) params.ram_gte = ramMin;
  if (q) params.q = q;
  return params;
}

const laptopApi = {
  /** Trả về { items, total } – total đọc từ header x-total-count */
  async getAll(params = {}, signal) {
    const res = await axiosClient.get('/laptops', { params, signal });
    const total = Number(res.headers['x-total-count'] ?? res.data.length);
    return { items: res.data, total, duration: res.duration };
  },

  async getById(id, signal) {
    const res = await axiosClient.get(`/laptops/${id}`, {
      params: { _expand: ['brand', 'category'] },
      signal,
    });
    return res.data;
  },

  /** 4 laptop cùng loại, trừ chính nó */
  async getRelated(laptop, signal) {
    const res = await axiosClient.get('/laptops', {
      params: { categoryId: laptop.categoryId, id_ne: laptop.id, _limit: 4 },
      signal,
    });
    return res.data;
  },

  async create(data) {
    const res = await axiosClient.post('/laptops', data);
    return res.data;
  },

  /** PUT – gửi ĐẦY ĐỦ object */
  async update(id, data) {
    const res = await axiosClient.put(`/laptops/${id}`, data);
    return res.data;
  },

  /** PATCH – chỉ gửi các trường thay đổi */
  async patch(id, data) {
    const res = await axiosClient.patch(`/laptops/${id}`, data);
    return res.data;
  },

  async remove(id) {
    await axiosClient.delete(`/laptops/${id}`);
    return id;
  },
};

export default laptopApi;
```

📄 **`src/api/catalogApi.js`**

```js
import axiosClient from './axiosClient';

const catalogApi = {
  async getBrands(signal) {
    const res = await axiosClient.get('/brands', { signal });
    return res.data;
  },

  async getCategories(signal) {
    const res = await axiosClient.get('/categories', { signal });
    return res.data;
  },
};

export default catalogApi;
```

📄 **`src/api/reviewApi.js`**

```js
import axiosClient from './axiosClient';

const reviewApi = {
  /** Đánh giá của 1 laptop, mới nhất trước */
  async getByLaptop(laptopId, signal) {
    const res = await axiosClient.get('/reviews', {
      params: { laptopId, _sort: 'createdAt', _order: 'desc' },
      signal,
    });
    return res.data;
  },

  /** BR-07: kiểm tra user đã đánh giá laptop này chưa */
  async findByUser(laptopId, userId) {
    const res = await axiosClient.get('/reviews', { params: { laptopId, userId } });
    return res.data[0] ?? null;
  },

  async create(data) {
    const res = await axiosClient.post('/reviews', data);
    return res.data;
  },
};

export default reviewApi;
```

✅ **Kiểm tra:** `const { items, total } = await laptopApi.getAll({ _page: 1, _limit: 8 })` → 8 item, `total = 20`; `laptopApi.getById(1)` có `brand.name = 'Dell'`, `category.name = 'Mỏng nhẹ'`.

---

## #7 — Cart & order services (C)

| 👤 C · 👀 A | Nhánh `feature/7-cart-order-api` · Cần merge trước: #5 |
|---|---|

**Commit 1/2** `feat(api): add cart service` · **2/2** `feat(api): add order service`

📄 **`src/api/cartApi.js`**

```js
import axiosClient from './axiosClient';

const cartApi = {
  /** Giỏ hàng của user, kèm thông tin laptop (_expand=laptop) */
  async getByUser(userId, signal) {
    const res = await axiosClient.get('/cartItems', {
      params: { userId, _expand: 'laptop' },
      signal,
    });
    return res.data;
  },

  async add(userId, laptopId, quantity) {
    const res = await axiosClient.post('/cartItems', { userId, laptopId, quantity });
    return res.data;
  },

  /** PATCH – chỉ đổi số lượng */
  async updateQuantity(id, quantity) {
    const res = await axiosClient.patch(`/cartItems/${id}`, { quantity });
    return res.data;
  },

  async remove(id) {
    await axiosClient.delete(`/cartItems/${id}`);
    return id;
  },
};

export default cartApi;
```

📄 **`src/api/orderApi.js`**

```js
import axiosClient from './axiosClient';

const orderApi = {
  /** Đơn của 1 user, mới nhất trước */
  async getByUser(userId, signal) {
    const res = await axiosClient.get('/orders', {
      params: { userId, _sort: 'createdAt', _order: 'desc' },
      signal,
    });
    return res.data;
  },

  /** Admin: tất cả đơn hàng, có thể lọc theo status */
  async getAll(params = {}, signal) {
    const res = await axiosClient.get('/orders', {
      params: { _sort: 'createdAt', _order: 'desc', ...params },
      signal,
    });
    return res.data;
  },

  async create(order) {
    const res = await axiosClient.post('/orders', order);
    return res.data;
  },

  /** PATCH – chỉ đổi trạng thái */
  async updateStatus(id, status) {
    const res = await axiosClient.patch(`/orders/${id}`, { status });
    return res.data;
  },
};

export default orderApi;
```

✅ **Kiểm tra:** `await cartApi.add(2, 1, 1)` → `db.json` có 1 dòng `cartItems` → `await cartApi.getByUser(2)` có `laptop.name` → **`npm run reset-db`** trước khi commit.

---

# Sprint 1 — Core UI & Auth

## #9 — Routes, layouts & 404 (A)

| 👤 A · 👀 B | Nhánh `feature/9-routes-layout` · Cần merge trước: #2 |
|---|---|

> Làm **trước #8**: LoginPage (#8) cần router. Khai báo đủ 13 route bằng trang tạm ngay từ đầu → các thành viên chỉ **thay nội dung file trang**, không ai phải sửa `App.jsx` nữa (trừ #10).

**Commit 1/3 — `feat(layout): add main and admin layouts with outlet`**

📄 **`src/hooks/usePageTitle.js`**

```js
import { useEffect } from 'react';

/** F6. Đặt tiêu đề tab: "Dell XPS 13 | LaptopStore" */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | LaptopStore` : 'LaptopStore';
  }, [title]);
}
```

📄 **`src/components/layout/AppNavbar.jsx`** — 🧩 Bản tạm (B thay toàn bộ ở #14)

```jsx
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

/** 🧩 Bản tạm (#9) – B thay toàn bộ ở #14 */
export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          💻 LaptopStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Trang chủ
            </Nav.Link>
            <Nav.Link as={NavLink} to="/laptops">
              Laptop
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart">
              Giỏ hàng
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin">
              Quản trị
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/login">
              Đăng nhập
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
```

📄 **`src/components/layout/Footer.jsx`** — 🧩 Bản tạm (B thay ở #14)

```jsx
/** 🧩 Bản tạm (#9) – B thay toàn bộ ở #14 */
export default function Footer() {
  return <footer className="bg-dark text-white-50 py-3 mt-auto text-center small">© 2026 LaptopStore</footer>;
}
```

📄 **`src/components/layout/MainLayout.jsx`**

```jsx
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import Footer from './Footer';

/** F1. Layout khách hàng: Navbar + nội dung trang (<Outlet />) + Footer */
export default function MainLayout() {
  const { pathname } = useLocation();

  // Chuyển trang → cuộn lên đầu
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="flex-grow-1 py-4">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
```

📄 **`src/components/layout/AdminLayout.jsx`**

```jsx
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';

/** F1. Layout quản trị: Navbar + sidebar (NavLink) + <Outlet /> */
export default function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <Container fluid className="flex-grow-1 py-4">
        <Row>
          <Col md={3} lg={2} className="mb-3">
            <div className="bg-body-tertiary rounded p-2">
              <div className="text-uppercase small fw-bold text-secondary px-2 py-1">Quản trị</div>
              <Nav variant="pills" className="flex-column">
                <Nav.Link as={NavLink} to="/admin/laptops">
                  💻 Laptop
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/orders">
                  📦 Đơn hàng
                </Nav.Link>
                <hr className="my-2" />
                <Nav.Link as={NavLink} to="/" end>
                  ← Về cửa hàng
                </Nav.Link>
              </Nav>
            </div>
          </Col>
          <Col md={9} lg={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
```

**Commit 2/3 — `feat(router): declare all routes with placeholder pages`**

📄 **`src/components/layout/ComingSoon.jsx`**

```jsx
import { Alert } from 'react-bootstrap';
import usePageTitle from '../../hooks/usePageTitle';

/** Trang tạm cho các route chưa làm */
export default function ComingSoon({ title, issue }) {
  usePageTitle(title);
  return (
    <Alert variant="info" className="my-4">
      <Alert.Heading as="h4">{title}</Alert.Heading>
      <p className="mb-0">Trang đang phát triển{issue ? ` – xem issue ${issue}` : ''}.</p>
    </Alert>
  );
}
```

Tạo 10 trang tạm bằng Git Bash (mỗi trang sẽ được **thay toàn bộ** ở issue ghi bên cạnh):

```bash
make_page() {   # $1 file  $2 component  $3 tiêu đề  $4 issue  $5 tiền tố đường dẫn
  mkdir -p "$(dirname "$1")"
  cat > "$1" <<EOF
import ComingSoon from '$5components/layout/ComingSoon';

export default function $2() {
  return <ComingSoon title="$3" issue="$4" />;
}
EOF
}
make_page src/pages/HomePage.jsx                  HomePage            "Trang chủ"         "#16" ../
make_page src/pages/LaptopListPage.jsx            LaptopListPage      "Danh sách laptop"  "#17" ../
make_page src/pages/LaptopDetailPage.jsx          LaptopDetailPage    "Chi tiết laptop"   "#20" ../
make_page src/pages/LoginPage.jsx                 LoginPage           "Đăng nhập"         "#8"  ../
make_page src/pages/CartPage.jsx                  CartPage            "Giỏ hàng"          "#23" ../
make_page src/pages/CheckoutPage.jsx              CheckoutPage        "Thanh toán"        "#24" ../
make_page src/pages/OrderListPage.jsx             OrderListPage       "Đơn hàng của tôi"  "#25" ../
make_page src/pages/admin/AdminLaptopPage.jsx     AdminLaptopPage     "Quản lý laptop"    "#26" ../../
make_page src/pages/admin/AdminLaptopFormPage.jsx AdminLaptopFormPage "Thêm / sửa laptop" "#27" ../../
make_page src/pages/admin/AdminOrderPage.jsx      AdminOrderPage      "Quản lý đơn hàng"  "#28" ../../
```

📄 **`src/App.jsx`**

```jsx
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import HomePage from './pages/HomePage';
import LaptopListPage from './pages/LaptopListPage';
import LaptopDetailPage from './pages/LaptopDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderListPage from './pages/OrderListPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLaptopPage from './pages/admin/AdminLaptopPage';
import AdminLaptopFormPage from './pages/admin/AdminLaptopFormPage';
import AdminOrderPage from './pages/admin/AdminOrderPage';

/** Phần F – bảng route (chưa bảo vệ – #10 thêm ProtectedRoute) */
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="laptops" element={<LaptopListPage />} />
        <Route path="laptops/:id" element={<LaptopDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrderListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="laptops" replace />} />
        <Route path="laptops" element={<AdminLaptopPage />} />
        <Route path="laptops/new" element={<AdminLaptopFormPage />} />
        <Route path="laptops/:id/edit" element={<AdminLaptopFormPage />} />
        <Route path="orders" element={<AdminOrderPage />} />
      </Route>
    </Routes>
  );
}
```

📄 **`src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**Commit 3/3 — `feat(router): add not found page and page title hook`**

📄 **`src/pages/NotFoundPage.jsx`**

```jsx
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

/** F7. Trang 404 */
export default function NotFoundPage() {
  usePageTitle('Không tìm thấy trang');
  return (
    <div className="text-center py-5">
      <div className="display-1 fw-bold text-primary">404</div>
      <h3 className="mb-3">Không tìm thấy trang</h3>
      <p className="text-secondary">Đường dẫn bạn truy cập không tồn tại hoặc đã bị xóa.</p>
      <Button as={Link} to="/" size="lg">
        Về trang chủ
      </Button>
    </div>
  );
}
```

✅ **Kiểm tra:** gõ lần lượt 13 URL → đúng layout (admin có sidebar) và đúng tiêu đề tab · `/admin` → `/admin/laptops` · `/abc` → 404.

---

## #8 — Fake login & AuthContext (A)

| 👤 A · 👀 C | Nhánh `feature/8-login` · Cần merge trước: #5, #9 |
|---|---|

**Commit 1/3 — `feat(auth): add auth service with fake token`**

📄 **`src/api/authApi.js`**

```js
import axiosClient from './axiosClient';

/**
 * B6. Đăng nhập GIẢ LẬP – json-server không có xác thực thật.
 * Tìm user theo email + password, sau đó tự tạo token giả.
 */
const authApi = {
  async login(email, password) {
    const res = await axiosClient.get('/users', { params: { email, password } });

    if (res.data.length === 0) {
      // Ném lỗi cùng dạng với lỗi đã chuẩn hóa trong interceptor
      throw { status: null, message: 'Sai email hoặc mật khẩu' };
    }

    // Không lưu password xuống localStorage
    // eslint-disable-next-line no-unused-vars
    const { password: _password, ...user } = res.data[0];
    const token = btoa(`${user.id}:${Date.now()}`);
    return { token, user };
  },
};

export default authApi;
```

**Commit 2/3 — `feat(auth): add auth context with persisted user`**

📄 **`src/contexts/AuthContext.jsx`**

```jsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext(null);

/** F5 trang vẫn giữ đăng nhập: đọc lại user từ localStorage */
const readStoredUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw && localStorage.getItem('token') ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = useCallback(async (email, password) => {
    const { token, user: loggedInUser } = await authApi.login(email, password);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  // Interceptor (#5) phát sự kiện này khi server trả 401
  useEffect(() => {
    const handleForcedLogout = () => setUser(null);
    window.addEventListener('auth:logout', handleForcedLogout);
    return () => window.removeEventListener('auth:logout', handleForcedLogout);
  }, []);

  const value = useMemo(
    () => ({ user, isAdmin: user?.role === 'admin', login, logout }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
```

📄 **`src/main.jsx`** — thêm `AuthProvider` (bên trong `BrowserRouter`):

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

> Thứ tự provider cuối cùng: `BrowserRouter > ToastProvider (#12) > AuthProvider (#8) > CartProvider (#14/#22)`. Ai merge sau thì giữ các provider đã có, thêm của mình vào đúng chỗ.

**Commit 3/3 — `feat(auth): add login page with validation`**

📄 **`src/pages/LoginPage.jsx`**

```jsx
import { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getErrorMessage } from '../api/axiosClient';
import usePageTitle from '../hooks/usePageTitle';

const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'admin@laptopstore.vn', password: '123456' },
  { label: 'Khách hàng', email: 'khach@laptopstore.vn', password: '123456' },
];

const validate = ({ email, password }) => {
  const errors = {};
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = 'Email không hợp lệ';
  if (password.length < 6) errors.password = 'Mật khẩu có ít nhất 6 ký tự';
  return errors;
};

export default function LoginPage() {
  usePageTitle('Đăng nhập');
  const { user, login } = useAuth();
  const location = useLocation();
  const from = location.state?.from;
  const redirectTo = from ? `${from.pathname}${from.search ?? ''}` : '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  // Vừa đăng nhập xong thì gửi lời chào; vào lại /login khi đã đăng nhập thì không
  const justLoggedIn = useRef(false);

  // BR-09: đã đăng nhập → chuyển về trang trước đó (hoặc "/")
  if (user) {
    const state = justLoggedIn.current ? { message: `Xin chào, ${user.fullName}!` } : undefined;
    return <Navigate to={redirectTo} replace state={state} />;
  }

  const errors = validate(form);
  // E5: chỉ hiện lỗi sau khi đã chạm vào ô hoặc bấm submit
  const showError = (field) => (touched[field] || submitted) && errors[field];

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setError(null);
    try {
      justLoggedIn.current = true;
      await login(form.email.trim(), form.password);
    } catch (err) {
      justLoggedIn.current = false;
      setError(getErrorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col sm={10} md={7} lg={5}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <h3 className="fw-bold text-center mb-3">Đăng nhập</h3>

            {from && !error && (
              <Alert variant="info" className="small">
                Vui lòng đăng nhập để tiếp tục.
              </Alert>
            )}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="login-email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('email'))}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="login-password">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('password'))}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="w-100" size="lg" disabled={submitting}>
                {submitting && <Spinner size="sm" className="me-2" />}
                Đăng nhập
              </Button>
            </Form>

            <hr />
            <p className="small text-secondary mb-2">Tài khoản demo (mật khẩu 123456):</p>
            <div className="d-flex gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <Button
                  key={acc.email}
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setForm({ email: acc.email, password: acc.password })}
                >
                  {acc.label}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
```

✅ **Kiểm tra:** sai mật khẩu → Alert "Sai email hoặc mật khẩu" · đúng → về `/`, localStorage có `token`, `user` (không có `password`) · F5 vẫn đăng nhập · tab Network → request kế tiếp có `Authorization: Bearer ...`.

---

## #12 — ToastContext & ConfirmModal (C)

| 👤 C · 👀 B | Nhánh `feature/12-toast-confirm-modal` · Cần merge trước: #2 (nên sau #8 để main.jsx gọn) |
|---|---|

**Commit 1/2 — `feat(ui): add toast context with auto hide`**

📄 **`src/contexts/ToastContext.jsx`**

```jsx
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastContext = createContext(null);

const TITLES = {
  success: 'Thành công',
  danger: 'Lỗi',
  warning: 'Lưu ý',
  info: 'Thông báo',
};

let nextId = 1;

/**
 * Toast góc trên phải, tự ẩn sau 3 giây (TECH-05 – thay cho alert).
 *   const { showToast } = useToast();
 *   showToast('Đã lưu', 'success' | 'danger' | 'warning' | 'info');
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, variant = 'success') => {
    setToasts((list) => [...list, { id: nextId++, message, variant }]);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer position="top-end" containerPosition="fixed" className="p-3" style={{ zIndex: 2000 }}>
        {toasts.map((t) => (
          <Toast key={t.id} bg={t.variant} autohide delay={3000} onClose={() => removeToast(t.id)}>
            <Toast.Header>
              <strong className="me-auto">{TITLES[t.variant] ?? 'Thông báo'}</strong>
            </Toast.Header>
            <Toast.Body className={['danger', 'success'].includes(t.variant) ? 'text-white' : ''}>
              {t.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);
```

📄 **`src/main.jsx`** — thêm `ToastProvider` bọc ngoài `AuthProvider`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

**Commit 2/2 — `feat(ui): add reusable confirm modal`**

📄 **`src/components/common/ConfirmModal.jsx`**

```jsx
import { Button, Modal, Spinner } from 'react-bootstrap';

/** Modal xác nhận dùng chung (TECH-05) */
export default function ConfirmModal({
  show,
  title = 'Xác nhận',
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  variant = 'danger',
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal show={show} onHide={loading ? undefined : onCancel} centered>
      <Modal.Header closeButton={!loading}>
        <Modal.Title as="h5">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          {cancelText}
        </Button>
        <Button variant={variant} onClick={onConfirm} disabled={loading}>
          {loading && <Spinner size="sm" className="me-2" />}
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
```

✅ **Kiểm tra** — tạm thay nội dung `src/pages/HomePage.jsx` (trang tạm) rồi **khôi phục** trước khi commit:
```jsx
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useToast } from '../contexts/ToastContext';
import ConfirmModal from '../components/common/ConfirmModal';

export default function HomePage() {
  const { showToast } = useToast();
  const [show, setShow] = useState(false);
  return (
    <>
      {['success', 'danger', 'warning', 'info'].map((v) => (
        <Button key={v} variant={v} className="me-2" onClick={() => showToast(`Toast ${v}`, v)}>{v}</Button>
      ))}
      <Button onClick={() => setShow(true)}>Mở modal</Button>
      <ConfirmModal show={show} message="Bạn chắc chứ?" onConfirm={() => setShow(false)} onCancel={() => setShow(false)} />
    </>
  );
}
```

---

## #11 — Common components (B)

| 👤 B · 👀 A | Nhánh `feature/11-common-components` · Cần merge trước: #4 |
|---|---|

**Commit 1/3 — `feat(ui): add loading spinner and card skeleton`**

📄 **`src/components/common/Loading.jsx`**

```jsx
import { Spinner } from 'react-bootstrap';

export default function Loading({ text = 'Đang tải...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-secondary">
      <Spinner animation="border" variant="primary" role="status" />
      <span className="mt-2">{text}</span>
    </div>
  );
}
```

📄 **`src/components/laptop/LaptopCardSkeleton.jsx`**

```jsx
import { Card, Placeholder } from 'react-bootstrap';

/** E. Skeleton khi đang tải danh sách (không chỉ 1 Spinner giữa trang) */
export default function LaptopCardSkeleton() {
  return (
    <Card className="h-100 shadow-sm" aria-hidden="true">
      <div className="laptop-card-img bg-body-secondary placeholder-wave" />
      <Card.Body>
        <Placeholder as={Card.Title} animation="wave">
          <Placeholder xs={10} /> <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as="div" animation="wave" className="mb-2">
          <Placeholder xs={4} size="sm" /> <Placeholder xs={3} size="sm" /> <Placeholder xs={3} size="sm" />
        </Placeholder>
        <Placeholder as="div" animation="wave">
          <Placeholder xs={7} size="lg" />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={12} className="mt-2" />
      </Card.Body>
    </Card>
  );
}
```

**Commit 2/3 — `feat(ui): add error alert with retry and empty state`**

📄 **`src/components/common/ErrorAlert.jsx`**

```jsx
import { Alert, Button } from 'react-bootstrap';

/** Thông báo lỗi dùng chung, có nút "Thử lại" (gọi refetch của useAxios) */
export default function ErrorAlert({ message, onRetry, title = 'Đã xảy ra lỗi' }) {
  return (
    <Alert variant="danger" className="my-3">
      <Alert.Heading as="h5">{title}</Alert.Heading>
      <p className="mb-0">{message}</p>
      {onRetry && (
        <div className="mt-3">
          <Button variant="outline-danger" size="sm" onClick={onRetry}>
            ↻ Thử lại
          </Button>
        </div>
      )}
    </Alert>
  );
}
```

📄 **`src/components/common/EmptyState.jsx`**

```jsx
export default function EmptyState({ icon = '🔍', message = 'Không tìm thấy laptop phù hợp', children }) {
  return (
    <div className="text-center py-5 text-secondary">
      <div style={{ fontSize: '3rem' }} aria-hidden="true">
        {icon}
      </div>
      <p className="fs-5 mt-2">{message}</p>
      {children}
    </div>
  );
}
```

**Commit 3/3 — `feat(ui): add price, rating, pagination and image fallback`**

📄 **`src/components/common/Price.jsx`**

```jsx
import { Badge } from 'react-bootstrap';
import { formatPrice, getDiscountPercent, hasSale } from '../../utils/format';

/**
 * E2 + BR-03. Hiển thị giá:
 * - Có giảm giá: giá sale đỏ đậm + giá gốc gạch ngang + Badge "-x%"
 * - Không giảm: giá gốc
 */
export default function Price({ laptop, size = 'md' }) {
  const mainClass = size === 'lg' ? 'fs-3' : 'fs-5';

  if (!hasSale(laptop)) {
    return <div className={`fw-bold text-danger ${mainClass}`}>{formatPrice(laptop.price)}</div>;
  }

  return (
    <div>
      <span className={`fw-bold text-danger ${mainClass} me-2`}>{formatPrice(laptop.salePrice)}</span>
      <Badge bg="danger">-{getDiscountPercent(laptop)}%</Badge>
      <div className="text-secondary text-decoration-line-through small">{formatPrice(laptop.price)}</div>
    </div>
  );
}
```

📄 **`src/components/common/StarRating.jsx`**

```jsx
/** Hiển thị số sao, ví dụ 4.6 → ★★★★★ (làm tròn) */
export default function StarRating({ value = 0, showValue = true }) {
  const rounded = Math.round(value);
  return (
    <span className="text-warning" title={`${value}/5`}>
      {'★'.repeat(rounded)}
      <span className="text-body-tertiary">{'★'.repeat(5 - rounded)}</span>
      {showValue && <span className="text-secondary small ms-1">{Number(value).toFixed(1)}</span>}
    </span>
  );
}
```

📄 **`src/components/common/AppPagination.jsx`** — dùng chung cho #17 và #26

```jsx
import { Pagination } from 'react-bootstrap';

/** E6. Phân trang: First / Prev / các số trang / Next / Last */
export default function AppPagination({ page, totalPages, onChange, maxButtons = 5 }) {
  if (totalPages <= 1) return null;

  // Cửa sổ các số trang quanh trang hiện tại
  let start = Math.max(1, page - Math.floor(maxButtons / 2));
  const end = Math.min(totalPages, start + maxButtons - 1);
  start = Math.max(1, end - maxButtons + 1);

  const pages = [];
  for (let p = start; p <= end; p += 1) pages.push(p);

  const go = (p) => {
    if (p >= 1 && p <= totalPages && p !== page) onChange(p);
  };

  return (
    <Pagination className="justify-content-center mt-4 flex-wrap">
      <Pagination.First disabled={page === 1} onClick={() => go(1)} />
      <Pagination.Prev disabled={page === 1} onClick={() => go(page - 1)} />
      {start > 1 && <Pagination.Ellipsis disabled />}
      {pages.map((p) => (
        <Pagination.Item key={p} active={p === page} onClick={() => go(p)}>
          {p}
        </Pagination.Item>
      ))}
      {end < totalPages && <Pagination.Ellipsis disabled />}
      <Pagination.Next disabled={page === totalPages} onClick={() => go(page + 1)} />
      <Pagination.Last disabled={page === totalPages} onClick={() => go(totalPages)} />
    </Pagination>
  );
}
```

📄 **`src/utils/image.js`**

```js
/** Ảnh lỗi (link hỏng / không có mạng) → dùng ảnh mặc định trong thư mục public */
export const FALLBACK_IMAGE = '/no-image.svg';

export const handleImageError = (e) => {
  e.currentTarget.onerror = null; // tránh lặp vô hạn nếu ảnh mặc định cũng lỗi
  e.currentTarget.src = FALLBACK_IMAGE;
};
```

📄 **`public/no-image.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#e9ecef"/>
  <g fill="#adb5bd">
    <rect x="190" y="110" width="220" height="140" rx="10"/>
    <path d="M150 270h300l-20 30H170z"/>
  </g>
  <rect x="205" y="125" width="190" height="110" fill="#f8f9fa"/>
  <text x="300" y="350" font-family="Arial, sans-serif" font-size="22" fill="#6c757d" text-anchor="middle">Chưa có ảnh</text>
</svg>
```

✅ **Kiểm tra** — tạm đặt vào trang tạm, chụp ảnh đính kèm PR rồi xoá:
```jsx
<Price laptop={{ price: 42990000, salePrice: 39990000 }} />   {/* 39.990.000 ₫  -7%  42.990.000 ₫ gạch */}
<Price laptop={{ price: 27990000, salePrice: null }} />
<ErrorAlert message="Không kết nối được máy chủ" onRetry={() => {}} />
<EmptyState />
<AppPagination page={2} totalPages={5} onChange={console.log} />
```

---

## #13 — useAxios & useDebounce (A)

| 👤 A · 👀 B | Nhánh `feature/13-use-axios-debounce` · Cần merge trước: #5 |
|---|---|

**Commit 1/3 — `feat(hooks): add useDebounce hook`**

📄 **`src/hooks/useDebounce.js`**

```js
import { useEffect, useState } from 'react';

/**
 * H2. Trả về `value` sau khi người dùng ngừng thay đổi `delay` ms.
 * Mỗi lần value đổi: clearTimeout bộ đếm cũ, đặt bộ đếm mới.
 */
export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

**Commit 2/3 `feat(hooks): add useAxios with abort controller`** · **3/3 `feat(hooks): add refetch and setData to useAxios`**

📄 **`src/hooks/useAxios.js`**

```js
import { useCallback, useEffect, useRef, useState } from 'react';
import { getErrorMessage, isCancel } from '../api/axiosClient';

/**
 * H1. Custom hook gom logic loading / data / error / AbortController.
 *
 *   const { data, loading, error, refetch, setData } = useAxios(
 *     (signal) => laptopApi.getById(id, signal),
 *     [id]
 *   );
 *
 * - Mỗi lần deps đổi: hủy request cũ (abort) rồi gọi request mới (D1, D2).
 * - Bỏ qua lỗi hủy: không hiển thị lỗi, không tắt loading (D4).
 * - refetch(): gọi lại (dùng cho nút "Thử lại" của ErrorAlert).
 * - setData: cho phép trang cập nhật dữ liệu cục bộ (thêm review, xoá dòng...).
 */
export default function useAxios(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Luôn dùng phiên bản fetcher mới nhất mà không cần đưa vào deps
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcherRef.current(controller.signal);
        // Request đã bị hủy trong lúc chờ (ví dụ trong Promise.allSettled) → bỏ qua
        if (controller.signal.aborted) return;
        setData(result);
      } catch (err) {
        if (isCancel(err) || controller.signal.aborted) return;
        setError(getErrorMessage(err));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    run();

    // Cleanup: chạy trước lần effect kế tiếp và khi unmount
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey]);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { data, loading, error, refetch, setData };
}
```

✅ **Kiểm tra** — tạm thay trang tạm `LaptopListPage.jsx` rồi khôi phục:
```jsx
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import laptopApi from '../api/laptopApi';
import useAxios from '../hooks/useAxios';

export default function LaptopListPage() {
  const [brandId, setBrandId] = useState(1);
  const { data, loading, error, refetch } = useAxios((signal) => laptopApi.getAll({ brandId }, signal), [brandId]);
  return (
    <>
      {[1, 2, 3, 4].map((id) => <Button key={id} className="me-2" onClick={() => setBrandId(id)}>Hãng {id}</Button>)}
      <Button variant="secondary" onClick={refetch}>Tải lại</Button>
      <pre>{loading ? 'Đang tải...' : error ?? JSON.stringify(data?.items.map((l) => l.name), null, 2)}</pre>
    </>
  );
}
```
Slow 3G + bấm nhanh 4 nút → 3 request *(canceled)*, không hiện lỗi. Mới vào trang (StrictMode) → 1 *(canceled)* + 1 thành công.

---

## #10 — ProtectedRoute (A)

| 👤 A · 👀 C | Nhánh `feature/10-protected-route` · Cần merge trước: #8, #9, #12 |
|---|---|

**Commit 1/2 — `feat(auth): add protected route with redirect state`**

📄 **`src/components/common/ProtectedRoute.jsx`**

```jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * F2 + BR-09. Route bảo vệ.
 *   <ProtectedRoute />                    → chỉ cần đăng nhập
 *   <ProtectedRoute roles={['admin']} />  → cần đúng vai trò
 * Dùng được cả 2 cách: bọc children hoặc làm route cha (render <Outlet />).
 */
export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Lưu trang đang muốn vào → LoginPage đưa người dùng quay lại
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && !roles.includes(user.role)) {
    // useFlashMessage ở layout đọc state này và hiện Toast
    return <Navigate to="/" replace state={{ message: 'Bạn không có quyền truy cập', variant: 'danger' }} />;
  }

  return children ?? <Outlet />;
}
```

📄 **`src/hooks/useFlashMessage.js`**

```js
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

/**
 * F5. Đọc thông báo được gửi kèm khi navigate:
 *   navigate('/admin/laptops', { state: { message: 'Đã lưu ...', variant: 'success' } })
 * Hiện Toast một lần rồi xoá state (F5 trang sẽ không hiện lại).
 */
export default function useFlashMessage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const shownKey = useRef(null);

  useEffect(() => {
    const message = location.state?.message;
    if (!message || shownKey.current === location.key) return;

    shownKey.current = location.key;
    showToast(message, location.state.variant || 'success');
    navigate(`${location.pathname}${location.search}`, { replace: true, state: null });
  }, [location, navigate, showToast]);
}
```

**Commit 2/2 — `feat(auth): guard customer and admin routes by role`**

📄 **`src/App.jsx`**

```jsx
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import LaptopListPage from './pages/LaptopListPage';
import LaptopDetailPage from './pages/LaptopDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderListPage from './pages/OrderListPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLaptopPage from './pages/admin/AdminLaptopPage';
import AdminLaptopFormPage from './pages/admin/AdminLaptopFormPage';
import AdminOrderPage from './pages/admin/AdminOrderPage';

/** Phần F – bảng route */
export default function App() {
  return (
    <Routes>
      {/* Layout khách hàng */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="laptops" element={<LaptopListPage />} />
        <Route path="laptops/:id" element={<LaptopDetailPage />} />
        <Route path="login" element={<LoginPage />} />

        {/* Cần đăng nhập */}
        <Route element={<ProtectedRoute />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<OrderListPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Layout quản trị – chỉ admin */}
      <Route
        path="admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="laptops" replace />} />
        <Route path="laptops" element={<AdminLaptopPage />} />
        <Route path="laptops/new" element={<AdminLaptopFormPage />} />
        <Route path="laptops/:id/edit" element={<AdminLaptopFormPage />} />
        <Route path="orders" element={<AdminOrderPage />} />
      </Route>
    </Routes>
  );
}
```

📄 **`src/components/layout/MainLayout.jsx`** — thêm `useFlashMessage()`

```jsx
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import Footer from './Footer';
import useFlashMessage from '../../hooks/useFlashMessage';

/** F1. Layout khách hàng: Navbar + nội dung trang (<Outlet />) + Footer */
export default function MainLayout() {
  const { pathname } = useLocation();
  useFlashMessage();

  // Chuyển trang → cuộn lên đầu
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="flex-grow-1 py-4">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
```

📄 **`src/components/layout/AdminLayout.jsx`** — thêm `useFlashMessage()`

```jsx
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import useFlashMessage from '../../hooks/useFlashMessage';

/** F1. Layout quản trị: Navbar + sidebar (NavLink) + <Outlet /> */
export default function AdminLayout() {
  useFlashMessage();

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <Container fluid className="flex-grow-1 py-4">
        <Row>
          <Col md={3} lg={2} className="mb-3">
            <div className="bg-body-tertiary rounded p-2">
              <div className="text-uppercase small fw-bold text-secondary px-2 py-1">Quản trị</div>
              <Nav variant="pills" className="flex-column">
                <Nav.Link as={NavLink} to="/admin/laptops">
                  💻 Laptop
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/orders">
                  📦 Đơn hàng
                </Nav.Link>
                <hr className="my-2" />
                <Nav.Link as={NavLink} to="/" end>
                  ← Về cửa hàng
                </Nav.Link>
              </Nav>
            </div>
          </Col>
          <Col md={9} lg={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
```

✅ **Kiểm tra (kịch bản 7, 12):** chưa đăng nhập gõ `/admin/laptops` → `/login` → đăng nhập admin → quay lại đúng `/admin/laptops` · đăng nhập customer gõ `/admin` → về `/` + Toast đỏ "Bạn không có quyền truy cập" · đăng nhập xong thấy Toast "Xin chào, ...".

---

## #14 — AppNavbar & Footer (B)

| 👤 B · 👀 C (+ A vì sửa main.jsx) | Nhánh `feature/14-navbar-footer` · Cần merge trước: #8, #9, #12 |
|---|---|

> Navbar cần số lượng giỏ hàng (#22) và ô gợi ý tìm kiếm (#19) — chưa có. B tạo **2 bản tạm** có đúng tên hàm/prop cuối cùng; C (#22) và A (#19) **thay toàn bộ** 2 file đó, Navbar không phải sửa lại.

**Commit 1/3 — `feat(layout): add cart context and search placeholders`**

📄 **`src/contexts/CartContext.jsx`** — 🧩 Bản tạm (C thay toàn bộ ở #22)

```jsx
import { createContext, useContext } from 'react';

/** 🧩 Bản tạm (#14) – C thay toàn bộ ở #22. Giữ nguyên tên các trường. */
const EMPTY_CART = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

const CartContext = createContext(EMPTY_CART);

export function CartProvider({ children }) {
  return <CartContext.Provider value={EMPTY_CART}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
```

📄 **`src/components/layout/SearchSuggest.jsx`** — 🧩 Bản tạm (A thay toàn bộ ở #19)

```jsx
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/** 🧩 Bản tạm (#14) – A thay toàn bộ ở #19 (thêm gợi ý + debounce + hủy request) */
export default function SearchSuggest({ onNavigate }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = keyword.trim();
    if (!q) return;
    navigate(`/laptops?q=${encodeURIComponent(q)}`);
    setKeyword('');
    onNavigate?.();
  };

  return (
    <Form className="my-2 my-lg-0" onSubmit={handleSubmit} role="search">
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Tìm laptop..."
          aria-label="Tìm laptop"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button type="submit" variant="warning">
          Tìm
        </Button>
      </InputGroup>
    </Form>
  );
}
```

📄 **`src/main.jsx`** — thêm `CartProvider` (bên trong `AuthProvider` vì giỏ hàng cần biết user):

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

**Commit 2/3 `feat(layout): add responsive navbar with account dropdown`** · **3/3 `feat(layout): add footer`**

📄 **`src/components/layout/AppNavbar.jsx`**

```jsx
import { useState } from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import SearchSuggest from './SearchSuggest';

/** E1. Thanh điều hướng */
export default function AppNavbar() {
  const { user, isAdmin, logout } = useAuth();
  const { totalQuantity } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  // Mobile: chọn menu xong thì thu gọn Navbar
  const collapse = () => setExpanded(false);

  const handleLogout = () => {
    logout();
    collapse();
    showToast('Đã đăng xuất', 'info');
    navigate('/');
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      collapseOnSelect
      expanded={expanded}
      onToggle={setExpanded}
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={collapse} className="fw-bold">
          💻 LaptopStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end eventKey="home">
              Trang chủ
            </Nav.Link>
            <Nav.Link as={NavLink} to="/laptops" eventKey="laptops">
              Laptop
            </Nav.Link>
          </Nav>

          <div className="mx-lg-3 flex-grow-1 search-wrapper">
            <SearchSuggest onNavigate={collapse} />
          </div>

          <Nav className="align-items-lg-center">
            <Nav.Link as={NavLink} to="/cart" eventKey="cart" aria-label="Giỏ hàng">
              🛒 Giỏ hàng{' '}
              <Badge bg="warning" text="dark" pill>
                {totalQuantity}
              </Badge>
            </Nav.Link>

            {user ? (
              <NavDropdown title={`👤 ${user.fullName}`} id="account-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/orders" onClick={collapse}>
                  Đơn hàng của tôi
                </NavDropdown.Item>
                {isAdmin && (
                  <NavDropdown.Item as={Link} to="/admin" onClick={collapse}>
                    Quản trị
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login" eventKey="login">
                Đăng nhập
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
```

📄 **`src/components/layout/Footer.jsx`**

```jsx
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-white-50 py-4 mt-auto">
      <Container className="d-flex flex-column flex-md-row justify-content-between gap-2 small">
        <span>© 2026 LaptopStore – Exercise 27 mở rộng (FER202)</span>
        <span>React · axios · react-bootstrap · React Router · json-server</span>
      </Container>
    </footer>
  );
}
```

✅ **Kiểm tra:** chưa đăng nhập → nút "Đăng nhập" · customer → dropdown không có "Quản trị" · admin → có · Đăng xuất → Toast + về `/` · 375px → nút ☰, không thanh cuộn ngang · gõ "rog" + Enter → `/laptops?q=rog`.

---

## #15 — LaptopCard & LaptopGrid (B)

| 👤 B · 👀 A | Nhánh `feature/15-laptop-card-grid` · Cần merge trước: #11, #14 |
|---|---|

> Nút "Thêm vào giỏ" dùng hook `useAddToCart`. B tạo **bản tạm** (chưa đăng nhập → chuyển `/login`; đã đăng nhập → báo "đang phát triển"); C thay toàn bộ ở #22. Card và trang chi tiết (#20) không phải sửa lại.

**Commit 1/3 — `feat(cart): add useAddToCart placeholder hook`**

📄 **`src/hooks/useAddToCart.js`** — 🧩 Bản tạm (C thay toàn bộ ở #22)

```js
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

/** 🧩 Bản tạm (#15) – C thay toàn bộ ở #22. Giữ nguyên API: { add(laptop, quantity), adding } */
export default function useAddToCart() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const add = async (laptop) => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    showToast(`Giỏ hàng đang phát triển (#22) – "${laptop.name}"`, 'info');
  };

  return { add, adding: false };
}
```

**Commit 2/3 — `feat(ui): add laptop card with stock and price badges`**

📄 **`src/components/laptop/LaptopCard.jsx`**

```jsx
import { Badge, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Price from '../common/Price';
import StarRating from '../common/StarRating';
import useAddToCart from '../../hooks/useAddToCart';
import { handleImageError } from '../../utils/image';

const storageLabel = (gb) => (gb >= 1024 ? `${gb / 1024}TB` : `${gb}GB`);

/** E2. Thẻ sản phẩm */
export default function LaptopCard({ laptop }) {
  const { add, adding } = useAddToCart();
  const outOfStock = laptop.stock <= 0; // BR-01
  const detailUrl = `/laptops/${laptop.id}`;

  return (
    <Card className="h-100 shadow-sm laptop-card">
      <Link to={detailUrl} className="position-relative">
        <Card.Img
          variant="top"
          src={laptop.image}
          alt={laptop.name}
          className="laptop-card-img"
          onError={handleImageError}
        />
        {outOfStock && (
          <Badge bg="secondary" className="position-absolute top-0 start-0 m-2">
            Hết hàng
          </Badge>
        )}
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h6" className="line-clamp-2" title={laptop.name}>
          <Link to={detailUrl} className="text-decoration-none text-body">
            {laptop.name}
          </Link>
        </Card.Title>
        <div className="d-flex flex-wrap gap-1 mb-2">
          <Badge bg="light" text="dark" className="border">
            {laptop.cpu}
          </Badge>
          <Badge bg="light" text="dark" className="border">
            RAM {laptop.ram}GB
          </Badge>
          <Badge bg="light" text="dark" className="border">
            SSD {storageLabel(laptop.storage)}
          </Badge>
        </div>
        <StarRating value={laptop.rating} />
        <div className="mt-auto pt-2">
          <Price laptop={laptop} />
          <Button
            variant={outOfStock ? 'secondary' : 'primary'}
            className="w-100 mt-2"
            disabled={outOfStock || adding}
            onClick={() => add(laptop)}
          >
            {adding && <Spinner size="sm" className="me-2" />}
            {outOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
```

**Commit 3/3 — `feat(ui): add responsive laptop grid with loading and empty states`**

📄 **`src/components/laptop/LaptopGrid.jsx`**

```jsx
import { Col, Row } from 'react-bootstrap';
import LaptopCard from './LaptopCard';
import LaptopCardSkeleton from './LaptopCardSkeleton';
import EmptyState from '../common/EmptyState';

/** Lưới sản phẩm responsive: 1 / 2 / 3 / 4 cột */
export default function LaptopGrid({ laptops, loading, skeletonCount = 8, cols = { xs: 1, sm: 2, md: 3, lg: 4 } }) {
  if (loading) {
    return (
      <Row {...cols} className="g-3">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <Col key={i}>
            <LaptopCardSkeleton />
          </Col>
        ))}
      </Row>
    );
  }

  if (!laptops || laptops.length === 0) {
    return <EmptyState />;
  }

  return (
    <Row {...cols} className="g-3">
      {laptops.map((laptop) => (
        <Col key={laptop.id}>
          <LaptopCard laptop={laptop} />
        </Col>
      ))}
    </Row>
  );
}
```

✅ **Kiểm tra** — tạm thay trang tạm `HomePage.jsx` (rồi khôi phục):
```jsx
import laptopApi from '../api/laptopApi';
import useAxios from '../hooks/useAxios';
import LaptopGrid from '../components/laptop/LaptopGrid';

export default function HomePage() {
  const { data, loading } = useAxios((signal) => laptopApi.getAll({ _limit: 8 }, signal), []);
  return <LaptopGrid laptops={data?.items} loading={loading} />;
}
```
Thu nhỏ 375 / 576 / 768 / 992px → 1 / 2 / 3 / 4 cột · laptop "ThinkPad E14" nút xám "Hết hàng".

---

# Sprint 2 — Catalog & Detail

## #18 — LaptopFilter (A)

| 👤 A · 👀 B | Nhánh `feature/18-laptop-filter` · Cần merge trước: #6 · **Merge trước #17** |
|---|---|

**Commit 1/2 `feat(list): add controlled laptop filter form`** · **2/2 `feat(list): validate price range before applying`**

📄 **`src/components/laptop/LaptopFilter.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const RAM_OPTIONS = [8, 16, 32];

/**
 * E3. Bộ lọc dạng controlled: KHÔNG tự đọc URL.
 *   filters  – giá trị hiện tại (chuỗi), ví dụ { brandId: '3', ramMin: '16', priceMin: '' }
 *   onChange – gọi với phần thay đổi, ví dụ onChange({ brandId: '3' })
 *   onReset  – xoá toàn bộ bộ lọc
 * Khoảng giá dùng state cục bộ + nút "Áp dụng" để không gọi API mỗi lần gõ.
 * idPrefix: trang danh sách render 2 bộ lọc (cột trái + Offcanvas) → id không được trùng.
 */
export default function LaptopFilter({ brands = [], categories = [], filters, onChange, onReset, idPrefix = 'f' }) {
  const [priceMin, setPriceMin] = useState(filters.priceMin ?? '');
  const [priceMax, setPriceMax] = useState(filters.priceMax ?? '');

  // URL đổi (nút Back / Xoá bộ lọc) → đồng bộ lại ô nhập
  useEffect(() => {
    setPriceMin(filters.priceMin ?? '');
    setPriceMax(filters.priceMax ?? '');
  }, [filters.priceMin, filters.priceMax]);

  const priceInvalid = priceMin !== '' && priceMax !== '' && Number(priceMin) > Number(priceMax);

  const applyPrice = (e) => {
    e.preventDefault();
    if (!priceInvalid) onChange({ priceMin, priceMax });
  };

  return (
    <div className="laptop-filter">
      <h6 className="fw-bold">Hãng</h6>
      <Form.Check
        type="radio"
        id={`${idPrefix}-brand-all`}
        name={`${idPrefix}-brand`}
        label="Tất cả"
        checked={!filters.brandId}
        onChange={() => onChange({ brandId: '' })}
      />
      {brands.map((b) => (
        <Form.Check
          key={b.id}
          type="radio"
          id={`${idPrefix}-brand-${b.id}`}
          name={`${idPrefix}-brand`}
          label={b.name}
          checked={filters.brandId === String(b.id)}
          onChange={() => onChange({ brandId: String(b.id) })}
        />
      ))}

      <hr />
      <h6 className="fw-bold">Loại laptop</h6>
      <Form.Check
        type="radio"
        id={`${idPrefix}-cat-all`}
        name={`${idPrefix}-category`}
        label="Tất cả"
        checked={!filters.categoryId}
        onChange={() => onChange({ categoryId: '' })}
      />
      {categories.map((c) => (
        <Form.Check
          key={c.id}
          type="radio"
          id={`${idPrefix}-cat-${c.id}`}
          name={`${idPrefix}-category`}
          label={c.name}
          checked={filters.categoryId === String(c.id)}
          onChange={() => onChange({ categoryId: String(c.id) })}
        />
      ))}

      <hr />
      <h6 className="fw-bold">Khoảng giá (VND)</h6>
      <Form onSubmit={applyPrice}>
        <InputGroup size="sm" className="mb-2">
          <InputGroup.Text>Từ</InputGroup.Text>
          <Form.Control
            type="number"
            min={0}
            step={1000000}
            placeholder="0"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            isInvalid={priceInvalid}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-2" hasValidation>
          <InputGroup.Text>Đến</InputGroup.Text>
          <Form.Control
            type="number"
            min={0}
            step={1000000}
            placeholder="100000000"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            isInvalid={priceInvalid}
          />
          <Form.Control.Feedback type="invalid">Giá "từ" phải nhỏ hơn giá "đến"</Form.Control.Feedback>
        </InputGroup>
        <Button type="submit" size="sm" variant="outline-primary" className="w-100" disabled={priceInvalid}>
          Áp dụng
        </Button>
      </Form>

      <hr />
      <h6 className="fw-bold">RAM tối thiểu</h6>
      <Form.Select
        size="sm"
        aria-label="RAM tối thiểu"
        value={filters.ramMin ?? ''}
        onChange={(e) => onChange({ ramMin: e.target.value })}
      >
        <option value="">Không yêu cầu</option>
        {RAM_OPTIONS.map((r) => (
          <option key={r} value={r}>
            Từ {r}GB
          </option>
        ))}
      </Form.Select>

      <Button variant="outline-secondary" size="sm" className="w-100 mt-4" onClick={onReset}>
        Xóa bộ lọc
      </Button>
    </div>
  );
}
```

> Việc đặt bộ lọc vào cột trái (≥ lg) hay `Offcanvas` (mobile) do trang danh sách (#17) quyết định — component chỉ lo nội dung form.

✅ **Kiểm tra** — tạm thay trang tạm `LaptopListPage.jsx`:
```jsx
import { useState } from 'react';
import LaptopFilter from '../components/laptop/LaptopFilter';
const brands = [{ id: 1, name: 'Dell' }, { id: 3, name: 'Asus' }];
export default function LaptopListPage() {
  const [filters, setFilters] = useState({});
  return (
    <>
      <LaptopFilter brands={brands} categories={[]} filters={filters}
        onChange={(p) => setFilters((f) => ({ ...f, ...p }))} onReset={() => setFilters({})} />
      <pre>{JSON.stringify(filters)}</pre>
    </>
  );
}
```
Nhập giá từ 50.000.000 đến 10.000.000 → báo lỗi, nút "Áp dụng" bị khoá.

---

## #16 — Home page (B)

| 👤 B · 👀 C | Nhánh `feature/16-home-page` · Cần merge trước: #6, #13, #15 |
|---|---|

**Commit 1/3 `feat(home): load home sections with Promise.all`** · **2/3 `feat(home): add carousel, bestseller, new arrivals and brand buttons`** · **3/3 `perf(home): compare sequential and parallel loading time`**

📄 **`src/pages/HomePage.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { Badge, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import laptopApi from '../api/laptopApi';
import catalogApi from '../api/catalogApi';
import { isCancel } from '../api/axiosClient';
import useAxios from '../hooks/useAxios';
import usePageTitle from '../hooks/usePageTitle';
import LaptopGrid from '../components/laptop/LaptopGrid';
import ErrorAlert from '../components/common/ErrorAlert';

const NEWEST_PARAMS = { _sort: 'createdAt', _order: 'desc', _limit: 8 };
const BESTSELLER_PARAMS = { _sort: 'sold', _order: 'desc', _limit: 4 };

/** C1. Gọi SONG SONG 4 request bằng Promise.all – thiếu 1 phần thì trang chủ không đủ dữ liệu */
async function loadParallel(signal) {
  const start = performance.now();
  const [newest, bestsellers, brands, categories] = await Promise.all([
    laptopApi.getAll(NEWEST_PARAMS, signal),
    laptopApi.getAll(BESTSELLER_PARAMS, signal),
    catalogApi.getBrands(signal),
    catalogApi.getCategories(signal),
  ]);
  return {
    newest: newest.items,
    bestsellers: bestsellers.items,
    brands,
    categories,
    parallelMs: Math.round(performance.now() - start),
  };
}

/** C2. Cùng 4 request nhưng gọi TUẦN TỰ (4 dòng await) – chỉ để so sánh thời gian */
async function loadSequential(signal) {
  const start = performance.now();
  await laptopApi.getAll(NEWEST_PARAMS, signal);
  await laptopApi.getAll(BESTSELLER_PARAMS, signal);
  await catalogApi.getBrands(signal);
  await catalogApi.getCategories(signal);
  return Math.round(performance.now() - start);
}

const BANNERS = [
  {
    title: 'Laptop Gaming – Chiến mọi tựa game',
    text: 'RTX 40 series, màn hình 240Hz. Giảm đến 10%.',
    to: '/laptops?categoryId=2',
    bg: 'linear-gradient(135deg, #1a1a2e, #e94560)',
  },
  {
    title: 'Mỏng nhẹ – Mang theo mọi nơi',
    text: 'Dưới 1.4kg, pin cả ngày cho sinh viên và dân văn phòng.',
    to: '/laptops?categoryId=4',
    bg: 'linear-gradient(135deg, #0f4c75, #3282b8)',
  },
  {
    title: 'Máy trạm cho dân Đồ họa – Kỹ thuật',
    text: 'RAM đến 64GB, màn hình OLED chuẩn màu.',
    to: '/laptops?categoryId=3',
    bg: 'linear-gradient(135deg, #2d4059, #ea5455)',
  },
];

export default function HomePage() {
  usePageTitle('Trang chủ');
  const { data, loading, error, refetch } = useAxios(loadParallel, []);
  const [sequentialMs, setSequentialMs] = useState(null);

  // Chỉ ở DEV: sau khi tải song song xong, đo thêm cách gọi tuần tự để so sánh
  useEffect(() => {
    if (!import.meta.env.DEV || !data) return undefined;
    const controller = new AbortController();
    const measure = async () => {
      try {
        const ms = await loadSequential(controller.signal);
        setSequentialMs(ms);
      } catch (err) {
        if (!isCancel(err)) setSequentialMs(null);
      }
    };
    measure();
    return () => controller.abort();
  }, [data]);

  return (
    <>
      <Carousel className="mb-4 rounded overflow-hidden shadow-sm" interval={4000}>
        {BANNERS.map((banner) => (
          <Carousel.Item key={banner.title}>
            <div className="home-banner d-flex align-items-center" style={{ background: banner.bg }}>
              <div className="text-white px-4 px-md-5">
                <h2 className="fw-bold">{banner.title}</h2>
                <p className="lead">{banner.text}</p>
                <Button as={Link} to={banner.to} variant="warning">
                  Xem ngay
                </Button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {import.meta.env.DEV && data && (
        <div className="mb-3 text-end">
          <Badge bg="dark" className="fw-normal">
            Tuần tự: {sequentialMs ?? '...'}ms | Song song: {data.parallelMs}ms
          </Badge>
        </div>
      )}

      {error && <ErrorAlert message={error} onRetry={refetch} />}

      {!error && (
        <>
          <section className="mb-4">
            <h5 className="fw-bold mb-3">Mua theo hãng</h5>
            <div className="d-flex flex-wrap gap-2">
              {(data?.brands ?? []).map((brand) => (
                <Button key={brand.id} as={Link} to={`/laptops?brandId=${brand.id}`} variant="outline-dark">
                  {brand.name}
                </Button>
              ))}
              {(data?.categories ?? []).map((cat) => (
                <Button key={`c${cat.id}`} as={Link} to={`/laptops?categoryId=${cat.id}`} variant="outline-primary">
                  {cat.name}
                </Button>
              ))}
            </div>
          </section>

          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">🔥 Bán chạy</h4>
              <Link to="/laptops?sort=bestseller">Xem tất cả →</Link>
            </div>
            <LaptopGrid laptops={data?.bestsellers} loading={loading} skeletonCount={4} />
          </section>

          <section>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">🆕 Mới về</h4>
              <Link to="/laptops">Xem tất cả →</Link>
            </div>
            <LaptopGrid laptops={data?.newest} loading={loading} skeletonCount={8} />
          </section>
        </>
      )}
    </>
  );
}
```

✅ **Kiểm tra (kịch bản 1, 2):** skeleton → nội dung · badge DEV `Tuần tự: ~2000ms | Song song: ~500ms` · tab Network 4 request đầu thẳng hàng ở cột Waterfall · bấm "Asus" → `/laptops?brandId=3` · tắt json-server + F5 → ErrorAlert, bật lại bấm "Thử lại" có dữ liệu. **Ghi số đo vào mô tả PR** (dùng cho README #30).

---

## #17 — Laptop list (B)

| 👤 B · 👀 A | Nhánh `feature/17-laptop-list` · Cần merge trước: #6, #13, #15, #18 |
|---|---|

Nên chia 2 PR: **PR 1** (`Part of #17`) — commit 1–3; **PR 2** (`Closes #17`, nhánh `feature/17-laptop-list-sort`) — commit 4–6. Dưới đây là **file hoàn chỉnh sau PR 2**.

**PR 1:** `feat(list): read and write filters with useSearchParams` · `feat(list): map url filters to json-server params` · `feat(list): add pagination from total count`
**PR 2:** `feat(list): add sort options` · `feat(list): add debounced keyword search` · `feat(list): show filter in offcanvas on small screens`

📄 **`src/pages/LaptopListPage.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Offcanvas, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import laptopApi, { buildLaptopParams, PAGE_SIZE, SORT_OPTIONS } from '../api/laptopApi';
import catalogApi from '../api/catalogApi';
import useAxios from '../hooks/useAxios';
import useDebounce from '../hooks/useDebounce';
import usePageTitle from '../hooks/usePageTitle';
import LaptopFilter from '../components/laptop/LaptopFilter';
import LaptopGrid from '../components/laptop/LaptopGrid';
import AppPagination from '../components/common/AppPagination';
import ErrorAlert from '../components/common/ErrorAlert';

const FILTER_KEYS = ['brandId', 'categoryId', 'priceMin', 'priceMax', 'ramMin', 'sort', 'q', 'page'];

/**
 * F3. Toàn bộ trạng thái lọc nằm trên URL:
 * /laptops?brandId=3&categoryId=2&priceMin=...&priceMax=...&ramMin=16&sort=price_asc&q=rog&page=2
 * → F5 / gửi link / nút Back đều cho đúng kết quả.
 */
export default function LaptopListPage() {
  usePageTitle('Danh sách laptop');
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);

  // Đọc bộ lọc từ URL
  const filters = Object.fromEntries(FILTER_KEYS.map((key) => [key, searchParams.get(key) ?? '']));
  const page = Number(filters.page) || 1;
  const sort = SORT_OPTIONS[filters.sort] ? filters.sort : 'newest';

  /** Ghi URL. Đổi bộ lọc bất kỳ → quay về trang 1 */
  const updateParams = (patch, { resetPage = true } = {}) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) next.delete(key);
      else next.set(key, value);
    });
    if (resetPage) next.delete('page');
    setSearchParams(next);
    setShowFilter(false);
  };

  // Hãng + loại cho bộ lọc (song song)
  const catalog = useAxios(async (signal) => {
    const [brands, categories] = await Promise.all([catalogApi.getBrands(signal), catalogApi.getCategories(signal)]);
    return { brands, categories };
  }, []);

  // D1. Query string đổi → useAxios hủy request cũ, gọi request mới
  const queryString = searchParams.toString();
  const { data, loading, error, refetch } = useAxios(
    (signal) => laptopApi.getAll(buildLaptopParams({ ...filters, sort }), signal),
    [queryString]
  );
  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  // H2. Ô tìm kiếm trên trang: ngừng gõ 500ms mới đưa q lên URL
  const [keyword, setKeyword] = useState(filters.q);
  const debouncedKeyword = useDebounce(keyword.trim(), 500);

  // URL đổi từ nơi khác (ô tìm kiếm Navbar, nút Back) → đồng bộ ô nhập
  useEffect(() => {
    setKeyword(filters.q);
  }, [filters.q]);

  useEffect(() => {
    if (debouncedKeyword !== filters.q) updateParams({ q: debouncedKeyword });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  const filterProps = {
    brands: catalog.data?.brands,
    categories: catalog.data?.categories,
    filters,
    onChange: (patch) => updateParams(patch),
    onReset: () => {
      setKeyword('');
      setSearchParams({});
      setShowFilter(false);
    },
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h3 className="fw-bold mb-0">Laptop</h3>
        {data && <span className="text-secondary">Tìm thấy {data.total} laptop</span>}
      </div>

      <Row>
        {/* E3. Màn hình ≥ lg: bộ lọc ở cột trái */}
        <Col lg={3} className="d-none d-lg-block">
          <div className="bg-body-tertiary rounded p-3 sticky-lg-top filter-sticky">
            <LaptopFilter {...filterProps} idPrefix="side" />
          </div>
        </Col>

        <Col lg={9}>
          <Row className="g-2 mb-3">
            <Col xs={12} md>
              <InputGroup>
                <InputGroup.Text>🔍</InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Tìm theo tên, CPU, card đồ họa..."
                  aria-label="Tìm trong danh sách"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={6} md="auto">
              <Form.Select
                aria-label="Sắp xếp"
                value={sort}
                onChange={(e) => updateParams({ sort: e.target.value === 'newest' ? '' : e.target.value })}
              >
                {Object.entries(SORT_OPTIONS).map(([value, option]) => (
                  <option key={value} value={value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={6} md="auto" className="d-lg-none">
              <Button variant="outline-dark" className="w-100" onClick={() => setShowFilter(true)}>
                ⚙ Bộ lọc
              </Button>
            </Col>
          </Row>

          {error ? (
            <ErrorAlert message={error} onRetry={refetch} />
          ) : (
            <LaptopGrid laptops={data?.items} loading={loading} cols={{ xs: 1, sm: 2, md: 3 }} />
          )}

          {!loading && !error && (
            <AppPagination
              page={page}
              totalPages={totalPages}
              onChange={(p) => updateParams({ page: p === 1 ? '' : p }, { resetPage: false })}
            />
          )}
        </Col>
      </Row>

      {/* E3. Mobile: bộ lọc trong Offcanvas */}
      <Offcanvas show={showFilter} onHide={() => setShowFilter(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Bộ lọc</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <LaptopFilter {...filterProps} idPrefix="mobile" />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
```

✅ **Kiểm tra (kịch bản 2, 3, 4):** chọn RAM ≥ 16 + "Giá tăng dần" + trang 2 → URL `?ramMin=16&sort=price_asc&page=2`, F5 vẫn giữ · copy URL sang tab mới → giống hệt · Back → bộ lọc trước · Slow 3G bấm nhanh 4 hãng → 3 *(canceled)*, không Alert lỗi · 375px → nút "⚙ Bộ lọc" mở Offcanvas.

---

## #19 — Navbar search suggestions (A)

| 👤 A · 👀 C (+ B vì là file trong layout Navbar) | Nhánh `feature/19-search-suggest` · Cần merge trước: #13, #14 |
|---|---|

**Commit 1/2 `feat(search): fetch suggestions with debounce and cancel`** · **2/2 `feat(search): close suggestions on blur and escape`**

📄 **`src/components/layout/SearchSuggest.jsx`** — thay toàn bộ bản tạm của #14

```jsx
import { useEffect, useState } from 'react';
import { Button, Form, InputGroup, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import laptopApi from '../../api/laptopApi';
import { isCancel } from '../../api/axiosClient';
import useDebounce from '../../hooks/useDebounce';
import { formatPrice, getSellingPrice } from '../../utils/format';

/**
 * D3. Ô tìm kiếm gợi ý trên Navbar
 * - Ngừng gõ 400ms mới gọi GET /laptops?q=...&_limit=5
 * - Gõ tiếp → request đang chạy bị hủy (AbortController)
 */
export default function SearchSuggest({ onNavigate }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debouncedKeyword = useDebounce(keyword.trim(), 400);

  useEffect(() => {
    // Từ khoá rỗng → không gọi API
    if (!debouncedKeyword) {
      setSuggestions([]);
      return undefined;
    }

    const controller = new AbortController();
    const search = async () => {
      setLoading(true);
      try {
        const { items } = await laptopApi.getAll({ q: debouncedKeyword, _limit: 5 }, controller.signal);
        setSuggestions(items);
      } catch (err) {
        if (isCancel(err)) return;
        setSuggestions([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    search();
    return () => controller.abort();
  }, [debouncedKeyword]);

  const close = () => {
    setOpen(false);
    setKeyword('');
    setSuggestions([]);
    onNavigate?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = keyword.trim();
    if (!q) return;
    navigate(`/laptops?q=${encodeURIComponent(q)}`);
    close();
  };

  const goToDetail = (id) => {
    navigate(`/laptops/${id}`);
    close();
  };

  const showDropdown = open && keyword.trim() !== '';

  return (
    <Form className="position-relative my-2 my-lg-0" onSubmit={handleSubmit} role="search">
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Tìm laptop..."
          aria-label="Tìm laptop"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
        />
        <Button type="submit" variant="warning">
          Tìm
        </Button>
      </InputGroup>

      {showDropdown && (
        <ListGroup className="position-absolute w-100 shadow search-suggest-list">
          {loading && (
            <ListGroup.Item className="text-secondary small">
              <Spinner size="sm" className="me-2" />
              Đang tìm...
            </ListGroup.Item>
          )}
          {!loading && debouncedKeyword && suggestions.length === 0 && (
            <ListGroup.Item className="text-secondary small">Không có kết quả</ListGroup.Item>
          )}
          {!loading &&
            suggestions.map((laptop) => (
              <ListGroup.Item
                key={laptop.id}
                action
                // onMouseDown + preventDefault: chạy trước onBlur của ô input
                onMouseDown={(e) => {
                  e.preventDefault();
                  goToDetail(laptop.id);
                }}
                className="d-flex justify-content-between gap-2"
              >
                <span className="text-truncate">{laptop.name}</span>
                <span className="text-danger fw-semibold text-nowrap">{formatPrice(getSellingPrice(laptop))}</span>
              </ListGroup.Item>
            ))}
        </ListGroup>
      )}
    </Form>
  );
}
```

✅ **Kiểm tra (kịch bản 5):** gõ "rog" → sau 400ms hiện dropdown · gõ "macbook" thật nhanh → tab Network chỉ 1 request `q=macbook` · Esc / click ra ngoài → đóng · bấm gợi ý → trang chi tiết.

---

## #20 — Laptop detail (B)

| 👤 B · 👀 A | Nhánh `feature/20-laptop-detail` · Cần merge trước: #6, #13, #15 |
|---|---|

> Phiên bản này hiển thị đánh giá dạng danh sách đơn giản. #21 thay toàn bộ file để thêm `ReviewList` + `ReviewForm`. Nút "Thêm vào giỏ" dùng `useAddToCart` (bản tạm #15, C hoàn thiện ở #22).

**Commit 1/3 `feat(detail): load laptop then reviews and related with allSettled`** · **2/3 `feat(detail): add breadcrumb, specs table and tabs`** · **3/3 `fix(detail): share one abort signal across detail requests`**

📄 **`src/pages/LaptopDetailPage.jsx`**

```jsx
import { useState } from 'react';
import { Alert, Badge, Breadcrumb, Button, Col, Form, Image, InputGroup, ListGroup, Row, Spinner, Tab, Table, Tabs } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import laptopApi from '../api/laptopApi';
import reviewApi from '../api/reviewApi';
import { getErrorMessage } from '../api/axiosClient';
import useAxios from '../hooks/useAxios';
import useAddToCart from '../hooks/useAddToCart';
import usePageTitle from '../hooks/usePageTitle';
import Price from '../components/common/Price';
import StarRating from '../components/common/StarRating';
import Loading from '../components/common/Loading';
import ErrorAlert from '../components/common/ErrorAlert';
import LaptopGrid from '../components/laptop/LaptopGrid';
import NotFoundPage from './NotFoundPage';
import { formatDate } from '../utils/format';
import { handleImageError } from '../utils/image';

/**
 * C3 + D2. Tải trang chi tiết
 *  Bước 1: GET laptop (bắt buộc) – lỗi thì cả trang báo lỗi
 *  Bước 2: Promise.allSettled [đánh giá, laptop liên quan] – phần nào lỗi chỉ ảnh hưởng phần đó
 *  Cả 2 bước dùng CHUNG một signal → đổi id là hủy hết request của laptop cũ
 */
async function loadDetail(id, signal) {
  const laptop = await laptopApi.getById(id, signal);

  const [reviewsResult, relatedResult] = await Promise.allSettled([
    reviewApi.getByLaptop(id, signal),
    laptopApi.getRelated(laptop, signal),
  ]);

  return {
    laptop,
    reviews: reviewsResult.status === 'fulfilled' ? reviewsResult.value : [],
    reviewsError: reviewsResult.status === 'rejected' ? getErrorMessage(reviewsResult.reason) : null,
    related: relatedResult.status === 'fulfilled' ? relatedResult.value : [],
    relatedError: relatedResult.status === 'rejected' ? getErrorMessage(relatedResult.reason) : null,
  };
}

const storageLabel = (gb) => (gb >= 1024 ? `${gb / 1024} TB` : `${gb} GB`);

export default function LaptopDetailPage() {
  const { id } = useParams();

  // F7. /laptops/abc (id không phải số) → trang 404, không gọi API
  if (!/^\d+$/.test(id)) return <NotFoundPage />;

  // key={id}: đổi laptop → component mới, state (số lượng...) về mặc định
  return <LaptopDetail key={id} id={id} />;
}

function LaptopDetail({ id }) {
  const navigate = useNavigate();
  const { add, adding } = useAddToCart();
  const [quantity, setQuantity] = useState(1);

  const { data, loading, error, refetch } = useAxios((signal) => loadDetail(id, signal), [id]);
  const laptop = data?.laptop;
  usePageTitle(laptop?.name ?? 'Chi tiết laptop');

  if (loading) return <Loading text="Đang tải thông tin laptop..." />;
  if (error)
    return (
      <>
        <ErrorAlert message={error} onRetry={refetch} />
        <Button variant="link" onClick={() => navigate('/laptops')}>
          ← Về danh sách laptop
        </Button>
      </>
    );

  const outOfStock = laptop.stock <= 0;

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/laptops' }}>
          Laptop
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{laptop.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4 mb-4">
        <Col md={5}>
          <Image src={laptop.image} alt={laptop.name} fluid rounded className="border w-100" onError={handleImageError} />
        </Col>
        <Col md={7}>
          <h2 className="fw-bold">{laptop.name}</h2>
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            {laptop.brand && (
              <Badge as={Link} to={`/laptops?brandId=${laptop.brandId}`} bg="dark" className="text-decoration-none">
                {laptop.brand.name}
              </Badge>
            )}
            {laptop.category && (
              <Badge as={Link} to={`/laptops?categoryId=${laptop.categoryId}`} bg="primary" className="text-decoration-none">
                {laptop.category.name}
              </Badge>
            )}
            <StarRating value={laptop.rating} />
            <span className="text-secondary small">· Đã bán {laptop.sold}</span>
          </div>

          <div className="my-3">
            <Price laptop={laptop} size="lg" />
          </div>

          <p>{laptop.description}</p>

          <p className="mb-3">
            Tình trạng:{' '}
            {outOfStock ? <Badge bg="secondary">Hết hàng</Badge> : <Badge bg="success">Còn {laptop.stock} sản phẩm</Badge>}
          </p>

          <div className="d-flex flex-wrap gap-2 align-items-center">
            <InputGroup style={{ width: 140 }}>
              <Button
                variant="outline-secondary"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={outOfStock || quantity <= 1}
              >
                −
              </Button>
              <Form.Control value={quantity} readOnly className="text-center" aria-label="Số lượng" />
              <Button
                variant="outline-secondary"
                onClick={() => setQuantity((q) => Math.min(laptop.stock, q + 1))}
                disabled={outOfStock || quantity >= laptop.stock}
              >
                +
              </Button>
            </InputGroup>
            <Button size="lg" disabled={outOfStock || adding} onClick={() => add(laptop, quantity)}>
              {adding && <Spinner size="sm" className="me-2" />}
              🛒 Thêm vào giỏ
            </Button>
            <Button variant="outline-secondary" size="lg" onClick={() => navigate(-1)}>
              ← Quay lại
            </Button>
          </div>
        </Col>
      </Row>

      <Tabs defaultActiveKey="specs" className="mb-3" id="laptop-tabs">
        <Tab eventKey="specs" title="Thông số kỹ thuật">
          <Table striped bordered responsive>
            <tbody>
              <tr><th style={{ width: 200 }}>CPU</th><td>{laptop.cpu}</td></tr>
              <tr><th>RAM</th><td>{laptop.ram} GB</td></tr>
              <tr><th>Ổ cứng</th><td>SSD {storageLabel(laptop.storage)}</td></tr>
              <tr><th>Màn hình</th><td>{laptop.screen}</td></tr>
              <tr><th>Card đồ họa</th><td>{laptop.gpu}</td></tr>
              <tr><th>Cân nặng</th><td>{laptop.weight ? `${laptop.weight} kg` : '—'}</td></tr>
              <tr><th>Hãng</th><td>{laptop.brand?.name}</td></tr>
              <tr><th>Loại</th><td>{laptop.category?.name}</td></tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="reviews" title={`Đánh giá (${data.reviews.length})`}>
          {/* C3. Đánh giá lỗi → chỉ khu vực này báo, phần còn lại vẫn hiển thị */}
          {data.reviewsError ? (
            <Alert variant="warning">Không tải được đánh giá. {data.reviewsError}</Alert>
          ) : (
            <ListGroup variant="flush">
              {data.reviews.map((review) => (
                <ListGroup.Item key={review.id} className="px-0">
                  <strong>{review.userName ?? 'Khách hàng'}</strong>{' '}
                  <small className="text-secondary">{formatDate(review.createdAt)}</small>
                  <div><StarRating value={review.rating} showValue={false} /></div>
                  <p className="mb-0">{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Tab>
      </Tabs>

      <section className="mt-5">
        <h4 className="fw-bold mb-3">Laptop cùng loại</h4>
        {data.relatedError ? (
          <Alert variant="warning">Không tải được laptop liên quan.</Alert>
        ) : (
          <LaptopGrid laptops={data.related} loading={false} />
        )}
      </section>
    </>
  );
}
```

✅ **Kiểm tra (kịch bản 6, 19):** bấm 3 laptop liên quan liên tiếp → Breadcrumb/ảnh/thông số đổi đúng, request cũ *(canceled)* · tạm sửa `'/reviews'` thành `'/reviewsX'` trong `reviewApi.getByLaptop` → tab Đánh giá hiện cảnh báo vàng, phần còn lại vẫn hiện (**nhớ sửa lại**) · `/laptops/9999` → "Không tìm thấy dữ liệu" · `/laptops/abc` → 404.

---

## #21 — Review list & form (B)

| 👤 B · 👀 C | Nhánh `feature/21-reviews` · Cần merge trước: #20 |
|---|---|

**Commit 1/3 `feat(review): add review list`** · **2/3 `feat(review): add review form with validation`** · **3/3 `feat(review): allow one review per user per laptop`**

📄 **`src/components/laptop/ReviewList.jsx`**

```jsx
import { ListGroup } from 'react-bootstrap';
import StarRating from '../common/StarRating';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/format';

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <EmptyState icon="💬" message="Chưa có đánh giá nào. Hãy là người đầu tiên!" />;
  }

  return (
    <ListGroup variant="flush">
      {reviews.map((review) => (
        <ListGroup.Item key={review.id} className="px-0">
          <div className="d-flex justify-content-between flex-wrap">
            <strong>{review.userName ?? 'Khách hàng'}</strong>
            <small className="text-secondary">{formatDate(review.createdAt)}</small>
          </div>
          <StarRating value={review.rating} showValue={false} />
          <p className="mb-0 mt-1">{review.comment}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
```

📄 **`src/components/laptop/ReviewForm.jsx`**

```jsx
import { useState } from 'react';
import { Button, ButtonGroup, Card, Form, Spinner } from 'react-bootstrap';

/** G2 + BR-07. Form viết đánh giá: chọn 1–5 sao, nội dung ≥ 10 ký tự */
export default function ReviewForm({ onSubmit, submitting }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [touched, setTouched] = useState(false);

  const error = comment.trim().length < 10 ? 'Nội dung đánh giá phải có ít nhất 10 ký tự' : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (error) return;
    const ok = await onSubmit({ rating, comment: comment.trim() });
    if (ok) {
      setComment('');
      setRating(5);
      setTouched(false);
    }
  };

  return (
    <Card className="mb-3 bg-body-tertiary border-0">
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Label className="fw-semibold">Đánh giá của bạn</Form.Label>
          <div className="mb-2">
            <ButtonGroup aria-label="Chọn số sao">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant={star <= rating ? 'warning' : 'outline-warning'}
                  size="sm"
                  onClick={() => setRating(star)}
                  aria-label={`${star} sao`}
                >
                  ★
                </Button>
              ))}
            </ButtonGroup>
            <span className="ms-2 small text-secondary">{rating}/5</span>
          </div>
          <Form.Group controlId="review-comment">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onBlur={() => setTouched(true)}
              isInvalid={touched && Boolean(error)}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="mt-2" disabled={submitting}>
            {submitting && <Spinner size="sm" className="me-2" />}
            Gửi đánh giá
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
```

📄 **`src/pages/LaptopDetailPage.jsx`** — thay toàn bộ bản #20 (thêm `handleReview`, `ReviewList`, `ReviewForm`)

```jsx
import { useState } from 'react';
import { Alert, Badge, Breadcrumb, Button, Col, Form, Image, InputGroup, Row, Spinner, Tab, Table, Tabs } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import laptopApi from '../api/laptopApi';
import reviewApi from '../api/reviewApi';
import { getErrorMessage } from '../api/axiosClient';
import useAxios from '../hooks/useAxios';
import useAddToCart from '../hooks/useAddToCart';
import usePageTitle from '../hooks/usePageTitle';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Price from '../components/common/Price';
import StarRating from '../components/common/StarRating';
import Loading from '../components/common/Loading';
import ErrorAlert from '../components/common/ErrorAlert';
import LaptopGrid from '../components/laptop/LaptopGrid';
import ReviewList from '../components/laptop/ReviewList';
import ReviewForm from '../components/laptop/ReviewForm';
import NotFoundPage from './NotFoundPage';
import { handleImageError } from '../utils/image';

/**
 * C3 + D2. Tải trang chi tiết
 *  Bước 1: GET laptop (bắt buộc) – lỗi thì cả trang báo lỗi
 *  Bước 2: Promise.allSettled [đánh giá, laptop liên quan] – phần nào lỗi chỉ ảnh hưởng phần đó
 *  Cả 2 bước dùng CHUNG một signal → đổi id là hủy hết request của laptop cũ
 */
async function loadDetail(id, signal) {
  const laptop = await laptopApi.getById(id, signal);

  const [reviewsResult, relatedResult] = await Promise.allSettled([
    reviewApi.getByLaptop(id, signal),
    laptopApi.getRelated(laptop, signal),
  ]);

  return {
    laptop,
    reviews: reviewsResult.status === 'fulfilled' ? reviewsResult.value : [],
    reviewsError: reviewsResult.status === 'rejected' ? getErrorMessage(reviewsResult.reason) : null,
    related: relatedResult.status === 'fulfilled' ? relatedResult.value : [],
    relatedError: relatedResult.status === 'rejected' ? getErrorMessage(relatedResult.reason) : null,
  };
}

const storageLabel = (gb) => (gb >= 1024 ? `${gb / 1024} TB` : `${gb} GB`);

export default function LaptopDetailPage() {
  const { id } = useParams();

  // F7. /laptops/abc (id không phải số) → trang 404, không gọi API
  if (!/^\d+$/.test(id)) return <NotFoundPage />;

  // key={id}: đổi laptop → component mới, state (số lượng...) về mặc định
  return <LaptopDetail key={id} id={id} />;
}

function LaptopDetail({ id }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const { add, adding } = useAddToCart();
  const [quantity, setQuantity] = useState(1);
  const [submittingReview, setSubmittingReview] = useState(false);

  const { data, loading, error, refetch, setData } = useAxios((signal) => loadDetail(id, signal), [id]);
  const laptop = data?.laptop;
  usePageTitle(laptop?.name ?? 'Chi tiết laptop');

  /** G2 + BR-07. Gửi đánh giá – mỗi user chỉ đánh giá 1 lần / 1 laptop */
  const handleReview = async ({ rating, comment }) => {
    setSubmittingReview(true);
    try {
      const existing = await reviewApi.findByUser(laptop.id, user.id);
      if (existing) {
        showToast('Bạn đã đánh giá sản phẩm này rồi', 'warning');
        return false;
      }
      const review = await reviewApi.create({
        laptopId: laptop.id,
        userId: user.id,
        userName: user.fullName,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      });

      // Cập nhật điểm trung bình của laptop (PATCH 1 trường)
      const reviews = [review, ...data.reviews];
      const avg = Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
      await laptopApi.patch(laptop.id, { rating: avg });

      // Thêm vào ĐẦU danh sách bằng setData – không cần tải lại trang
      setData((prev) => ({ ...prev, reviews, laptop: { ...prev.laptop, rating: avg } }));
      showToast('Cảm ơn bạn đã đánh giá!');
      return true;
    } catch (err) {
      showToast(getErrorMessage(err), 'danger');
      return false;
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <Loading text="Đang tải thông tin laptop..." />;
  if (error)
    return (
      <>
        <ErrorAlert message={error} onRetry={refetch} />
        <Button variant="link" onClick={() => navigate('/laptops')}>
          ← Về danh sách laptop
        </Button>
      </>
    );

  const outOfStock = laptop.stock <= 0;
  const alreadyReviewed = user && data.reviews.some((r) => r.userId === user.id);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/laptops' }}>
          Laptop
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{laptop.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4 mb-4">
        <Col md={5}>
          <Image src={laptop.image} alt={laptop.name} fluid rounded className="border w-100" onError={handleImageError} />
        </Col>
        <Col md={7}>
          <h2 className="fw-bold">{laptop.name}</h2>
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            {laptop.brand && (
              <Badge as={Link} to={`/laptops?brandId=${laptop.brandId}`} bg="dark" className="text-decoration-none">
                {laptop.brand.name}
              </Badge>
            )}
            {laptop.category && (
              <Badge as={Link} to={`/laptops?categoryId=${laptop.categoryId}`} bg="primary" className="text-decoration-none">
                {laptop.category.name}
              </Badge>
            )}
            <StarRating value={laptop.rating} />
            <span className="text-secondary small">· Đã bán {laptop.sold}</span>
          </div>

          <div className="my-3">
            <Price laptop={laptop} size="lg" />
          </div>

          <p>{laptop.description}</p>

          <p className="mb-3">
            Tình trạng:{' '}
            {outOfStock ? <Badge bg="secondary">Hết hàng</Badge> : <Badge bg="success">Còn {laptop.stock} sản phẩm</Badge>}
          </p>

          <div className="d-flex flex-wrap gap-2 align-items-center">
            <InputGroup style={{ width: 140 }}>
              <Button
                variant="outline-secondary"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={outOfStock || quantity <= 1}
              >
                −
              </Button>
              <Form.Control value={quantity} readOnly className="text-center" aria-label="Số lượng" />
              <Button
                variant="outline-secondary"
                onClick={() => setQuantity((q) => Math.min(laptop.stock, q + 1))}
                disabled={outOfStock || quantity >= laptop.stock}
              >
                +
              </Button>
            </InputGroup>
            <Button size="lg" disabled={outOfStock || adding} onClick={() => add(laptop, quantity)}>
              {adding && <Spinner size="sm" className="me-2" />}
              🛒 Thêm vào giỏ
            </Button>
            <Button variant="outline-secondary" size="lg" onClick={() => navigate(-1)}>
              ← Quay lại
            </Button>
          </div>
        </Col>
      </Row>

      <Tabs defaultActiveKey="specs" className="mb-3" id="laptop-tabs">
        <Tab eventKey="specs" title="Thông số kỹ thuật">
          <Table striped bordered responsive>
            <tbody>
              <tr><th style={{ width: 200 }}>CPU</th><td>{laptop.cpu}</td></tr>
              <tr><th>RAM</th><td>{laptop.ram} GB</td></tr>
              <tr><th>Ổ cứng</th><td>SSD {storageLabel(laptop.storage)}</td></tr>
              <tr><th>Màn hình</th><td>{laptop.screen}</td></tr>
              <tr><th>Card đồ họa</th><td>{laptop.gpu}</td></tr>
              <tr><th>Cân nặng</th><td>{laptop.weight ? `${laptop.weight} kg` : '—'}</td></tr>
              <tr><th>Hãng</th><td>{laptop.brand?.name}</td></tr>
              <tr><th>Loại</th><td>{laptop.category?.name}</td></tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="reviews" title={`Đánh giá (${data.reviews.length})`}>
          {data.reviewsError ? (
            <Alert variant="warning">Không tải được đánh giá. {data.reviewsError}</Alert>
          ) : (
            <>
              {!user && (
                <Alert variant="light" className="border">
                  <Link to="/login" state={{ from: { pathname: `/laptops/${laptop.id}` } }}>
                    Đăng nhập
                  </Link>{' '}
                  để viết đánh giá.
                </Alert>
              )}
              {user && !alreadyReviewed && <ReviewForm onSubmit={handleReview} submitting={submittingReview} />}
              {alreadyReviewed && <Alert variant="success">Bạn đã đánh giá sản phẩm này.</Alert>}
              <ReviewList reviews={data.reviews} />
            </>
          )}
        </Tab>
      </Tabs>

      <section className="mt-5">
        <h4 className="fw-bold mb-3">Laptop cùng loại</h4>
        {data.relatedError ? (
          <Alert variant="warning">Không tải được laptop liên quan.</Alert>
        ) : (
          <LaptopGrid laptops={data.related} loading={false} />
        )}
      </section>
    </>
  );
}
```

✅ **Kiểm tra:** đăng nhập customer → mở laptop #8 (chưa đánh giá) → gõ 5 ký tự → lỗi "ít nhất 10 ký tự" · gửi hợp lệ → review hiện **đầu** danh sách ngay, form ẩn, có thông báo "Bạn đã đánh giá" · mở laptop #1 (đã đánh giá) → không có form · `npm run reset-db` trước khi commit.

---

# Sprint 3 — Cart, Order & Admin

## #22 — CartContext (C)

| 👤 C · 👀 A (+ B vì thay file tạm B tạo) | Nhánh `feature/22-cart-context` · Cần merge trước: #7, #8, #15 |
|---|---|

> Thay toàn bộ 2 bản tạm: `CartContext.jsx` (#14) và `useAddToCart.js` (#15). **Giữ nguyên tên trường** → Navbar, LaptopCard, trang chi tiết tự hoạt động, không ai phải sửa file của mình.

**Commit 1/3 — `feat(cart): load cart items after login`** · **2/3 — `feat(cart): add or increase item within stock`**

📄 **`src/contexts/CartContext.jsx`** — thay toàn bộ bản tạm của #14

```jsx
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import cartApi from '../api/cartApi';
import { getErrorMessage, isCancel } from '../api/axiosClient';
import { getSellingPrice } from '../utils/format';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

/** Bỏ các dòng có laptop đã bị xoá khỏi hệ thống (_expand trả về undefined) */
const validItems = (items) => items.filter((item) => item.laptop);

/**
 * G1. Giỏ hàng lưu thật trong json-server (/cartItems).
 * Mỗi item: { id, userId, laptopId, quantity, laptop }
 */
export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // id của user đã tải xong giỏ – tránh 1 lần render "giỏ rỗng" trước khi effect chạy
  const [loadedUserId, setLoadedUserId] = useState(null);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Bản mới nhất của items, dùng trong các hàm async và optimistic update
  const itemsRef = useRef(items);
  itemsRef.current = items;

  // Đăng nhập / đăng xuất → tải lại giỏ
  useEffect(() => {
    if (!user) {
      setItems([]);
      return undefined;
    }

    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await cartApi.getByUser(user.id, controller.signal);
        setItems(validItems(data));
      } catch (err) {
        if (isCancel(err)) return;
        setError(getErrorMessage(err));
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setLoadedUserId(user.id);
        }
      }
    };
    load();
    return () => controller.abort();
  }, [user, reloadKey]);

  /** Thêm vào giỏ: đã có → PATCH tăng số lượng; chưa có → POST. BR-02: không vượt stock */
  const addToCart = useCallback(
    async (laptop, quantity = 1) => {
      if (!user) throw { message: 'Vui lòng đăng nhập' };

      const existing = itemsRef.current.find((item) => item.laptopId === laptop.id);
      const newQuantity = (existing?.quantity ?? 0) + quantity;
      if (newQuantity > laptop.stock) {
        throw { message: `"${laptop.name}" chỉ còn ${laptop.stock} sản phẩm` };
      }

      if (existing) {
        const updated = await cartApi.updateQuantity(existing.id, newQuantity);
        setItems((list) =>
          list.map((item) => (item.id === existing.id ? { ...item, quantity: updated.quantity } : item))
        );
      } else {
        const created = await cartApi.add(user.id, laptop.id, quantity);
        // Response POST không có _expand → tự gắn laptop vào
        setItems((list) => [...list, { ...created, laptop }]);
      }
    },
    [user]
  );

  /** Đổi số lượng (PATCH). BR-02 */
  const updateQuantity = useCallback(async (item, quantity) => {
    if (quantity > item.laptop.stock) {
      throw { message: `"${item.laptop.name}" chỉ còn ${item.laptop.stock} sản phẩm` };
    }
    const updated = await cartApi.updateQuantity(item.id, quantity);
    setItems((list) => list.map((i) => (i.id === item.id ? { ...i, quantity: updated.quantity } : i)));
  }, []);

  /** H4. Optimistic update: xoá khỏi giao diện ngay, lỗi thì khôi phục đúng vị trí cũ */
  const removeItem = useCallback(async (item) => {
    const index = itemsRef.current.findIndex((i) => i.id === item.id); // 1. nhớ vị trí (bản sao)
    setItems((list) => list.filter((i) => i.id !== item.id)); // 2. cập nhật giao diện ngay

    try {
      await cartApi.remove(item.id); // 3. gọi API
    } catch (err) {
      // 4. lỗi → khôi phục
      setItems((list) => {
        if (list.some((i) => i.id === item.id)) return list;
        const restored = [...list];
        restored.splice(index < 0 ? restored.length : index, 0, item);
        return restored;
      });
      throw err;
    }
  }, []);

  /** Dùng sau khi đặt hàng: giỏ đã được xoá trên server */
  const clearLocal = useCallback(() => setItems([]), []);
  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const isLoading = loading || (Boolean(user) && loadedUserId !== user.id);

  const value = useMemo(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + getSellingPrice(item.laptop) * item.quantity, 0);
    return {
      items,
      totalQuantity,
      totalPrice,
      loading: isLoading,
      error,
      addToCart,
      updateQuantity,
      removeItem,
      clearLocal,
      reload,
    };
  }, [items, isLoading, error, addToCart, updateQuantity, removeItem, clearLocal, reload]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
```

**Commit 3/3 — `feat(cart): connect add to cart button`**

📄 **`src/hooks/useAddToCart.js`** — thay toàn bộ bản tạm của #15

```js
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { getErrorMessage } from '../api/axiosClient';

/**
 * Nút "Thêm vào giỏ" dùng chung (LaptopCard, trang chi tiết).
 * Chưa đăng nhập → chuyển /login, đăng nhập xong quay lại trang hiện tại (kịch bản 7).
 */
export default function useAddToCart() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [adding, setAdding] = useState(false);

  const add = async (laptop, quantity = 1) => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    setAdding(true);
    try {
      await addToCart(laptop, quantity);
      showToast(`Đã thêm "${laptop.name}" vào giỏ hàng`);
    } catch (err) {
      showToast(getErrorMessage(err), 'danger'); // ví dụ "... chỉ còn 3 sản phẩm"
    } finally {
      setAdding(false);
    }
  };

  return { add, adding };
}
```

✅ **Kiểm tra (kịch bản 7, 8, 9):** chưa đăng nhập bấm "Thêm vào giỏ" → `/login` → đăng nhập → quay lại đúng trang · thêm cùng laptop 2 lần → `db.json` 1 dòng `quantity: 2`, Badge Navbar = 2 · F5 → Badge giữ nguyên · laptop #13 (stock 2) thêm 3 lần → Toast đỏ "chỉ còn 2 sản phẩm" · `npm run reset-db`.

---

## #23 — Cart page (C)

| 👤 C · 👀 B | Nhánh `feature/23-cart-page` · Cần merge trước: #12, #22 |
|---|---|

**Commit 1/3 `feat(cart): add cart table with totals`** · **2/3 `feat(cart): update quantity with stock limit`** · **3/3 `feat(cart): optimistic delete with rollback`**

📄 **`src/pages/CartPage.jsx`**

```jsx
import { useState } from 'react';
import { Alert, Button, ButtonGroup, Card, Image, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { getErrorMessage } from '../api/axiosClient';
import usePageTitle from '../hooks/usePageTitle';
import { formatPrice, getSellingPrice } from '../utils/format';
import { handleImageError } from '../utils/image';
import Loading from '../components/common/Loading';
import ErrorAlert from '../components/common/ErrorAlert';
import EmptyState from '../components/common/EmptyState';
import ConfirmModal from '../components/common/ConfirmModal';

/** G1. Trang giỏ hàng – dữ liệu lưu thật trong /cartItems */
export default function CartPage() {
  usePageTitle('Giỏ hàng');
  const navigate = useNavigate();
  const { items, totalPrice, loading, error, updateQuantity, removeItem, reload } = useCart();
  const { showToast } = useToast();
  const [pendingId, setPendingId] = useState(null);
  const [itemToRemove, setItemToRemove] = useState(null);

  const changeQuantity = async (item, quantity) => {
    if (quantity < 1) {
      setItemToRemove(item); // BR-02: số lượng về 0 → hỏi xác nhận rồi xoá
      return;
    }
    setPendingId(item.id);
    try {
      await updateQuantity(item, quantity);
    } catch (err) {
      showToast(getErrorMessage(err), 'danger');
    } finally {
      setPendingId(null);
    }
  };

  /** H4. Optimistic: dòng biến mất ngay, lỗi thì CartContext khôi phục */
  const confirmRemove = async () => {
    const item = itemToRemove;
    setItemToRemove(null);
    try {
      await removeItem(item);
      showToast(`Đã xóa "${item.laptop.name}" khỏi giỏ hàng`, 'info');
    } catch {
      showToast('Xóa thất bại, đã khôi phục', 'danger');
    }
  };

  if (loading && items.length === 0) return <Loading text="Đang tải giỏ hàng..." />;
  if (error) return <ErrorAlert message={error} onRetry={reload} />;

  if (items.length === 0) {
    return (
      <EmptyState icon="🛒" message="Giỏ hàng của bạn đang trống">
        <Button as={Link} to="/laptops">
          Tiếp tục mua sắm
        </Button>
      </EmptyState>
    );
  }

  // Tồn kho đã giảm sau khi thêm vào giỏ (người khác mua) → chặn đặt hàng
  const invalidItems = items.filter((item) => item.quantity > item.laptop.stock);

  return (
    <>
      <h3 className="fw-bold mb-3">Giỏ hàng</h3>

      {invalidItems.length > 0 && (
        <Alert variant="warning">
          {invalidItems.map((item) => (
            <div key={item.id}>
              "{item.laptop.name}" chỉ còn {item.laptop.stock} sản phẩm, vui lòng giảm số lượng.
            </div>
          ))}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Table responsive hover className="mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Sản phẩm</th>
              <th className="text-end">Đơn giá</th>
              <th className="text-center">Số lượng</th>
              <th className="text-end">Thành tiền</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const price = getSellingPrice(item.laptop); // BR-03
              const busy = pendingId === item.id;
              return (
                <tr key={item.id}>
                  <td style={{ minWidth: 240 }}>
                    <div className="d-flex align-items-center gap-2">
                      <Image src={item.laptop.image} alt="" width={72} rounded className="border" onError={handleImageError} />
                      <Link to={`/laptops/${item.laptopId}`} className="text-decoration-none">
                        {item.laptop.name}
                      </Link>
                    </div>
                  </td>
                  <td className="text-end text-nowrap">{formatPrice(price)}</td>
                  <td className="text-center">
                    <ButtonGroup size="sm">
                      <Button
                        variant="outline-secondary"
                        disabled={busy}
                        onClick={() => changeQuantity(item, item.quantity - 1)}
                        aria-label="Giảm"
                      >
                        −
                      </Button>
                      <Button variant="light" disabled className="px-3 text-body">
                        {item.quantity}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        disabled={busy || item.quantity >= item.laptop.stock}
                        onClick={() => changeQuantity(item, item.quantity + 1)}
                        aria-label="Tăng"
                      >
                        +
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td className="text-end fw-semibold text-nowrap">{formatPrice(price * item.quantity)}</td>
                  <td className="text-end">
                    <Button variant="outline-danger" size="sm" onClick={() => setItemToRemove(item)}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Card.Footer className="d-flex flex-wrap justify-content-between align-items-center gap-2 bg-white">
          <Button as={Link} to="/laptops" variant="link">
            ← Tiếp tục mua sắm
          </Button>
          <div className="d-flex align-items-center gap-3">
            <span>
              Tổng cộng: <strong className="fs-4 text-danger">{formatPrice(totalPrice)}</strong>
            </span>
            <Button size="lg" disabled={invalidItems.length > 0} onClick={() => navigate('/checkout')}>
              Tiến hành đặt hàng
            </Button>
          </div>
        </Card.Footer>
      </Card>

      <ConfirmModal
        show={Boolean(itemToRemove)}
        title="Xóa khỏi giỏ hàng"
        message={itemToRemove && `Bạn có chắc muốn xóa "${itemToRemove.laptop.name}" khỏi giỏ hàng?`}
        confirmText="Xóa"
        onConfirm={confirmRemove}
        onCancel={() => setItemToRemove(null)}
      />
    </>
  );
}
```

✅ **Kiểm tra (kịch bản 8, 9, 17):** nút + bị khoá khi bằng tồn kho · bấm − khi số lượng = 1 → hỏi xác nhận · **tắt json-server**, bấm Xóa → dòng biến mất rồi xuất hiện lại + Toast "Xóa thất bại, đã khôi phục".

---

## #24 — Checkout (C)

| 👤 C · 👀 A | Nhánh `feature/24-checkout` · Cần merge trước: #23 |
|---|---|

**Commit 1/4** `feat(checkout): add customer form with validation` · **2/4** `feat(checkout): verify latest stock with Promise.all` · **3/4** `feat(checkout): create order then update stock and clear cart` · **4/4** `feat(checkout): redirect to orders with success message`

📄 **`src/pages/CheckoutPage.jsx`**

```jsx
import { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, ListGroup, Row, Spinner } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import laptopApi from '../api/laptopApi';
import orderApi from '../api/orderApi';
import cartApi from '../api/cartApi';
import { getErrorMessage } from '../api/axiosClient';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import usePageTitle from '../hooks/usePageTitle';
import { formatPrice, getSellingPrice } from '../utils/format';
import Loading from '../components/common/Loading';

/** BR-08 */
const validate = ({ fullName, phone, address }) => {
  const errors = {};
  if (fullName.trim().length < 2) errors.fullName = 'Vui lòng nhập họ tên';
  if (!/^0\d{9}$/.test(phone.trim())) errors.phone = 'Số điện thoại gồm 10 số và bắt đầu bằng 0';
  if (address.trim().length < 10) errors.address = 'Địa chỉ phải có ít nhất 10 ký tự';
  return errors;
};

export default function CheckoutPage() {
  usePageTitle('Thanh toán');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalPrice, loading, clearLocal } = useCart();
  const placedRef = useRef(false);

  const [form, setForm] = useState({ fullName: user.fullName ?? '', phone: '', address: '', note: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  const errors = validate(form);
  const showError = (field) => (touched[field] || submitted) && errors[field];

  if (loading && items.length === 0) return <Loading text="Đang tải giỏ hàng..." />;
  // BR-09: giỏ rỗng → không cho vào trang thanh toán
  if (!placedRef.current && items.length === 0) return <Navigate to="/cart" replace />;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  /** C4 + BR-04. Quy trình đặt hàng */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    setPlacing(true);
    setError(null);
    try {
      // Bước 1 – Kiểm tra tồn kho MỚI NHẤT bằng Promise.all:
      // thiếu thông tin của bất kỳ laptop nào thì không thể đặt hàng → dừng toàn bộ.
      const latest = await Promise.all(items.map((item) => laptopApi.getById(item.laptopId)));
      const shortageIndex = items.findIndex((item, i) => latest[i].stock < item.quantity);
      if (shortageIndex >= 0) {
        const lp = latest[shortageIndex];
        throw { message: `"${lp.name}" chỉ còn ${lp.stock} sản phẩm` };
      }

      // Bước 2 – Tạo đơn hàng (giá và tổng tiền tính lại theo dữ liệu mới nhất)
      const orderItems = items.map((item, i) => ({
        laptopId: item.laptopId,
        name: latest[i].name,
        price: getSellingPrice(latest[i]),
        quantity: item.quantity,
      }));
      const order = await orderApi.create({
        userId: user.id,
        items: orderItems,
        customer: {
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          note: form.note.trim(),
        },
        total: orderItems.reduce((sum, it) => sum + it.price * it.quantity, 0),
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      // Bước 3 – Trừ kho + làm rỗng giỏ bằng Promise.allSettled:
      // đơn đã tạo xong, một request phụ lỗi cũng không được làm hỏng kết quả đặt hàng.
      const results = await Promise.allSettled([
        ...items.map((item, i) =>
          laptopApi.patch(item.laptopId, {
            stock: latest[i].stock - item.quantity,
            sold: latest[i].sold + item.quantity,
          })
        ),
        ...items.map((item) => cartApi.remove(item.id)),
      ]);

      // Bước 4 – Có request thất bại: vẫn coi là thành công, chỉ ghi cảnh báo
      const failed = results.filter((r) => r.status === 'rejected');
      if (failed.length > 0) {
        console.warn('[Checkout] Một số request cập nhật kho/giỏ hàng thất bại:', failed.map((f) => f.reason));
      }

      // Bước 5 – Chuyển trang kèm thông báo
      placedRef.current = true;
      navigate('/orders', { state: { message: `Đặt hàng thành công! Mã đơn #${order.id}` } });
      clearLocal();
    } catch (err) {
      setError(getErrorMessage(err));
      setPlacing(false);
    }
  };

  return (
    <>
      <h3 className="fw-bold mb-3">Thanh toán</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm">
            <Card.Header className="fw-semibold">Thông tin nhận hàng</Card.Header>
            <Card.Body>
              <Form noValidate onSubmit={handleSubmit} id="checkout-form">
                <Form.Group className="mb-3" controlId="checkout-fullName">
                  <Form.Label>Họ tên *</Form.Label>
                  <Form.Control
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={Boolean(showError('fullName'))}
                  />
                  <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="checkout-phone">
                  <Form.Label>Số điện thoại *</Form.Label>
                  <Form.Control
                    name="phone"
                    type="tel"
                    placeholder="0901234567"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={Boolean(showError('phone'))}
                  />
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="checkout-address">
                  <Form.Label>Địa chỉ giao hàng *</Form.Label>
                  <Form.Control
                    name="address"
                    as="textarea"
                    rows={2}
                    value={form.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={Boolean(showError('address'))}
                  />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="checkout-note">
                  <Form.Label>Ghi chú</Form.Label>
                  <Form.Control name="note" as="textarea" rows={2} value={form.note} onChange={handleChange} />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm">
            <Card.Header className="fw-semibold">Đơn hàng ({items.length} sản phẩm)</Card.Header>
            <ListGroup variant="flush">
              {items.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between gap-2">
                  <span>
                    {item.laptop.name} <span className="text-secondary">× {item.quantity}</span>
                  </span>
                  <span className="text-nowrap">{formatPrice(getSellingPrice(item.laptop) * item.quantity)}</span>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="d-flex justify-content-between fw-bold">
                <span>Tổng cộng</span>
                <span className="text-danger fs-5">{formatPrice(totalPrice)}</span>
              </ListGroup.Item>
            </ListGroup>
            <Card.Body className="d-grid gap-2">
              <Button type="submit" form="checkout-form" size="lg" disabled={placing}>
                {placing && <Spinner size="sm" className="me-2" />}
                Đặt hàng
              </Button>
              <Button as={Link} to="/cart" variant="outline-secondary">
                ← Quay lại giỏ hàng
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
```

✅ **Kiểm tra (kịch bản 10):** SĐT `123` → lỗi · hợp lệ → chuyển `/orders` + Toast "Đặt hàng thành công! Mã đơn #1" · `db.json`: có đơn `pending`, `stock` giảm, `sold` tăng, `cartItems` của user rỗng · thử thiếu hàng: thêm laptop #8 vào giỏ, rồi đặt tồn kho của nó về 0 bằng Git Bash `curl -X PATCH http://localhost:3001/laptops/8 -H "Content-Type: application/json" -d '{"stock":0}'` → bấm Đặt hàng → "… chỉ còn 0 sản phẩm" · `npm run reset-db` rồi chạy lại `npm start`.

---

## #25 — My orders (C)

| 👤 C · 👀 B | Nhánh `feature/25-my-orders` · Cần merge trước: #13, #24 |
|---|---|

**Commit 1/3** `feat(order): add order status constants` · **2/3** `feat(order): list orders of current user` · **3/3** `feat(order): cancel pending order and restore stock`

📄 **`src/utils/orderStatus.js`** — dùng chung cho #25 và #28

```js
/** Trạng thái đơn hàng: nhãn + màu Badge */
export const ORDER_STATUS = {
  pending: { label: 'Chờ xác nhận', variant: 'warning' },
  confirmed: { label: 'Đã xác nhận', variant: 'info' },
  shipping: { label: 'Đang giao', variant: 'primary' },
  done: { label: 'Hoàn thành', variant: 'success' },
  cancelled: { label: 'Đã hủy', variant: 'secondary' },
};

/** BR-06: chỉ cho đổi trạng thái theo một chiều */
export const NEXT_STATUS = {
  pending: 'confirmed',
  confirmed: 'shipping',
  shipping: 'done',
};

export const getStatus = (status) => ORDER_STATUS[status] ?? { label: status, variant: 'secondary' };
```

📄 **`src/pages/OrderListPage.jsx`**

```jsx
import { useState } from 'react';
import { Badge, Button, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import orderApi from '../api/orderApi';
import laptopApi from '../api/laptopApi';
import { getErrorMessage } from '../api/axiosClient';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import useAxios from '../hooks/useAxios';
import usePageTitle from '../hooks/usePageTitle';
import { formatDateTime, formatPrice } from '../utils/format';
import { getStatus } from '../utils/orderStatus';
import Loading from '../components/common/Loading';
import ErrorAlert from '../components/common/ErrorAlert';
import EmptyState from '../components/common/EmptyState';
import ConfirmModal from '../components/common/ConfirmModal';

/** G4. Đơn hàng của khách (Toast "Đặt hàng thành công" do useFlashMessage ở MainLayout hiển thị) */
export default function OrderListPage() {
  usePageTitle('Đơn hàng của tôi');
  const { user } = useAuth();
  const { showToast } = useToast();
  const { data: orders, loading, error, refetch, setData } = useAxios(
    (signal) => orderApi.getByUser(user.id, signal),
    [user.id]
  );
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  /** BR-05. Hủy đơn: PATCH status + cộng lại tồn kho cho từng laptop (song song) */
  const confirmCancel = async () => {
    const order = orderToCancel;
    setCancelling(true);
    try {
      const updated = await orderApi.updateStatus(order.id, 'cancelled');

      const results = await Promise.allSettled(
        order.items.map(async (item) => {
          const laptop = await laptopApi.getById(item.laptopId); // lấy tồn kho mới nhất
          return laptopApi.patch(item.laptopId, {
            stock: laptop.stock + item.quantity,
            sold: Math.max(0, laptop.sold - item.quantity),
          });
        })
      );
      const failed = results.filter((r) => r.status === 'rejected');
      if (failed.length > 0) console.warn('[Order] Hoàn kho thất bại:', failed.map((f) => f.reason));

      setData((list) => list.map((o) => (o.id === order.id ? updated : o)));
      showToast(`Đã hủy đơn #${order.id}`, 'info');
    } catch (err) {
      showToast(getErrorMessage(err), 'danger');
    } finally {
      setCancelling(false);
      setOrderToCancel(null);
    }
  };

  if (loading) return <Loading text="Đang tải đơn hàng..." />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  return (
    <>
      <h3 className="fw-bold mb-3">Đơn hàng của tôi</h3>

      {orders.length === 0 ? (
        <EmptyState icon="📦" message="Bạn chưa có đơn hàng nào">
          <Button as={Link} to="/laptops">
            Mua sắm ngay
          </Button>
        </EmptyState>
      ) : (
        orders.map((order) => {
          const status = getStatus(order.status);
          return (
            <Card key={order.id} className="mb-3 shadow-sm">
              <Card.Header className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <span>
                  <strong>Đơn #{order.id}</strong>
                  <span className="text-secondary ms-2 small">{formatDateTime(order.createdAt)}</span>
                </span>
                <Badge bg={status.variant}>{status.label}</Badge>
              </Card.Header>
              <Table responsive className="mb-0 align-middle" size="sm">
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.laptopId}>
                      <td className="ps-3">
                        <Link to={`/laptops/${item.laptopId}`} className="text-decoration-none">
                          {item.name}
                        </Link>
                      </td>
                      <td className="text-end text-nowrap">
                        {formatPrice(item.price)} × {item.quantity}
                      </td>
                      <td className="text-end text-nowrap pe-3">{formatPrice(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Card.Footer className="d-flex flex-wrap justify-content-between align-items-center gap-2 bg-white">
                <small className="text-secondary">
                  {order.customer.fullName} · {order.customer.phone} · {order.customer.address}
                </small>
                <div className="d-flex align-items-center gap-3">
                  <span>
                    Tổng: <strong className="text-danger">{formatPrice(order.total)}</strong>
                  </span>
                  {order.status === 'pending' && (
                    <Button size="sm" variant="outline-danger" onClick={() => setOrderToCancel(order)}>
                      Hủy đơn
                    </Button>
                  )}
                </div>
              </Card.Footer>
            </Card>
          );
        })
      )}

      <ConfirmModal
        show={Boolean(orderToCancel)}
        title="Hủy đơn hàng"
        message={orderToCancel && `Bạn có chắc muốn hủy đơn #${orderToCancel.id}?`}
        confirmText="Hủy đơn"
        cancelText="Không"
        loading={cancelling}
        onConfirm={confirmCancel}
        onCancel={() => setOrderToCancel(null)}
      />
    </>
  );
}
```

✅ **Kiểm tra (kịch bản 11):** đặt hàng → Toast mã đơn, F5 không hiện lại · "Hủy đơn" → Modal → Badge "Đã hủy", nút biến mất · `db.json`: `status: "cancelled"`, `stock` cộng lại.

---

## #26 — Admin laptop table (A)

| 👤 A · 👀 C | Nhánh `feature/26-admin-laptops` · Cần merge trước: #6, #10, #13 |
|---|---|

> Cột checkbox + xoá hàng loạt thêm ở #29 (A thay toàn bộ file).

**Commit 1/3** `feat(admin): add laptop table with search and paging` · **2/3** `feat(admin): quick edit stock with PATCH` · **3/3** `feat(admin): optimistic delete with rollback`

📄 **`src/pages/admin/AdminLaptopPage.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { Button, Card, Form, Image, InputGroup, Spinner, Table } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import laptopApi from '../../api/laptopApi';
import { getErrorMessage } from '../../api/axiosClient';
import { useToast } from '../../contexts/ToastContext';
import useAxios from '../../hooks/useAxios';
import useDebounce from '../../hooks/useDebounce';
import usePageTitle from '../../hooks/usePageTitle';
import { formatPrice, getSellingPrice } from '../../utils/format';
import { handleImageError } from '../../utils/image';
import Loading from '../../components/common/Loading';
import ErrorAlert from '../../components/common/ErrorAlert';
import EmptyState from '../../components/common/EmptyState';
import ConfirmModal from '../../components/common/ConfirmModal';
import AppPagination from '../../components/common/AppPagination';

const ADMIN_PAGE_SIZE = 10;

/** G3 + H4. Quản trị laptop */
export default function AdminLaptopPage() {
  usePageTitle('Quản trị laptop');
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, loading, error, refetch, setData } = useAxios(
    (signal) =>
      laptopApi.getAll(
        { q: q || undefined, _page: page, _limit: ADMIN_PAGE_SIZE, _sort: 'id', _order: 'desc', _expand: 'brand' },
        signal
      ),
    [q, page]
  );
  const items = data?.items ?? [];
  const totalPages = data ? Math.ceil(data.total / ADMIN_PAGE_SIZE) : 0;

  const [toDelete, setToDelete] = useState(null);
  const [editingStock, setEditingStock] = useState(null); // { id, value }
  const [savingStock, setSavingStock] = useState(false);

  // H2. Tìm kiếm có debounce, lưu q lên URL
  const [keyword, setKeyword] = useState(q);
  const debouncedKeyword = useDebounce(keyword.trim(), 500);
  useEffect(() => {
    if (debouncedKeyword === q) return;
    const next = new URLSearchParams();
    if (debouncedKeyword) next.set('q', debouncedKeyword);
    setSearchParams(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  const goToPage = (p) => {
    const next = new URLSearchParams(searchParams);
    if (p <= 1) next.delete('page');
    else next.set('page', p);
    setSearchParams(next);
  };

  /** Xoá xong: trang hiện tại rỗng → lùi về trang trước, ngược lại tải lại để lấp chỗ trống */
  const afterDelete = (remainingOnPage) => {
    if (remainingOnPage === 0 && page > 1) goToPage(page - 1);
    else refetch();
  };

  /* ---------------- H4. Xoá 1 laptop – optimistic ---------------- */
  const deleteOne = async () => {
    const laptop = toDelete;
    setToDelete(null);

    const snapshot = data; // 1. lưu bản sao
    setData((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== laptop.id), total: prev.total - 1 })); // 2. xoá ngay

    try {
      await laptopApi.remove(laptop.id); // 3. gọi API
      showToast(`Đã xóa "${laptop.name}"`);
      afterDelete(snapshot.items.length - 1);
    } catch {
      setData(snapshot); // 4. lỗi → khôi phục
      showToast('Xóa thất bại, đã khôi phục', 'danger');
    }
  };

  /* ---------------- G3. Sửa nhanh tồn kho – PATCH { stock } ---------------- */
  const saveStock = async () => {
    const { id, value } = editingStock;
    const stock = Number(value);
    if (value === '' || !Number.isInteger(stock) || stock < 0) {
      showToast('Tồn kho phải là số nguyên ≥ 0', 'warning');
      return;
    }
    setSavingStock(true);
    try {
      const updated = await laptopApi.patch(id, { stock });
      setData((prev) => ({
        ...prev,
        items: prev.items.map((i) => (i.id === id ? { ...i, stock: updated.stock } : i)),
      }));
      showToast(`Đã cập nhật tồn kho "${updated.name}": ${updated.stock}`);
      setEditingStock(null);
    } catch (err) {
      showToast(getErrorMessage(err), 'danger');
    } finally {
      setSavingStock(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h3 className="fw-bold mb-0">Quản lý laptop</h3>
        <Button as={Link} to="/admin/laptops/new">
          + Thêm laptop
        </Button>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <InputGroup style={{ maxWidth: 400 }}>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="search"
            placeholder="Tìm laptop..."
            aria-label="Tìm laptop"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </InputGroup>
        {loading && data && <Spinner size="sm" className="align-self-center" />}
      </div>

      {error && <ErrorAlert message={error} onRetry={refetch} />}
      {loading && !data && <Loading />}

      {data && !error && (
        <Card className="shadow-sm">
          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <Table hover responsive className="mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Ảnh</th>
                  <th>Tên</th>
                  <th>Hãng</th>
                  <th className="text-end">Giá bán</th>
                  <th className="text-center">Tồn kho</th>
                  <th className="text-end">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {items.map((laptop) => (
                  <tr key={laptop.id}>
                    <td>{laptop.id}</td>
                    <td>
                      <Image src={laptop.image} alt="" width={64} rounded className="border" onError={handleImageError} />
                    </td>
                    <td style={{ minWidth: 200 }}>
                      <Link to={`/laptops/${laptop.id}`} className="text-decoration-none">
                        {laptop.name}
                      </Link>
                    </td>
                    <td>{laptop.brand?.name}</td>
                    <td className="text-end text-nowrap">{formatPrice(getSellingPrice(laptop))}</td>
                    <td className="text-center" style={{ width: 130 }}>
                      {editingStock?.id === laptop.id ? (
                        <Form.Control
                          size="sm"
                          type="number"
                          min={0}
                          autoFocus
                          aria-label="Tồn kho mới"
                          value={editingStock.value}
                          disabled={savingStock}
                          onChange={(e) => setEditingStock({ id: laptop.id, value: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveStock();
                            if (e.key === 'Escape') setEditingStock(null);
                          }}
                          onBlur={() => !savingStock && setEditingStock(null)}
                        />
                      ) : (
                        <Button
                          variant="link"
                          size="sm"
                          title="Bấm để sửa nhanh, Enter để lưu"
                          className={`fw-semibold text-decoration-none ${laptop.stock < 5 ? 'text-danger' : 'text-body'}`}
                          onClick={() => setEditingStock({ id: laptop.id, value: String(laptop.stock) })}
                        >
                          {laptop.stock} ✎
                        </Button>
                      )}
                    </td>
                    <td className="text-end text-nowrap">
                      <Button as={Link} to={`/admin/laptops/${laptop.id}/edit`} size="sm" variant="outline-primary" className="me-2">
                        Sửa
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => setToDelete(laptop)}>
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      )}

      <AppPagination page={page} totalPages={totalPages} onChange={goToPage} />

      <ConfirmModal
        show={Boolean(toDelete)}
        title="Xóa laptop"
        message={toDelete && `Bạn có chắc muốn xóa "${toDelete.name}"?`}
        confirmText="Xóa"
        onConfirm={deleteOne}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
```

✅ **Kiểm tra (kịch bản 15):** bấm ô tồn kho → nhập 7 → Enter → tab Network: **PATCH** `/laptops/:id` body chỉ `{"stock":7}` · Esc huỷ · tồn kho < 5 màu đỏ · tắt json-server rồi Xóa → dòng biến mất rồi hiện lại + Toast lỗi · tìm "dell" → URL `?q=dell`.

---

## #27 — Admin laptop form (C)

| 👤 C · 👀 A | Nhánh `feature/27-admin-laptop-form` · Cần merge trước: #6, #10, #13 |
|---|---|

**Commit 1/3** `feat(admin): add laptop form with validation rules` · **2/3** `feat(admin): create laptop with default fields` · **3/3** `feat(admin): edit laptop with full PUT payload`

📄 **`src/components/laptop/LaptopForm.jsx`**

```jsx
import { useState } from 'react';
import { Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import { handleImageError } from '../../utils/image';

export const RAM_CHOICES = [4, 8, 16, 32, 64];
export const STORAGE_CHOICES = [256, 512, 1024, 2048];

export const EMPTY_LAPTOP = {
  name: '',
  brandId: '',
  categoryId: '',
  price: '',
  salePrice: '',
  cpu: '',
  ram: '',
  storage: '',
  screen: '',
  gpu: '',
  weight: '',
  stock: '',
  image: '',
  description: '',
};

/** Laptop từ API → giá trị form (mọi trường là chuỗi) */
export const toFormValues = (laptop) =>
  Object.fromEntries(
    Object.keys(EMPTY_LAPTOP).map((key) => [
      key,
      laptop[key] === null || laptop[key] === undefined ? '' : String(laptop[key]),
    ])
  );

/** Giá trị form → dữ liệu gửi API: ô <input type="number"> luôn trả chuỗi nên phải đổi sang Number */
export const toPayload = (values) => ({
  name: values.name.trim(),
  brandId: Number(values.brandId),
  categoryId: Number(values.categoryId),
  price: Number(values.price),
  salePrice: values.salePrice === '' ? null : Number(values.salePrice),
  cpu: values.cpu.trim(),
  ram: Number(values.ram),
  storage: Number(values.storage),
  screen: values.screen.trim(),
  gpu: values.gpu.trim(),
  weight: values.weight === '' ? null : Number(values.weight),
  stock: Number(values.stock),
  image: values.image.trim(),
  description: values.description.trim(),
});

const isPositiveInt = (v) => v !== '' && Number.isInteger(Number(v)) && Number(v) > 0;

/** G3 + BR-10. Quy tắc kiểm tra form */
export function validateLaptop(values) {
  const errors = {};
  const name = values.name.trim();

  if (!name) errors.name = 'Vui lòng nhập tên laptop';
  else if (name.length < 5 || name.length > 100) errors.name = 'Tên phải từ 5 đến 100 ký tự';

  if (!values.brandId) errors.brandId = 'Vui lòng chọn hãng';
  if (!values.categoryId) errors.categoryId = 'Vui lòng chọn loại';

  if (!isPositiveInt(values.price)) errors.price = 'Giá phải là số nguyên lớn hơn 0';

  // BR-03: để trống hoặc 0 < salePrice < price
  if (values.salePrice !== '') {
    if (!isPositiveInt(values.salePrice)) errors.salePrice = 'Giá khuyến mãi phải là số nguyên lớn hơn 0';
    else if (!errors.price && Number(values.salePrice) >= Number(values.price))
      errors.salePrice = 'Giá khuyến mãi phải nhỏ hơn giá gốc';
  }

  if (!RAM_CHOICES.includes(Number(values.ram))) errors.ram = 'Vui lòng chọn dung lượng RAM';
  if (!STORAGE_CHOICES.includes(Number(values.storage))) errors.storage = 'Vui lòng chọn dung lượng ổ cứng';

  if (values.stock === '' || !Number.isInteger(Number(values.stock)) || Number(values.stock) < 0)
    errors.stock = 'Tồn kho phải là số nguyên ≥ 0';

  if (values.weight !== '' && !(Number(values.weight) > 0)) errors.weight = 'Cân nặng phải lớn hơn 0';

  if (!values.image.trim()) errors.image = 'Vui lòng nhập link ảnh';
  else if (!values.image.trim().startsWith('http')) errors.image = 'Link ảnh phải bắt đầu bằng http';

  ['cpu', 'screen', 'gpu', 'description'].forEach((field) => {
    if (!values[field].trim()) errors[field] = 'Trường này là bắt buộc';
  });

  return errors;
}

/**
 * Form dùng chung cho thêm (POST) và sửa (PUT).
 * E5: lỗi chỉ hiện sau khi người dùng đã chạm vào ô hoặc đã bấm submit.
 */
export default function LaptopForm({ initialValues = EMPTY_LAPTOP, brands, categories, onSubmit, submitting, submitText }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validateLaptop(values);
  const showError = (field) => (touched[field] || submitted) && errors[field];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return; // kịch bản 13: còn lỗi → không gửi request
    onSubmit(toPayload(values));
  };

  /** Ô nhập có kiểm tra lỗi */
  const field = (name, label, props = {}) => (
    <Form.Group className="mb-3" controlId={`laptop-${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        isInvalid={Boolean(showError(name))}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  );

  const select = (name, label, options, placeholder) => (
    <Form.Group className="mb-3" controlId={`laptop-${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        isInvalid={Boolean(showError(name))}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  );

  const imageOk = values.image.trim().startsWith('http');

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        <Col lg={8}>
          {field('name', 'Tên laptop *', { placeholder: 'Ví dụ: Dell XPS 13 9340' })}
          <Row>
            <Col md={6}>
              {select('brandId', 'Hãng *', brands.map((b) => ({ value: b.id, label: b.name })), '-- Chọn hãng --')}
            </Col>
            <Col md={6}>
              {select('categoryId', 'Loại *', categories.map((c) => ({ value: c.id, label: c.name })), '-- Chọn loại --')}
            </Col>
          </Row>
          <Row>
            <Col md={4}>{field('price', 'Giá gốc (VND) *', { type: 'number', min: 1, step: 1000 })}</Col>
            <Col md={4}>
              {field('salePrice', 'Giá khuyến mãi (VND)', {
                type: 'number',
                min: 1,
                step: 1000,
                placeholder: 'Để trống nếu không giảm',
              })}
            </Col>
            <Col md={4}>{field('stock', 'Tồn kho *', { type: 'number', min: 0, step: 1 })}</Col>
          </Row>
          <Row>
            <Col md={6}>{field('cpu', 'CPU *', { placeholder: 'Intel Core i7-13700H' })}</Col>
            <Col md={6}>{field('gpu', 'Card đồ họa *', { placeholder: 'NVIDIA RTX 4060 8GB' })}</Col>
          </Row>
          <Row>
            <Col md={4}>
              {select('ram', 'RAM *', RAM_CHOICES.map((r) => ({ value: r, label: `${r} GB` })), '-- RAM --')}
            </Col>
            <Col md={4}>
              {select(
                'storage',
                'Ổ cứng SSD *',
                STORAGE_CHOICES.map((s) => ({ value: s, label: s >= 1024 ? `${s / 1024} TB` : `${s} GB` })),
                '-- SSD --'
              )}
            </Col>
            <Col md={4}>{field('weight', 'Cân nặng (kg)', { type: 'number', min: 0, step: 0.01 })}</Col>
          </Row>
          {field('screen', 'Màn hình *', { placeholder: '14 inch 2.8K OLED 120Hz' })}
          {field('description', 'Mô tả *', { as: 'textarea', rows: 3 })}
        </Col>

        <Col lg={4}>
          {field('image', 'Link ảnh *', { placeholder: 'https://...' })}
          <div className="border rounded p-2 text-center bg-body-tertiary">
            {imageOk ? (
              <Image src={values.image} alt="Xem trước" fluid rounded onError={handleImageError} />
            ) : (
              <div className="py-5 text-secondary small">Ảnh xem trước</div>
            )}
          </div>
        </Col>
      </Row>

      <div className="d-flex gap-2 mt-2">
        <Button type="submit" disabled={submitting}>
          {submitting && <Spinner size="sm" className="me-2" />}
          {submitText}
        </Button>
      </div>
    </Form>
  );
}
```

📄 **`src/pages/admin/AdminLaptopFormPage.jsx`**

```jsx
import { useState } from 'react';
import { Alert, Breadcrumb, Card } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import laptopApi from '../../api/laptopApi';
import catalogApi from '../../api/catalogApi';
import { getErrorMessage } from '../../api/axiosClient';
import useAxios from '../../hooks/useAxios';
import usePageTitle from '../../hooks/usePageTitle';
import LaptopForm, { EMPTY_LAPTOP, toFormValues } from '../../components/laptop/LaptopForm';
import Loading from '../../components/common/Loading';
import ErrorAlert from '../../components/common/ErrorAlert';
import NotFoundPage from '../NotFoundPage';

/**
 * F4. Trang dùng chung cho thêm và sửa:
 *   /admin/laptops/new      → không có id → POST
 *   /admin/laptops/:id/edit → có id       → GET rồi PUT
 */
export default function AdminLaptopFormPage() {
  const { id } = useParams();
  if (id !== undefined && !/^\d+$/.test(id)) return <NotFoundPage />;
  // key: chuyển từ "sửa" sang "thêm mới" → form được tạo lại với giá trị trống
  return <LaptopFormScreen key={id ?? 'new'} id={id} />;
}

function LaptopFormScreen({ id }) {
  const isEdit = id !== undefined;
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Tải song song: hãng, loại và (nếu sửa) laptop hiện tại
  const { data, loading, error, refetch } = useAxios(
    async (signal) => {
      const [brands, categories, laptop] = await Promise.all([
        catalogApi.getBrands(signal),
        catalogApi.getCategories(signal),
        isEdit ? laptopApi.getById(id, signal) : Promise.resolve(null),
      ]);
      return { brands, categories, laptop };
    },
    [id]
  );

  usePageTitle(isEdit ? `Sửa ${data?.laptop?.name ?? 'laptop'}` : 'Thêm laptop');

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      let saved;
      if (isEdit) {
        // PUT gửi ĐẦY ĐỦ object: giữ nguyên sold, rating, createdAt cũ.
        // Bỏ brand, category (do _expand thêm vào) – không phải dữ liệu của laptop.
        // eslint-disable-next-line no-unused-vars
        const { brand, category, ...original } = data.laptop;
        saved = await laptopApi.update(id, { ...original, ...payload, id: original.id });
      } else {
        saved = await laptopApi.create({
          ...payload,
          sold: 0,
          rating: 0,
          createdAt: new Date().toISOString(),
        });
      }
      // F5. Trang đích (AdminLayout → useFlashMessage) hiện Toast
      navigate('/admin/laptops', { state: { message: `Đã lưu "${saved.name}"` } });
    } catch (err) {
      setSubmitError(getErrorMessage(err));
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/admin/laptops' }}>
          Quản lý laptop
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{isEdit ? `Sửa #${id}` : 'Thêm mới'}</Breadcrumb.Item>
      </Breadcrumb>

      <h3 className="fw-bold mb-3">{isEdit ? `Sửa: ${data.laptop.name}` : 'Thêm laptop mới'}</h3>
      {submitError && <Alert variant="danger">{submitError}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <LaptopForm
            initialValues={isEdit ? toFormValues(data.laptop) : EMPTY_LAPTOP}
            brands={data.brands}
            categories={data.categories}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitText={isEdit ? 'Cập nhật (PUT)' : 'Thêm laptop (POST)'}
          />
        </Card.Body>
      </Card>
    </>
  );
}
```

✅ **Kiểm tra (kịch bản 13, 14):** giá gốc 20.000.000, giá sale 25.000.000 → lỗi, tab Network **không** có request · thêm hợp lệ → về `/admin/laptops` + Toast "Đã lưu ..." · laptop mới xuất hiện ở `/laptops` · sửa laptop #1 → `db.json` giữ nguyên `sold: 120`, `rating`, `createdAt` · `/admin/laptops/abc/edit` → 404.

---

## #28 — Admin orders (C)

| 👤 C · 👀 B | Nhánh `feature/28-admin-orders` · Cần merge trước: #7, #10, #13, #25 (`orderStatus.js`) |
|---|---|

**Commit 1/2** `feat(admin): list orders filtered by status` · **2/2** `feat(admin): change order status in one direction`

📄 **`src/pages/admin/AdminOrderPage.jsx`**

```jsx
import { useState } from 'react';
import { Badge, Button, ButtonGroup, Card, Form, Table } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import orderApi from '../../api/orderApi';
import { getErrorMessage } from '../../api/axiosClient';
import { useToast } from '../../contexts/ToastContext';
import useAxios from '../../hooks/useAxios';
import usePageTitle from '../../hooks/usePageTitle';
import { formatDateTime, formatPrice } from '../../utils/format';
import { getStatus, NEXT_STATUS, ORDER_STATUS } from '../../utils/orderStatus';
import Loading from '../../components/common/Loading';
import ErrorAlert from '../../components/common/ErrorAlert';
import EmptyState from '../../components/common/EmptyState';

/** G4. Quản lý đơn hàng (admin) */
export default function AdminOrderPage() {
  usePageTitle('Quản lý đơn hàng');
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') ?? ''; // lọc đồng bộ trên URL ?status=
  const [updatingId, setUpdatingId] = useState(null);

  const { data: orders, loading, error, refetch, setData } = useAxios(
    (signal) => orderApi.getAll(status ? { status } : {}, signal),
    [status]
  );

  const changeStatus = async (order, newStatus) => {
    setUpdatingId(order.id);
    try {
      const updated = await orderApi.updateStatus(order.id, newStatus); // PATCH { status }
      setData((list) =>
        list
          .map((o) => (o.id === order.id ? updated : o))
          // đang lọc theo trạng thái cũ → đơn không còn thuộc nhóm này
          .filter((o) => !status || o.status === status)
      );
      showToast(`Đơn #${order.id}: ${ORDER_STATUS[newStatus].label}`);
    } catch (err) {
      showToast(getErrorMessage(err), 'danger');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <h3 className="fw-bold mb-3">Quản lý đơn hàng</h3>

      <ButtonGroup className="mb-3 flex-wrap">
        <Button variant={status === '' ? 'dark' : 'outline-dark'} onClick={() => setSearchParams({})}>
          Tất cả
        </Button>
        {Object.entries(ORDER_STATUS).map(([key, s]) => (
          <Button
            key={key}
            variant={status === key ? 'dark' : 'outline-dark'}
            onClick={() => setSearchParams({ status: key })}
          >
            {s.label}
          </Button>
        ))}
      </ButtonGroup>

      {loading && <Loading />}
      {error && <ErrorAlert message={error} onRetry={refetch} />}

      {!loading && !error && (
        <Card className="shadow-sm">
          {orders.length === 0 ? (
            <EmptyState icon="📦" message="Không có đơn hàng nào" />
          ) : (
            <Table hover responsive className="mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Mã</th>
                  <th>Khách hàng</th>
                  <th>Ngày đặt</th>
                  <th>Sản phẩm</th>
                  <th className="text-end">Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th style={{ width: 180 }}>Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const current = getStatus(order.status);
                  const next = NEXT_STATUS[order.status]; // BR-06
                  return (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>
                        <div>{order.customer.fullName}</div>
                        <small className="text-secondary">{order.customer.phone}</small>
                      </td>
                      <td className="text-nowrap">{formatDateTime(order.createdAt)}</td>
                      <td style={{ minWidth: 200 }}>
                        {order.items.map((it) => (
                          <div key={it.laptopId} className="small">
                            {it.name} × {it.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="text-end text-nowrap fw-semibold">{formatPrice(order.total)}</td>
                      <td>
                        <Badge bg={current.variant}>{current.label}</Badge>
                      </td>
                      <td>
                        {/* Chỉ hiện trạng thái kế tiếp hợp lệ; done / cancelled bị khoá */}
                        <Form.Select
                          size="sm"
                          aria-label={`Trạng thái đơn ${order.id}`}
                          value={order.status}
                          disabled={!next || updatingId === order.id}
                          onChange={(e) => changeStatus(order, e.target.value)}
                        >
                          <option value={order.status}>{current.label}</option>
                          {next && <option value={next}>→ {ORDER_STATUS[next].label}</option>}
                        </Form.Select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card>
      )}
    </>
  );
}
```

✅ **Kiểm tra:** đặt 1 đơn bằng tài khoản khách → admin đổi `Chờ xác nhận → Đã xác nhận → Đang giao → Hoàn thành` · đơn "Hoàn thành" / "Đã hủy" không đổi được · bấm tab "Đang giao" → URL `?status=shipping` · tab Network: PATCH chỉ có `{ "status": ... }`.

---

## #29 — Bulk delete (A)

| 👤 A · 👀 B | Nhánh `feature/29-bulk-delete` · Cần merge trước: #26 |
|---|---|

**Commit 1/2** `feat(admin): select rows and select all on current page` · **2/2** `feat(admin): bulk delete with Promise.allSettled`

📄 **`src/pages/admin/AdminLaptopPage.jsx`** — thay toàn bộ bản #26 (thêm cột checkbox + xoá hàng loạt)

```jsx
import { useEffect, useState } from 'react';
import { Button, Card, Form, Image, InputGroup, Spinner, Table } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import laptopApi from '../../api/laptopApi';
import { getErrorMessage } from '../../api/axiosClient';
import { useToast } from '../../contexts/ToastContext';
import useAxios from '../../hooks/useAxios';
import useDebounce from '../../hooks/useDebounce';
import usePageTitle from '../../hooks/usePageTitle';
import { formatPrice, getSellingPrice } from '../../utils/format';
import { handleImageError } from '../../utils/image';
import Loading from '../../components/common/Loading';
import ErrorAlert from '../../components/common/ErrorAlert';
import EmptyState from '../../components/common/EmptyState';
import ConfirmModal from '../../components/common/ConfirmModal';
import AppPagination from '../../components/common/AppPagination';

const ADMIN_PAGE_SIZE = 10;

/** G3 + H3 + H4. Quản trị laptop */
export default function AdminLaptopPage() {
  usePageTitle('Quản trị laptop');
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, loading, error, refetch, setData } = useAxios(
    (signal) =>
      laptopApi.getAll(
        { q: q || undefined, _page: page, _limit: ADMIN_PAGE_SIZE, _sort: 'id', _order: 'desc', _expand: 'brand' },
        signal
      ),
    [q, page]
  );
  const items = data?.items ?? [];
  const totalPages = data ? Math.ceil(data.total / ADMIN_PAGE_SIZE) : 0;

  const [selected, setSelected] = useState(() => new Set());
  const [toDelete, setToDelete] = useState(null);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [editingStock, setEditingStock] = useState(null); // { id, value }
  const [savingStock, setSavingStock] = useState(false);

  // H2. Tìm kiếm có debounce, lưu q lên URL
  const [keyword, setKeyword] = useState(q);
  const debouncedKeyword = useDebounce(keyword.trim(), 500);
  useEffect(() => {
    if (debouncedKeyword === q) return;
    const next = new URLSearchParams();
    if (debouncedKeyword) next.set('q', debouncedKeyword);
    setSearchParams(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  // Đổi trang / từ khoá → bỏ chọn
  useEffect(() => {
    setSelected(new Set());
  }, [q, page]);

  const goToPage = (p) => {
    const next = new URLSearchParams(searchParams);
    if (p <= 1) next.delete('page');
    else next.set('page', p);
    setSearchParams(next);
  };

  /** Xoá xong: trang hiện tại rỗng → lùi về trang trước, ngược lại tải lại để lấp chỗ trống */
  const afterDelete = (remainingOnPage) => {
    if (remainingOnPage === 0 && page > 1) goToPage(page - 1);
    else refetch();
  };

  /* ---------------- Chọn nhiều ---------------- */
  const allChecked = items.length > 0 && items.every((i) => selected.has(i.id));
  const toggleAll = () => setSelected(allChecked ? new Set() : new Set(items.map((i) => i.id)));
  const toggleOne = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  /* ---------------- H4. Xoá 1 laptop – optimistic ---------------- */
  const deleteOne = async () => {
    const laptop = toDelete;
    setToDelete(null);

    const snapshot = data; // 1. lưu bản sao
    setData((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== laptop.id), total: prev.total - 1 })); // 2. xoá ngay
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(laptop.id);
      return next;
    });

    try {
      await laptopApi.remove(laptop.id); // 3. gọi API
      showToast(`Đã xóa "${laptop.name}"`);
      afterDelete(snapshot.items.length - 1);
    } catch {
      setData(snapshot); // 4. lỗi → khôi phục
      showToast('Xóa thất bại, đã khôi phục', 'danger');
    }
  };

  /* ---------------- H3. Xoá hàng loạt – Promise.allSettled ---------------- */
  const deleteSelected = async () => {
    const ids = [...selected];
    setBulkDeleting(true);

    // Song song; 1 request lỗi không làm hỏng các request khác
    const results = await Promise.allSettled(ids.map((id) => laptopApi.remove(id)));
    const failedIds = ids.filter((_, i) => results[i].status === 'rejected');
    const okCount = ids.length - failedIds.length;

    let message = `Đã xóa ${okCount}/${ids.length} laptop.`;
    if (failedIds.length > 0) message += ` ${failedIds.length} laptop xóa thất bại.`;
    showToast(message, failedIds.length === 0 ? 'success' : okCount === 0 ? 'danger' : 'warning');

    setBulkDeleting(false);
    setShowBulkConfirm(false);
    setSelected(new Set(failedIds)); // bỏ chọn dòng thành công, giữ chọn dòng thất bại

    const remaining = items.filter((i) => !ids.includes(i.id) || failedIds.includes(i.id)).length;
    afterDelete(remaining);
  };

  /* ---------------- G3. Sửa nhanh tồn kho – PATCH { stock } ---------------- */
  const saveStock = async () => {
    const { id, value } = editingStock;
    const stock = Number(value);
    if (value === '' || !Number.isInteger(stock) || stock < 0) {
      showToast('Tồn kho phải là số nguyên ≥ 0', 'warning');
      return;
    }
    setSavingStock(true);
    try {
      const updated = await laptopApi.patch(id, { stock });
      setData((prev) => ({
        ...prev,
        items: prev.items.map((i) => (i.id === id ? { ...i, stock: updated.stock } : i)),
      }));
      showToast(`Đã cập nhật tồn kho "${updated.name}": ${updated.stock}`);
      setEditingStock(null);
    } catch (err) {
      showToast(getErrorMessage(err), 'danger');
    } finally {
      setSavingStock(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h3 className="fw-bold mb-0">Quản lý laptop</h3>
        <Button as={Link} to="/admin/laptops/new">
          + Thêm laptop
        </Button>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <InputGroup style={{ maxWidth: 400 }}>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="search"
            placeholder="Tìm laptop..."
            aria-label="Tìm laptop"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </InputGroup>
        <Button variant="danger" disabled={selected.size === 0} onClick={() => setShowBulkConfirm(true)}>
          Xóa đã chọn ({selected.size})
        </Button>
        {loading && data && <Spinner size="sm" className="align-self-center" />}
      </div>

      {error && <ErrorAlert message={error} onRetry={refetch} />}
      {loading && !data && <Loading />}

      {data && !error && (
        <Card className="shadow-sm">
          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <Table hover responsive className="mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: 40 }}>
                    <Form.Check aria-label="Chọn tất cả" checked={allChecked} onChange={toggleAll} />
                  </th>
                  <th>ID</th>
                  <th>Ảnh</th>
                  <th>Tên</th>
                  <th>Hãng</th>
                  <th className="text-end">Giá bán</th>
                  <th className="text-center">Tồn kho</th>
                  <th className="text-end">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {items.map((laptop) => (
                  <tr key={laptop.id} className={selected.has(laptop.id) ? 'table-active' : undefined}>
                    <td>
                      <Form.Check
                        aria-label={`Chọn ${laptop.name}`}
                        checked={selected.has(laptop.id)}
                        onChange={() => toggleOne(laptop.id)}
                      />
                    </td>
                    <td>{laptop.id}</td>
                    <td>
                      <Image src={laptop.image} alt="" width={64} rounded className="border" onError={handleImageError} />
                    </td>
                    <td style={{ minWidth: 200 }}>
                      <Link to={`/laptops/${laptop.id}`} className="text-decoration-none">
                        {laptop.name}
                      </Link>
                    </td>
                    <td>{laptop.brand?.name}</td>
                    <td className="text-end text-nowrap">{formatPrice(getSellingPrice(laptop))}</td>
                    <td className="text-center" style={{ width: 130 }}>
                      {editingStock?.id === laptop.id ? (
                        <Form.Control
                          size="sm"
                          type="number"
                          min={0}
                          autoFocus
                          aria-label="Tồn kho mới"
                          value={editingStock.value}
                          disabled={savingStock}
                          onChange={(e) => setEditingStock({ id: laptop.id, value: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveStock();
                            if (e.key === 'Escape') setEditingStock(null);
                          }}
                          onBlur={() => !savingStock && setEditingStock(null)}
                        />
                      ) : (
                        <Button
                          variant="link"
                          size="sm"
                          title="Bấm để sửa nhanh, Enter để lưu"
                          className={`fw-semibold text-decoration-none ${laptop.stock < 5 ? 'text-danger' : 'text-body'}`}
                          onClick={() => setEditingStock({ id: laptop.id, value: String(laptop.stock) })}
                        >
                          {laptop.stock} ✎
                        </Button>
                      )}
                    </td>
                    <td className="text-end text-nowrap">
                      <Button as={Link} to={`/admin/laptops/${laptop.id}/edit`} size="sm" variant="outline-primary" className="me-2">
                        Sửa
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => setToDelete(laptop)}>
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      )}

      <AppPagination page={page} totalPages={totalPages} onChange={goToPage} />

      <ConfirmModal
        show={Boolean(toDelete)}
        title="Xóa laptop"
        message={toDelete && `Bạn có chắc muốn xóa "${toDelete.name}"?`}
        confirmText="Xóa"
        onConfirm={deleteOne}
        onCancel={() => setToDelete(null)}
      />
      <ConfirmModal
        show={showBulkConfirm}
        title="Xóa nhiều laptop"
        message={`Bạn có chắc muốn xóa ${selected.size} laptop đã chọn?`}
        confirmText="Xóa tất cả"
        loading={bulkDeleting}
        onConfirm={deleteSelected}
        onCancel={() => setShowBulkConfirm(false)}
      />
    </>
  );
}
```

✅ **Kiểm tra (kịch bản 16):** chọn 3 dòng → "Xóa đã chọn (3)" → Modal → tab Network 3 DELETE **cùng lúc** → Toast "Đã xóa 3/3 laptop." · sang trang 2 (20 laptop = 2 trang) chọn tất cả rồi xoá → tự lùi về trang 1 · `npm run reset-db`.

---

# Sprint 4 — Test & Release v1.0.0

## #30 — README (B)

| 👤 B · 👀 A | Nhánh `docs/30-readme` · Cần merge trước: #16 và các issue chức năng chính |
|---|---|

**Commit 1/2** `docs(readme): add setup guide and demo accounts` · **2/2** `docs(readme): add timing results and answers to four questions`

Điền các chỗ `<...>` (tên, số đo, link). Mỗi câu trả lời ghi tên người viết.

📄 **`README.md`**

~~~markdown
# 💻 LaptopStore

Website bán laptop – Exercise 27 mở rộng (FER202). React + Vite, react-bootstrap, React Router, axios, json-server.

| Thành viên | MSSV | GitHub | Phụ trách |
|---|---|---|---|
| <Họ tên A> (Leader) | <MSSV> | @<username> | Repo, API lõi, đăng nhập/phân quyền, routing, hooks, quản trị laptop |
| <Họ tên B> | <MSSV> | @<username> | Trang chủ, danh sách, lọc, chi tiết, đánh giá, Navbar |
| <Họ tên C> | <MSSV> | @<username> | Dữ liệu, giỏ hàng, thanh toán, đơn hàng, form quản trị, kiểm thử |

- Project board: <link>
- Video demo: <link>
- Release: <link tới v1.0.0>

![Trang chủ](docs/screenshots/home.png)

## 1. Cài đặt & chạy

Yêu cầu: Node.js 20.19+ (hoặc 22 LTS).

```bash
npm install
cp .env.example .env        # VITE_API_URL=http://localhost:3001
npm start                   # json-server :3001 + Vite :5173
npm run reset-db            # khôi phục dữ liệu mẫu, sau đó chạy lại npm start
```

| Tài khoản | Email | Mật khẩu |
|---|---|---|
| Admin | admin@laptopstore.vn | 123456 |
| Khách hàng | khach@laptopstore.vn | 123456 |

## 2. Cấu trúc

```
src/
├── api/        axiosClient (instance + interceptors) và service theo tài nguyên
├── hooks/      useAxios, useDebounce, useAddToCart, useFlashMessage, usePageTitle
├── contexts/   AuthContext, CartContext, ToastContext
├── components/ layout/ common/ laptop/
├── pages/      các trang khách hàng + admin/
└── utils/      format, image, orderStatus
```

Luồng gọi API: `axiosClient` → `services (src/api)` → `hooks (useAxios)` → `pages/components`.

`useAxios` được dùng ở: HomePage, LaptopListPage, LaptopDetailPage, OrderListPage, AdminLaptopPage, AdminLaptopFormPage, AdminOrderPage.

## 3. Kết quả đo thời gian (Phần C2)

Trang chủ, json-server `--delay 500`, 4 request:

| Người đo | Tuần tự | Song song (`Promise.all`) |
|---|---|---|
| A | <….> ms | <….> ms |
| B | <….> ms | <….> ms |
| C | <….> ms | <….> ms |

Song song nhanh gấp khoảng 4 lần vì 4 request chạy cùng lúc, tổng thời gian ≈ request chậm nhất (~500ms) thay vì cộng dồn (~2000ms).

## 4. Trả lời câu hỏi

**1. Vì sao interceptor lỗi phải trả nguyên lỗi hủy thay vì chuẩn hoá?** *(<tên>)*
Component nhận biết request bị hủy bằng `isCancel(err)`, hàm này kiểm tra đối tượng lỗi có phải `CanceledError` của axios không. Nếu interceptor đổi lỗi hủy thành `{ status, message }` thì `isCancel()` luôn trả `false` → mỗi lần đổi bộ lọc, request cũ bị hủy lại bị coi là lỗi thật: màn hình hiện Alert "lỗi" giả và tắt loading sai lúc. Hủy request là hành vi chủ động, không phải lỗi cần báo cho người dùng.

**2. Vì sao bước kiểm tra tồn kho dùng `Promise.all` còn bước trừ kho dùng `Promise.allSettled`?** *(<tên>)*
- Bước kiểm tra tồn kho là điều kiện tiên quyết: thiếu thông tin của **bất kỳ** laptop nào thì không thể biết có đủ hàng hay không, nên phải dừng toàn bộ quy trình ngay. `Promise.all` thất bại ngay khi 1 request lỗi — đúng hành vi cần.
- Bước trừ kho / xoá giỏ chạy **sau khi đơn đã được tạo**. Một PATCH hay DELETE lỗi không được làm hỏng kết quả đặt hàng; cần chờ tất cả xong và biết cái nào lỗi để ghi cảnh báo. `Promise.allSettled` không bao giờ reject, trả kết quả từng request.

**3. Vì sao sửa nhanh tồn kho dùng PATCH còn form sửa dùng PUT?** *(<tên>)*
- Sửa nhanh chỉ đổi **một trường** `stock` → PATCH gửi `{ stock }`, server giữ nguyên các trường khác; request nhỏ, không có nguy cơ ghi đè dữ liệu người khác vừa sửa.
- Form sửa thay **toàn bộ** thông tin laptop → PUT gửi đầy đủ object (giữ `sold`, `rating`, `createdAt` cũ). Nếu dùng PUT mà thiếu trường thì json-server xoá trường đó; vì vậy PUT phải gửi đủ, còn PATCH chỉ gửi phần thay đổi.

**4. Vì sao ở StrictMode mỗi trang có 1 request *(canceled)* khi mới vào?** *(<tên>)*
Ở chế độ phát triển, `React.StrictMode` cố ý chạy effect 2 lần khi component mount: mount → **cleanup** → mount lại, để phát hiện effect thiếu cleanup. Lần chạy đầu tạo request 1, cleanup gọi `controller.abort()` → request 1 *(canceled)*; lần chạy thứ hai tạo request 2 thành công. Bản build production (`npm run build`) không chạy 2 lần nên không còn request bị hủy. Thấy request *(canceled)* chứng tỏ cleanup hoạt động đúng.

## 5. Kiểm thử

Kết quả 19 kịch bản: [docs/TEST_REPORT.md](docs/TEST_REPORT.md).
~~~

---

## #31 — Test report & video (C)

| 👤 C · 👀 A | Nhánh `test/31-test-report` **tạo từ `release/1.0.0`** · PR base `release/1.0.0` · Cần merge trước: #1 – #30 |
|---|---|

**Commit 1/1** `test(release): add test report for 19 scenarios`

Quy trình (guide mục 6): A tạo `release/1.0.0` → A + C chạy 19 kịch bản → lỗi nào cũng tạo issue `[BUG]` + nhánh `fix/<n>-...` từ `release/1.0.0` → điền báo cáo.

📄 **`docs/TEST_REPORT.md`**

~~~markdown
# Báo cáo kiểm thử – LaptopStore v1.0.0

- Nhánh: `release/1.0.0` · Commit: `<sha>` · Ngày: <dd/mm/yyyy>
- Môi trường: Chrome <phiên bản>, Windows/macOS, `npm run reset-db && npm start` (dừng server cũ trước)
- Tester: A, C

| # | Thao tác | Kết quả mong đợi | Tester | Kết quả | Bug |
|---|---|---|---|---|---|
| 1 | Vào `/` | Skeleton → khối Bán chạy, Mới về, nút hãng; Badge DEV tuần tự > song song | C | ✅ | |
| 2 | Bấm nút hãng "Asus" | `/laptops?brandId=3`, chỉ laptop Asus | C | ✅ | |
| 3 | RAM ≥ 16, giá tăng dần, trang 2 | URL đủ tham số, kết quả đúng; F5 giữ nguyên | C | ✅ | |
| 4 | Slow 3G, bấm nhanh 4 hãng | 3 request (canceled), đúng hãng cuối, không Alert lỗi | A | ✅ | |
| 5 | Gõ "rog" ô tìm kiếm Navbar | Sau 400ms dropdown gợi ý, 1 request | A | ✅ | |
| 6 | Chi tiết, bấm 3 laptop liên quan liên tiếp | Breadcrumb/ảnh/thông số đổi đúng; request cũ hủy | A | ✅ | |
| 7 | Chưa đăng nhập bấm "Thêm vào giỏ" | `/login`; đăng nhập xong quay lại trang chi tiết | C | ✅ | |
| 8 | Thêm 2 laptop, tăng số lượng, F5 | Badge và trang giỏ giữ nguyên | C | ✅ | |
| 9 | Tăng số lượng vượt tồn kho | Nút + disable / Toast "Chỉ còn x sản phẩm" | C | ✅ | |
| 10 | Đặt hàng (SĐT 10 số bắt đầu 0) | `/orders` + Toast mã đơn; db: đơn mới, stock giảm, giỏ rỗng | C | ✅ | |
| 11 | Hủy đơn vừa đặt | `cancelled`, stock cộng lại | C | ✅ | |
| 12 | Customer gõ `/admin` | Về `/` + Toast không có quyền | A | ✅ | |
| 13 | Admin thêm laptop giá sale ≥ giá gốc | Form báo lỗi, không gửi request | A | ✅ | |
| 14 | Admin thêm laptop hợp lệ | `/admin/laptops` + Toast "Đã lưu ..."; có ở trang khách | A | ✅ | |
| 15 | Admin sửa nhanh tồn kho | PATCH chỉ chứa `{ stock }` | A | ✅ | |
| 16 | Admin xoá hàng loạt 3 laptop | 3 DELETE song song, Toast "Đã xóa 3/3 laptop" | A | ✅ | |
| 17 | Tắt json-server, xoá 1 sản phẩm trong giỏ | Dòng biến mất rồi khôi phục + Toast lỗi | C | ✅ | |
| 18 | Tắt json-server, F5 danh sách | ErrorAlert "Không kết nối được máy chủ..." + Thử lại; bật lại → có dữ liệu | A | ✅ | |
| 19 | Vào `/abc`, `/laptops/9999` | 404 / "Không tìm thấy dữ liệu" | C | ✅ | |

## Checklist tự đánh giá (đề)

- [ ] Không còn `.then()`; không có `useEffect(async ...)` (hook pre-push xác nhận)
- [ ] Chỉ `src/api` import axios; không có URL cứng trong component
- [ ] Interceptor gắn token, đo thời gian, chuẩn hoá lỗi tiếng Việt, giữ nguyên lỗi hủy
- [ ] `Promise.all` ở trang chủ và kiểm tra tồn kho; `Promise.allSettled` ở chi tiết, trừ kho, xoá hàng loạt
- [ ] Mọi GET trong `useEffect` có AbortController + cleanup
- [ ] Skeleton, Spinner, Alert + Thử lại, EmptyState, Modal, Toast; responsive 375px
- [ ] Route lồng nhau, ProtectedRoute theo vai trò, quay lại trang cũ, bộ lọc trên URL, trang 404
- [ ] Giỏ hàng, đơn hàng, đánh giá, CRUD laptop lưu thật trong `db.json`
- [ ] `useAxios`, `useDebounce`, xoá hàng loạt, optimistic update đúng kịch bản

## Lỗi phát hiện

| Issue | Mô tả | Kịch bản | Người sửa | PR |
|---|---|---|---|---|
| #<n> | <...> | <...> | <...> | #<...> |
~~~

**Video demo (3–5 phút):** A trình bày kịch bản 4, 5, 6, 12–16, 18 · B trình bày 1–3, chi tiết + đánh giá · C trình bày 7–11, 17, 19. Upload YouTube (Unlisted) hoặc Google Drive, dán link vào README.

---

## Release v1.0.0 (A)

Làm theo `Assignment_guide.md` mục 6. Đổi version:

```bash
git switch develop && git pull
git switch -c release/1.0.0
npm version 1.0.0 --no-git-tag-version
git add package.json package-lock.json
git commit -m "chore(release): bump version to 1.0.0"
git push -u origin release/1.0.0
```

Sau khi PR `release/1.0.0 → main` có 2 approve (B, C) → **Create a merge commit** → tag + GitHub Release → back-merge `main → develop`.

---

## Phụ lục — Kiểm tra nhanh toàn dự án trước khi nộp

```bash
git clone https://github.com/<owner>/laptop-store.git check && cd check
git checkout v1.0.0
npm install && cp .env.example .env
sh .githooks/pre-push          # không báo vi phạm TECH, build OK
npm start                      # chạy 19 kịch bản
```

| Kiểm tra | Lệnh (Git Bash) | Kết quả đúng |
|---|---|---|
| Không còn `.then(` | `grep -rn "\.then(" src` | không có dòng nào |
| Chỉ `src/api` import axios | `grep -rl "from 'axios'" src` | chỉ `src/api/axiosClient.js` |
| Không URL cứng | `grep -rn "localhost:3001" src` | không có dòng nào |
| Không còn bản tạm | `grep -rn "Bản tạm" src` | không có dòng nào |
| Không còn trang tạm | `grep -rln "ComingSoon" src/pages` | không có file nào |

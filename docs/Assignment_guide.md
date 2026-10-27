# Assignment_guide.md — Làm thủ công từng bước: issue → code → commit → Pull Request → review → merge

> **Dự án:** LaptopStore (`laptop-store`) — Exercise 27 mở rộng, FER202
> **Đề bài & 31 issue:** `Assignment_readme.md` ·
> **Nhóm 3 người:** **A** (Leader — khởi tạo repo, API lõi, đăng nhập/phân quyền, routing, quản trị laptop, release) · **B** (Catalog) · **C** (Commerce, kiểm thử)
> **Công nghệ:** React + Vite · react-bootstrap · react-router-dom 6 · axios · json-server 0.17.4

Tài liệu này dành cho nhóm **làm tay mọi thao tác trên GitHub**. Mỗi issue được viết thành một "kịch bản" theo thứ tự thời gian, ghi rõ **ai** làm **bước nào**:

| Ký hiệu | Nghĩa |
|---|---|
| `[A]`, `[B]`, `[C]` trong tiêu đề bước | Người thực hiện bước đó |
| 👤 Người làm | Người được assign issue: tạo nhánh, code, commit, mở PR, merge |
| 👀 Reviewer | Người review PR (luôn **khác** người viết code) |
| **Commit k/n** | Commit thứ k trong n commit của issue — làm đúng thứ tự, mỗi commit build được |

**Vòng đời chuẩn của mọi issue** (nhóm lặp lại 31 lần — reviewer xoay vòng giữa 3 người):

```
[A] tạo issue ─► [Người làm] nhận việc, tạo nhánh từ develop ─► code + commit nhỏ (Refs #n)
   ─► tự kiểm thử (npm run build + chạy thử) ─► push (hook pre-push kiểm tra) ─► mở PR theo mẫu (Closes #n)
   ─► [Reviewer] review ─► (sửa bằng commit mới nếu bị Request changes) ─► Approve
   ─► [Người làm] Squash and merge ─► issue tự đóng, board sang Done ─► xoá nhánh
```

**Quy tắc vàng:** không ai push thẳng `main`/`develop` · không có issue thì không code · người viết không tự approve · không commit `node_modules/`, `dist/`, `.env`, và `db.json` đã bị json-server ghi đè.

> 💡 Tài liệu này hướng dẫn **quy trình** (nhánh, commit, PR, review) và các file cấu hình repo. **Code đầy đủ của từng issue** (theo thứ tự merge, từng commit) nằm trong `Assignment_code.md`. Với file nhiều người cùng sửa (`App.jsx`, `AppNavbar.jsx`, `LaptopCard.jsx`), luôn mời chủ file review thêm.

## Mục lục

- [1. Ai làm gì — mục lục theo người](#1-ai-làm-gì--mục-lục-theo-người)
- [2. Bước 1–4: Leader chuẩn bị repo · cả nhóm chuẩn bị máy](#2-bước-14-leader-chuẩn-bị-repo--cả-nhóm-chuẩn-bị-máy)
- [3. Bước 5 — Leader tạo 31 issue thủ công trên web](#3-bước-5--leader-tạo-31-issue-thủ-công-trên-web)
- [4. Thực hiện từng issue: code → commit → PR → review → merge](#4-thực-hiện-từng-issue-code--commit--pr--review--merge)
- [5. Tester cuối sprint](#5-tester-cuối-sprint)
- [6. Release v1.0.0 & quy trình merge vào main](#6-release-v100--quy-trình-merge-vào-main)
- [7. Xử lý xung đột & lỡ tay](#7-xử-lý-xung-đột--lỡ-tay)
- [8. Checklist cuối cùng theo người](#8-checklist-cuối-cùng-theo-người)
- [Phụ lục — Tạo 31 issue bằng script (tuỳ chọn)](#phụ-lục--tạo-31-issue-bằng-script-tuỳ-chọn)

---

## 1. Ai làm gì — mục lục theo người

| Người | Issue mình code (nhánh) | PR mình review |
|---|---|---|
| **A (Leader)** | [#1](#1--repo-templates--codeowners-a) templates · [#2](#2--project-setup--configuration-a) setup · [#5](#5--axiosclient--interceptors-a) axiosClient · [#8](#8--fake-login--authcontext-a) login · [#9](#9--routes-layouts--404-a) routes · [#10](#10--protectedroute-a) ProtectedRoute · [#13](#13--useaxios--usedebounce-a) hooks · [#18](#18--laptopfilter-a) filter · [#19](#19--navbar-search-suggestions-a) search · [#26](#26--admin-laptop-table-a) admin laptops · [#29](#29--bulk-delete-a) bulk delete | #3, #7, #11, #15, #17, #20, #22, #24, #27, #30, #31 |
| **B** | [#4](#4--format-utils-b) format · [#6](#6--laptop-catalog--review-services-b) services · [#11](#11--common-components-b) common UI · [#14](#14--appnavbar--footer-b) navbar · [#15](#15--laptopcard--laptopgrid-b) card · [#16](#16--home-page-b) home · [#17](#17--laptop-list-b) list · [#20](#20--laptop-detail-b) detail · [#21](#21--review-list--form-b) review · [#30](#30--readme-b) README | #1, #5, #9, #12, #13, #18, #23, #25, #28, #29 |
| **C** | [#3](#3--seed-data-c) seed · [#7](#7--cart--order-services-c) services · [#12](#12--toastcontext--confirmmodal-c) toast/modal · [#22](#22--cartcontext-c) cart context · [#23](#23--cart-page-c) cart page · [#24](#24--checkout-c) checkout · [#25](#25--my-orders-c) orders · [#27](#27--admin-laptop-form-c) laptop form · [#28](#28--admin-orders-c) admin orders · [#31](#31--test-report--video-c) test | #2, #4, #6, #8, #10, #14, #16, #19, #21, #26 |

Release `v1.0.0`: A làm, **B + C** approve (cần 2), B review back-merge — xem [mục 6](#6-release-v100--quy-trình-merge-vào-main).

**Review xoay vòng:** mỗi PR có 1 reviewer chính, xoay giữa A, B, C để ai cũng đọc code các mảng khác (mỗi người review 10–11 PR). Người viết không tự review. PR thêm code vào file của người khác (ví dụ C nối `addToCart` vào `LaptopCard` của B) mời thêm chủ file làm reviewer thứ hai.

---

## 2. Bước 1–4: Leader chuẩn bị repo · cả nhóm chuẩn bị máy

### Bước 1 — [A] Tạo repository & mời thành viên

1. GitHub → góc phải trên **+** → **New repository**.
2. *Owner*: tài khoản của A (hoặc organization của nhóm) · *Repository name*: `laptop-store-groupName` · *Description*: `LaptopStore — React, Vite, react-bootstrap, axios, json-server` · **Public** (khuyến nghị — xem lưu ý dưới) · **KHÔNG** tick *Add a README*, *.gitignore*, *license* → **Create repository**.
3. **Settings → Collaborators** (organization: *Collaborators and teams*) → **Add people** → nhập username từng người:
   - B, C: quyền **Write**.
   - Giảng viên: quyền **Read**.
4. Nhắn nhóm: *"Đã mời vào repo, mọi người kiểm tra email/GitHub notification và bấm Accept invitation"*. **[B][C]** chấp nhận lời mời.

> **GitHub Free:** repo **Public** dùng được Rulesets (bảo vệ nhánh) miễn phí. Repo **Private** trên GitHub Free thì Rulesets không được thực thi — khi đó cả nhóm coi bảng ở Bước 3 là **quy ước bắt buộc** (hoặc A dùng GitHub Pro miễn phí qua *GitHub Student Developer Pack*).

### Bước 2 — [A] Tạo project & commit khởi tạo

1. Mở Git Bash ở thư mục làm việc:

```bash
npm create vite@latest laptop-store -- --template react
cd laptop-store
npm install
npm run dev            # mở http://localhost:5173 thấy trang Vite → Ctrl + C
```

2. Đây là **lần duy nhất** được push thẳng lên `main`:

```bash
git init -b main
git add .
git status                                       # không có node_modules/, dist/
git commit -m "chore(setup): init vite react project"
git remote add origin https://github.com/<owner>/laptop-store.git
git push -u origin main
git switch -c develop
git push -u origin develop
```

> Tuỳ phiên bản, Vite có thể tạo sẵn một công cụ lint (file cấu hình và script `lint`) — bài này **không yêu cầu** dùng, cứ để nguyên, không cần cấu hình thêm.

### Bước 3 — [A] Cấu hình repository

1. **Settings → General → Default branch** → bấm ⇄ → chọn `develop` → **Update** → xác nhận.
   *(Vì `Closes #n` chỉ tự đóng issue khi PR merge vào nhánh mặc định.)*
2. Cùng trang, kéo xuống **Pull Requests**:
   - ✔ *Allow merge commits*
   - ✔ *Allow squash merging*, *Default commit message* = **Pull request title and description**
   - ✘ *Allow rebase merging*
   - ✔ *Automatically delete head branches*
3. **Settings → Rules → Rulesets → New ruleset → New branch ruleset** *(nếu không có mục này — repo Private dùng GitHub Free — bỏ qua; cả nhóm coi bảng dưới là **quy ước bắt buộc**)*:
   - Ruleset 1: *Name* `protect-develop` · *Enforcement* **Active** · *Target branches* → **Add target → Include by pattern** `develop` · tick **Restrict deletions**, **Block force pushes**, **Require a pull request before merging** (*Required approvals* = 1, ✔ *Dismiss stale approvals*, ✔ *Require conversation resolution*) · **Bypass list → Add bypass → Repository admin** (để A merge được PR đầu tiên) → **Create**.
   - Ruleset 2: `protect-main`, target `main`, giống trên nhưng *Required approvals* = **2** và ✔ *Require review from Code Owners*.

| Nhánh | Push thẳng | Xoá / force push | Merge cần |
|---|---|---|---|
| `develop` | ✘ | ✘ | PR + 1 approve + resolve hết conversation |
| `main` | ✘ | ✘ | PR + 2 approve (có Code Owner) |

### Bước 4 — [A] Labels, Milestones, Board (làm trên web)

**Labels:** **Issues → Labels**.
1. Xoá label mặc định: ở mỗi label bấm **⋯ → Delete**. Xoá `bug`, `documentation`, `duplicate`, `enhancement`, `help wanted`, `invalid`, `question`, `wontfix`; giữ `good first issue`.
2. **New label**, nhập tên và màu, bấm **Create label**. Làm lần lượt 20 label:

| Tên label (gõ chính xác) | Màu |
|---|---|
| `type: feature` · `type: bug` · `type: chore` · `type: docs` · `type: test` | `#1D76DB` · `#D73A4A` · `#C5DEF5` · `#0075CA` · `#BFD4F2` |
| `module: infra` · `module: api` · `module: auth` · `module: layout` · `module: ui` · `module: catalog` · `module: detail` · `module: cart` · `module: order` · `module: admin` | `#5319E7` (cả 10) |
| `priority: high` · `priority: medium` · `priority: low` | `#B60205` · `#FBCA04` · `#0E8A16` |
| `status: blocked` · `status: needs-info` | `#000000` · `#D876E3` |

**Milestones:** **Issues → Milestones → New milestone**. Tạo lần lượt 5 milestone. Tên gõ chính xác, dấu `—` là gạch dài; nếu khó gõ thì copy từ đây:

| Title | Due date (ví dụ) | Description |
|---|---|---|
| `Sprint 0 — Foundation` | 01/11/2026 | Template, cấu hình dự án, dữ liệu mẫu, axiosClient, service |
| `Sprint 1 — Core UI & Auth` | 08/11/2026 | Đăng nhập, route, layout, component & hook dùng chung, Navbar, LaptopCard |
| `Sprint 2 — Catalog & Detail` | 15/11/2026 | Trang chủ, danh sách, lọc, gợi ý tìm kiếm, chi tiết, đánh giá |
| `Sprint 3 — Cart, Order & Admin` | 29/11/2026 | Giỏ hàng, thanh toán, đơn hàng, quản trị |
| `Sprint 4 — Test & Release v1.0.0` | 06/12/2026 | README, kiểm thử 19 kịch bản, video, release |

**Board:**
1. Tạo board:
   - Bấm ảnh đại diện → **Your projects** → **New project**. Với organization: tab **Projects** của org.
   - Chọn **Board** → *Project name* `LaptopStore Board` → **Create project**.
2. Đổi cột:
   - Cột *Todo*: **⋯ → Edit details** → đổi tên `Backlog`.
   - Cột *In Progress*: đổi tên `In progress`.
   - Bấm **+** ở cuối dãy cột để thêm cột `To do (Sprint)` và `In review`.
   - Kéo thả để có đúng thứ tự: **Backlog → To do (Sprint) → In progress → In review → Done**.
3. **⋯ (góc phải trên) → Workflows**, bật từng workflow rồi **Save and turn on**:
   - *Item added to project* → Status = Backlog
   - *Item closed* → Done
   - *Pull request merged* → Done
4. Thêm view **Theo người**: bấm **+ New view** → **Table** → đổi tên `Theo người` → **⋯ → Group by → Assignees**.
5. **⋯ → Settings → Manage access** → thêm B, C với quyền **Write**. *Visibility*: **Public** nếu repo public (để giảng viên xem).
6. Vào repo → tab **Projects** → **Link a project** → chọn `LaptopStore Board`.

### Bước 4b — [B][C] và [A] chuẩn bị máy (làm song song với Bước 3–5)

Cài: **Node.js 20.19+ hoặc 22 LTS**, **Git** (có Git Bash), **VS Code**. Trên Windows mọi lệnh trong tài liệu chạy bằng **Git Bash**.

```bash
git config --global user.name "Nguyen Van B"
git config --global user.email "email-trung-voi-tai-khoan-github@fpt.edu.vn"   # để commit được tính cho bạn
git config --global pull.rebase true
git config --global core.autocrlf true

git clone https://github.com/<owner>/laptop-store.git
cd laptop-store
git switch develop
npm install
```

File `.env` cá nhân tạo **sau khi #1 merge** (có file mẫu `.env.example`), git hook bật **sau khi #1 merge** — tài liệu sẽ nhắc đúng lúc.

---

## 3. Bước 5 — Leader tạo 31 issue thủ công trên web

> **Quan trọng — tạo đủ 31 issue liền một lượt, theo đúng thứ tự mục 7 của `Assignment_readme.md`, TRƯỚC khi mở bất kỳ PR nào.** GitHub đánh số chung cho issue và PR; làm đúng thì issue sẽ là #1 → #31 khớp với tên nhánh (`feature/17-laptop-list` ↔ issue #17), PR đầu tiên nhận số #32.
> Lúc này repo **chưa có template** (template được thêm ở chính issue #1), nên trang *New issue* mở thẳng ô trống — cứ dán nội dung có sẵn.

**Thao tác cho mỗi issue** (lặp 31 lần, mỗi issue ~1 phút):

1. Repo → tab **Issues** → **New issue**.
2. **Add a title**: dán *Title* (trong bảng của Issue n).
3. **Add a description**: dán *Body* (khối `markdown` ngay dưới bảng). Bấm **Preview** để xem checkbox hiển thị đúng.
4. Cột bên phải:
   - **Assignees** (bánh răng) → chọn người.
   - **Labels** → tick các label.
   - **Projects** → `LaptopStore Board`.
   - **Milestone** → chọn sprint.
5. **Create** (hoặc *Submit new issue*). Kiểm tra số issue trên tiêu đề.

Tạo xong cả 31: mở **LaptopStore Board** → kiểm tra 31 thẻ ở cột **Backlog** → kéo **#1 → #7** (Sprint 0) sang **To do (Sprint)**. Nhắn nhóm: *"Đã tạo issue, mọi người vào Issues → lọc `assignee:@me` để xem việc của mình"*.

> Lỡ lệch số (vd. tạo nhầm 1 issue thử): **không cần làm lại** — đóng issue thừa bằng *Close as not planned*, và từ đó dùng **số thật** khi đặt tên nhánh, `Refs #`, `Closes #`.
> Muốn nhanh hơn: dùng script ở [Phụ lục](#phụ-lục--tạo-31-issue-bằng-script-tuỳ-chọn).

---

## 4. Thực hiện từng issue: code → commit → PR → review → merge

Thứ tự dưới đây là **thứ tự thời gian**. Trong cùng một sprint, các issue của **những người khác nhau làm song song**; chỉ cần chú ý dòng "Cần merge trước".

**Các lệnh chung dùng ở mọi issue**

| Việc | Lệnh |
|---|---|
| Xem đang ở nhánh nào, file nào thay đổi | `git status` |
| Xem nội dung thay đổi | `git diff` (chưa add) · `git diff --staged` (đã add) |
| Huỷ add một file | `git restore --staged <file>` |
| Bỏ thay đổi `db.json` do json-server ghi lúc test | `npm run reset-db` (hoặc `git restore db.json`), rồi chạy lại `npm start` |
| Xem các commit của nhánh mình | `git log --oneline develop..HEAD` |
| Đồng bộ develop vào nhánh mình | `git fetch origin && git rebase origin/develop` rồi `git push --force-with-lease` |
| Build kiểm tra | `npm run build` |
| Chạy app + API | `npm start` (Vite :5173 + json-server :3001) |

**Mở PR trên web (dùng cho mọi issue):** sau khi push, vào repo sẽ thấy thanh vàng **Compare & pull request**. Không thấy thì vào tab **Pull requests → New pull request** → *base* `develop`, *compare* nhánh của bạn. Từ issue #2 trở đi, ô mô tả **tự điền PR template** — điền lại cho đúng PR của mình.

**Review trên web (dùng cho mọi issue):**
1. Mở PR, vào tab **Files changed**.
2. Rê chuột vào dòng code, bấm **+** để comment, rồi bấm **Start a review**.
3. Comment hết các file, bấm **Review changes** (góc phải trên), chọn **Approve**, **Request changes** hoặc **Comment**, rồi **Submit review**.

**Merge (dùng cho mọi issue):** tác giả bấm **Squash and merge** → tiêu đề `<tiêu đề PR> (#<số-PR>)` → phần mô tả xoá danh sách commit con, chỉ giữ dòng `Closes #n` → **Confirm squash and merge** → dọn local:

```bash
git switch develop
git pull
git branch -D <ten-nhanh>
git fetch --prune
```

---

## Sprint: Sprint 0 — Foundation

### #1 — Repo templates & CODEOWNERS (A)

| | |
|---|---|
| 👤 Người làm | **A (Leader)** |
| 👀 Reviewer | **B** |
| Nhánh | `chore/1-repo-templates` |
| Milestone | `Sprint 0 — Foundation` |
| Cần merge trước | Bước 1–5 đã xong |
| Tiêu đề PR | `chore(setup): add issue/pr templates and codeowners` |

#### #1.1 — [A] Nhận việc & tạo nhánh

1. Board → kéo thẻ **#1** sang **In progress**. Đọc lại tiêu chí chấp nhận trong issue.
2. Tạo nhánh từ `develop` mới nhất:

```bash
git switch develop
git pull origin develop
git switch -c chore/1-repo-templates
```

#### #1.2 — [A] Code & commit

**Commit 1/3 — `chore(setup): add issue and pull request templates`**

📄 **`.github/ISSUE_TEMPLATE/feature_request.md`**

```markdown
---
name: Feature request
about: Chức năng mới theo yêu cầu của Exercise 27 mở rộng
title: "[FEATURE] "
labels: "type: feature"
---

## Mô tả
<!-- Chức năng gì, cho ai (Khách / Customer / Admin), trang nào -->

## Yêu cầu đề liên quan
Phần ...: ...

## Tiêu chí chấp nhận
- [ ] ...
- [ ] ...

## Quy tắc nghiệp vụ áp dụng
BR-... · TECH-...

## Ghi chú kỹ thuật
<!-- Nhánh, file/service/hook/component dự kiến, phụ thuộc issue khác (#...) -->
**Reviewer:** 
```
📄 **`.github/ISSUE_TEMPLATE/bug_report.md`**

```markdown
---
name: Bug report
about: Báo lỗi
title: "[BUG] "
labels: "type: bug"
---

## Mô tả lỗi
<!-- Kịch bản kiểm thử liên quan (1–19) nếu có -->

## Các bước tái hiện
1. `npm run reset-db && npm start`
2. Đăng nhập bằng ...
3. Vào trang ...
4. ...

## Kết quả mong đợi

## Kết quả thực tế
<!-- Ảnh chụp màn hình, lỗi Console, request lỗi ở tab Network -->

## Môi trường
Nhánh/commit: ...   ·   Trình duyệt: ...   ·   Kích thước màn hình: ...
```
📄 **`.github/pull_request_template.md`**

```markdown
## Mô tả
<!-- Thay đổi gì và vì sao -->

Closes #

## Loại thay đổi
- [ ] feat  - [ ] fix  - [ ] refactor  - [ ] docs  - [ ] chore  - [ ] test

## Cách kiểm thử
1. `npm run reset-db && npm start`
2. Đăng nhập bằng ...
3. ...
Kết quả mong đợi: ...

## Ảnh chụp màn hình
<!-- Bắt buộc với thay đổi giao diện: desktop + mobile 375px; tab Network nếu liên quan request -->

## Checklist
- [ ] Tiêu đề PR theo Conventional Commits
- [ ] Đã rebase/merge develop mới nhất
- [ ] `npm run build` thành công, hook pre-push không báo lỗi
- [ ] Đã tự test các trường hợp chính và trường hợp lỗi (tắt json-server, Slow 3G nếu có gọi API)
- [ ] Component không import axios, không `.then()`, không `alert/confirm` (TECH-01, 02, 05)
- [ ] GET trong `useEffect` có AbortController + cleanup, bỏ qua lỗi hủy (TECH-03)
- [ ] Có loading / error / empty; render danh sách có `key`; Console không lỗi đỏ
- [ ] Không commit `.env`, `db.json` đã bị json-server ghi đè
- [ ] Đã cập nhật README (nếu cần)
```
```bash
npm run build                  # build được mới commit
git status                     # xem kỹ danh sách file
git add .github/ISSUE_TEMPLATE/feature_request.md \
        .github/ISSUE_TEMPLATE/bug_report.md \
        .github/pull_request_template.md
git commit -m "chore(setup): add issue and pull request templates" -m "Refs #1"
```

**Commit 2/3 — `chore(setup): add codeowners`**

📄 **`.github/CODEOWNERS`** — dòng sau ghi đè dòng trước, nên các dòng "ngoại lệ" để cuối.

```text
# Người sở hữu mặc định (thay @leader-A, @member-B, @member-C bằng username GitHub thật)
*                                       @leader-A

# A — repo, cấu hình, API lõi, routing, hooks
/.github/                               @leader-A
/.githooks/                             @leader-A
/package.json                           @leader-A
/src/App.jsx                            @leader-A
/src/api/axiosClient.js                 @leader-A
/src/hooks/                             @leader-A
**/*Auth*                               @leader-A
/src/pages/admin/AdminLaptopPage.jsx    @leader-A

# B — catalog
/src/utils/                             @member-B
/src/components/common/                 @member-B
/src/components/laptop/                 @member-B
/src/api/laptopApi.js                   @member-B
/src/api/catalogApi.js                  @member-B
**/*Review*                             @member-B
**/*Home*                               @member-B
**/*LaptopList*                         @member-B
**/*LaptopDetail*                       @member-B
**/*Navbar*                             @member-B
**/*Footer*                             @member-B
/README.md                              @member-B

# C — commerce, dữ liệu, kiểm thử
/db.json                                @member-C
/db.backup.json                         @member-C
/scripts/                               @member-C
**/*Cart*                               @member-C
**/*Checkout*                           @member-C
**/*Order*                              @member-C
**/*Toast*                              @member-C
/docs/TEST_REPORT.md                    @member-C

# Ngoại lệ (để cuối để ghi đè các dòng thư mục ở trên)
**/*Layout*                             @leader-A
**/*Filter*                             @leader-A
**/*Search*                             @leader-A
**/ProtectedRoute*                      @leader-A
**/ConfirmModal*                        @member-C
**/*LaptopForm*                         @member-C
```
Thay `@leader-A`, `@member-B`, `@member-C` bằng **username GitHub thật** của nhóm trước khi commit.

```bash
npm run build
git status
git add .github/CODEOWNERS
git commit -m "chore(setup): add codeowners" -m "Refs #1"
```

**Commit 3/3 — `chore(config): add env example and pre-push hook`**

📄 **`.env.example`**

```properties
# Copy file này thành .env (đã .gitignore). Sửa xong phải chạy lại npm run dev
VITE_API_URL=http://localhost:3001
VITE_API_TIMEOUT=8000
```
📄 **`.gitignore`** — thêm vào **cuối** file Vite đã sinh:

```gitignore
# env
.env
.env.local
!.env.example
```
📄 **`.githooks/pre-push`**

```bash
#!/bin/sh
# Kiểm tra quy tắc kỹ thuật + build trước mỗi lần push (thay cho CI).
# Bỏ qua khi thật cần: git push --no-verify
echo "pre-push: kiểm tra TECH-01, TECH-02, TECH-05..."
fail=0

if grep -rnE "\.then\(" src; then
  echo "✖ TECH-02: còn .then() — dùng async/await + try/catch"; fail=1
fi
if grep -rnE "useEffect\(\s*async" src; then
  echo "✖ TECH-02: callback của useEffect không được là async"; fail=1
fi
if grep -rlE "from ['\"]axios['\"]" src | grep -v "^src/api/"; then
  echo "✖ TECH-01: chỉ src/api được import axios"; fail=1
fi
if grep -rn "localhost:3001" src; then
  echo "✖ TECH-01: URL API viết cứng — dùng import.meta.env.VITE_API_URL"; fail=1
fi
if grep -rnE "(^|[^.A-Za-z_])(alert|confirm)\(|window\.(alert|confirm)\(" src; then
  echo "✖ TECH-05: dùng Toast / ConfirmModal thay cho alert / confirm"; fail=1
fi
[ "$fail" -eq 0 ] || { echo "Push bị huỷ — sửa các lỗi ở trên"; exit 1; }

echo "pre-push: npm run build..."
npm run build --silent || { echo "Build FAILED - push bị huỷ"; exit 1; }
```

```bash
npm run build
git status
git add .env.example .gitignore .githooks/pre-push
git update-index --chmod=+x .githooks/pre-push       # đánh dấu file hook chạy được (sau git add)
git commit -m "chore(config): add env example and pre-push hook" -m "Refs #1"
```

#### #1.3 — [A] Tự kiểm thử

```bash
cp .env.example .env
git status                     # .env KHÔNG xuất hiện (đã ignore)
sh .githooks/pre-push          # chạy thử hook bằng tay → in "pre-push: npm run build..." và build OK
```

- [ ] Mở từng file, kiểm tra đúng đường dẫn (`.github` nằm ở thư mục gốc, cùng cấp `package.json`)
- [ ] `git ls-files -s .githooks/pre-push` → cột đầu là `100755`
- [ ] Thử tạm thêm `fetch('x').then()` vào `src/App.jsx` → `sh .githooks/pre-push` báo ✖ TECH-02 → xoá dòng thử

#### #1.4 — [A] Push & mở Pull Request

```bash
git fetch origin
git rebase origin/develop      # cập nhật develop mới nhất (có xung đột → mục 7)
git push -u origin chore/1-repo-templates
```

Trên GitHub: **Compare & pull request** → kiểm tra **base: `develop`** ← **compare: `chore/1-repo-templates`**.

- **Title:** `chore(setup): add issue/pr templates and codeowners`
- **Reviewers:** B  ·  **Assignees:** A (Leader)  ·  **Labels:** `type: chore`, `module: infra`, `priority: high`  ·  **Projects:** `LaptopStore Board`  ·  **Milestone:** `Sprint 0 — Foundation`
- PR này chưa có mẫu tự điền (GitHub chỉ đọc template sau khi nó nằm trên `develop`) → dán nội dung PR bên dưới. Sau khi merge: **Issues → New issue** phải thấy 2 mẫu.
- **Description** (dán, rồi đính kèm ảnh chụp màn hình bằng cách kéo thả vào ô):

```markdown
## Mô tả
Chuẩn hoá repo: issue template, PR template, CODEOWNERS, file biến môi trường mẫu, git hook kiểm tra quy tắc TECH và build trước khi push.

Các file chính: `feature_request.md`, `bug_report.md`, `pull_request_template.md`, `CODEOWNERS`, `.env.example`, `.githooks/pre-push`

Closes #1

## Loại thay đổi
- [ ] feat  - [ ] fix  - [ ] refactor  - [ ] docs  - [x] chore  - [ ] test

## Cách kiểm thử
1. Mở từng file, kiểm tra đúng đường dẫn (`.github` nằm ở thư mục gốc, cùng cấp `package.json`)
2. `git ls-files -s .githooks/pre-push` → cột đầu là `100755`
3. `cp .env.example .env` → `git status` không thấy `.env`
4. `sh .githooks/pre-push` → build OK

## Ảnh chụp màn hình
<!-- kéo thả ảnh vào đây -->

## Checklist
- [x] Tiêu đề PR theo Conventional Commits
- [x] Đã rebase develop mới nhất
- [x] `npm run build` thành công, hook pre-push không báo lỗi
- [x] Đã tự test các trường hợp chính và trường hợp lỗi
- [x] Không commit `.env`
- [ ] Đã cập nhật README (nếu cần)
```

Bấm **Create pull request** (hoặc *Create draft pull request* nếu còn làm dở). Board: kéo thẻ issue **#1** sang **In review**. Nhắn reviewer link PR.

#### #1.5 — [B] Review

> Đây là PR đầu tiên của nhóm nên mục này hướng dẫn **toàn bộ thao tác review trên giao diện web GitHub**. Các PR sau (#2 → #31) làm y hệt, chỉ khác phần "Reviewer soi kỹ".
> **Người review: B.** A (tác giả) **không tự approve** được PR của mình. Nút *Approve* bị ẩn với tác giả.

**Bước 1 — Tìm PR cần review**

- **Cách 1:** GitHub gửi thông báo *"A requested your review on #32"*. Bấm chuông 🔔 (góc phải trên) hoặc mở email đó.
- **Cách 2:** repo → tab **Pull requests** → bộ lọc **Reviews → Awaiting review from you**. Hoặc gõ vào ô tìm kiếm: `is:pr is:open review-requested:@me`.
- Nếu không thấy: A chưa thêm B vào *Reviewers*. Nhắn A thêm, hoặc B tự vào PR, ở cột phải **Reviewers**, bấm ⚙ và chọn mình.

**Bước 2 — Tab *Conversation*: kiểm tra thông tin PR**

| Kiểm tra | Đúng là | Sai thì |
|---|---|---|
| Dòng dưới tiêu đề | `A wants to merge 3 commits into` **`develop`** `from` **`chore/1-repo-templates`** | Base là `main` → nhờ A bấm **Edit** cạnh tiêu đề, đổi base thành `develop` |
| Tiêu đề | `chore(setup): add issue/pr templates and codeowners` | Comment yêu cầu sửa |
| Mô tả | Có `Closes #1`, có mục *Cách kiểm thử* | Comment yêu cầu bổ sung |
| Cột phải **Development** | Hiện issue **#1** (được liên kết nhờ `Closes #1`) | Mô tả thiếu hoặc viết sai `Closes #1` |
| Cột phải Labels / Milestone / Projects | `type: chore`, `module: infra`, `priority: high` / `Sprint 0 — Foundation` / `LaptopStore Board` | Comment nhắc |

**Bước 3 — Tab *Commits*: kiểm tra lịch sử commit**

Phải có đúng 3 commit theo Conventional Commits, mỗi commit có `Refs #1` (bấm vào commit để xem phần mô tả):

```
chore(setup): add issue and pull request templates
chore(setup): add codeowners
chore(config): add env example and pre-push hook
```

Commit kiểu `update`, `fix file`, `asdf` → góp ý `nit:`. Không chặn merge vì PR sẽ được squash thành 1 commit.

**Bước 4 — Tab *Files changed*: đọc từng file**

1. Cây thư mục bên trái (nếu bị ẩn, bấm icon ☰ *Show file tree*). Kiểm tra **vị trí** các file:

   ```
   .env.example
   .githooks/pre-push
   .github/CODEOWNERS
   .github/ISSUE_TEMPLATE/bug_report.md
   .github/ISSUE_TEMPLATE/feature_request.md
   .github/pull_request_template.md               ← KHÔNG được nằm trong ISSUE_TEMPLATE
   .gitignore
   ```

   Thừa file (ví dụ `.env`, `node_modules/`, `dist/`) → **blocker**.
2. Bấm ⚙ (góc trên) để chọn *Split* (2 cột) hoặc *Unified*. File mới thì cột trái trống.
3. Với file `.md`, bấm icon 📄 **Display the rich diff** ở đầu file để xem nội dung đã định dạng.
4. Soi nội dung từng file:

| File | Cần kiểm tra |
|---|---|
| `feature_request.md`, `bug_report.md` | Có phần đầu nằm giữa hai dòng `---` (khai báo `name`, `about`, `title`, `labels`). Tên label trong `labels:` khớp đúng label đã tạo (`type: feature`, `type: bug`). |
| `pull_request_template.md` | Có dòng `Closes #`, mục *Cách kiểm thử*, *Checklist* |
| `CODEOWNERS` | **Không còn** `@leader-A`, `@member-B`, `@member-C`. Đã thay bằng username thật, đúng chủ module theo bảng phân công. Các dòng ngoại lệ nằm cuối file. |
| `.env.example` | Chỉ có 2 biến `VITE_API_URL`, `VITE_API_TIMEOUT` |
| `.gitignore` | Có `.env` và `!.env.example` |
| `pre-push` | Dòng đầu `#!/bin/sh`, có 5 kiểm tra và `npm run build` |

5. Đọc xong một file → tick **Viewed** ở góc phải file đó. File được thu gọn, thanh tiến độ "x / 7 files viewed" tăng lên.

**Bước 5 — Viết góp ý ngay trên dòng code**

1. Rê chuột vào **số dòng**, bấm dấu **+** màu xanh. Muốn chọn nhiều dòng: bấm số dòng đầu, giữ **Shift**, bấm số dòng cuối.
2. Gõ góp ý, **bắt đầu bằng tiền tố**:
   - `blocker:` — sai, phải sửa.
   - `suggestion:` — nên sửa.
   - `nit:` — chi tiết nhỏ.
   - `question:` — cần tác giả giải thích.
3. *(Tuỳ chọn)* Bấm icon **±** *Insert a suggestion* để đề xuất nội dung thay thế. Tác giả bấm **Commit suggestion** là sửa xong, không cần sửa tay.
4. Bấm **Start a review**, **không** bấm *Add single comment*. Các góp ý được gom lại, gửi một lần ở Bước 6, tác giả chỉ nhận 1 thông báo.
5. Lặp lại cho các dòng khác. Các góp ý đang chờ có nhãn **Pending**.

Ví dụ góp ý cho PR này:

```markdown
blocker: `pull_request_template.md` đang nằm trong `.github/ISSUE_TEMPLATE/` — GitHub sẽ coi nó là mẫu issue thứ 3.
Chuyển lên `.github/pull_request_template.md`.
```

```markdown
blocker: CODEOWNERS còn `@member-C` — chưa thay username thật.
```

```markdown
suggestion: dòng `**/*Layout*` nên để dưới `/src/components/common/` — CODEOWNERS lấy dòng khớp CUỐI CÙNG.
```

**Bước 6 — Gửi kết quả review**

1. Bấm nút xanh **Review changes** (góc phải trên tab *Files changed*; giao diện mới ghi **Submit review**).
2. Ô *Leave a comment*: viết nhận xét tổng.
3. Chọn **một** trong ba:

| Lựa chọn | Khi nào |
|---|---|
| **Comment** | Chỉ hỏi (`question:`), chưa kết luận |
| **Approve** | Đạt yêu cầu, không còn `blocker:` (`nit:` vẫn approve được) |
| **Request changes** | Có ít nhất một `blocker:` → **chặn merge** cho đến khi B approve lại |

4. Bấm **Submit review**.

Nhận xét tổng mẫu khi **Approve**:

```markdown
Đã kiểm tra 7 file trên tab Files changed:
- Vị trí: 2 issue template trong `.github/ISSUE_TEMPLATE/`, PR template và CODEOWNERS ở `.github/` — đúng.
- CODEOWNERS đã dùng username thật, đúng chủ module.
- `.env` đã được ignore, `.env.example` không có thông tin thừa.
- Đã chạy `sh .githooks/pre-push` trên máy → build OK.
- 3 commit đúng Conventional Commits, có `Refs #1`.
LGTM 👍 — sau khi merge mình sẽ thử Issues → New issue để xác nhận template hoạt động.
```

Nhận xét tổng mẫu khi **Request changes**:

```markdown
Còn 2 blocker (xem comment trên dòng): vị trí `pull_request_template.md` và username trong CODEOWNERS.
Sửa xong nhờ bạn bấm Re-request review, mình xem lại ngay.
```

**Bước 7 — Vòng sửa & review lại (nếu đã Request changes)**

1. **A** sửa bằng **commit mới**: `git commit -m "fix(setup): move pull request template to .github" -m "Refs #1"` rồi `git push`. Hoặc bấm **Commit suggestion** ngay trên web.
2. A trả lời từng comment ("Đã sửa ở commit abc123"). Ở cột phải PR, cạnh tên B, bấm 🔄 **Re-request review**.
3. **B** mở lại tab *Files changed*: GitHub hiện thông báo **"Changes since your last review"**, có nút xem riêng phần mới sửa. Kiểm tra từng chỗ đã sửa → bấm **Resolve conversation** dưới mỗi góp ý đã xử lý xong.
4. **Review changes → Approve → Submit review**.

**Bước 8 — Sau khi Approve**

- **B không merge.** Người merge là tác giả A, theo bước #1.6. Điều kiện merge: đủ approve, mọi conversation đã *Resolve*.
- Tab *Conversation* lúc này hiện ✅ **"Changes approved — B approved these changes"**.
- **Sau khi A merge**, B kiểm tra template đã chạy (GitHub chỉ đọc template từ nhánh mặc định `develop`):
  - **Issues → New issue** → thấy 2 mẫu *Feature request*, *Bug report*. Mở thử rồi đóng tab, **không bấm Create**.
  - Mở file `.github/CODEOWNERS` trên GitHub → không có cảnh báo vàng về lỗi cú pháp.

*(Tuỳ chọn)* Kiểm tra trên máy trước khi approve:

```bash
git fetch origin
git switch chore/1-repo-templates        # hoặc: gh pr checkout <số-PR>
npm install
sh .githooks/pre-push
git ls-files -s .githooks/pre-push       # cột đầu 100755 = có quyền chạy
git switch develop
```

#### #1.6 — [A] Merge & dọn dẹp

1. Trước khi merge: `git fetch origin && git rebase origin/develop && npm run build && git push --force-with-lease`.
2. Điều kiện: ≥ 1 **Approve**, mọi conversation đã resolve, build pass.
3. Mũi tên cạnh nút merge → **Squash and merge** → tiêu đề: `chore(setup): add issue/pr templates and codeowners (#<số-PR>)` → phần mô tả xoá danh sách commit con, chỉ giữ dòng `Closes #1` → **Confirm squash and merge**.
4. Kiểm tra: issue #1 tự **Closed**, thẻ trên board sang **Done**, nhánh trên GitHub đã tự xoá.
5. Dọn local:

```bash
git switch develop
git pull
git branch -D chore/1-repo-templates
git fetch --prune
```

6. **[A][B][C] mỗi người bật hook và tạo `.env` trên máy mình** (làm 1 lần):

```bash
git switch develop && git pull
git config core.hooksPath .githooks     # từ giờ mỗi lần git push sẽ chạy .githooks/pre-push
cp .env.example .env
```

✅ **Xong #1:** [ ] code đủ tiêu chí · [ ] 3 commit đúng chuẩn có `Refs #1` · [ ] PR có `Closes #1`, đủ label/milestone/board · [ ] reviewer approve · [ ] squash merge · [ ] issue đóng, nhánh đã xoá · [ ] cả nhóm đã bật hook

---

### #2 — Project setup & configuration (A)

| | |
|---|---|
| 👤 Người làm | **A (Leader)** |
| 👀 Reviewer | **C** |
| Nhánh | `feature/2-project-setup` |
| Milestone | `Sprint 0 — Foundation` |
| Cần merge trước | #1 |
| Tiêu đề PR | `chore(setup): configure dependencies, scripts and folder structure` |

#### #2.1 — [A] Nhận việc & tạo nhánh

```bash
git switch develop && git pull origin develop
git switch -c feature/2-project-setup
```
Board → kéo thẻ **#2** sang **In progress**.

#### #2.2 — [A] Code & commit

**Commit 1/4 — `chore(deps): add axios, react-bootstrap, router and json-server`**

```bash
npm install axios react-bootstrap bootstrap react-router-dom@6
npm install -D -E json-server@0.17.4
npm install -D concurrently
npm run build
git add package.json package-lock.json
git commit -m "chore(deps): add axios, react-bootstrap, router and json-server" -m "Refs #2"
```
> Dùng **json-server 0.17.4** (không dùng bản 1.x beta) vì bản 0.17 hỗ trợ đủ `_page`, `_limit`, `_sort`, `_order`, `q`, `_expand`, `_embed`, `_gte/_lte`, `_ne` và header `X-Total-Count`.

**Commit 2/4 — `chore(config): add json-server scripts and sample db`**

📄 **`package.json`** — thêm vào mục `scripts` (giữ nguyên các script Vite đã sinh):

```json
"server": "json-server db.json --port 3001 --delay 500",
"server:watch": "json-server --watch db.json --port 3001 --delay 500",
"start": "concurrently -k -n API,WEB -c cyan,magenta \"npm run server\" \"npm run dev\"",
"reset-db": "node scripts/reset-db.js"
```
> `server` **không** dùng `--watch`: với `--watch`, json-server tự khởi động lại mỗi khi `db.json` đổi, nên khi thanh toán / xoá hàng loạt (nhiều request ghi liên tiếp) sẽ bị "Không kết nối được máy chủ". Không watch thì json-server vẫn lưu dữ liệu vào `db.json`; chỉ cần **chạy lại `npm start` sau `npm run reset-db`** (xem `Assignment_code.md` #2).
📄 **`scripts/reset-db.js`**

```js
// Khôi phục db.json về dữ liệu gốc: npm run reset-db
import { copyFileSync } from 'node:fs';

copyFileSync(new URL('../db.backup.json', import.meta.url), new URL('../db.json', import.meta.url));
console.log('✔ Đã khôi phục db.json từ db.backup.json');
```
📄 **`db.json`** và **`db.backup.json`**: chép dữ liệu mẫu ở mục 0.4 của đề (C bổ sung đủ ở #3).

```bash
npm run reset-db && npm start          # http://localhost:3001/laptops thấy JSON → Ctrl + C
git add package.json scripts/reset-db.js db.json db.backup.json
git commit -m "chore(config): add json-server scripts and sample db" -m "Refs #2"
```

**Commit 3/4 — `chore(setup): import bootstrap and clean vite boilerplate`**

- `src/main.jsx`: thêm `import 'bootstrap/dist/css/bootstrap.min.css';` (trước `import App`), xoá `import './index.css'` nếu không dùng.
- `src/App.jsx`: thay nội dung mẫu bằng một `Container` hiển thị "LaptopStore".
- Xoá `src/App.css`, `src/assets/react.svg`, `public/vite.svg`; trong `index.html` đổi `<title>LaptopStore</title>`.

```bash
npm run build
git add -A src index.html public
git commit -m "chore(setup): import bootstrap and clean vite boilerplate" -m "Refs #2"
```

**Commit 4/4 — `chore(setup): add required folder structure`**

```bash
for d in src/api src/hooks src/contexts src/utils src/pages/admin \
         src/components/layout src/components/common src/components/laptop docs; do
  mkdir -p "$d" && touch "$d/.gitkeep"
done
git add src docs
git commit -m "chore(setup): add required folder structure" -m "Refs #2"
```

#### #2.3 — [A] Tự kiểm thử

- [ ] `npm start` → `http://localhost:3001/laptops` có JSON, `http://localhost:5173` hiện "LaptopStore" với style Bootstrap
- [ ] `npm run build` pass; `git status` sạch
- [ ] Thêm/sửa dữ liệu qua json-server rồi `npm run reset-db` → `db.json` trở lại như cũ

#### #2.4 — [A] Push & mở Pull Request

```bash
git fetch origin && git rebase origin/develop
git push -u origin feature/2-project-setup      # hook pre-push chạy
```
- **Title:** `chore(setup): configure dependencies, scripts and folder structure` · **Reviewers:** C · **Labels:** `type: feature`, `module: infra`, `priority: high` · **Projects** · **Milestone** `Sprint 0 — Foundation`.
- Ô mô tả đã **tự điền template** → điền *Mô tả*, `Closes #2`, *Cách kiểm thử*, ảnh chụp 2 trang trình duyệt.

#### #2.5 — [C] Review

Làm theo 8 bước như #1.5. **Soi kỹ:**
- `package.json`: `json-server` đúng `0.17.4` (không có `^`), nằm trong `devDependencies`; script `start` có `-k`.
- Không còn file mẫu Vite thừa; `index.html` đã đổi title.
- Trên máy: `git switch feature/2-project-setup && npm install && npm start` chạy được cả 2 cổng.

#### #2.6 — [A] Merge & dọn dẹp

Squash and merge (tiêu đề `chore(setup): configure dependencies, scripts and folder structure (#<số-PR>)`) → dọn local. **[B][C]** sau khi pull: `npm install`.

---

### Các issue còn lại — thẻ thực hiện

Mỗi issue từ #3 trở đi làm **y hệt quy trình #1/#2** (nhận việc → nhánh → commit k/n → tự kiểm thử → push → PR theo template → review 8 bước → squash merge → dọn local). Thẻ dưới đây chỉ ghi phần **khác nhau**: nhánh, tiêu đề PR, các commit gợi ý (mỗi commit kèm `-m "Refs #n"`), cách tự kiểm thử và điều **reviewer cần soi kỹ**. Labels / Milestone / Projects của PR copy từ issue.

#### #3 — Seed data (C)

| 👤 C · 👀 A | Nhánh `chore/3-seed-data` · Cần merge trước: #2 · PR: `chore(seed): add sample data for json-server` |
|---|---|

- **Commit 1/3** `chore(seed): add brands, categories and users` · **2/3** `chore(seed): add 16 laptops with varied price and stock` · **3/3** `chore(seed): add reviews and sync db backup`
- **Tự kiểm thử:** chạy từng URL ở bảng 0.5 của đề, chụp header `x-total-count` của `/laptops?_page=1&_limit=8`.
- **Reviewer soi kỹ:** đủ số lượng tối thiểu; các trường số không bị để dạng chuỗi (`"16"`); có laptop `stock: 0` và `stock < 5`; `salePrice` hợp lệ (BR-03); `db.json` giống `db.backup.json`.

#### #4 — Format utils (B)

| 👤 B · 👀 C | Nhánh `feature/4-format-utils` · Cần merge trước: #2 · PR: `feat(utils): add price and date formatters` |
|---|---|

- **Commit 1/2** `feat(utils): add formatPrice and formatDate` · **2/2** `feat(utils): add selling price and discount helpers`
- **Tự kiểm thử:** tạm `console.log(formatPrice(39990000), formatDate('2026-09-10T10:00:00Z'))` trong `App.jsx`, xem Console rồi xoá.
- **Reviewer soi kỹ:** dùng `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`; ngày có số 0 đứng trước (`10/09/2026`); `null` không crash.

#### #5 — axiosClient & interceptors (A)

| 👤 A · 👀 B | Nhánh `feature/5-axios-client` · Cần merge trước: #2 · PR: `feat(api): add axios client with interceptors` |
|---|---|

- **Commit 1/3** `feat(api): create axios instance from env config` · **2/3** `feat(api): attach token and measure time in request interceptor` · **3/3** `feat(api): normalize error messages and keep cancel errors`
- **Tự kiểm thử:** gọi tạm `axiosClient.get('/laptops')` → Console có `[API] 200 GET /laptops – ...ms`; tắt json-server → "Không kết nối được máy chủ..."; gọi `/laptops/9999` → "Không tìm thấy dữ liệu".
- **Reviewer soi kỹ:** nhánh `axios.isCancel(error)` **trả nguyên `error`** và đứng **đầu tiên**; response thành công trả nguyên `response`; log chỉ khi `import.meta.env.DEV`; 401 xoá `token` + `user`.

#### #6 — Laptop, catalog & review services (B)

| 👤 B · 👀 C | Nhánh `feature/6-laptop-catalog-review-api` · Cần merge trước: #5 · PR: `feat(api): add laptop, catalog and review services` |
|---|---|

- **Commit 1/3** `feat(api): add laptop service with paging total` · **2/3** `feat(api): add catalog service` · **3/3** `feat(api): add review service`
- **Tự kiểm thử:** gọi `laptopApi.getAll({ _page: 1, _limit: 8 })` → `total` ≥ 16; `getById(1)` có `brand`, `category`.
- **Reviewer soi kỹ:** `total = Number(res.headers['x-total-count'])`; mọi tham số qua `params` (TECH-04); hàm nhận `signal` và truyền vào config `{ params, signal }`.

#### #7 — Cart & order services (C)

| 👤 C · 👀 A | Nhánh `feature/7-cart-order-api` · Cần merge trước: #5 · PR: `feat(api): add cart and order services` |
|---|---|

- **Commit 1/2** `feat(api): add cart service` · **2/2** `feat(api): add order service`
- **Tự kiểm thử:** thử `cartApi.add({ userId: 2, laptopId: 1, quantity: 1 })` → `db.json` có bản ghi → `npm run reset-db`.
- **Reviewer soi kỹ:** `updateQuantity` và `updateStatus` dùng **PATCH**; `orderApi.getByUser` có `_sort=createdAt&_order=desc`; không commit `db.json` đã bị ghi.

## Sprint: Sprint 1 — Core UI & Auth

#### #8 — Fake login & AuthContext (A)

| 👤 A · 👀 C | Nhánh `feature/8-login` · Cần merge trước: #5, #9 · PR: `feat(auth): add fake login with auth context` |
|---|---|

- **Commit 1/3** `feat(auth): add auth service with fake token` · **2/3** `feat(auth): add auth context with persisted user` · **3/3** `feat(auth): add login page with validation`
- **Tự kiểm thử:** đăng nhập sai → thông báo lỗi; đúng → localStorage có `token`, `user` (không có `password`); F5 vẫn đăng nhập; Network có header `Authorization`.
- **Reviewer soi kỹ:** không lưu `password`; lỗi form chỉ hiện sau khi chạm ô/submit; nút có Spinner + `disabled` khi gửi; `navigate(from, { replace: true })`.

#### #9 — Routes, layouts & 404 (A)

| 👤 A · 👀 B | Nhánh `feature/9-routes-layout` · Cần merge trước: #2 · PR: `feat(router): add routes, layouts and not found page` |
|---|---|

- **Commit 1/3** `feat(layout): add main and admin layouts with outlet` · **2/3** `feat(router): declare all routes with placeholder pages` · **3/3** `feat(router): add not found page and page title hook`
- **Tự kiểm thử:** gõ lần lượt 13 URL của bảng route → đúng layout/placeholder; `/abc` → 404; tab trình duyệt đổi tiêu đề.
- **Reviewer soi kỹ:** đủ 13 route; route con dùng `<Outlet />`; `/admin` dùng `<Navigate replace />`; placeholder đặt đúng tên file theo cấu trúc 0.6 để người khác chỉ việc thay nội dung.

#### #10 — ProtectedRoute (A)

| 👤 A · 👀 C | Nhánh `feature/10-protected-route` · Cần merge trước: #8, #9, #12 · PR: `feat(auth): add role-based protected route` |
|---|---|

- **Commit 1/2** `feat(auth): add protected route with redirect state` · **2/2** `feat(auth): guard customer and admin routes by role`
- **Tự kiểm thử:** kịch bản 7 (chưa đăng nhập → `/login` → quay lại trang cũ) và 12 (customer gõ `/admin` → về `/` + Toast).
- **Reviewer soi kỹ:** `state={{ from: location }}`; Toast gọi trong `useEffect`, không gọi trong lúc render; đã đăng nhập vào `/login` → về `/`.

#### #11 — Common components (B)

| 👤 B · 👀 A | Nhánh `feature/11-common-components` · Cần merge trước: #4 · PR: `feat(ui): add loading, error, empty state and price components` |
|---|---|

- **Commit 1/3** `feat(ui): add loading spinner and card skeleton` · **2/3** `feat(ui): add error alert with retry and empty state` · **3/3** `feat(ui): add price component with discount badge`
- **Tự kiểm thử:** đặt tạm các component vào `App.jsx` với dữ liệu giả, chụp ảnh đính kèm PR rồi xoá.
- **Reviewer soi kỹ:** skeleton dùng `Placeholder` (không chỉ 1 Spinner); `ErrorAlert` có nút **Thử lại** gọi `onRetry`; `Price` không hiện badge khi `salePrice = null`.

#### #12 — ToastContext & ConfirmModal (C)

| 👤 C · 👀 B | Nhánh `feature/12-toast-confirm-modal` · Cần merge trước: #2 · PR: `feat(ui): add toast context and confirm modal` |
|---|---|

- **Commit 1/2** `feat(ui): add toast context with auto hide` · **2/2** `feat(ui): add reusable confirm modal`
- **Tự kiểm thử:** bấm liên tục 3 nút thử → 3 toast xếp chồng, tự ẩn sau 3 giây; modal mở/đóng, nút xác nhận có Spinner khi `loading`.
- **Reviewer soi kỹ:** `ToastProvider` bọc ngoài các route; mỗi toast có `id` làm `key`; không còn `alert` / `confirm`.

#### #13 — useAxios & useDebounce (A)

| 👤 A · 👀 B | Nhánh `feature/13-use-axios-debounce` · Cần merge trước: #5 · PR: `feat(hooks): add useAxios and useDebounce hooks` |
|---|---|

- **Commit 1/3** `feat(hooks): add useDebounce hook` · **2/3** `feat(hooks): add useAxios with abort controller` · **3/3** `feat(hooks): add refetch and setData to useAxios`
- **Tự kiểm thử:** StrictMode → Network có 1 request *(canceled)* + 1 thành công khi mới vào trang thử; Slow 3G đổi tham số nhanh → request cũ bị hủy, không hiện lỗi.
- **Reviewer soi kỹ:** bỏ qua lỗi hủy **trước** khi `setLoading(false)`; cleanup gọi `controller.abort()`; `refetch` không tạo vòng lặp render.

#### #14 — AppNavbar & Footer (B)

| 👤 B · 👀 C | Nhánh `feature/14-navbar-footer` · Cần merge trước: #8, #9, #12 · PR: `feat(layout): add navbar and footer` |
|---|---|

- **Commit 1/3** `feat(layout): add cart context and search placeholders` (bản tạm `CartContext`, `SearchSuggest` + `CartProvider` trong `main.jsx`) · **2/3** `feat(layout): add responsive navbar with account dropdown` · **3/3** `feat(layout): add footer`
- **Tự kiểm thử:** đăng nhập admin / customer / chưa đăng nhập → menu đúng; 375px → nút hamburger, không cuộn ngang.
- **Reviewer soi kỹ:** dùng `as={NavLink}` cho link; mục "Quản trị" chỉ khi `isAdmin`; bản tạm `CartContext` đúng tên trường `totalQuantity`; sửa `main.jsx` của A → A review thêm.

#### #15 — LaptopCard & LaptopGrid (B)

| 👤 B · 👀 A | Nhánh `feature/15-laptop-card-grid` · Cần merge trước: #11, #14 · PR: `feat(ui): add laptop card and grid` |
|---|---|

- **Commit 1/3** `feat(cart): add useAddToCart placeholder hook` · **2/3** `feat(ui): add laptop card with stock and price badges` · **3/3** `feat(ui): add responsive laptop grid with loading and empty states`
- **Tự kiểm thử:** grid với dữ liệu thật ở 4 kích thước màn hình; laptop `stock = 0` nút disable.
- **Reviewer soi kỹ:** `Row xs={1} sm={2} md={3} lg={4}`; tên 2 dòng bằng CSS (`-webkit-line-clamp`); `onError` của ảnh không lặp vô hạn; `key={laptop.id}`.

## Sprint: Sprint 2 — Catalog & Detail

#### #16 — Home page (B)

| 👤 B · 👀 C | Nhánh `feature/16-home-page` · Cần merge trước: #6, #13, #15 · PR: `feat(home): load home sections in parallel` |
|---|---|

- **Commit 1/3** `feat(home): load home sections with Promise.all` · **2/3** `feat(home): add carousel, bestseller, new arrivals and brand buttons` · **3/3** `perf(home): compare sequential and parallel loading time`
- **Tự kiểm thử:** kịch bản 1, 2; chụp Waterfall 4 request thẳng hàng; ghi số đo vào mô tả PR.
- **Reviewer soi kỹ:** 4 request trong **một** `Promise.all`; badge thời gian chỉ ở DEV; `loadSequential` không chạy ở production.

#### #18 — LaptopFilter (A)

> Làm **trước #17** vì #17 dùng component này.

| 👤 A · 👀 B | Nhánh `feature/18-laptop-filter` · Cần merge trước: #6 · PR: `feat(list): add controlled laptop filter` |
|---|---|

- **Commit 1/2** `feat(list): add controlled laptop filter form` · **2/2** `feat(list): validate price range before applying`
- **Tự kiểm thử:** đổi từng ô → `onChange` nhận đúng patch; min > max báo lỗi, nút "Áp dụng" bị khoá.
- **Reviewer soi kỹ:** component **không** gọi `useSearchParams` (controlled); có prop `idPrefix` để render 2 lần (cột trái + Offcanvas ở #17) không trùng `id`; nút "Xóa bộ lọc" gọi `onReset`.

#### #17 — Laptop list (B)

| 👤 B · 👀 A | Nhánh `feature/17-laptop-list` · Cần merge trước: #6, #13, #15, #18 · PR 1: `feat(list): sync filters with url and paginate` · PR 2: `feat(list): add sorting, keyword search and request cancel` |
|---|---|

- **PR 1** (mô tả ghi `Part of #17`): **Commit 1/3** `feat(list): read and write filters with useSearchParams` · **2/3** `feat(list): map url filters to json-server params` · **3/3** `feat(list): add pagination from total count`
- **PR 2** (mô tả ghi `Closes #17`, nhánh mới `feature/17-laptop-list-sort`): **Commit 1/3** `feat(list): add sort options` · **2/3** `feat(list): add debounced keyword search` · **3/3** `feat(list): show filter in offcanvas on small screens`
- **Tự kiểm thử:** kịch bản 2, 3, 4; copy URL sang tab mới; nút Back.
- **Reviewer soi kỹ:** đổi bộ lọc → `page` về 1; `sort` map đúng `_sort/_order`; `price_gte/price_lte`, `ram_gte` truyền qua `params`; Slow 3G → 3 *(canceled)*, không Alert lỗi.

#### #19 — Navbar search suggestions (A)

| 👤 A · 👀 C | Nhánh `feature/19-search-suggest` · Cần merge trước: #13, #14 · PR: `feat(search): add navbar search suggestions` |
|---|---|

- **Commit 1/2** `feat(search): fetch suggestions with debounce and cancel` · **2/2** `feat(search): add keyboard and outside click handling`
- **Tự kiểm thử:** kịch bản 5; gõ "macbook" nhanh → 1 request; Esc đóng dropdown.
- **Reviewer soi kỹ:** từ khoá rỗng không gọi API; sửa `AppNavbar` của B → B review thêm.

#### #20 — Laptop detail (B)

| 👤 B · 👀 A | Nhánh `feature/20-laptop-detail` · Cần merge trước: #6, #13, #15 · PR: `feat(detail): add laptop detail page` |
|---|---|

- **Commit 1/3** `feat(detail): load laptop then reviews and related with allSettled` · **2/3** `feat(detail): add breadcrumb, specs table and tabs` · **3/3** `fix(detail): share one abort signal across detail requests`
- **Tự kiểm thử:** kịch bản 6, 19; đổi tạm URL reviews thành `/reviewsX` → trang vẫn hiện thông tin; `/laptops/abc` → 404.
- **Reviewer soi kỹ:** bước 1 lỗi → lỗi toàn trang, bước 2 lỗi → chỉ cảnh báo khu vực; **cùng một** `signal`; id không phải số bị chặn trước khi gọi API.

#### #21 — Review list & form (B)

| 👤 B · 👀 C | Nhánh `feature/21-reviews` · Cần merge trước: #20 · PR: `feat(review): add review list and form` |
|---|---|

- **Commit 1/3** `feat(review): add review list` · **2/3** `feat(review): add review form with validation` · **3/3** `feat(review): allow one review per user per laptop`
- **Tự kiểm thử:** gửi đánh giá → hiện đầu danh sách ngay; vào lại → form ẩn; nội dung 5 ký tự → báo lỗi.
- **Reviewer soi kỹ:** BR-07; dùng `setData` thay vì tải lại trang; nút gửi có Spinner + disabled.

## Sprint: Sprint 3 — Cart, Order & Admin

#### #22 — CartContext (C)

| 👤 C · 👀 A (+ B vì thay bản tạm của B) | Nhánh `feature/22-cart-context` · Cần merge trước: #7, #8, #15 · PR: `feat(cart): add cart context` |
|---|---|

- **Commit 1/3** `feat(cart): load cart items after login` · **2/3** `feat(cart): add or increase item within stock` · **3/3** `feat(cart): connect add to cart button` (thay toàn bộ 2 bản tạm `CartContext.jsx`, `useAddToCart.js`)
- **Tự kiểm thử:** kịch bản 7, 8, 9; thêm cùng laptop 2 lần → 1 dòng `quantity: 2`.
- **Reviewer soi kỹ:** PATCH khi đã có, POST khi chưa (không tạo dòng trùng); chặn vượt `stock` trước khi gửi request; đăng xuất xoá giỏ trong context.

#### #23 — Cart page (C)

| 👤 C · 👀 B | Nhánh `feature/23-cart-page` · Cần merge trước: #12, #22 · PR: `feat(cart): add cart page with optimistic delete` |
|---|---|

- **Commit 1/3** `feat(cart): add cart table with totals` · **2/3** `feat(cart): update quantity with stock limit` · **3/3** `feat(cart): optimistic delete with rollback`
- **Tự kiểm thử:** kịch bản 8, 9, 17 (tắt json-server rồi xoá → dòng biến mất rồi khôi phục + Toast).
- **Reviewer soi kỹ:** lưu bản sao trước khi xoá; rollback đúng bản sao; tổng tiền dùng giá bán (BR-03).

#### #24 — Checkout (C)

| 👤 C · 👀 A | Nhánh `feature/24-checkout` · Cần merge trước: #23 · PR: `feat(checkout): add checkout flow` |
|---|---|

- **Commit 1/4** `feat(checkout): add customer form with validation` · **2/4** `feat(checkout): verify latest stock with Promise.all` · **3/4** `feat(checkout): create order then update stock and clear cart` · **4/4** `feat(checkout): redirect to orders with success message`
- **Tự kiểm thử:** kịch bản 10; sửa tay `stock` trong `db.json` nhỏ hơn số lượng giỏ → báo "… chỉ còn x sản phẩm" → `npm run reset-db`.
- **Reviewer soi kỹ:** comment đánh số 5 bước; bước 1 `Promise.all`, bước 3 `Promise.allSettled`; `total` tính lại ở client; SĐT đúng BR-08.

#### #25 — My orders (C)

| 👤 C · 👀 B | Nhánh `feature/25-my-orders` · Cần merge trước: #13, #24 · PR: `feat(order): add my orders page with cancel` |
|---|---|

- **Commit 1/2** `feat(order): list orders of current user` · **2/2** `feat(order): cancel pending order and restore stock`
- **Tự kiểm thử:** kịch bản 11; F5 sau khi đặt hàng không hiện lại Toast.
- **Reviewer soi kỹ:** chỉ đơn `pending` có nút hủy (BR-05); cộng lại stock song song; xoá `location.state` bằng `navigate(location.pathname, { replace: true })`.

#### #26 — Admin laptop table (A)

| 👤 A · 👀 C | Nhánh `feature/26-admin-laptops` · Cần merge trước: #6, #10, #13 · PR: `feat(admin): add admin laptop table` |
|---|---|

- **Commit 1/3** `feat(admin): add laptop table with search and paging` · **2/3** `feat(admin): quick edit stock with PATCH` · **3/3** `feat(admin): optimistic delete with rollback`
- **Tự kiểm thử:** kịch bản 15 (Network: PATCH chỉ có `{ stock }`); tắt json-server rồi xoá → khôi phục.
- **Reviewer soi kỹ:** tồn kho < 5 tô `text-danger`; Enter lưu, Esc huỷ; dùng `useAxios` + `useDebounce`.

#### #27 — Admin laptop form (C)

| 👤 C · 👀 A | Nhánh `feature/27-admin-laptop-form` · Cần merge trước: #6, #10, #13 · PR: `feat(admin): add laptop create/edit form` |
|---|---|

- **Commit 1/3** `feat(admin): add laptop form with validation rules` · **2/3** `feat(admin): create laptop with default fields` · **3/3** `feat(admin): edit laptop with full PUT payload`
- **Tự kiểm thử:** kịch bản 13, 14; sửa laptop → `sold`, `rating`, `createdAt` không đổi.
- **Reviewer soi kỹ:** chuyển chuỗi sang `Number`; `salePrice` trống → `null`; PUT gửi đủ object; một trang cho cả 2 route.

#### #28 — Admin orders (C)

| 👤 C · 👀 B | Nhánh `feature/28-admin-orders` · Cần merge trước: #7, #10, #13, #25 · PR: `feat(admin): add admin order management` |
|---|---|

- **Commit 1/2** `feat(admin): list orders filtered by status` · **2/2** `feat(admin): change order status in one direction`
- **Tự kiểm thử:** đổi `pending → confirmed → shipping → done`; đơn `done` không đổi được.
- **Reviewer soi kỹ:** BR-06; `?status=` trên URL; PATCH chỉ gửi `{ status }`.

#### #29 — Bulk delete (A)

| 👤 A · 👀 B | Nhánh `feature/29-bulk-delete` · Cần merge trước: #26 · PR: `feat(admin): add bulk delete for laptops` |
|---|---|

- **Commit 1/2** `feat(admin): select rows and select all on current page` · **2/2** `feat(admin): bulk delete with Promise.allSettled`
- **Tự kiểm thử:** kịch bản 16; xoá hết trang cuối → tự lùi trang.
- **Reviewer soi kỹ:** DELETE song song; Toast đếm đúng thành công/thất bại; dòng thất bại vẫn được chọn.

## Sprint: Sprint 4 — Test & Release v1.0.0

#### #30 — README (B)

| 👤 B · 👀 A | Nhánh `docs/30-readme` · Cần merge trước: #16 (và các chức năng chính) · PR: `docs(readme): add setup guide, timing results and answers` |
|---|---|

- **Commit 1/2** `docs(readme): add setup guide and demo accounts` · **2/2** `docs(readme): add timing results and answers to four questions`
- **Reviewer soi kỹ:** làm theo README trên một thư mục clone mới → chạy được; 4 câu trả lời đúng bản chất (lỗi hủy, `all` vs `allSettled`, PATCH vs PUT, StrictMode).

#### #31 — Test report & video (C)

| 👤 C · 👀 A | Nhánh `test/31-test-report` (tạo từ `release/1.0.0`, xem mục 6) · Cần merge trước: #1 – #30 · PR: `test(release): add test report for 19 scenarios` |
|---|---|

- **Commit 1/1** `test(release): add test report for 19 scenarios`
- Xem [mục 5](#5-tester-cuối-sprint) và [mục 6](#6-release-v100--quy-trình-merge-vào-main).

---

## 5. Tester cuối sprint

Cuối mỗi sprint, 1 người **không phải tác giả** của phần đó chạy các kịch bản kiểm thử liên quan trên `develop` mới nhất:

```bash
git switch develop && git pull && npm install && npm run reset-db && npm start
```

| Sprint | Tester | Kịch bản (mục "Kịch bản kiểm thử tổng" của đề) |
|---|---|---|
| Sprint 0 | B | Tiêu chí đạt Phần 0 và B (tắt json-server, `/laptops/9999`) |
| Sprint 1 | C | 7, 12, 19 (phần route) |
| Sprint 2 | C | 1 – 6, 19 |
| Sprint 3 | B | 8 – 18 |
| Sprint 4 | A + C | Toàn bộ 1 – 19 trên `release/1.0.0` |

Gặp lỗi:
1. **Issues → New issue → Bug report** → điền đủ các mục, chọn **Assignees** = chủ module (xem CODEOWNERS), **Labels** `type: bug` + `module: ...` + `priority: ...`, **Projects**, **Milestone** sprint hiện tại.
2. Người được giao tạo nhánh `fix/<số-issue>-<mo-ta>` từ `develop`, commit `fix(<scope>): ...` + `Refs #<số>`, PR `Closes #<số>`, review như thường.
3. Lỗi nằm trong PR **đang review** → không tạo issue, comment trực tiếp vào PR.

Kết thúc sprint: Leader mở **Issues → Milestones** → sprint đạt 100% thì **Close milestone**; issue chưa xong chuyển sang sprint sau và comment lý do.

---

## 6. Release v1.0.0 & quy trình merge vào main

> Điều kiện: mọi issue #1–#30 đã đóng (bug phát sinh cũng đã đóng).

**6.1 [A] Tạo nhánh release & đổi version**

```bash
git switch develop && git pull
git switch -c release/1.0.0
npm version 1.0.0 --no-git-tag-version      # package.json + package-lock.json: "version": "1.0.0"
git add package.json package-lock.json
git commit -m "chore(release): bump version to 1.0.0"
git push -u origin release/1.0.0
```

**6.2 [Tester A + C] Kiểm thử trên `release/1.0.0`** (issue #31). C tạo `test/31-test-report` **từ `release/1.0.0`**, viết `docs/TEST_REPORT.md`:

```markdown
| # | Kịch bản | Người test | Kết quả | Bug |
|---|---|---|---|---|
| 1 | Vào `/` – skeleton, khối Bán chạy, Mới về, badge DEV | C | ✅ Pass | |
| 4 | Slow 3G bấm nhanh 4 hãng | A | ❌ Fail → ✅ Pass | #45 |
| ... | | | | |
```

PR của #31 và mọi PR sửa lỗi trong giai đoạn này có **base `release/1.0.0`**. Lỗi → issue bug → nhánh `fix/<n>-...` **tạo từ `release/1.0.0`** → PR với base `release/1.0.0` → review → Squash and merge.

> PR vào `release/1.0.0` không tự đóng issue (không phải nhánh mặc định) → sau khi merge, tác giả **đóng issue bằng tay** và ghi "Fixed in #<số-PR>".

**6.3 [A] Mở PR `release/1.0.0 → main`**
- *base* **`main`** ← *compare* `release/1.0.0` · *Title* `release: v1.0.0` · *Reviewers* **B, C** (cần **2 approvals**) · *Labels* `type: chore` · *Milestone* Sprint 4.
- *Description*:

```markdown
## Release v1.0.0 — LaptopStore

### Chức năng
- Khách: trang chủ (song song), danh sách lọc/sắp xếp/phân trang trên URL, gợi ý tìm kiếm, chi tiết laptop, đánh giá
- Customer: giỏ hàng lưu json-server, thanh toán kiểm tra tồn kho, đơn hàng của tôi, hủy đơn hoàn kho
- Admin: quản trị laptop (tìm kiếm, phân trang, sửa nhanh tồn kho, xoá hàng loạt, optimistic delete), thêm/sửa laptop, quản lý đơn hàng

### Kỹ thuật
- axios instance + interceptors, Promise.all / allSettled, AbortController, useAxios, useDebounce

### Kiểm thử
- Tester A + C đã chạy 19 kịch bản trên release/1.0.0 — xem docs/TEST_REPORT.md
- `npm run build` → OK, hook pre-push không báo vi phạm
```

**6.4 [B] và [C] review:** checkout `release/1.0.0`, `npm install && npm run reset-db && npm start`, đi nhanh các chức năng chính, rồi **Approve**.

**6.5 [A] Merge:** chọn **Create a merge commit** (KHÔNG squash, để giữ lịch sử release) → **Confirm merge**. Nếu *Automatically delete head branches* xoá mất `release/1.0.0` thì cũng không sao, vì đã merge.

**6.6 [A] Gắn tag & tạo GitHub Release**

```bash
git switch main && git pull
git tag -a v1.0.0 -m "LaptopStore v1.0.0"
git push origin v1.0.0
```

Trên GitHub:
1. **Releases → Draft a new release**.
2. *Choose a tag*: `v1.0.0`.
3. *Target*: `main`.
4. *Release title*: `v1.0.0`.
5. Bấm **Generate release notes** (tự liệt kê các PR). Thêm link video demo vào cuối.
6. **Publish release**.

**6.7 [A] Back-merge `main → develop`, [B] review**
1. **New pull request**: *base* **`develop`**, *compare* **`main`**.
2. *Title*: `chore(release): back-merge v1.0.0 into develop`.
3. Mời B review. B **Approve**.
4. Merge bằng **Create a merge commit**.
5. Đóng issue #31 (nếu chưa đóng) và milestone Sprint 4.

**6.8 [A] Nộp bài:**
- Link repo (giảng viên quyền Read), `main` có tag `v1.0.0`; link board.
- README (#30), `docs/TEST_REPORT.md` (#31), `docs/ASSIGNMENT.md` (bản sao `Assignment_readme.md`).
- Video demo 3–5 phút.
- Ảnh chụp GitHub: board, một PR có review, *Insights → Network*, *Insights → Contributors*, trang Release.

**Hotfix sau release (nếu cần):** nhánh `hotfix/1.0.1-<mo-ta>` từ `main` → PR vào `main` (2 approve, merge commit) → tag `v1.0.1` → back-merge `main → develop`.

---

## 7. Xử lý xung đột & lỡ tay

### 7.1 Xung đột khi rebase

```bash
git fetch origin
git rebase origin/develop
# CONFLICT (content): Merge conflict in src/App.jsx
```

1. Mở file trong VS Code → giữa `<<<<<<<` / `=======` / `>>>>>>>` chọn **Accept Both Changes**, rồi chỉnh tay cho đúng (giữ cả route/import của mình và của người khác).
2. `git add src/App.jsx` → `git rebase --continue` (lặp lại nếu còn commit xung đột). Muốn bỏ: `git rebase --abort`.
3. `npm run build && npm start` kiểm tra lại.
4. `git push --force-with-lease` (chỉ trên **nhánh của mình**).

| File hay xung đột | Cách xử lý |
|---|---|
| `src/App.jsx` | Giữ cả hai; route đã khai báo sẵn ở #9 nên thường chỉ khác dòng `import` |
| `package.json` | Giữ cả hai dependency; sau đó `npm install` để tạo lại lock |
| `package-lock.json` | Lấy bản bất kỳ (`git checkout --theirs package-lock.json`), chạy `npm install` để lock khớp `package.json`, rồi `git add package-lock.json` |
| `db.json` | `npm run reset-db && git add db.json` (dữ liệu gốc nằm ở `db.backup.json`) |
| `AppNavbar.jsx`, `LaptopCard.jsx` | Gọi chủ file (B) cùng xem |

### 7.2 Lỡ tay

| Tình huống | Cách xử lý |
|---|---|
| Viết sai message commit vừa tạo (chưa push) | `git commit --amend -m "feat(cart): ..."` |
| Đã push commit sai message | Không cần sửa: PR sẽ squash; đặt **tiêu đề PR** đúng chuẩn |
| Lỡ commit trên `develop` ở máy (chưa push) | `git switch -c feature/<n>-...` (mang commit sang nhánh mới) → `git switch develop && git reset --hard origin/develop` |
| Push bị từ chối "repository rule violations" | Đang push thẳng `develop`/`main` → làm như dòng trên rồi push nhánh mới |
| Lỡ commit `.env` | `git rm --cached .env` → commit `chore(config): stop tracking env file`; kiểm tra `.gitignore` |
| Lỡ commit `db.json` đã bị json-server ghi | `npm run reset-db` → commit `chore(seed): restore sample data` |
| Hook pre-push không chạy | Chưa bật: `git config core.hooksPath .githooks`; Windows mở file bằng VS Code, góc phải dưới chọn **LF** và **UTF-8** |
| Hook báo vi phạm TECH | Sửa code theo dòng được in ra; chỉ dùng `git push --no-verify` khi đã trao đổi với Leader |
| PR mở nhầm base `main` | Trên PR bấm **Edit** cạnh tiêu đề → đổi base thành `develop` |
| Issue không tự đóng sau merge | Thiếu `Closes #n` hoặc PR không vào `develop` → đóng tay, comment "Fixed in #<PR>" |
| Commit không được tính cho mình | Email Git khác email GitHub → thêm email đó ở **Settings → Emails** |

---

## 8. Checklist cuối cùng theo người

**A (Leader)**
- [ ] Repo, collaborator, default branch `develop`, cấu hình PR, 2 ruleset (hoặc quy ước)
- [ ] 20 label, 5 milestone, board 5 cột + workflow + view "Theo người"
- [ ] 31 issue đúng số #1 → #31, đủ assignee / label / board / milestone
- [ ] #1, #2, #5, #8, #9, #10, #13, #18, #19, #26, #29 đã merge
- [ ] Review: #3, #7, #11, #15, #17, #20, #22, #24, #27, #30, #31
- [ ] `release/1.0.0` → `main`, tag `v1.0.0`, GitHub Release, back-merge, nộp bài

**B**
- [ ] #4, #6, #11, #14, #15, #16, #17, #20, #21, #30 đã merge
- [ ] Review: #1, #5, #9, #12, #13, #18, #23, #25, #28, #29 + approve release + review back-merge
- [ ] Tester Sprint 0 và Sprint 3; kết quả đo thời gian trong README

**C**
- [ ] #3, #7, #12, #22, #23, #24, #25, #27, #28, #31 đã merge
- [ ] Review: #2, #4, #6, #8, #10, #14, #16, #19, #21, #26 + approve release
- [ ] Tester Sprint 1, 2, 4; `docs/TEST_REPORT.md` đủ 19 kịch bản; video demo

**Cả nhóm**
- [ ] Hook `pre-push` đã bật trên máy mỗi người
- [ ] Mỗi người ≥ 15 commit đúng chuẩn, có `Refs #n`
- [ ] Board không còn thẻ ở *In progress* / *In review*; mọi milestone đã đóng
- [ ] Clone sạch → `npm install` → `cp .env.example .env` → `npm start` chạy được

---

## Phụ lục — Tạo 31 issue bằng script (tuỳ chọn)

Thay cho Bước 5 làm tay. Script đọc trực tiếp mục 7 của `Assignment_readme.md` (Title, Assignees, Labels, Projects, Milestone, Body) nên **nội dung giống hệt** khi tạo tay. Yêu cầu: đã cài **GitHub CLI** (`gh auth login`, rồi `gh auth refresh -s project`), đã làm xong Bước 1–4 (label, milestone, board phải có trước), B và C đã chấp nhận lời mời.

1. Chép `Assignment_readme.md` vào repo thành `docs/ASSIGNMENT.md` (chưa cần commit).
2. Tạo file `scripts/create-issues.mjs`:

```js
// Tạo issue #1..#31 từ docs/ASSIGNMENT.md (mục 7). Chạy 1 lần, trong thư mục repo:
//   node scripts/create-issues.mjs --dry-run   (xem trước)
//   node scripts/create-issues.mjs             (tạo thật)
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// ====== CẤU HÌNH: sửa username GitHub thật ======
const USERS = { A: 'leader-username', B: 'member-b', C: 'member-c' };
// ================================================

const DRY = process.argv.includes('--dry-run');
const md = readFileSync(new URL('../docs/ASSIGNMENT.md', import.meta.url), 'utf8');
const tmp = mkdtempSync(join(tmpdir(), 'issues-'));
const cell = (block, name) =>
  block.match(new RegExp(`\\|\\s*\\*\\*${name}\\*\\*\\s*\\|\\s*(.+?)\\s*\\|`))?.[1] ?? '';

const blocks = md.split(/^### Issue /m).slice(1);
let expect = 1;

for (const block of blocks) {
  const no = Number(block.match(/^(\d+)/)[1]);
  const title = cell(block, 'Title').replace(/`/g, '');
  const assignee = USERS[cell(block, 'Assignees').trim()[0]];
  const labels = [...cell(block, 'Labels').matchAll(/`([^`]+)`/g)].map((m) => m[1]).join(',');
  const project = cell(block, 'Projects').replace(/`/g, '');
  const milestone = cell(block, 'Milestone').replace(/`/g, '');
  const body = block.match(/`{3}markdown\n([\s\S]*?)\n`{3}/)[1];

  const file = join(tmp, `issue-${no}.md`);
  writeFileSync(file, body, 'utf8');
  const args = ['issue', 'create', '--title', title, '--body-file', file, '--label', labels,
    '--milestone', milestone, '--assignee', assignee, '--project', project];

  if (DRY) {
    console.log(`#${no}`, args.map((a) => (/\s/.test(a) ? `"${a}"` : a)).join(' '));
    continue;
  }
  const url = execFileSync('gh', args, { encoding: 'utf8' }).trim();
  const num = Number(url.split('/').pop());
  console.log(`✔ #${num}  ${title}`);
  if (num !== expect) console.log(`⚠ Số issue là #${num}, dự kiến #${expect} — dùng số THẬT trong tên nhánh/commit`);
  expect = num + 1;
}
console.log('Hoàn tất. Kiểm tra: gh issue list --limit 40');
```

3. Chạy:

```bash
node scripts/create-issues.mjs --dry-run    # in 31 lệnh, không tạo gì
node scripts/create-issues.mjs              # tạo thật — CHỈ CHẠY 1 LẦN
```

> Chạy lại sẽ tạo trùng issue. Lỡ chạy 2 lần: đóng các issue thừa bằng *Close as not planned*.
> Script và `docs/ASSIGNMENT.md` có thể commit sau trong một PR `docs(readme): add assignment and issue script`.

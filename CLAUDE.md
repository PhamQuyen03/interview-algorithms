@AGENTS.md

# SOLID Principles for React & Next.js

- **Single Responsibility (SRP):** Mỗi component chỉ làm một việc. Tách logic (hooks), UI (components), và data fetching (server actions/API routes) riêng biệt.
- **Open/Closed (OCP):** Component nên mở rộng được qua props, composition, và children — không sửa trực tiếp component gốc. Dùng pattern như render props hoặc slot pattern.
- **Liskov Substitution (LSP):** Component con phải thay thế được component cha mà không phá vỡ UI. Props interface phải nhất quán khi extend.
- **Interface Segregation (ISP):** Không ép component nhận props mà nó không dùng. Tách interface nhỏ, dùng Pick/Omit khi cần. Ưu tiên nhiều props nhỏ hơn một object lớn.
- **Dependency Inversion (DIP):** Component không nên phụ thuộc trực tiếp vào implementation cụ thể. Dùng context, dependency injection qua props, hoặc custom hooks để abstract dependencies.

### **🎯 Цель:**

Научиться создавать анимацию движения, прозрачности и масштаба графического объекта с помощью keyframes и behaviors.

---

### **📝 Задание:**

### **✅ Часть 1: Подготовка проекта**

1. Открой **Apple Motion**
2. Создай новый проект:
    - Тип: **Title** или **Standalone Motion Project**
    - Продолжительность: **5 секунд**
3. Добавь **прямоугольную плашку** или любой shape (через меню Object → New Rectangle или из Toolbar)

🖼 **Скриншот:** холст с добавленным объектом

---

### **✅ Часть 2: Добавь анимацию через keyframes**

1. Выдели объект
2. Перейди в **Inspector → Properties**
3. Установи:
    - **Keyframe в начале таймлинии**:
        - Позиция по X — за пределами кадра (например, –1000 px)
        - Прозрачность — 0%
    - **Keyframe на 1 сек**:
        - Позиция по X — центр кадра
        - Прозрачность — 100%

🖼 **Скриншот:** Inspector с параметрами Position и Opacity + включённые keyframes

---

### **✅ Часть 3: Добавь поведение (Behavior)**

1. Перейди в Library → Behaviors → Basic Motion
2. Примените **“Spin”** или **“Throw”** к объекту
3. Отрегулируй параметры:
    - Скорость вращения
    - Угол
    - Продолжительность

🖼 **Скриншот:** объект с применённым behavior (показан в панели Layers или Timeline)

---

### **✅ Часть 4: Тест и экспорт**

1. Нажми Play, убедись, что:
    - Объект **появляется плавно**
    - **Двигается** в кадр и/или вращается
    - Анимация заканчивается на позиции по центру
2. Экспортируй проект как видео .mov или сохрани как шаблон для FCPX
# SEO Guide — FitWay Workout Pages

## SEO Title

**Формат:** `[Primary Keyword] + [Qualifier]` (без суффикса `| FitWay`, так как шаблон Next.js `layout.tsx` добавляет его автоматически)

**Правила:**
- Максимум 60 символов
- Primary keyword в начале
- Не дублировать слова
- Включать число или модификатор когда уместно

**Примеры по категориям:**
- Strength: `Upper Body Strength Workout: 6 Dumbbell Exercises`
- HIIT: `20-Minute HIIT Workout for Fat Loss: No Equipment`
- Beginner: `Full Body Workout for Beginners: Build Strength at Home`
- Advanced: `Advanced Leg Day Workout: Heavy Compound Training`

---

## SEO Description

**Формат:** Проблема/цель → решение → CTA/qualifier  
**Длина:** 120–160 символов

**Примеры:**
- `Build upper body strength with this 45-min dumbbell workout. Target chest, back and shoulders with 6 proven exercises.`
- `Burn fat fast with this 20-minute HIIT circuit. No equipment needed: perfect for home training and busy schedules.`

---

## Keyword Strategy по категориям

### Strength / Muscle Building
- Primary: `[body part] strength workout`, `[body part] muscle building workout`
- Secondary: `[equipment] [body part] workout`, `[body part] hypertrophy training`
- Long-tail: `best [body part] exercises for [goal]`, `[body part] workout for [level] lifters`
- LSI: hypertrophy, progressive overload, compound movements, muscle fiber, time under tension, 1RM

### HIIT / Fat Loss
- Primary: `HIIT workout for fat loss`, `cardio fat burning workout`
- Secondary: `high intensity interval training`, `metabolic conditioning workout`
- Long-tail: `[N]-minute HIIT workout at home`, `HIIT workout for beginners to lose weight`
- LSI: EPOC, afterburn effect, metabolic rate, calorie deficit, anaerobic threshold

### Mobility / Flexibility
- Primary: `mobility workout`, `flexibility training routine`
- Secondary: `joint mobility exercises`, `dynamic stretching routine`
- Long-tail: `morning mobility routine for desk workers`, `hip mobility exercises for runners`
- LSI: range of motion, fascia, proprioception, active stretching, myofascial release

### Full Body
- Primary: `full body workout`, `total body training`
- Secondary: `compound exercise workout`, `functional fitness routine`
- Long-tail: `full body workout 3 times a week for weight loss`, `total body strength workout at home`
- LSI: functional movement, bilateral training, muscle activation, workout split

---

## FAQ Keyword Patterns

FAQ-вопросы должны отражать реальные поисковые запросы:

```
How many times a week should I do [workout type]?
Can I do [workout] at home without equipment?
How long does it take to see results from [workout]?
Is [workout] good for beginners?
What should I eat before/after [workout]?
How do I progress in [workout] over time?
What muscles does [workout] work?
Is [workout] good for weight loss?
```

---

## Content Quality Checklist

### Google Helpful Content & Anti-AI (Humanizer) критерии:

- [ ] Контент отвечает на реальный поисковый запрос
- [ ] Соблюдены правила `.agents/skills/humanizer/SKILL.md`:
  - Никаких конструкций "Not X but Y" (`not just about X, it's about Y`)
  - Никаких искусственных разогревов ("Let's dive in", "Here's what you need to know")
  - Никаких драматичных лозунгов ("Consistency is key", "That is the real win")
  - Никаких AI-клише (`delve`, `crucial`, `pivotal`, `game-changer`, `testament`, `robust`)
  - Никаких em dash `—` и en dash `–` во всех полях
  - Никакого шаблонного bolding на каждом буллете советов
- [ ] Есть конкретные, применимые советы (не generic)
- [ ] Упомянуты реальные научные/фитнес принципы (progressive overload, EPOC и т.д.)
- [ ] Execution technique достаточно детальная для самостоятельного выполнения
- [ ] Нет медицинских обещаний: "will cure", "eliminates pain", "treats"
- [ ] Есть предупреждения о технике безопасности (whoShouldAvoid)
- [ ] FAQ/Expert tips содержат ответы, которые реально полезны — не просто заполнитель

### EEAT сигналы:
- Упоминать конкретные анатомические термины (не просто "мышцы", а "rectus femoris")
- Объяснять ПОЧЕМУ работает то или иное упражнение
- Давать альтернативы и прогрессии
- Указывать реалистичные временные рамки результатов

---

## Запрещённые SEO-практики

- Keyword stuffing: "leg workout legs exercises leg training" → избегать
- Дублирование: title и H1 не должны быть идентичны
- Overoptimization description: не набивать keywords в description
- Misleading titles: kcal и время в title только если реально точные данные

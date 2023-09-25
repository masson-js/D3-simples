// Данные для графика (просто массив чисел)
const dataset = [10, 25, 35, 50, 45, 30, 60, 75, 90];

// Размеры графика
const width = 400;
const height = 300;
const padding = 40;

// Создаем элемент SVG в контейнере
const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

// Создаем шкалу x для временных интервалов (пока используем индексы)
const xScale = d3.scaleLinear()
    .domain([0, dataset.length - 1])
    .range([padding, width - padding]);

// Создаем шкалу y для значений данных
const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height - padding, padding]);

// Создаем линию для графика
const line = d3.line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d))
    .curve(d3.curveMonotoneX); // Монотонная кривая для сглаживания линии

// Создаем путь (line path) на основе данных и линии
svg.append("path")
    .datum(dataset)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("d", line);

// Добавляем ось x
svg.append("g")
    .attr("transform", `translate(0, ${height - padding})`)
    .call(d3.axisBottom(xScale));

// Добавляем ось y
svg.append("g")
    .attr("transform", `translate(${padding}, 0)`)
    .call(d3.axisLeft(yScale));
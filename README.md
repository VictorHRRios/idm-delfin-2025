# Predicción del Índice de Violencia en Municipios de México 🇲🇽

Este proyecto tiene como objetivo predecir el índice de violencia en los municipios de México usando redes neuronales y visualizar los resultados en una plataforma web interactiva.

## Descripción del Proyecto

Desarrollado durante una estancia de investigación del **Programa Delfín** en la **Benemérita Universidad Autónoma de Puebla (BUAP)**, este proyecto combina ciencia de datos, inteligencia artificial y desarrollo web para analizar y visualizar patrones de violencia a nivel municipal en México.

Se utilizó un conjunto de datos del **INEGI** que abarca desde 2015 hasta 2025 para entrenar y evaluar modelos predictivos. Los resultados se presentan a través de una interfaz web moderna que permite explorar predicciones mensuales mediante un mapa interactivo.

## Tecnologías Utilizadas

- **Python** – para procesamiento de datos y entrenamiento del modelo (con bibliotecas como Pandas, Scikit-learn, etc.).
- **Redes Neuronales** – para predicción del índice de violencia.
- **Tailwind CSS** – para diseño responsivo en modo claro y oscuro.
- **Leaflet.js** – para visualización de datos geoespaciales en el mapa.
- **HTMX** – para interactividad ligera sin recargar la página.
- **Go (Golang)** – para el backend que sirve los datos y renderiza las vistas.

## Flujo de Trabajo

1. **Exploración y análisis de datos**  
   - Gráficas exploratorias
   - Limpieza y preprocesamiento de datos

2. **Preparación del dataset**  
   - Generación de características (features)
   - División del dataset en entrenamiento y validación

3. **Entrenamiento del modelo**  
   - Búsqueda de hiperparámetros
   - Evaluación de resultados

4. **Visualización Web**  
   - Desarrollo de mapa interactivo con selección de año y mes
   - Visualización de predicciones por municipio
   - Gráficas comparativas (`loss.png`, `realvspred.png`)

## Sitio Web Interactivo

La página web incluye:
- Modo claro y oscuro con botón de alternancia.
- Controles de año y mes con rangos de 2015 a 2035.
- Notificación automática cuando se visualizan predicciones futuras (a partir de abril 2025).
- Subida de archivos GeoJSON personalizados.
- Notificaciones de carga de datos al renderizar el mapa.

## Capturas

| Gráfica de pérdida | Real vs Predicción |
|--------------------|--------------------|
| ![Loss](static/loss.png) | ![Real vs Pred](static/realvspred.png) |

## Créditos

Este proyecto fue realizado por **Víctor Hugo Ramírez Ríos**, estudiante de la **Universidad de Sonora**, con la **Dra. Gabriela Yáñez** como supervisora durante la estancia en la **BUAP**.

Agradecimientos especiales al:

- **Programa Delfín**  
- **Universidad de Sonora (UNISON)**  
- **Benemérita Universidad Autónoma de Puebla (BUAP)**  
- **Dra. Gabriela Yáñez**, por su guía y apoyo académico.

<p align="center">
  <img src="static/buap.png" alt="BUAP" height="60" />
  <img src="static/unison.jpg" alt="Unison" height="60" style="border-radius: 6px; margin: 0 10px;" />
  <img src="static/delfin.png" alt="Delfin" height="60" />
</p>


## Cómo Ejecutar

1. Clona este repositorio.
2. Asegúrate de tener Go y los archivos estáticos/GeoJSON listos.
3. Corre el servidor:
   ```bash
   go run .
   ```

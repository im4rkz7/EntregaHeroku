# Ejecutar servidores Node

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

- Agregar en la vista info, el número de procesadores presentes en el servidor.
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
- Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

# Servidor Nginx

Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

- Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
- El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
- Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

## Aspectos a incluir en el entregable

- Incluir el archivo de configuración de nginx junto con el proyecto.
- Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.

# Resolución

Ejecutando el servidor con nodemon:

```
nodemon index.js -m cluster
nodemon index.js -m fork
```

Ejecutando el servidor con forever:

```
forever start server.js
forever start server.js -p 8081
forever start server.js -p 8081 -m cluster
```

Deteniendo forever:

```
forever stop server.js
forever stopall
```

Listar procesos con forever:

```
forever list
```

Generando 4 clusters en los puertos 8082, 8083, 8084 y 8085 con pm2:

```
pm2 start index.js --name="Server1" --watch -i 2 -- -p 8082
pm2 start index.js --name="Server2" --watch -i 2 -- -p 8083
pm2 start index.js --name="Server3" --watch -i 2 -- -p 8084
pm2 start index.js --name="Server4" --watch -i 2 -- -p 8085
```

Detener procesos pm2:

```
pm2 stop index.js
```

Eliminar procesos pm2:

```
pm2 delete index.js
```

Listar procesos pm2:

```
pm2 list
```

Resultados del listado:

```
┌─────┬────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name       │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ Server1    │ default     │ 1.0.0   │ cluster │ 11596    │ 70s    │ 0    │ online    │ 0%       │ 29.3mb   │ tomyt    │ enabled  │
│ 1   │ Server1    │ default     │ 1.0.0   │ cluster │ 9776     │ 70s    │ 0    │ online    │ 0%       │ 29.3mb   │ tomyt    │ enabled  │
│ 2   │ Server2    │ default     │ 1.0.0   │ cluster │ 18684    │ 36s    │ 0    │ online    │ 0%       │ 29.6mb   │ tomyt    │ enabled  │
│ 3   │ Server2    │ default     │ 1.0.0   │ cluster │ 18548    │ 36s    │ 0    │ online    │ 0%       │ 29.2mb   │ tomyt    │ enabled  │
│ 4   │ Server3    │ default     │ 1.0.0   │ cluster │ 12472    │ 27s    │ 0    │ online    │ 0%       │ 29.1mb   │ tomyt    │ enabled  │
│ 5   │ Server3    │ default     │ 1.0.0   │ cluster │ 12424    │ 27s    │ 0    │ online    │ 0%       │ 29.1mb   │ tomyt    │ enabled  │
│ 6   │ Server4    │ default     │ 1.0.0   │ cluster │ 10792    │ 17s    │ 0    │ online    │ 0%       │ 29.1mb   │ tomyt    │ enabled  │
│ 7   │ Server4    │ default     │ 1.0.0   │ cluster │ 17052    │ 16s    │ 0    │ online    │ 0%       │ 28.9mb   │ tomyt    │ enabled  │
└─────┴────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

```

Ahora con lo referente al archivo de configuración de Nginx. La configuración está [aquí](./nginx.conf).

Comprobando que la sintáxis sea correcta:

```
nginx -t
```

Resultados del test de nginx:

```
nginx: the configuration file C:\Program Files\nginx-1.22.1/conf/nginx.conf syntax is ok
nginx: configuration file C:\Program Files\nginx-1.22.1/conf/nginx.conf test is successful
```

Frenamos y volvemos a ejecutar el servicio:

```
@taskkill /f /im nginx.exe
start nginx
```

# Loggers y Gzip

Incorporar al proyecto de servidor de trabajo la compresión gzip.

Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.

Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:

- Ruta y método de todas las peticiones recibidas por el servidor (info).
- Ruta y método de las peticiones a rutas inexistentes en el servidor (warning).
- Errores lanzados por las apis de mensajes y productos, únicamente (error).
  Considerar el siguiente criterio:
- Loggear todos los niveles a consola (info, warning y error).
- Registrar sólo los logs de warning a un archivo llamada warn.log.
- Enviar sólo los logs de error a un archivo llamada error.log.

## Analisis completo de performance

Luego, realizar el análisis completo de performance del servidor con el que venimos trabajando.

Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. Además desactivaremos el child_process de la ruta '/randoms'.

Para ambas condiciones (con o sin console.log) en la ruta '/info' obtener:

- El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process.

Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto.

Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola).

- El perfilamiento del servidor con el modo inspector de node.js --inspect. Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección.
- El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.

Realizar un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes).
Al final incluir la conclusión obtenida a partir del análisis de los datos.

<!-- artillery quick --count 50 -n 20 "http://localhost:8080/info" > result_con_consoleLog.txt
artillery quick --count 50 -n 20 "http://localhost:8080/info" > result_sin_consoleLog.txt
node --prof-process .\isolate-0000015009DB11F0-11184-v8.log > profiler_con_console_log.txt
node --prof-process .\isolate-0000023E4B15EE40-17248-v8.log > profiler_sin_console_log.txt -->
